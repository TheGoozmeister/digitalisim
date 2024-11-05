import axios, { AxiosResponse } from 'axios';


interface UserCredentials {
    username: string;
    password: string;
}

interface LoginResponse {
    token: string;
    error?: string;
}

const FULL_URL = "http://localhost:3001";

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token') || ''
};

function setToken(token: string): void {
    headers.Authorization = 'Bearer ' + token;
    localStorage.setItem('token', token);
}

async function login(userDatas: UserCredentials): Promise<LoginResponse> {
    try {
        console.log("userDatas", userDatas)
        const response: AxiosResponse<LoginResponse> = await axios.post<LoginResponse>(
            `${FULL_URL}/api/auth/login`, 
            userDatas, 
            { headers }
        );
        console.log("onest al")
        const data = response.data;
        console.log("data", data)
        if (data.error) throw new Error(data.error); 
        setToken(data.token);
        return data; 
    } catch (error) {
        console.error('Erreur lors du login:', error);
        throw error; 
    }
}

export {
    login,
    setToken
}