package com.mental_journey.app.Service.Implementations;

import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mental_journey.app.Model.Meal;
import com.mental_journey.app.Model.Physical;
import com.mental_journey.app.Model.UserLogin;
import com.mental_journey.app.Repository.MealRepository;
import com.mental_journey.app.Repository.PhysicalRepository;
import com.mental_journey.app.Repository.UserLoginRepository;
import com.mental_journey.app.Service.PhysicalService;

@Service
public class PhysicalServiceImpl implements PhysicalService{

    UserLoginRepository userRepo;

    PhysicalRepository physicalRepo;

    MealRepository mealRepo;

    public PhysicalServiceImpl(UserLoginRepository userRepo, PhysicalRepository physicalRepo, MealRepository mealRepo) {
        this.userRepo = userRepo;
        this.physicalRepo = physicalRepo;
        this.mealRepo = mealRepo;
    }

    @Override
    public ResponseEntity<Physical> create(Long id, Physical req) throws NotFoundException {
        Optional<UserLogin> user = userRepo.findById(id);
        if(user.get() == null) {
            throw new NotFoundException();
        }
        req.setId(id);
        req.setUser(user.get());

        UserLogin _user= user.get();
        _user.setCalories(req.getCalories());
        _user.setProtein(req.getProtein());
        _user.setCarbs(req.getCarbs());
        _user.setFat(req.getFat());
        
        userRepo.save(_user);
        Physical physical = physicalRepo.save(req);
        return new ResponseEntity<>(physical,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Physical> get(Long id) throws NotFoundException, NoSuchElementException {
        Optional<UserLogin> user = userRepo.findById(id);
        if(user.get() == null) {
            throw new NotFoundException();
        }
        
        Optional<Physical> res = physicalRepo.findById(id);
        
        try {
            return new ResponseEntity<Physical>(res.get(), HttpStatus.OK);
        } catch (NoSuchElementException ex) {
            System.out.println(ex.getMessage());
            return new ResponseEntity<>(null,HttpStatus.OK);
        }
    }

    @Override
    public ResponseEntity<Physical> getUserPhysical(Long id) throws NotFoundException {
        Physical discretePhysical = new Physical();
        UserLogin user = userRepo.findById(id).get();
        discretePhysical.setId(user.getId());
        discretePhysical.setCalories(user.getCalories());
        discretePhysical.setProtein(user.getProtein());
        discretePhysical.setCarbs(user.getCarbs());
        discretePhysical.setFat(user.getFat());
        return new ResponseEntity<>(discretePhysical, HttpStatus.OK);
    } 

    @Override
    public ResponseEntity<Physical> update(Long id, Long mealId) {
        
        try {
            System.out.println("Before Meal repo");
            Meal meal = mealRepo.findById(mealId).orElseThrow(() -> new NotFoundException());
            System.out.println("After Meal Repo");
            Physical physical = physicalRepo.findById(id).orElseThrow(() -> new NotFoundException());
            int calories = physical.getCalories() - meal.getCalories();
            int protein = physical.getProtein() - meal.getProtein();
            int carbs = physical.getCarbs() - meal.getCarbs();
            int fat = physical.getFat() - meal.getFat();

            System.out.println(meal.getCalories());

            physical.setCalories(calories);
            physical.setProtein(protein);
            physical.setCarbs(carbs);
            physical.setFat(fat);

            System.out.println(physical.getCalories()+"\n"+physical.getProtein());

            physicalRepo.save(physical);
            return new ResponseEntity<>(physical, HttpStatus.OK);

        } catch(Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

    @Override
    @Transactional
    public void resetPhysical() {
        userRepo.findAll().stream().map(user -> {
            Physical body = new Physical();
            body.setId(user.getId());
            body.setCalories(user.getCalories());
            body.setProtein(user.getProtein());
            body.setCarbs(user.getCarbs());
            body.setFat(user.getFat());
            
            System.out.println("Id "+user.getId());
            System.out.println("Calories " + user.getCalories());
            System.out.println(user.getProtein());
            System.out.println(user.getCarbs());
            System.out.println(user.getFat());
            return physicalRepo.save(body);
        }).collect(Collectors.toList());
    } 
    
}
