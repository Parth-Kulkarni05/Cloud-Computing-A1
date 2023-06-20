
export const defined_errors = {
    email: '', 
    userName: '',
    password: '',
    validationSuccess: false
}

export type errors = {
    email: string, 
    password: string,
    userName: string,
    validationSuccess: boolean

}

export type errorsLogin = {
    email: string, 
    password: string,
    validationSuccess: boolean

}

export const defined_errors_login = {
    email: '', 
    password: '',
    validationSuccess: false
}

export const userDefined = {
    email: '',
    user_name: '',
    password: ''

}

export const userDefinedLogin = {
    email: '',
    password: ''

}

export type userLoginType = {
    email: string,
    password: string

}


export interface UserSignUp extends userLoginType {
    user_name: string
}