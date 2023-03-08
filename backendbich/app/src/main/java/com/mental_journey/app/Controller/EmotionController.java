package com.mental_journey.app.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mental_journey.app.Model.Emotion;
import com.mental_journey.app.Repository.EmotionRepository;
import com.mental_journey.app.Repository.UserLoginRepository;
import com.mental_journey.app.Service.EmotionService;

@CrossOrigin(origins="*", maxAge=3600)
@RestController
@RequestMapping("/api")
public class EmotionController {
    
    //TODO replace exceptions with something more substantial 

    @Autowired
    EmotionRepository emotionRepository;

    @Autowired
    UserLoginRepository userRepository;

    @Autowired
    EmotionService emotionService;

    @PostMapping("/emotions/{userId}")
    public ResponseEntity<Emotion> createEmotion(
            @PathVariable(value = "userId") Long userId,
            @RequestBody Emotion emotionReq) throws Exception {
        
        return emotionService.create(userId,emotionReq);

    }

    @GetMapping("/emotions/{userId}")
    public ResponseEntity<List<Emotion>> getAllEmotionsByUserId(@PathVariable(value = "userId") Long userId) throws Exception {
        if(!userRepository.existsById(userId)) {
            throw new Exception();
        }
        
        List<Emotion> emotions = emotionRepository.findEmotionsByUserId(userId);
       
        
        // Map<Long, Emotion> map = emotions.stream()
        //                         .collect(Collectors.toMap(Emotion::getId,Function.identity()));
        return new ResponseEntity<>(emotions, HttpStatus.OK);
    }

    @GetMapping("/emotion/{id}")
    public ResponseEntity<Object> getEmotionById(@PathVariable Long id) {
        Optional<Emotion> emotion = emotionRepository.findById(id);
        return new ResponseEntity<>(emotion,HttpStatus.OK);
    }

}
