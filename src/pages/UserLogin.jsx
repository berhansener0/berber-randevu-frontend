import { useState } from 'react';
import {loginUser} from '../services/userService';
import { useNavigate } from 'react-router-dom';

function UserLogin({setIsAuthenticated})
{
    const [formData,setFormData]=useState({email : "", password : ""});
    const navigate=useNavigate();

    const handleChange=(e)=> {
        setFormData({...formData,[e.target.name]: e.target.value});
    };

    const handleSubmit=async (e)=>{
        e.preventDefault();
             try
       {
            const response = await loginUser(formData);
            console.log(response);
            localStorage.setItem('token', response.token);
            setIsAuthenticated(true);
            alert ('Giriş Başarılı!');
            navigate('/');
       }
       catch(error)
       {
            console.error('Giriş başarısız', error)
            alert('Giriş Başarısız Email veya Şifre yanlış!!!');
       }
    
    };
    return(
        <div>
            <h2>Kullanıcı Girişi</h2>
            <form onSubmit={handleSubmit}>
                <input name='email' placeholder='Email' onChange={handleChange} required/>
                <input name='password' placeholder='Password' type="password" onChange={handleChange} required/>
                <button type="submit">Giriş Yap</button>
                <button onClick={()=>navigate('/register')}>Kayıt Ol</button>
            </form>
        </div>
    );
}

export default UserLogin;
  
    
