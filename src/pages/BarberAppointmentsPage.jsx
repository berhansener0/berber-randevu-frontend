import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

function BarberAppointmentsPage({ setIsBarberAuthenticated }) {
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        const token = localStorage.getItem('barberToken');
        if (token) {
            const decoded = jwtDecode(token);
            const barberId = decoded.userId || decoded.BarberId || decoded.barberId;
            console.log("Token içeriği:",decoded.barberId || decoded.BarberId);
            console.log("decoded token:",decoded.userId);

            try {
                const response = await api.get(`/Appointment/barber/${barberId}`);
                setAppointments(response.data);
            } catch (error) {
                console.error("Randevular alınamadı:", error);
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('barberToken');
        setIsBarberAuthenticated(false);
        navigate('/barber-login');
    };

    return (
        <div>
            <h1>Berber Randevuları</h1>
            <button onClick={handleLogout}>Çıkış Yap</button>

            <ul>
                {appointments.map((appointment) => (
                    <li key={appointment.appointmentId}>
                        Kullanıcı ID: {appointment.userId} | Tarih: {appointment.appointmentDate} | Saat: {appointment.startTime} | Durum: {appointment.status}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BarberAppointmentsPage;
