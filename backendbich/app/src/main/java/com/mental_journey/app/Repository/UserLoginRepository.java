package com.mental_journey.app.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mental_journey.app.Model.Emotion;
import com.mental_journey.app.Model.UserLogin;

@Repository
public interface UserLoginRepository extends JpaRepository<UserLogin, Long> {
    Optional<UserLogin> findByUsername(String username);

    Optional<UserLogin> findById(Long id);

    Emotion findEmotionById(Long id);

    Boolean existsByUsername(String username);
}
