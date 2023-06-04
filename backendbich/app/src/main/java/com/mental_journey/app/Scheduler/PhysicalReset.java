package com.mental_journey.app.Scheduler;


import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.mental_journey.app.Service.PhysicalService;

@Component
public class PhysicalReset {

    PhysicalService physicalService;

    public PhysicalReset(PhysicalService physicalService) {
        this.physicalService = physicalService;
    }
    
    @Scheduled(cron = "0 0 19 * * ?")
    public void cronJobSch() {

        System.out.println("Right on schedule c:");

        physicalService.resetPhysical();

    }


}
