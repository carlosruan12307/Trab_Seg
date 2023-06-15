package com.auth.auth.repositorys;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.auth.auth.models.UserModel;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Repository
public interface UserRepository extends JpaRepository<UserModel, UUID> {
     Optional<UserModel> findByemail(String email);

}
