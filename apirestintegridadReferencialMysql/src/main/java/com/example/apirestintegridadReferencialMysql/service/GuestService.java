package com.example.apirestintegridadReferencialMysql.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.apirestintegridadReferencialMysql.model.Guest;
import com.example.apirestintegridadReferencialMysql.repository.GuestRepository;

@Service
public class GuestService {

    @Autowired
    private GuestRepository guestRepository;

    public List<Guest> getAllGuests() {
        return guestRepository.findAll();
    }

    public Optional<Guest> getGuestById(Long id) {
        return guestRepository.findById(id);
    }

    public Guest createGuest(Guest guest) {
        return guestRepository.save(guest);
    }

    public Optional<Guest> updateGuest(Long id, Guest guestDetails) {
        return guestRepository.findById(id).map(guest -> {
            guest.setFirstName(guestDetails.getFirstName());
            guest.setLastName(guestDetails.getLastName());
            guest.setEmail(guestDetails.getEmail());
            guest.setBirthDate(guestDetails.getBirthDate());
            guest.setPhone(guestDetails.getPhone());
            return guestRepository.save(guest);
        });
    }

    public boolean deleteGuest(Long id) {
        return guestRepository.findById(id).map(guest -> {
            System.err.println("Borrando " + id);
            guestRepository.delete(guest);
            return true;
        }).orElse(false);
    }
}
