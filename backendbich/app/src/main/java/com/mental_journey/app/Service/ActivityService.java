package com.mental_journey.app.Service;

import java.util.List;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.ResponseEntity;

import com.mental_journey.app.Model.Activity;
import com.mental_journey.app.Model.Journey;

public interface ActivityService {
    
    ResponseEntity<Activity> createActivity(Long id, Activity body);

    ResponseEntity<List<Activity>> getAllActivity(Long id);

    ResponseEntity<Activity> deleteActivity(Long activityId);

    ResponseEntity<Journey> createJourney(Long activityId, Integer reach) throws NotFoundException;
}
