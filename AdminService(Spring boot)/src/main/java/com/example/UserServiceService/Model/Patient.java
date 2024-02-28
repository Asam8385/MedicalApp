package com.example.UserServiceService.Model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "patients")
public class Patient {

    @Id
    private ObjectId patientID;
    private String name;

    // Additional fields and methods as needed

    // Relationships
    @DBRef
    private List<Medication> medications;
    @DBRef
    private List<Symptom> symptoms;
    @DBRef
    private List<MedicalReport> medicalReports;
    @DBRef
    private List<Appointment> appointments;
    @DBRef
    private List<Payment> payments;
    @DBRef
    private List<VirtualConsultation> virtualConsultations;
}

// Repeat the process for the remaining models...


