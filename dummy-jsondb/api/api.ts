import apiConfig from "./config"
import { Params } from "./type"

const fetcher = async (endpoint: string, params: Params) => {

    let url = `${apiConfig.baseUrl}/${endpoint}`;
    if (params?.userid) {
        url = `${url}/${params.userid}`;
    } else if (params?.searchParam) {
         url = `${url}?q=${params.searchParam}`;
    }
    else {
        url = `${url}?limit=${params?.limit}&skip=${params?.skip}`;
    }
    const response = await fetch(url);
    return await response.json()
}

export const api = {
    fetcher,
}
