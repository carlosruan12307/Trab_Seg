package com.auth.auth.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auth.auth.responses.UserResponse;

@RestController
public class UserController {

    @Autowired
    private UserResponse uResponse;
    
    @GetMapping("/")
    public String inicio(){
        return "ola mundo";
    }

    @GetMapping("/login")
    public ResponseEntity<UserResponse> login(){
        uResponse.setMensagem("login com sucesso");
        return new ResponseEntity<UserResponse>(uResponse, HttpStatus.OK);
    }
}
