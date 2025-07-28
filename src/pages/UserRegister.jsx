import { useState } from "react";
import { registerUser } from "../services/userService";
import { useNavigate } from "react-router-dom";

export default function UserRegister() 
{
    
    const[form,setForm]=useState({
        name: '',
        email : '',
        password : '',
        phone : '',
    });

    const handleChange=(e)=>{
        setForm ({...form,[e.target.name]: e.target.value});
    };
    const navigate=useNavigate();
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await registerUser(form);
            alert('Kayıt Başarılı!');
        }
        catch (error) {
            alert('Kayıt başarısız : ' + error.responseData);
        }
    }

    return (
        <div>
            <h2>Kullanıcı Kayıt</h2>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Ad Soyad" onChange={handleChange} required />
                <input name="email" placeholder="Email" onChange={handleChange} required />
                <input name="password" placeholder="Şifre" type="password" onChange={handleChange} required />
                <input name="phone" placeholder="Telefon Numarası" onCanChange={handleChange} required />
                <button type="submit">Kayıt Ol</button>
                <button type="button" onClick={()=>navigate('/')}>Ana Sayfaya Geri Dön</button>
            </form>
        </div>
    );
}
