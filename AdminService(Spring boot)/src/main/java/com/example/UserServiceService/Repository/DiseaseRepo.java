package com.example.UserServiceService.Repository;

import com.example.UserServiceService.Model.Disease;
import com.example.UserServiceService.Model.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DiseaseRepo extends MongoRepository<Disease, ObjectId> {
}
