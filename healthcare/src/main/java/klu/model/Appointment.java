// klu/model/Appointment.java
package klu.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(
    name = "appoint",
    uniqueConstraints = {
            @UniqueConstraint(columnNames = {"appointment_date", "slot_time", "doctor_name"})
    }
)
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "patient_name", nullable = false)
    private String patientName;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(name = "doctor_name", nullable = false)
    private String doctorName;

    @Column(name = "disease", nullable = false)
    private String disease;

    @Column(name = "appointment_date", nullable = false)
    private LocalDate appointmentDate;

    @Column(name = "slot_time", nullable = false)
    private LocalTime slotTime;

    // Default constructor (required by JPA)
    public Appointment() {
    }

    // Constructor with fields
    public Appointment(String patientName, String phoneNumber, String doctorName, String disease, LocalDate appointmentDate, LocalTime slotTime) {
        this.patientName = patientName;
        this.phoneNumber = phoneNumber;
        this.doctorName = doctorName;
        this.disease = disease;
        this.appointmentDate = appointmentDate;
        this.slotTime = slotTime;
    }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getPatientName() {
    return patientName;
  }

  public void setPatientName(String patientName) {
    this.patientName = patientName;
  }

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  public String getDoctorName() {
    return doctorName;
  }

  public void setDoctorName(String doctorName) {
    this.doctorName = doctorName;
  }

  public String getDisease() {
    return disease;
  }

  public void setDisease(String disease) {
    this.disease = disease;
  }

  public LocalDate getAppointmentDate() {
    return appointmentDate;
  }

  public void setAppointmentDate(LocalDate appointmentDate) {
    this.appointmentDate = appointmentDate;
  }

  public LocalTime getSlotTime() {
    return slotTime;
  }

  public void setSlotTime(LocalTime slotTime) {
    this.slotTime = slotTime;
  }

    // Getters and setters (rest of your code remains the same)
}