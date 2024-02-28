package com.example.UserServiceService.Model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "virtual_consultations")
public class VirtualConsultation {

    @Id
    private ObjectId consultationID;
    @DBRef
    private Doctor doctor;
    @DBRef
    private Patient user;
    private String meetingLink;
    private String meetingDate;
    private String meetingStatus;

    // Additional fields and methods as needed
}
