import axios from 'axios';

export const GET_ITEMS = "GET_ITEMS"

export const getItems = () => {
    return (dispatch) => {
        return axios.get("http://192.168.0.10:5000/wye/groceries/")
            .then((res) => {
                dispatch({ type: GET_ITEMS, payload: res.data })
            })
            .catch((err) => console.log(err))
    }
}