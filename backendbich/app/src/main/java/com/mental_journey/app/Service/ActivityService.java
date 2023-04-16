package com.mental_journey.app.Service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.mental_journey.app.Model.Activity;

public interface ActivityService {
    
    public ResponseEntity<Activity> createActivity(Long id, Activity body);

    public ResponseEntity<List<Activity>> getAllActivity(Long id);

    public ResponseEntity<Activity> deleteActivity(Long activityId);
}
