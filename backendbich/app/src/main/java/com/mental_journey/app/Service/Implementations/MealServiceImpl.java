package com.mental_journey.app.Service.Implementations;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.mental_journey.app.Model.Meal;
import com.mental_journey.app.Model.Physical;
import com.mental_journey.app.Repository.MealRepository;
import com.mental_journey.app.Repository.PhysicalRepository;
import com.mental_journey.app.Service.MealService;

@Service
public class MealServiceImpl implements MealService{
    @Autowired
    MealRepository mealRepo;

    @Autowired 
    PhysicalRepository physicalRepo;

    @Override
    public ResponseEntity<Meal> create(Long id, Meal req) throws NotFoundException {
        Physical physical = physicalRepo.findById(id).orElseThrow(() -> new NotFoundException());
        req.setPhysical(physical);
        mealRepo.save(req);
        return new ResponseEntity<>(req,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Meal>> getAll(Long id) throws NotFoundException {
        List<Meal> mealList = mealRepo.findAllByPhysicalId(id);
        return new ResponseEntity<>(mealList,HttpStatus.OK);
    }

    @Override 
    public ResponseEntity<Meal> remove(Long id) {
        mealRepo.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
