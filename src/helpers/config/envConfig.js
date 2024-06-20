const url = process.env.NODE_ENV === "development" ?  "http://localhost:6003/api/v1" : 'https://medicalapp-2.onrender.com/api/v1'

export const getBaseUrl = () =>{
    return   url;
}


export const getGptUrl = () =>{
    return   'https://medicalapp-gpt.onrender.com/chat';
}