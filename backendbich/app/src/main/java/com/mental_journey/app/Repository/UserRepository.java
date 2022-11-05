package com.mental_journey.app.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mental_journey.app.Entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,Long> {
    
    UserEntity findByName(String name);
        
    boolean existsByName(String name);
}
