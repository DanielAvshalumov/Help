package com.mental_journey.app.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mental_journey.app.Model.Emotion;
import com.mental_journey.app.Repository.EmotionRepository;
import com.mental_journey.app.Repository.UserLoginRepository;

@CrossOrigin(origins="*", maxAge=3600)
@RestController
@RequestMapping("/api")
public class EmotionController {
    
    @Autowired
    EmotionRepository emotionRepository;

    @Autowired
    UserLoginRepository userRepository;

    @PostMapping("/emotions/{userId}")
    public ResponseEntity<Emotion> createEmotion(
            @PathVariable(value = "userId") Long userId,
            @RequestBody Emotion emotionReq) throws Exception {
        
        Emotion emotion = userRepository.findById(userId).map(user -> {
            emotionReq.setUser(user);
            return emotionRepository.save(emotionReq);
        }).orElseThrow(() -> new Exception());
        
        return new ResponseEntity<>(emotion, HttpStatus.OK);

    }

}
