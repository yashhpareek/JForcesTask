package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.User;
import com.example.demo.services.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService authService;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        if (user == null) {
            throw new IllegalArgumentException("User must not be null");

        }
        return authService.register(user);
    }

    // @PostMapping("/login")
    // public User login(@RequestBody(required = false) String username, @RequestBody(required = false) String password) {
    //     System.out.println(username);
    //     return authService.login(username, password);
    // }

	@PostMapping("/login")
    public User logins(@RequestBody User user) {
        System.out.println(user.getUsername());
        return authService.login(user.getUsername(), user.getPassword());
    }
}
