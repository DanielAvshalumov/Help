package com.mental_journey.app.Model;

import java.util.Date;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "emotion")
public class Emotion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @Temporal(TemporalType.DATE)
    private Date createdOn;

    @Column
    private Integer rate;

    @Column
    private String message;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private UserLogin user;

    public Emotion() {

    }

    public Emotion(Integer rate, String message) {
        this.rate = rate;
        this.createdOn = new Date();
        this.message = message;
    }

    public Long getId() {
        return id;
    }

    public Integer getRate() {
        return rate;
    }

    public void setRate(Integer rate) {
        this.rate = rate;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getDate() {
        return createdOn;
    } 

    public void setDate(Date date) {
        this.createdOn = date;
    }

    public void setUser(UserLogin user) {
        this.user = user;
    }
}

