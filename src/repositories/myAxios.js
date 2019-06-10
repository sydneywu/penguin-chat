import axios from "axios/index";

export async function myAxios({method, url, data, params}) {
    try{
        let response =  await axios({
            method,
            url,
            data,
            params
        });
        return {
            status: response.status,
            data: response.data,
            success: true,
            error: null
        };
    } catch(error) {

        if(error.response){
           if(error.response.status === 404){
               return {
                   status: error.response.status,
                   data: null,
                   success: false,
                   error: {
                       title: "Api not found",
                       description: "Cannot find the requested API",
                       status: "404",
                       type: error.response.config.url,
                       instance: "",
                       time: new Date()
                   }
               };
           }
        }
        return error
    }
}