package com.auth.auth.run;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.auth.auth.enums.RoleEnum;
import com.auth.auth.models.ProductModel;
import com.auth.auth.models.RoleModel;
import com.auth.auth.models.UserModel;
import com.auth.auth.repositorys.ProductRepository;
import com.auth.auth.repositorys.RoleRepository;
import com.auth.auth.repositorys.UserRepository;

@Component
public class RunApplication implements ApplicationRunner {

    @Autowired
    UserRepository ur;

    @Autowired
    RoleRepository rr;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    ProductRepository pr;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (rr.findByname(RoleEnum.ROLE_ADMIN).isEmpty() && rr.findByname(RoleEnum.ROLE_USER).isEmpty()) {
            RoleModel role = new RoleModel(RoleEnum.ROLE_ADMIN);
            rr.save(role);
            RoleModel role1 = new RoleModel(RoleEnum.ROLE_USER);
            rr.save(role1);

            UserModel user = new UserModel("carlosruanaraujo789@gmail.com", passwordEncoder.encode("123"),
                    Collections.singletonList(role));
            ur.save(user);

            UserModel user1 = new UserModel("matheus", passwordEncoder.encode("123"),
                    Collections.singletonList(role1));
            ur.save(user1);
        }

        ProductModel productModel = new ProductModel("produto1", "descricao1");

        ProductModel productModel2 = new ProductModel("produto2", "descricao2");

        ProductModel productModel3 = new ProductModel("produto3", "descricao3");

        pr.save(productModel);
        pr.save(productModel2);
        pr.save(productModel3);
    }

}
