package com.example.UserServiceService.Model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "appointments")
public class Appointment {

    @Id
    ObjectId appointmentID;
    private String appointmentTime;
    @DBRef
    private Doctor doctor;
    @DBRef
    private Patient patient;
    private boolean isConfirmed;

    // Additional fields and methods as needed

    // Relationships
    @DBRef
    private Payment payment;

}
