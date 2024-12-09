package com.example.apirestintegridadReferencialMysql.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.apirestintegridadReferencialMysql.model.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
}
