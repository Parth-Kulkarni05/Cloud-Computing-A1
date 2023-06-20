import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { createUserToDB, findUser } from "../AxiosCommands/Axios";
import { defined_errors, errors, userDefined, UserSignUp } from "../Types/DefinedTypes";

import { Form, Button } from "react-bootstrap";


import './Registation.css'


function Registration(){

    const [user, setUser] = useState<UserSignUp>(userDefined);

    const [errors, setErrors] = useState(defined_errors);

    const [highlight, setHighlight] = useState<boolean>(false);

    const navigate = useNavigate();

    function handleEmail(event: React.ChangeEvent<HTMLInputElement>){

        setHighlight(false);

        setUser({...user, email: event.currentTarget.value });

    }

    function handleUserName(event: React.ChangeEvent<HTMLInputElement>){
        
        setHighlight(false); 

        setUser({...user, user_name: event.currentTarget.value });

    }

    function handlePassword(event: React.ChangeEvent<HTMLInputElement>){

        setHighlight(false);

        setUser({...user, password: event.currentTarget.value });

    }



    async function handleValidation(){

        let newError: errors = {email: "", password: "", userName: "", validationSuccess: false};


        if (user.email.length === 0){
            newError.email =  "Please provide an email";

        }

        else if(user.email.length > 0){

            const response = await findUser(user.email) 

            console.log(response, "dynamodb")

            if(response.data.Item){
                newError.email = "This email already exists";
            }


        }

        if (user.password.length === 0){
            newError.password = "You have to include password";

        }

        if (user.user_name.length === 0){
            newError.userName = "You have to provide an user name";
        }



        if(newError.email.length === 0 && newError.password.length === 0 && newError.userName.length === 0){
            newError.validationSuccess = true;
        }

        setHighlight(true)

        return newError;




    }


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        
        event.preventDefault();

        const response = await handleValidation();

        if(response.validationSuccess ){

            await createUserToDB(user).then(result => navigate('/login')).catch(err => console.log(err))
            
        }
        
        
        setErrors(response);


    }

    return(
        <div>

            <div className="d-flex justify-content-center p-2">
              <h3 className="p-2">Registration Page</h3>
            </div>

            <Form noValidate onSubmit={handleSubmit} >

              <Form.Group className="d-flex flex-column p-5">


                <Form.Label>Email Address
                <Form.Control type = "input" placeholder="Enter Email" isInvalid = {(!!errors.email && highlight)} onChange={handleEmail}></Form.Control>
                <Form.Control.Feedback type = "invalid">{errors.email}</Form.Control.Feedback>
                </Form.Label>

                <Form.Label>User Name
                <Form.Control type = "input" placeholder="Enter Username" isInvalid = {(!!errors.userName && highlight)} onChange={handleUserName}></Form.Control>
                <Form.Control.Feedback type = "invalid">{errors.userName}</Form.Control.Feedback>
                </Form.Label>

                <Form.Label>Password
                <Form.Control type = "password" placeholder="Enter password" isInvalid = {(!!errors.password && highlight)} onChange={handlePassword}></Form.Control>
                <Form.Control.Feedback type = "invalid">{errors.password}</Form.Control.Feedback>
                </Form.Label>

                <Button type = "submit">Sumbit</Button>

               </Form.Group>

            </Form>

            
        </div>
    )

}

export default Registration;