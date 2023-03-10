package com.mental_journey.app.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mental_journey.app.Model.Meal;

@Repository
public interface MealRepository extends JpaRepository<Meal,Long> {
    
}
