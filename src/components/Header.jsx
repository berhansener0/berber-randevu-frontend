import { useNavigate } from "react-router-dom";

function Header({isAuthenticated,setIsAuthenticated,isBarberAuthenticated,setIsBarberAuthenticated}) {
    const navigate=useNavigate();

    const handleLogout=()=> {
        setIsAuthenticated(false);
        setIsBarberAuthenticated(false);
        localStorage.removeItem('token');
        navigate('/');
    };

    if(!isAuthenticated && !isBarberAuthenticated) return null;

    return(
        <div style={{
            display:'flex',
            justifyContent:'flex-end',
            padding:'10px',
            backgroundColor:'#f0f0f0',
            borderBottom:'1px solid #ccc'
        }}>
            <button onClick={handleLogout}>Çıkış Yap</button>
            </div>
    );
}

export default Header;