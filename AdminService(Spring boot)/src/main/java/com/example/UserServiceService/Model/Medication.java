package com.example.UserServiceService.Model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "medications")
public class Medication {

    @Id
    private ObjectId medicationID;
    private String name;
    private String dosage;
    private String takenTime;
    private Float frequency;

    // Additional fields and methods as needed

    // Relationships
    @DBRef
    private Patient patient;
}
