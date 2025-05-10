// klu/controller/AppointmentController.java
package klu.controller;

import klu.model.Appointment;
import klu.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/appoint")
@CrossOrigin(origins = "http://localhost:5173/")
public class AppointmentController {

    private final AppointmentService appointmentService;

    @Autowired
    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping("/book")
    public ResponseEntity<String> bookAppointment(@RequestBody Map<String, String> appointmentData) {
        try {
            Appointment bookedAppointment = appointmentService.bookAppointment(
                    appointmentData.get("patientName"),
                    appointmentData.get("phoneNumber"),
                    appointmentData.get("doctorName"),
                    appointmentData.get("disease"),
                    appointmentData.get("appointmentDate"),
                    appointmentData.get("slotTime")
            );
            return ResponseEntity.ok("Appointment booked successfully for " + bookedAppointment.getPatientName() + " on " + bookedAppointment.getAppointmentDate() + " at " + bookedAppointment.getSlotTime());
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to book appointment: " + e.getMessage());
        }
    }

    @GetMapping("/doctor/appointments/{doctorName}")
    public ResponseEntity<List<Appointment>> getDoctorAppointments(@PathVariable String doctorName) {
        List<Appointment> appointments = appointmentService.getAppointmentsByDoctorName(doctorName);
        return ResponseEntity.ok(appointments);
    }
}