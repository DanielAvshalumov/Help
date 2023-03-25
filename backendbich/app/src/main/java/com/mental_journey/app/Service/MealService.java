package com.mental_journey.app.Service;

import java.util.List;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.ResponseEntity;

import com.mental_journey.app.Model.Meal;

public interface MealService {

    public ResponseEntity<Meal> create(Long id, Meal req) throws NotFoundException;
    public ResponseEntity<List<Meal>> getAll(Long id) throws NotFoundException;
    public ResponseEntity<Meal> remove(Long id);
}
