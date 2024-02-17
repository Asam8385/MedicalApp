package com.example.UserServiceService.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "clinics")
public class Clinic {

    @Id
    private String clinicID;
    private String content;
    private String reminderTime;

    // Additional fields and methods as needed

    // Relationships
    @DBRef
    private List<Doctor> doctors;
    @DBRef
    private List<Patient> patients;
}
