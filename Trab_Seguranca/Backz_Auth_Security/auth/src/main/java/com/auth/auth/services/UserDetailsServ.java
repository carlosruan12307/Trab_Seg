package com.auth.auth.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.auth.auth.models.UserModel;
import com.auth.auth.repositorys.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserDetailsServ implements UserDetailsService {

    @Autowired
    private UserRepository ur;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserModel userModel = ur.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException(username + " not found"));
       
        return userModel;
    }
    
}
