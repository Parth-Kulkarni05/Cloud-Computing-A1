
import React, {useState, useEffect, useContext} from "react"
import { Button, Form } from "react-bootstrap";

import { addMuisc, makeQuery } from "../AxiosCommands/Axios";
import { QueryResponse } from "../AxiosCommands/AxiosTypes";

import { UserContext } from "../Context/UserContext";

import Table from 'react-bootstrap/Table';




const definedQuery = {
    song_title:'',
    artist_name:'',
    year:''
}


function QueryArea(){

 
    const [query, setQuery] = useState(definedQuery);

    const [returenedQuery, setNewQueryResult] = useState<QueryResponse | null>(null)

    const [queryError, setQueryError] = useState<string>('')

    const {user,setUser} = useContext(UserContext)

    useEffect(() => {

    }, [returenedQuery, queryError])


    function handleTitle(event: React.ChangeEvent<HTMLInputElement>){

        setQuery({...query, song_title: event.currentTarget.value})

    }

    function handleArtist(event: React.ChangeEvent<HTMLInputElement>) {

        setQuery({...query, artist_name: event.currentTarget.value})



    }

    function handleYear(event: React.ChangeEvent<HTMLInputElement>){

        setQuery({...query, year: event.currentTarget.value})

        
    }


    async function handleQuerySubmit(){

        const data = await makeQuery(query);

        console.log(data)

        if(data !== null){
            setQueryError('')
            setNewQueryResult(data)
        }

        else if(data === null){
            setQueryError("No result is reterived. Please query again")
            setNewQueryResult(null)

        }


    }


    async function handleAddMusic(event: React.FormEvent<HTMLButtonElement>){

        const id = parseInt(event.currentTarget.id) // This retervies the id of relevant music obj

        const musicObj = returenedQuery?.Items[id]! // Get the relevant music obj

        
        const count = user!.subscriptions.ScannedCount!


        musicObj.id = count + 1 // Allocate the id into the obj

        setUser({...user!, subscriptions: {ScannedCount: user!.subscriptions.ScannedCount + 1, Items: [...user!.subscriptions!.Items, musicObj]}})


        // Add Music Object To DynamoDB

        const dynamoDbMusic = {"id": count + 1,  "title": musicObj.title, "artist": musicObj.artist, "year": musicObj.year, "email": user?.email }

        const data = await addMuisc(dynamoDbMusic);

        window.alert("Your music has been added")


    }



    return(

        <div>
            <div className="d-flex flex-column query-area p-5">

                <h3 className="display-title"> Welcome to Query Area</h3>

                <Form.Control type = "input" placeholder="Enter Title" onChange={handleTitle}></Form.Control>

                <Form.Control type = "input" placeholder="Enter Artist" onChange = {handleArtist}></Form.Control>


                <Form.Control type = "input" placeholder="Enter Year" onChange = {handleYear}></Form.Control>


                <Button onClick={handleQuerySubmit}>Query</Button>


            </div>

            
            <div className="d-flex align-items-center flex-column p-5">

                {returenedQuery?.Count as number > 0 && queryError.length === 0 &&

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

                    

                    {returenedQuery?.Items.map((item, index) =>

      <tbody>
        <tr>
          <td>{item.title}</td>
          <td>{item.artist}</td>
          <td>{item.year}</td>
          <td><img src = {`https://ccassingment1.s3.amazonaws.com/${encodeURIComponent(item.title)}.jpeg`} alt =''></img></td>

          
          <td><Button variant="success" id={String(index)} onClick={handleAddMusic} disabled = {user!.subscriptions!.Items.some(song => song.title === item.title)}>Subscribe</Button></td>

        </tr>
      </tbody>


                 


                    )
                

                
                }


        </Table>


        }

            {!returenedQuery && queryError.length > 0 && 

                <h3>{queryError}</h3>
            
            }



            </div>

        
        </div>



    )

}

export default QueryArea;