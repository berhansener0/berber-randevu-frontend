import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginBarber } from "../services/barberService";

function BarberLoginPage({setIsBarberAuthenticated}) {
    const [formData,setFormData]=useState({email : "",password: ""});
    const navigate=useNavigate();

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]: e.target.value});
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const response = await loginBarber(formData);
            localStorage.setItem('barberToken',response.token);
            setIsBarberAuthenticated(true);
            alert('Berber Girişi Başarılı!');
            navigate('/barber-appointments');
        }
        catch(error){
            console.error('Giriş başarısız', error);
            alert('E-posta veya Şifre hatalı!!!');
        }
    };

    return(
        <div>
            <h2>Berber Girişi</h2>
            <form onSubmit={handleSubmit}>
                <input name='email' placeholder='Email' onChange={handleChange} required />
                <input name='password' placeholder='Password' type="password" onChange={handleChange} required/>
                <button type="submit">Giriş Yap</button>
            </form>
        </div>
    )
}

export default BarberLoginPage;