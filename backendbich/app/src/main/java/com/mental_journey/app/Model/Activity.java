package com.mental_journey.app.Model;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
public class Activity {
    
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    //Bug: Removing the JSONIgnore below will throw an JsonMappingException / InvalidDefinitonException

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private UserLogin user;

    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    @Column( name = "activity_name" )
    private String name;

    @Column( name = "activity_type" )
    private String type;

    private Integer goal;

    // @OneToMany(fetch = FetchType.EAGER, mappedBy = "activity")
    // private Set<Journey> entries;

    public Activity() {
        
    }

    public Activity(String name, String type, Integer goal) {
        this.name = name;
        this.type = type;
        this.goal = goal;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) { 
        this.type = type;
    }

    public Integer getGoal() {
        return goal;
    }

    public void setGoal(Integer goal) {
        this.goal = goal;
    }

    public UserLogin getUser() {
        return user;
    }

    public void setUser(UserLogin user) {
        this.user = user;
    }

    // public Set<Journey> getEntries() {
    //     return entries;
    // }

    // public void setEntries(Set<Journey> entries) {
    //     this.entries = entries;
    // }
}
