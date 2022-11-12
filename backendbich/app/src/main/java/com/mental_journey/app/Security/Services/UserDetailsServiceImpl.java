package com.mental_journey.app.Security.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mental_journey.app.Model.UserLogin;
import com.mental_journey.app.Repository.UserLoginRepository;

import org.springframework.security.core.userdetails.UserDetailsService;


@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UserLoginRepository userLoginRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserLogin userLogin = userLoginRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found with : " + username));

        return UserDetailsImpl.build(userLogin);
    }
    
}
