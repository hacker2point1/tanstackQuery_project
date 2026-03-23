export const endpoints ={
    auth:{
        signUp:"/auth/register",
        otp:"/auth/verify_otp",
        signIn:"/auth/login",
        logout:"/user/logout",
        profile:"/user/profile",
        history:"/user/history",
        resetLink:"/auth/resetlink",
        resetPassword:"/reset-password",
    },
    doctor:{
        list:"/user/doctor/list",
        appoinment:"/doctor/appointment",
           slots: "/user/slot/list", 
           
    },
    
    // list:{
    //     searchAndList:"/user/doctor/list"
    // }
}


export const collectionOfEndpoints:string[]=[
    endpoints.auth.signUp,
    endpoints.auth.otp,
    endpoints.auth.signIn,
    endpoints.auth.logout,
    endpoints.auth.profile,
    endpoints.auth.history,
    endpoints.auth.resetLink,


    //doctor
    endpoints.doctor.list,
    endpoints.doctor.appoinment,
        endpoints.doctor.slots,
    // endpoints.list.searchAndList
]

