package com.example.apirestintegridadReferencialMysql.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.apirestintegridadReferencialMysql.model.Guest;
import com.example.apirestintegridadReferencialMysql.model.Reservation;
import com.example.apirestintegridadReferencialMysql.model.Room;
import com.example.apirestintegridadReferencialMysql.repository.GuestRepository;
import com.example.apirestintegridadReferencialMysql.repository.ReservationRepository;
import com.example.apirestintegridadReferencialMysql.repository.RoomRepository;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private GuestRepository guestRepository;
    @Autowired
    private RoomRepository roomRepository;

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Optional<Reservation> getReservationById(Long id) {
        return reservationRepository.findById(id);
    }

    public Reservation createReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    public Optional<Reservation> updateReservation(Long id, Reservation reservationDetails) {
        return reservationRepository.findById(id).map(reservation -> {
            reservation.setCheckInDate(reservationDetails.getCheckInDate());
            reservation.setCheckOutDate(reservationDetails.getCheckOutDate());
            reservation.setCost(reservationDetails.getCost());
            reservation.setPaymentMethod(reservationDetails.getPaymentMethod());

            Guest guest = guestRepository.findById(reservationDetails.getGuest().getId()).get();
            Room room = roomRepository.findById(reservationDetails.getRoom().getId()).get();

            reservation.setGuest(guest);
            reservation.setRoom(room);
            return reservationRepository.save(reservation);
        });
    }

    public boolean deleteReservation(Long id) {
        return reservationRepository.findById(id).map(reservation -> {
            reservationRepository.delete(reservation);
            return true;
        }).orElse(false);
    }
}
