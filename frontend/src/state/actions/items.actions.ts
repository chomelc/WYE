import axios from 'axios';

export const GET_ITEMS = "GET_ITEMS";
export const DELETE_ITEM = "DELETE_ITEM";

export const getItems = (username: string) => {
    return (dispatch) => {
        return axios.get("http://192.168.0.10:5000/wye/groceries/"+username)
            .then((res) => {
                dispatch({ type: GET_ITEMS, payload: res.data })
            })
            .catch((err) => console.log(err))
    }
}

export const deleteItem = (username: string, item: string) => {
    return (dispatch) => {
        return axios.delete("http://192.168.0.10:5000/wye/groceries/"+username+"/"+item)
            .then((res) => {
                dispatch({ type: GET_ITEMS, payload: res.data })
            })
            .catch((err) => console.log(err))
    }
}