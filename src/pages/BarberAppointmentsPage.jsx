import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import  {jwtDecode}  from 'jwt-decode';
import api from '../services/api';
import { updateStatus } from "../services/appointmentService";

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
                const response = await api.get(`/Appointment/barber/${barberId}/appointments`);
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

    const handleStatusChange=async(appointmentId,newStatus)=>{
        try {
            await updateStatus(appointmentId,newStatus);
            setAppointments(prev=>
                prev.map(a=>
                    a.appointmentId==appointmentId? {...a, status:newStatus}:a),
            alert("Durum güncellendi")
            );
        }
        catch(error){
            console.error("Durum Güncelleme hatası : ",error);
            alert("Durum güncellenmedi");
        }
    };

    return (
        <div>
            <h1>Berber Randevuları</h1>
            <button onClick={handleLogout}>Çıkış Yap</button>

            <ul>
                {appointments.map((appointment) => (
                    <li key={appointment.appointmentId}>
                        Randevu Alan Kişiler : {appointment.userName} | Tarih: {appointment.appointmentDate.split('T')[0]} | Saat: {appointment.startTime} 
                        Durum : 
                        <select
                            value={appointment.status}
                            onChange={(e)=>handleStatusChange(appointment.appointmentId, e.target.value)}>
                                <option value="beklemede">Randevu Beklemede</option>
                                <option value="onaylandı">Randevu Onaylandı</option>
                                <option value="iptal edildi">Randevu İptal Edildi</option>
                            </select>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BarberAppointmentsPage;
