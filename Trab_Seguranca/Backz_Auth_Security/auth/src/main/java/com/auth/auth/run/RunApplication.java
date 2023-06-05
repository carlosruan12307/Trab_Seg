package com.auth.auth.run;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.auth.auth.models.UserModel;
import com.auth.auth.repositorys.UserRepository;

import jakarta.transaction.Transactional;

@Component
@Transactional
public class RunApplication implements ApplicationRunner {
    @Autowired
    UserRepository ur;
    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    
    public void run(ApplicationArguments args) throws Exception {
        if(ur.findByEmail("carlosruanaraujo789@gmail.com").isEmpty()){
            UserModel user = new UserModel("carlosruanaraujo789@gmail.com",passwordEncoder.encode("123"));
            ur.save(user);
        }
   
    }
    
}
