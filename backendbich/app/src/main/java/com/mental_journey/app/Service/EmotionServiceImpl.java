package com.mental_journey.app.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.mental_journey.app.Model.Emotion;
import com.mental_journey.app.Repository.EmotionRepository;
import com.mental_journey.app.Repository.UserLoginRepository;

@Service
public class EmotionServiceImpl implements EmotionService {

    @Autowired
    UserLoginRepository userRepo;

    @Autowired
    EmotionRepository emotionRepo;

    @Override
    public ResponseEntity<Emotion> create(Long id, Emotion req) throws NotFoundException {
        Emotion emotion = userRepo.findById(id).map(user -> {
            req.setUser(user);
            return emotionRepo.save(req);
        }).orElseThrow(() -> new NotFoundException());
        return new ResponseEntity<>(emotion,HttpStatus.OK);
    }
    
}
