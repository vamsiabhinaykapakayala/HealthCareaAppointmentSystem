import React, { Component } from 'react';
import './JobPosting.css'; // Assuming your CSS is named this
import { BASEURL, callApi, getSession, setSession } from './api';

class BookingPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDisease: '',
            doctor: '',
            diseaseDoctorMap: {
                'Cancer': 'Dr. N. Srikanth',
                'Cardiology': 'Dr. K. Murali',
                'Neurology': 'Dr. S. Reddy',
                'Dermatology': 'Dr. P. Lakshmi',
                'Orthopedics': 'Dr. V. Sharma',
                'Pediatrics': 'Dr. L. Gupta',
            },
            selectedDate: '',
            selectedTime: '', // Changed from selectedSlot to selectedTime
            timeOptions: ['9:30', '10:00', '10:30', '11:00', '11:30', '2:30', '3:00', '3:30'], // Time options as an array
        };
    }

    handleDiseaseChange = (event) => {
        const disease = event.target.value;
        this.setState({
            selectedDisease: disease,
            doctor: this.state.diseaseDoctorMap[disease] || '',
            selectedDate: '', // Reset date and time when disease changes
            selectedTime: '',
        });
    };

    handleDateChange = (event) => {
        this.setState({ selectedDate: event.target.value });
    };

    handleTimeChange = (event) => {
        this.setState({ selectedTime: event.target.value });
    };

    handleConfirm = () => {
        if (this.state.selectedDisease && this.state.selectedDate && this.state.selectedTime) {
            this.props.onConfirm(this.state.selectedDisease, this.state.doctor, this.state.selectedDate, this.state.selectedTime);
        } else if (!this.state.selectedDisease) {
            alert('Please select a disease.');
        } else if (!this.state.selectedDate) {
            alert('Please select a date.');
        } else if (!this.state.selectedTime) {
            alert('Please select a time.');
        }
    };

    render() {
        return (
            <div className="popup-overlay">
                <div className="popup-content">
                    <h3>Select Appointment Details</h3>
                    <label>Disease:</label>
                    <select value={this.state.selectedDisease} onChange={this.handleDiseaseChange}>
                        <option value="">Select Disease</option>
                        {Object.keys(this.state.diseaseDoctorMap).map((disease) => (
                            <option key={disease} value={disease}>
                                {disease}
                            </option>
                        ))}
                    </select>

                    {this.state.selectedDisease && (
                        <>
                            <label>Doctor: <input type="text" value={this.state.doctor} readOnly /></label>

                            <div className='date-picker-section'>
                                <label>Select Date:</label>
                                <input
                                    type='date'
                                    value={this.state.selectedDate}
                                    onChange={this.handleDateChange}
                                />
                            </div>

                            <div className='time-selector-section'>
                                <label>Select Time:</label>
                                <select value={this.state.selectedTime} onChange={this.handleTimeChange}>
                                    <option value="">Select Time</option>
                                    {this.state.timeOptions.map((time) => (
                                        <option key={time} value={time}>
                                            {time}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}

                    <div className="popup-buttons">
                        <button onClick={this.handleConfirm} disabled={!this.state.selectedDisease || !this.state.selectedDate || !this.state.selectedTime}>
                            Confirm
                        </button>
                        <button onClick={this.props.onCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default class Cancer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            showPopup: false,
            selectedDiseaseFromPopup: '',
            doctorFromPopup: '',
            selectedDateFromPopup: '',
            selectedTimeFromPopup: '', // Changed from selectedSlotFromPopup
            showModal: false,
            patientName: '',
            phoneNumber: '',
        };
    }

    componentDidMount() {
        const csr = getSession("csrid");
        if (!csr) {
            this.logout();
            return;
        }
        const data = JSON.stringify({ csrid: csr });
        callApi("POST", BASEURL + "users/getfullname", data, this.showFullname);
    }

    showFullname = (response) => {
        this.setState({ fullname: response });
    };

    logout = () => {
        setSession("csrid", "", -1);
        window.location.replace("/page1");
    };

    handleBookAppointmentClick = () => {
        this.setState({ showPopup: true });
    };

    handlePopupConfirm = (disease, doctor, date, time) => {
        this.setState({
            showPopup: false,
            selectedDiseaseFromPopup: disease,
            doctorFromPopup: doctor,
            selectedDateFromPopup: date,
            selectedTimeFromPopup: time, // Get time from popup
            showModal: true,
        });
    };

    handlePopupCancel = () => {
        this.setState({ showPopup: false });
    };

    handleConfirmBooking = () => {
        const { patientName, phoneNumber, selectedTimeFromPopup, selectedDateFromPopup, selectedDiseaseFromPopup, doctorFromPopup } = this.state;

        if (!patientName || !phoneNumber) {
            alert("Please enter both name and phone number.");
            return;
        }

        if (!/^\d{10}$/.test(phoneNumber)) {
            alert("Phone number must be exactly 10 digits.");
            return;
        }

        const appointmentData = {
            patientName,
            phoneNumber,
            doctorName: doctorFromPopup,
            disease: selectedDiseaseFromPopup,
            appointmentDate: selectedDateFromPopup,
            slotTime: selectedTimeFromPopup // Use selectedTimeFromPopup
        };

        callApi("POST", BASEURL + "appoint/book", JSON.stringify(appointmentData), (response) => {
            alert(`✅ Appointment confirmed for ${patientName}!\nPhone: ${phoneNumber}\nDate: ${selectedDateFromPopup}\nSlot: ${selectedTimeFromPopup}\nDisease: ${selectedDiseaseFromPopup}\nDoctor: ${doctorFromPopup}`);

            this.setState({
                showModal: false,
                patientName: '',
                phoneNumber: '',
                selectedDiseaseFromPopup: '',
                doctorFromPopup: '',
                selectedDateFromPopup: '',
                selectedTimeFromPopup: '',
            });
        });
    };

    render() {
        const { fullname, showModal, patientName, phoneNumber, showPopup, selectedDiseaseFromPopup, doctorFromPopup, selectedDateFromPopup, selectedTimeFromPopup } = this.state;

        return (
            <div className='page-container'>
                {/* Body */}
                <div className='body-container'>
                    <div className='left-panel'>
                        <h2 className='section-title'>Book an Appointment</h2>

                        <div className='booking-info'>
                            {selectedDiseaseFromPopup && <div className='selected-info'>Disease: {selectedDiseaseFromPopup}</div>}
                            {doctorFromPopup && <div className='selected-info'>Doctor: {doctorFromPopup}</div>}
                            {selectedDateFromPopup && <div className='selected-info'>Date: {selectedDateFromPopup}</div>}
                            {selectedTimeFromPopup && <div className='selected-info'>Time: {selectedTimeFromPopup}</div>}
                        </div>

                        <div className='book-appointment-button'>
                            <button className='submit-btn' onClick={this.handleBookAppointmentClick}>
                                Book Appointment
                            </button>
                        </div>
                    </div>

                    <div className='right-panel'>{/* Optional content */}</div>
                </div>

                {/* Single Booking Popup */}
                {showPopup && (
                    <BookingPopup onConfirm={this.handlePopupConfirm} onCancel={this.handlePopupCancel} />
                )}

                {/* Confirmation Modal */}
                {showModal && (
                    <div className='modal-overlay'>
                        <div className='modal-content'>
                            <h3>Confirm Appointment Details</h3>

                            <label>Patient Name:</label>
                            <input
                                type='text'
                                value={patientName}
                                onChange={(e) => this.setState({ patientName: e.target.value })}
                            />

                            <label>Phone Number:</label>
                            <input
                                type='text'
                                maxLength='10'
                                value={phoneNumber}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d{0,10}$/.test(value)) {
                                        this.setState({ phoneNumber: value });
                                    }
                                }}
                            />

                            <label>Disease:</label>
                            <input type='text' value={selectedDiseaseFromPopup} readOnly />

                            <label>Doctor:</label>
                            <input type='text' value={doctorFromPopup} readOnly />

                            <label>Date:</label>
                            <input type='text' value={selectedDateFromPopup} readOnly />

                            <label>Time:</label>
                            <input type='text' value={selectedTimeFromPopup} readOnly />
                            <div className='modal-buttons'>
                                <button onClick={this.handleConfirmBooking}>Confirm Booking</button>
                                <button onClick={() => this.setState({ showModal: false })}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}