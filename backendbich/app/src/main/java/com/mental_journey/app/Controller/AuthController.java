package com.mental_journey.app.Controller;


import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mental_journey.app.Repository.RoleRepository;
import com.mental_journey.app.Repository.UserLoginRepository;
import com.mental_journey.app.Security.Jwt.JwtUtils;

@CrossOrigin(origins="*", maxAge=3600)
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

    // @RequestMapping("/signin")
    // public ResponseEntity<?> authenticateUser(@Valid @RequestBody LogInRequest login) {
        
    // }
}
