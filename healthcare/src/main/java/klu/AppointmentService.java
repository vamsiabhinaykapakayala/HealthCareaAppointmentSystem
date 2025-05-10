package klu;

import klu.model.Appointment;
import klu.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    @Autowired
    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public Appointment bookAppointment(String patientName, String phoneNumber, String doctorName, String disease, String appointmentDate, String slotTime) {
        LocalDate date = LocalDate.parse(appointmentDate);
        LocalTime time = LocalTime.parse(slotTime, DateTimeFormatter.ofPattern("H:mm"));

        Optional<Appointment> existingAppointment = appointmentRepository.findByAppointmentDateAndSlotTimeAndDoctorName(date, time, doctorName);

        if (existingAppointment.isPresent()) {
            throw new IllegalStateException("The selected date and time slot are already booked for Dr. " + doctorName + ".");
        }

        Appointment appointment = new Appointment(patientName, phoneNumber, doctorName, disease, date, time);
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAppointmentsByDoctorName(String doctorName) {
        return appointmentRepository.findByDoctorName(doctorName);
    }
}