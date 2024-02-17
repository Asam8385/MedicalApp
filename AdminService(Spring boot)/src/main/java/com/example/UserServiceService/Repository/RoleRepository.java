package com.example.UserServiceService.Repository;


import com.example.UserServiceService.Model.ERole;
import com.example.UserServiceService.Model.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, String> {
  Optional<Role> findByName(ERole name);
}
