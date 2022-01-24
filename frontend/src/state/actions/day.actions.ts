import axios from 'axios';

export const GET_DAY = "GET_DAY"

export const getDay = (slug: string) => {
    return (dispatch) => {
        return axios.get("http://192.168.0.10:5000/wye/days/"+slug)
            .then((res) => {
                dispatch({ type: GET_DAY, payload: res.data })
            })
            .catch((err) => console.log(err))
    }
}