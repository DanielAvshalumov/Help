package com.mental_journey.app.Model;

import java.sql.Date;

import javax.persistence.*;

import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "emotion")
public class Emotion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @CreatedDate
    private Date createdOn;

    private Integer rate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private UserLogin user;

    public Emotion() {

    }

    public Emotion(Integer rate) {
        this.rate = rate;
        this.createdOn = new Date(System.currentTimeMillis());
    }

    public Integer getRate() {
        return rate;
    }

    public void setRate(Integer rate) {
        this.rate = rate;
    }

    public void setUser(UserLogin user) {
        this.user = user;
    }
}

