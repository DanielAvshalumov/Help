package com.mental_journey.app.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mental_journey.app.Model.Physical;
import com.mental_journey.app.Model.UserLogin;

@Repository
public interface PhysicalRepository extends JpaRepository<Physical, Long> {

    Physical findPhysicalByUser(Optional<UserLogin> user);
    
}
