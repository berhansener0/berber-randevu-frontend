import { useNavigate } from "react-router-dom";

function HomePage({isAuthenticated, isBarberAuthenticated}){
    const navigate=useNavigate();

    if(isAuthenticated || isBarberAuthenticated){
        return null;
    }

    return(
        <div style={{textAlign: 'center',marginTop: '50px'}}>
            <h1>BERBER RANDEVU SİSTEMİ</h1>
            <button onClick={()=> navigate('/login')} style={{marginRight : '20px'}}>
                Üye Girişi
            </button>
            <button onClick={()=> navigate('/barber-login')}>
                Berber Girişi
            </button>
        </div>
    )
}

export default  HomePage;