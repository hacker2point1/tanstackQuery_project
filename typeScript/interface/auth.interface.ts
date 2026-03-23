
interface registerPayload {
    first_name: string,
    last_name: string,
    email: string,
    address: string,
    password: string,
    confirm_password: string,
    status:boolean,
    message:string
}
interface registerResponse {
    status:boolean,
    message:string,
    userId : string,
    email : string,
    data : any
}

// OTP
interface otpPayload{
    userId : string,
    otp : string
}
interface otpResponse{
    status:boolean,
    message : string,
    
}
//signIn
interface loginPayload{
    email : string,
    password : string , 
    status : boolean,
    message: string
}
interface loginResponse{
    status : boolean,
    message : string
}

//signOut
