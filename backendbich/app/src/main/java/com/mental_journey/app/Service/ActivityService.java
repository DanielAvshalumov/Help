package com.mental_journey.app.Service;

import org.springframework.http.ResponseEntity;

import com.mental_journey.app.Model.Activity;

public interface ActivityService {
    
    public ResponseEntity<Activity> createActivity(Long id, Activity body);
}
