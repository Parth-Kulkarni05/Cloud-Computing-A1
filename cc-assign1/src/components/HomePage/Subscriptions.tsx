
import React, {useState, useContext} from "react"
import { UserContext } from "../Context/UserContext";
import Table from 'react-bootstrap/Table';
import { Button } from "react-bootstrap";

import { deleteMusic } from "../AxiosCommands/Axios";


function Subscriptions(){

    const {user, setUser} = useContext(UserContext)

    async function handleRemoveMusic(event: React.FormEvent<HTMLButtonElement>){

        const index = parseInt(event.currentTarget.id)

        const music_obj = user?.subscriptions.Items[index] // Reterive the relevant obj

        console.log(music_obj?.id)

        const res = await deleteMusic(music_obj?.id as number)

        setUser({...user!, subscriptions: {ScannedCount: user!.subscriptions.ScannedCount - 1, Items: [...user!.subscriptions.Items.filter((val) => val.id !== music_obj?.id)]}})

        window.alert("Music has been deleted.")

    }

    return(

        
        <div className="subscription-area p-5">

        <h3 className="display-title"> Welcome to Subscriptions Area</h3>

        {user?.subscriptions.Items.length === 0 ? 

            <h3>No Subscriptions To Show</h3>
        
        
        :

        <Table striped bordered hover>
                                            
            <thead>
                <tr>
                <th>Song Title</th>
                <th>Artist Name</th>
                <th>Year</th>
                <th>Image</th>
                <th>Subscribe</th>

                </tr>
            </thead>

            {user?.subscriptions.Items.map((item, index) => 

                        
            <tbody>
            <tr>
                <td>{item.title}</td>
                <td>{item.artist}</td>
                <td>{item.year}</td>
                <td><img src = {`https://ccassingment1.s3.amazonaws.com/${item.title}.jpeg`} alt =''></img></td>
                <td><Button id = {String(index)} onClick = {handleRemoveMusic}>Remove Subscription</Button></td>

            
            </tr>
            </tbody>

            

            )
        
        
        
        }




        </Table>

    }



    </div>



    )

}


export default Subscriptions;