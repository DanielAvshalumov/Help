package com.mental_journey.app.Model.DTO;

import java.util.Date;

import com.mental_journey.app.Model.Activity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JourneyDTO {
    private Long id;
    private Integer reach;
    private Date date;
    private Activity activity;
}
