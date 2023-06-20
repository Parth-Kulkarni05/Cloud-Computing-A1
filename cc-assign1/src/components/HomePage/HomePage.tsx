import React, {useState, useContext} from "react"
import { UserContext } from "../Context/UserContext";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";



function HomePage(){

    const {user} = useContext(UserContext)

    const navigate = useNavigate();

 

    return(
        <div>

            <div className="d-flex flex-column align-items-center user-area p-5">

                <h3 className="display-title text-align-center">Welcome To User Area</h3>
                Welcome To The Main Page {user?.user_name}


                <Button onClick={() => navigate('/subscriptions')}>View Your Subscriptions (Subscription Area)</Button>
                <Button onClick={() => navigate('/query')}>Add Subscriptions (Query Area)</Button>


            </div>



        </div>
    )

}

export default HomePage;