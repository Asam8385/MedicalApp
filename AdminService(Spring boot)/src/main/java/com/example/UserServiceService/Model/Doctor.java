package com.example.UserServiceService.Model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "doctors")
public class Doctor {

    @Id
    private ObjectId doctorID;
    private String name;
    private String specialization;
    private int contactNumber;

}
