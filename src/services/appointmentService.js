import axios from "axios";
import api from "./api";

const API_URL = 'https://localhost:7296/api/Appointment';

export const getAppointments = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getAppointmentsByUser = async (userId) => {
    console.log('API çağrısı yapılıyor ->', `/Appointment/user/${userId}`);
    const response = await api.get(`/Appointment/user/${userId}`);
    return response.data;
};


export const createAppointment = async (appointmentData) => {
  const response = await axios.post(API_URL, {
    userId: parseInt(appointmentData.userId),
    barberId: parseInt(appointmentData.barberId),
    appointmentDate: appointmentData.appointmentDate, // "2025-07-16"
    startTime: appointmentData.startTime.length === 5 ? appointmentData.startTime + ':00' : appointmentData.startTime // "13:00" -> "13:00:00"
  });
  return response.data;
};

