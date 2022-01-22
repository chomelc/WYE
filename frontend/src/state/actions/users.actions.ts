import axios from 'axios';

export const GET_USERS = "GET_USERS"

export const getUsers = () => {
    return (dispatch) => {
        return axios.get("http://192.168.0.10:5000/wye/users/")
            .then((res) => {
                dispatch({ type: GET_USERS, payload: res.data })
            })
            .catch((err) => console.log(err))
    }
}