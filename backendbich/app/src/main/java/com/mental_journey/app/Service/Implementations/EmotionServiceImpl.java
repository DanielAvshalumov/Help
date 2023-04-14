package com.mental_journey.app.Service.Implementations;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.mental_journey.app.Model.Emotion;
import com.mental_journey.app.Repository.EmotionRepository;
import com.mental_journey.app.Repository.UserLoginRepository;
import com.mental_journey.app.Service.EmotionService;

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
            req.setDate(new Date());
            return emotionRepo.save(req);
        }).orElseThrow(() -> new NotFoundException());
        return new ResponseEntity<>(emotion,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Emotion>> getAll(Long id) throws NotFoundException {
        if(!userRepo.existsById(id)) {
            throw new NotFoundException();
        }
        List<Emotion> emotions = emotionRepo.findEmotionsByUserId(id);
        return new ResponseEntity<>(emotions,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Object> get(Long id) throws NotFoundException {
        Optional<Emotion> emotion = emotionRepo.findById(id);
        return new ResponseEntity<>(emotion, HttpStatus.OK);

    }
    
}
