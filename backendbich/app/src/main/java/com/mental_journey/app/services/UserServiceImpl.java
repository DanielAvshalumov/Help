package com.mental_journey.app.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.mental_journey.app.Entity.UserEntity;
import com.mental_journey.app.Model.User;
import com.mental_journey.app.Repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
    
    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String errorMessage(String message,String errorMessage) {
        String out = "\n" + message + " | Error: " + errorMessage + "\n";
        return "-".repeat(out.length()) + out + "-".repeat(out.length());
    }

    @Override
    public User saveUser(User user) {
        UserEntity userEntity = new UserEntity();
            BeanUtils.copyProperties(user, userEntity);
            userRepository.save(userEntity);
            return user;
    }


    @Override
    public List<User> getAllUsers() {
        List<UserEntity> userEntities
            = userRepository.findAll();
        
        List<User> users = userEntities
            .stream()
            .map(use -> new User(
                use.getId(),
                use.getName()
            )).collect(Collectors.toList());
            
        return users;
    }

}
