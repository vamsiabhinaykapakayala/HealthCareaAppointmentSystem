// klu/repository/AppointmentRepository.java
package klu.repository;

import klu.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    Optional<Appointment> findByAppointmentDateAndSlotTimeAndDoctorName(
            LocalDate appointmentDate, LocalTime slotTime, String doctorName
    );

    List<Appointment> findByDoctorName(String doctorName);
}