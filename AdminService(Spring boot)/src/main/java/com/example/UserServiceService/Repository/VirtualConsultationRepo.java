package com.example.UserServiceService.Repository;

import com.example.UserServiceService.Model.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface VirtualConsultationRepo extends MongoRepository<User, ObjectId> {
}
