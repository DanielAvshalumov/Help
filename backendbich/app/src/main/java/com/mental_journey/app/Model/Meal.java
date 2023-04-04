package com.mental_journey.app.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Data;

@Entity
@Data
public class Meal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String mealName;

    @Column
    private int calories;
    
    @Column
    private int protein;

    @Column
    private int carbs;

    private int fat;

    @ManyToOne
    Physical physical;
}
