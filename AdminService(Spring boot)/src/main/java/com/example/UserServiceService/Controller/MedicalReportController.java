package com.example.UserServiceService.Controller;


import com.example.UserServiceService.Model.MedicalReport;
import com.example.UserServiceService.Repository.MedicalReportRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mr")
public class MedicalReportController {

    @Autowired
    private MedicalReportRepo medicalReportRepository;

    @GetMapping("/all")
    public List<MedicalReport> getAllMedicalReports() {
        return medicalReportRepository.findAll();
    }


    @PostMapping("/medrepadd")
    public ResponseEntity<String> addMed(@RequestBody MedicalReport requestData) {
        try {

            medicalReportRepository.save(requestData);

            return new ResponseEntity<>("Report successfully added", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to add Report.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
