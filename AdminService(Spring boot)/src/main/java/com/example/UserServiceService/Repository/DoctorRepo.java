package com.example.UserServiceService.Repository;

import com.example.UserServiceService.Model.Doctor;
import com.example.UserServiceService.Model.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DoctorRepo extends MongoRepository<Doctor, ObjectId> {
}
