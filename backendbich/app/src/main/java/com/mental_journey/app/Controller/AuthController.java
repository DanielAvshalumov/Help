package com.mental_journey.app.Controller;


import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mental_journey.app.Model.ERole;
import com.mental_journey.app.Model.Role;
import com.mental_journey.app.Model.UserLogin;
import com.mental_journey.app.Repository.RoleRepository;
import com.mental_journey.app.Repository.UserLoginRepository;
import com.mental_journey.app.Security.Jwt.JwtUtils;
import com.mental_journey.app.Security.Services.UserDetailsImpl;
import com.mental_journey.app.Security.payload.request.LoginRequest;
import com.mental_journey.app.Security.payload.request.SignupRequest;
import com.mental_journey.app.Security.payload.response.JwtResponse;
import com.mental_journey.app.Security.payload.response.MessageResponse;

@CrossOrigin(origins="*", maxAge=3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserLoginRepository loginRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jtwUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jtwUtils.generateJwtToken(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList()
        );
        
        return ResponseEntity.ok(new JwtResponse(jwt,
                                                    userDetails.getId(), 
                                                    userDetails.getUsername(), 
                                                    roles));
    }

    @PostMapping("/signup") 
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {

        if(loginRepository.existsByUsername(signupRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error : Username already taken"));
        }

        UserLogin userLogin = new UserLogin(signupRequest.getUsername(),encoder.encode(signupRequest.getPassword()));
        Set<String> strRoles = signupRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if(strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Role is not found"));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch(role) {
                    case "admin" :
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("no role"));
                        roles.add(adminRole);
                        break;
                    case "mod" :
                        Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException("no role"));
                        roles.add(modRole);
                        break;
                    default :
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("no role"));
                        roles.add(userRole);
                        break;
                }
            });
        }

        userLogin.setRoles(roles);
        loginRepository.save(userLogin);

        return ResponseEntity.ok(new MessageResponse("User registered successfully"));
    }

    
}

