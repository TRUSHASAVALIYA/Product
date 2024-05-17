import { useNavigate } from "react-router-dom";
function Header() {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const handleClick = () => {
        const token = localStorage.getItem("token")
        navigate("/")
        if(token){
            localStorage.clear("token")
        } else {
            navigate("/login")
        }
    
    }
    return(
        <header>
        <button 
          style={{float:"right",backgroundColor:"lightslategray",width:"100%",borderRadius:"4px",fontSize:"20px",padding:"7px"}}
          onClick={handleClick}
        >{token ?`Logout` : `Login`}</button>
        </header> 
    )
}
export default Header;