package com.example.UserServiceService.Model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "payments")
public class Payment {

    @Id
    private ObjectId paymentID;
    private Float amount;
    private String paymentTime;
    @DBRef
    private Patient patient;
    @DBRef
    private Appointment appointment;
}
