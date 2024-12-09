package com.example.apirestintegridadReferencialMysql.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.apirestintegridadReferencialMysql.model.Guest;

@Repository
public interface GuestRepository extends JpaRepository<Guest, Long> {
}
