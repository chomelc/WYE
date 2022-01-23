import axios from 'axios';

export const GET_USER = "GET_USER"

export const getUser = (username: string) => {
    return (dispatch) => {
        return axios.get("http://192.168.0.10:5000/wye/users/"+username)
            .then((res) => {
                dispatch({ type: GET_USER, payload: res.data })
            })
            .catch((err) => console.log(err))
    }
}