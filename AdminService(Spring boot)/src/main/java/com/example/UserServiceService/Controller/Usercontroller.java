package com.example.UserServiceService.Controller;


import com.example.UserServiceService.Model.MedicalReport;
import com.example.UserServiceService.Model.User;
import com.example.UserServiceService.Repository.MedicalReportRepo;
import com.example.UserServiceService.Repository.UserRepo;
import com.example.UserServiceService.Service.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;



import java.util.Base64;
import java.util.Map;

@RestController
@RequestMapping("/")
//@CrossOrigin(origins = "*")
public class Usercontroller {

    @Autowired
    UserService userService;

    @Autowired
    UserRepo user;

    @Autowired
    MedicalReportRepo med;


    @PostMapping("/")
    public ResponseEntity<String> InsertUser(@RequestBody User user)
    {
        userService.AddUser(user);
        return ResponseEntity.ok("User saved successfully");
    }




    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> requestData) throws JsonProcessingException {
        String email = requestData.get("email");
        String password = requestData.get("password");

        // Validate if both email and username are present
        if (email == null || password == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }


        User validateuser = user.findByEmailAndPassword(email, password);
        System.out.println(validateuser);

        if (validateuser != null) {

            ObjectMapper objectMapper = new ObjectMapper();
            String userJson = objectMapper.writeValueAsString(validateuser);
                // Return the JSON response
                return ResponseEntity.ok(userJson);
        } else {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }


}




