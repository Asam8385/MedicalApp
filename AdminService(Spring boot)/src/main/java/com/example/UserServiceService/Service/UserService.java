package com.example.UserServiceService.Service;

import com.example.UserServiceService.Model.User;
import com.example.UserServiceService.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserSerImpl {

    @Autowired
    UserRepo User;


    @Override
    public void AddUser(User user)
    {
        this.User.save(user);
    }

}
