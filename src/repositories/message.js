import axios from "axios/index";

export function getDog() {
    return axios({
        method: "get",
        url: "https://dog.ceo/api/breeds/image/random"
    });
}