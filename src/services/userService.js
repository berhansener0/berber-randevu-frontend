import api from './api';

export const registerUser=async(userData)=>
{
    const response= await api.post('/Auth/register/user', userData);
    return response.data;
};

export const loginUser=async (userData)=>
{
    const response=await api.post('/Auth/login/user',userData);
    const token=response.data.token;
    if(token)
    {
        localStorage.setItem('token',token);
    }
    return response.data;
};