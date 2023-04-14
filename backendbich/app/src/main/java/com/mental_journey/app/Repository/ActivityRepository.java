package com.mental_journey.app.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mental_journey.app.Model.Activity;
import com.mental_journey.app.Model.UserLogin;

@Repository
public interface ActivityRepository extends JpaRepository<Activity,Long> {

    List<Activity> findAllByUser(UserLogin user);
    
}
