import axios from 'axios';

export const GET_DAYS = "GET_DAYS";

export const getDays = () => {
    return (dispatch) => {
        return axios.get("http://192.168.0.10:5000/wye/days/")
            .then((res) => {
                dispatch({ type: GET_DAYS, payload: res.data })
            })
            .catch((err) => console.log(err))
    }
}