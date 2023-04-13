package com.mental_journey.app.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mental_journey.app.Model.Activity;
import com.mental_journey.app.Service.ActivityService;

@CrossOrigin( origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/mental")
public class MentalController {
    
    private ActivityService activityService;

    public MentalController(ActivityService activityService) {
        this.activityService = activityService;
    }
    
    @PostMapping("/")
    public ResponseEntity<Activity> createActivity(@PathVariable Long id, @RequestBody Activity body) {return activityService.createActivity(id, body);}
}
