package com.mental_journey.app.Service.Implementations;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.mental_journey.app.Model.Activity;
import com.mental_journey.app.Model.Journey;
import com.mental_journey.app.Model.UserLogin;
import com.mental_journey.app.Repository.ActivityRepository;
import com.mental_journey.app.Repository.JourneyRepository;
import com.mental_journey.app.Repository.UserLoginRepository;
import com.mental_journey.app.Service.ActivityService;

@Service
public class ActivityServiceImpl implements ActivityService{

    private ActivityRepository activityRepo;

    private UserLoginRepository userRepo;

    private JourneyRepository journeyRepo;

    public ActivityServiceImpl(ActivityRepository activityRepo, UserLoginRepository userRepo, JourneyRepository journeyRepo) {
        this.activityRepo = activityRepo;
        this.userRepo = userRepo;
        this.journeyRepo = journeyRepo;
    }

    @Override
    public ResponseEntity<Activity> createActivity(Long id, Activity body) {
        Optional<UserLogin> user = userRepo.findById(id);
        body.setUser(user.get());
        activityRepo.save(body);
        return new ResponseEntity<>(body,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Set<Activity>> getAllActivity(Long id) throws Exception {
        UserLogin user = userRepo.findById(id).get();
        
        Set<Activity> res = activityRepo.findAllByUser(user).stream().map(activity -> {
            Set<Journey> entries = journeyRepo.findAllByActivity(activity);
            System.out.println(entries.toString());
            return activity;
        }).collect(Collectors.toSet());
        
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Activity> deleteActivity(Long activityId) {
        activityRepo.deleteById(activityId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @Override
    public ResponseEntity<Journey> createJourney(Long activityId, int reach) throws NotFoundException {

        Activity activity = activityRepo.findById(activityId).orElseThrow(() -> new NotFoundException());
        Journey entry = new Journey();
        System.out.println(reach);
        entry.setReach(reach); 
        entry.setActivity(activity);
        journeyRepo.save(entry);

        return new ResponseEntity<>(entry, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Journey> updateJourney(Journey req, Integer reach) throws NotFoundException {
        
        Journey res = journeyRepo.findById(req.getId()).orElseThrow(() -> new NotFoundException());
        System.out.println(reach);
        res.setReach(reach);

        return ResponseEntity.ok(journeyRepo.save(res));
    }

    @Override
    public ResponseEntity<List<Journey>> getJourneyByDate(Long activityId, Date today) {
        activityRepo.findById(activityId).get().getEntries().stream().filter(date -> date.getDate().compareTo(today) == 0).forEach(System.out::println);
        // continue from here
        return new ResponseEntity<>(null,HttpStatus.OK);
    }

}
