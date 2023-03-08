package com.mental_journey.app.Service;

import java.util.List;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.ResponseEntity;

import com.mental_journey.app.Model.Emotion;

public interface EmotionService {
    public ResponseEntity<Emotion> create(Long id, Emotion req) throws NotFoundException;
    public ResponseEntity<List<Emotion>> getAll(Long id) throws NotFoundException;
    public ResponseEntity<Object> get(Long id) throws NotFoundException;
}
