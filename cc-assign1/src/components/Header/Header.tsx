import {Navbar, Container} from "react-bootstrap"
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

function Header(){

    const user = useContext(UserContext)

    const navigate = useNavigate()

    function handleLogout(){
        user.setUser(null)

        navigate('/login')


    }

    return(
        <div>

            <Navbar bg = "dark" variant="dark">

                <Container aria-label="Header">

                    <Navbar.Brand>Welcome to the website</Navbar.Brand>


                    {!user.user ?

                        <div>
                            <Navbar.Brand onClick = {() => navigate('/')}>Register</Navbar.Brand>                    
                            <Navbar.Brand onClick = {() => navigate('/login')}>Login</Navbar.Brand>
                        </div>
                    
                    
                    
                    :

                        <div>
                            <Navbar.Brand onClick={handleLogout}>Logout</Navbar.Brand>

                            <Navbar.Brand onClick = {() => navigate('/home')}>Your Area</Navbar.Brand>

                            <Navbar.Brand onClick = {() => navigate('/subscriptions')}>Your Subscriptions</Navbar.Brand>

                            <Navbar.Brand onClick = {() => navigate('/query')}>Add Subscriptions</Navbar.Brand>


                        </div>

                    }

                </Container>

            </Navbar>



        </div>
    )



}


export default Header;