package com.example.UserServiceService.Model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "diseases")
public class Disease {

    @Id
    private ObjectId diseaseID;
    private String name;

    // Additional fields and methods as needed

    // Relationships

}
