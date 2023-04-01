package com.mental_journey.app.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.mental_journey.app.Model.Physical;
import com.mental_journey.app.Model.UserLogin;
import com.mental_journey.app.Repository.PhysicalRepository;
import com.mental_journey.app.Repository.UserLoginRepository;

@Service
public class PhysicalServiceImpl implements PhysicalService{

    @Autowired
    UserLoginRepository userRepo;

    @Autowired
    PhysicalRepository physicalRepo;

    @Override
    public ResponseEntity<Physical> create(Long id, Physical req) throws NotFoundException {
        Optional<UserLogin> user = userRepo.findById(id);
        if(user.get() == null) {
            throw new NotFoundException();
        }
        req.setId(id);
        Physical physical = physicalRepo.save(req);
        return new ResponseEntity<>(physical,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Physical> get(Long id) throws NotFoundException, NoSuchElementException {
        Optional<UserLogin> user = userRepo.findById(id);
        if(user.get() == null) {
            throw new NotFoundException();
        }
        Optional<Physical> res = physicalRepo.findById(id);
        try {
            return new ResponseEntity<Physical>(res.get(), HttpStatus.OK);
        } catch (NoSuchElementException ex) {
            System.out.println(ex.getMessage());
            return new ResponseEntity<>(null,HttpStatus.OK);
        }
    }
}
