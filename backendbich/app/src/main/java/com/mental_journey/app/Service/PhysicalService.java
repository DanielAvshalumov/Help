package com.mental_journey.app.Service;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.ResponseEntity;

import com.mental_journey.app.Model.Physical;

public interface PhysicalService {
    ResponseEntity<Physical> create(Long id, Physical req) throws NotFoundException;
    ResponseEntity<Physical> get(Long id) throws NotFoundException;
    ResponseEntity<Physical> update(Long id, Long mealId);
    ResponseEntity<Physical> getUserPhysical(Long id) throws NotFoundException;
    void resetPhysical();
}
