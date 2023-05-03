package com.mental_journey.app.Service;

import java.util.Set;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.ResponseEntity;

import com.mental_journey.app.Model.Activity;
import com.mental_journey.app.Model.Journey;

public interface ActivityService {
    
    ResponseEntity<Activity> createActivity(Long id, Activity body);

    ResponseEntity<Set<Activity>> getAllActivity(Long id) throws Exception;

    ResponseEntity<Activity> deleteActivity(Long activityId);

    ResponseEntity<Journey> createJourney(Long activityId, int reach) throws NotFoundException;

    ResponseEntity<Journey> updateJourney(Journey req, Integer reach) throws NotFoundException;
}
