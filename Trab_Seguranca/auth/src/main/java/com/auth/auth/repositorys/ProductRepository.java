package com.auth.auth.repositorys;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.auth.auth.models.ProductModel;
import com.auth.auth.models.UserModel;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

@Repository
public interface ProductRepository extends JpaRepository<ProductModel, Long> {
    List<ProductModel> findByNome(String nome);
}
