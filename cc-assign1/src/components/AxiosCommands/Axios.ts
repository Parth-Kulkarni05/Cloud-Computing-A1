import axios from "axios";
import { getUser, createUser, loginUserType, successLogin, QueryObj, QueryResponse } from "./AxiosTypes";

const API_URL = "https://j2coevecz1.execute-api.us-east-1.amazonaws.com/get_api"



export async function findUser(email:string){

    const data = await axios.get<getUser>(API_URL + `?userId=${email}`)

    return data;

}

export async function createUserToDB(obj: createUser){
    const {data} = await axios.post<createUser>(API_URL + "/createuser", obj) // Create a post obj with request body headers

    return data;

}

export async function loginUser(obj: loginUserType){
    
    const {data} = await axios.post<successLogin>(API_URL + "/login", obj)

    console.log("login user", data)

    return data

}

export async function makeQuery(queryObj: QueryObj){

    const {data} = await axios.get<QueryResponse>(API_URL + `/getquery?artist=${queryObj.artist_name}&title=${queryObj.song_title}&year=${queryObj.year}`)

    console.log(data, "axios side")

    return data

}


export async function addMuisc(musicObj: any){

    const {data} = await axios.post<any>(API_URL + `/addmusic`, musicObj)

    console.log(data, "returened from creating music")

    return data


}

export async function deleteMusic(id: number){
    const {data} = await axios.delete<any>(API_URL + `/deletemusic?id=${id}`)

    console.log("delete", data)

    return data


}