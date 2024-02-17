package com.example.UserServiceService.Model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "symptoms")
public class Symptom {

    @Id
    private ObjectId symptomID;
    private String name;

    // Additional fields and methods as needed

    // Relationships
    @DBRef
    private Patient patient;
}
