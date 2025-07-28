import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAppointmentsByUser, createAppointment } from "../services/appointmentService";
import { getBarbers } from "../services/barberService";
import { jwtDecode } from "jwt-decode";

function AppointmentPage({ setIsAuthenticated }) {
    const [appointments, setAppointments] = useState([]);
    const [barbers, setBarbers] = useState([]);
    const [formData, setFormData] = useState({
        barberId: '',
        appointmentDate: '',
        startTime: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        const init = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const decoded = jwtDecode(token);
                const userId = decoded.userId; // sadece küçük harfle kontrol yeterli
                console.log("Decoded userId:", userId);

                if (userId) {
                    const [appointmentsData, barbersData] = await Promise.all([
                        getAppointmentsByUser(userId),
                        getBarbers()
                    ]);
                    setAppointments(appointmentsData);
                    setBarbers(barbersData);
                }
            } catch (err) {
                console.error("Token çözümleme hatası:", err);
            }
        };

        init();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const decoded = jwtDecode(token);
            const userId = decoded.userId;

            const requestData = {
                ...formData,
                userId,
                barberId: parseInt(formData.barberId),
                startTime: formData.startTime.length === 5 ? formData.startTime + ":00" : formData.startTime,
                status: "beklemede",
            };

            await createAppointment(requestData);
            const updatedAppointments = await getAppointmentsByUser(userId);
            setAppointments(updatedAppointments);
            alert("Randevu oluşturuldu.");
        } catch (error) {
            console.error("Randevu oluşturulamadı:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/login");
    };

    return (
        <div>
            <h1>Randevu Sayfası</h1>
            <button onClick={handleLogout}>Çıkış Yap</button>

            <h2>Berber Seç</h2>
            <select name="barberId" onChange={handleChange} required>
                <option value="">Bir berber seçin</option>
                {barbers.map((barber) => (
                    <option key={barber.barberId} value={barber.barberId}>
                        {barber.name}
                    </option>
                ))}
            </select>

            <form onSubmit={handleSubmit}>
                <input type="date" name="appointmentDate" onChange={handleChange} required />
                <input type="time" name="startTime" onChange={handleChange} required />
                <button type="submit">Randevu Oluştur</button>
            </form>

            <h2>Randevularım</h2>
            <ul>
                {appointments.map((appointment) => (
                    <li key={appointment.appointmentId}>
                        Berber ID: {appointment.barberId} | Tarih: {appointment.appointmentDate} | Saat: {appointment.startTime} | Durum: {appointment.status}
                    </li>
                ))}
            </ul>
        </div>
    );
}
    export default AppointmentPage;