import axios from "axios/index";
import {myAxios} from "./myAxios";

export async function getComments() {
    return myAxios({
        method: "get",
        url: "https://jsonplaceholder.typicode.com/comments",
        params: {
            postId: 1
        }
    });
}

export async function createComment(data) {
    console.log(data);
    let response =  await axios({
        method: "post",
        url: "https://jsonplaceholder.typicode.com/comments",
        data: data
    });
    return response.data;
}