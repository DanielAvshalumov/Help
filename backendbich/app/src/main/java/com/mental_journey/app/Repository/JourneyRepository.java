package com.mental_journey.app.Repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mental_journey.app.Model.Activity;
import com.mental_journey.app.Model.Journey;

@Repository
public interface JourneyRepository extends JpaRepository<Journey,Long> {
    // @Query("SELECT * FROM journey WHERE activity_id=:id")
    // Set<Journey> findAllByActivityId(@Param(value = "id") Long id);
    Set<Journey> findAllByActivity(Activity activity);
}
