package com.mental_journey.app.Controller;

import java.util.Date;
import java.util.List;
import java.util.Set;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mental_journey.app.Model.Activity;
import com.mental_journey.app.Model.Journey;
import com.mental_journey.app.Service.ActivityService;

@CrossOrigin( origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/mental/")
public class MentalController {
    
    private ActivityService activityService;

    public MentalController(ActivityService activityService) {
        this.activityService = activityService;
    }
    
    @PostMapping("activity/{id}")
    public ResponseEntity<Activity> createActivity(@PathVariable Long id, @RequestBody Activity body) {return activityService.createActivity(id, body);}

    @GetMapping("activity/{id}")
    public ResponseEntity<Set<Activity>> getAllActivities(@PathVariable Long id) throws Exception {return activityService.getAllActivity(id);}

    @DeleteMapping("activity/{activityId}") 
    public ResponseEntity<Activity> deleteActivity(@PathVariable Long activityId) {return activityService.deleteActivity(activityId);}

    @PostMapping("journey/{activityId}")
    public ResponseEntity<Journey> createJourney(
        @PathVariable Long activityId,
        @RequestBody int reach) throws NotFoundException {return activityService.createJourney(activityId, reach);
    }

    @PutMapping("journey/{journeyId}")
    public ResponseEntity<Journey> updateJourney(@RequestBody Journey req,@RequestParam Integer reach) throws NotFoundException {return activityService.updateJourney(req, reach);}

    @GetMapping("journey/{activityId}")
    public ResponseEntity<List<Journey>> getJourneyByDate(@PathVariable Long activityId, @RequestParam @DateTimeFormat(pattern="yyyy-MM-dd") Date today) throws NotFoundException {return activityService.getJourneyByDate(activityId,today);}
    
}
