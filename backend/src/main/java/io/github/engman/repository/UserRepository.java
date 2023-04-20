package io.github.engman.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.engman.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

}
