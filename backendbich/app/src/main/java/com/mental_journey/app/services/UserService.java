package com.mental_journey.app.services;

import java.util.List;

import com.mental_journey.app.Model.User;

public interface UserService {

    List<User> getAllUsers();

    User saveUser(User user);
    
    User getCredentials(String name);

}
