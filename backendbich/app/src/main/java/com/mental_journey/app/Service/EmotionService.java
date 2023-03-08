package com.mental_journey.app.Service;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.ResponseEntity;

import com.mental_journey.app.Model.Emotion;

public interface EmotionService {
    public ResponseEntity<Emotion> create(Long id, Emotion req) throws NotFoundException;
}
