import api from './api';


export const registerBarber=async(barberData)=>{
    const response=await api.post('Auth/register/barber',barberData);
    return response.data;
};

export const loginBarber=async(barberData)=>{
    const response = await api.post('Auth/login/barber',barberData);
    return response.data;
};

export const getBarbers=async()=>{
    const response=await api.get('/Barber');
    return response.data;
}