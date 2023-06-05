package com.auth.auth.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    
    @GetMapping("/")
    public String inicio(){
        return "api de autenticacao";
    }
    @GetMapping("/login")
    public void login(){

    }
}
