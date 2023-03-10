package com.mental_journey.app.Model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="physical")
@Data
public class Physical {
    @Id
    private Long id;

    private Integer calories;

    private Integer protein;

    private Integer carbs;

    private Integer fat;

    @OneToOne(cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private UserLogin user;
}
