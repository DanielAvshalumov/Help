package com.mental_journey.app.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.mental_journey.app.Model.Meal;
import com.mental_journey.app.Model.Physical;
import com.mental_journey.app.Service.MealService;
import com.mental_journey.app.Service.PhysicalService;

@CrossOrigin(origins="*", maxAge=3600)
@RestController
@RequestMapping("/api/physical/")
public class PhysicalController {
    
    @Autowired
    PhysicalService physicalService;

    @Autowired
    MealService mealService;

    @PostMapping("{id}")
    public ResponseEntity<Physical> createPhysical(@PathVariable Long id, @RequestBody Physical req) throws NotFoundException {
        return physicalService.create(id,req);
    }

    @GetMapping("{id}")
    @ResponseBody
    public ResponseEntity<Physical> getPhysical(@PathVariable Long id) throws NotFoundException {
        return physicalService.get(id);
    }

    @GetMapping("{id}/user")
    @ResponseBody
    public ResponseEntity<Physical> getUserPhysical(@PathVariable Long id) throws NotFoundException {
        return physicalService.getUserPhysical(id);
    }
 
    @PutMapping("{id}")
    @ResponseBody
    public ResponseEntity<Physical> updatePhysical(@PathVariable Long id, @RequestParam Long mealId) {
        return physicalService.update(id, mealId);
    }

    @PostMapping("/meal/{id}")
    public ResponseEntity<Meal> createMeal(@PathVariable Long id, @RequestBody Meal req) throws NotFoundException {
        return mealService.create(id,req);
    }

    @GetMapping("{id}/meals")
    public ResponseEntity<List<Meal>> getAllMeals(@PathVariable Long id) throws NotFoundException {
        return mealService.getAll(id);
    }

    @DeleteMapping("meal/{id}")
    public ResponseEntity<Meal> deleteMeal(@PathVariable Long id) {
        return mealService.remove(id);
    }

    
}
