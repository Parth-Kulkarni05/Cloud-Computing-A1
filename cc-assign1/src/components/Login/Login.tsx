import React, {useContext, useState} from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../AxiosCommands/Axios";
import { UserContext } from "../Context/UserContext";
import { defined_errors_login, errorsLogin, userDefinedLogin, userLoginType } from "../Types/DefinedTypes";

function Login(){

    const [userState,setUserState] = useState<userLoginType>(userDefinedLogin);


    const [errors, setErrors] = useState(defined_errors_login);

    const userContext = useContext(UserContext)

    const navigate = useNavigate();

    function handleEmail(event: React.ChangeEvent<HTMLInputElement>){

        setUserState({...userState, email: event.currentTarget.value})

    }

    function handlePassword(event: React.ChangeEvent<HTMLInputElement>){

        
        setUserState({...userState, password: event.currentTarget.value})

    }

    async function handleValidation(){

        
        let newError: errorsLogin = {email: "", password: "", validationSuccess: false};


        if (userState.email.length === 0){
            newError.email =  "Please provide an email";

        }


        if (userState.password.length === 0){
            newError.password = "You have to include password";

        }


        if(newError.email.length === 0 && newError.password.length === 0 ){ // Here check if the login credientals are correct

            
            const userLoggedIn = await loginUser(userState)

            console.log(userLoggedIn)

            if(userLoggedIn !== null){
                
                userContext.setUser({
                    user_name: userLoggedIn.response.Item.user_name,
                    email: userLoggedIn.response.Item.email, 
                    subscriptions: userLoggedIn.subscriptions
                }) // Store the user object into context

                newError.validationSuccess = true;
            }

            else{
                newError.email = "Email or password is invalid"
                newError.password = "Email or password is invalid"
            }

        }


        return newError;



    }

    async function handleSubmit(event: React.FormEvent<HTMLElement>){

        event.preventDefault();

        const validated = await handleValidation();

        if(validated.validationSuccess){
                navigate('/home')
        }


        setErrors(validated);

    }

    return(
        <div>

            <div className="d-flex justify-content-center p-2">
              <h3 className="p-2">Welcome Back. Please Login</h3>
            </div>

            <Form noValidate onSubmit={handleSubmit}>

             <Form.Group className="d-flex flex-column p-5">


                <Form.Label>Email
                    <Form.Control type = "input" placeholder="Enter Email" isInvalid = {!!errors.email}onChange={handleEmail}></Form.Control>
                    <Form.Control.Feedback type = "invalid">{errors.email}</Form.Control.Feedback>
                </Form.Label>

                <Form.Label> Password
                    <Form.Control type = "password" placeholder = "Enter password" isInvalid = {!!errors.password} onChange = {handlePassword}></Form.Control>
                    <Form.Control.Feedback type = "invalid">{errors.password}</Form.Control.Feedback>

                </Form.Label>


                <Button type = "submit">Login</Button>

            </Form.Group>

            </Form>


        </div>

    )

    

}


export default Login;