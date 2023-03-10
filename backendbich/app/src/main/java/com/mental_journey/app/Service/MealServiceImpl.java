package com.mental_journey.app.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mental_journey.app.Repository.MealRepository;
import com.mental_journey.app.Repository.UserLoginRepository;

@Service
public class MealServiceImpl implements MealService{
    @Autowired
    MealRepository mealRepo;

    @Autowired 
    UserLoginRepository userRepo;


}
