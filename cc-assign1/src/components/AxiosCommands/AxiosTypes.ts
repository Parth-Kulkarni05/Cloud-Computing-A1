export type getUser = {

    Item:{
        email: string, 
        password: string,
        user_name: string
    }
  
}

export type createUser = {

    email: string, 
    password: string,
    user_name: string
     
}

export type loginUserType = {
    email: string, 
    password: string
}

export type subscriptions = {
    year: string, 
    artist: string, 
    id: number, 
    title: string
}

export type successLogin = {

    response: {

    Item:{
        email: string, 
        user_name: string
    }

    }

    subscriptions: {
        ScannedCount: number
        Items: subscriptions[]
    }

}

export type QueryObj = {
    artist_name: string, 
    song_title: string, 
    year: string
}

type musicInformation = {
    id: number
    year: string, 
    artist: string, 
    title: string
}

export type QueryResponse = {

    
    Count: number, 
    Items: musicInformation[]
    
}