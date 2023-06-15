package com.auth.auth.repositorys;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.auth.auth.models.ProductModel;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

@Repository
public class ProductRepositoryInjectionTest {
    @PersistenceContext
    private EntityManager entityManager;

    public List<ProductModel> findProductsByName(String name) {
        String query = "SELECT p FROM ProductModel p WHERE p.nome = '" + name + "'";
        TypedQuery<ProductModel> typedQuery = entityManager.createQuery(query, ProductModel.class);

        return typedQuery.getResultList();
    }
}
