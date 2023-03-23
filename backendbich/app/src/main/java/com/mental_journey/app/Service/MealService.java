package com.mental_journey.app.Service;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.ResponseEntity;

import com.mental_journey.app.Model.Meal;

public interface MealService {

    ResponseEntity<Meal> create(Long id, Meal req) throws NotFoundException;
    
}
