package com.example.apirestintegridadReferencialMysql.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.apirestintegridadReferencialMysql.model.Room;
import com.example.apirestintegridadReferencialMysql.repository.RoomRepository;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Optional<Room> getRoomById(Long id) {
        return roomRepository.findById(id);
    }

    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }

    public Optional<Room> updateRoom(Long id, Room roomDetails) {
        return roomRepository.findById(id).map(room -> {
            room.setName(roomDetails.getName());
            room.setBedCount(roomDetails.getBedCount());
            room.setSize(roomDetails.getSize());
            room.setFloorNumber(roomDetails.getFloorNumber());
            room.setType(roomDetails.getType());
            return roomRepository.save(room);
        });
    }

    public boolean deleteRoom(Long id) {
        return roomRepository.findById(id).map(room -> {
            roomRepository.delete(room);
            return true;
        }).orElse(false);
    }
}
