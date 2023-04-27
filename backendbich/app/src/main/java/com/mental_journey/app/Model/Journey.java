package com.mental_journey.app.Model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Journey {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private int reach;

    @Temporal(TemporalType.DATE)
    private Date date;

    @ManyToOne
    @JoinColumn(name = "acitivity_id", nullable = false)
    private Activity activity;

    public Journey() {

    }

    public Journey(Long id, int reach, Date date, Activity activity) {
        this.id = id;
        this.reach = reach;
        this.date = new Date();
        this.activity = activity;
    }
}
