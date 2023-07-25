import { BASEURL, API_READ_ACCESS_TOKEN } from '../constants/apiConstants'

export async function fetchApi(url) {
    const options = {
        method : 'GET',
        headers : {
            accept : 'application/json',
            'content-type' : 'application/json',
            Authorization : `Bearer ${API_READ_ACCESS_TOKEN}`
        }
    }
    const response = await fetch(url,options)
    const data = await response.json()
    if (!response.ok) throw data
    return data
}

export async function fetchApiPost(url, body) {
    const options = {
        method : 'POST',
        headers : {
            accept : 'application/json',
            'content-type' : 'application/json',
            Authorization : `Bearer ${API_READ_ACCESS_TOKEN}`
        },
        body : JSON.stringify(body)
    }
    const response = await fetch(url,options)
    const data = await response.json()
    if (!response.ok) throw data
    return data
}