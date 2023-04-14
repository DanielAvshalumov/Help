package com.mental_journey.app.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.mental_journey.app.Model.Activity;
import com.mental_journey.app.Model.UserLogin;
import com.mental_journey.app.Repository.ActivityRepository;
import com.mental_journey.app.Repository.UserLoginRepository;

@Service
public class ActivityServiceImpl implements ActivityService{

    private ActivityRepository activityRepo;

    private UserLoginRepository userRepo;

    public ActivityServiceImpl(ActivityRepository activityRepo, UserLoginRepository userRepo) {
        this.activityRepo = activityRepo;
        this.userRepo = userRepo;
    }

    @Override
    public ResponseEntity<Activity> createActivity(Long id, Activity body) {
        Optional<UserLogin> user = userRepo.findById(id);
        body.setUser(user.get());
        activityRepo.save(body);
        return new ResponseEntity<>(body,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Activity>> getAllActivity(Long id) {
        UserLogin user = userRepo.findById(id).get();
        List<Activity> res = activityRepo.findAllByUser(user);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
    
}
