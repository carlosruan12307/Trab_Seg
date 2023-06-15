package com.auth.auth.repositorys;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.auth.auth.models.ProductModel;
import com.auth.auth.models.UserModel;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;

@Repository
public class UserRepositoryInjectionTest {

    @PersistenceContext
    private EntityManager entityManager;

    public UserModel findByemail(String email) {
        String query = "SELECT * FROM user  WHERE user.email = " + email;
        Query typedQuery = entityManager.createNativeQuery(query, UserModel.class);
        UserModel userModel = (UserModel) typedQuery.getResultList().get(0);

        return userModel;
    }

}
