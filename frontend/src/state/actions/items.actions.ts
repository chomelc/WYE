import axios from 'axios';

export const GET_ITEMS = "GET_ITEMS";

export const getItems = (username: string) => {
    return (dispatch) => {
        return axios.get("http://192.168.0.10:5000/wye/groceries/" + username)
            .then((res) => {
                dispatch({ type: GET_ITEMS, payload: res.data })
            })
            .catch((err) => console.log(err))
    }
}

export const addItem = (username: string, item: string) => {
    return (dispatch) => {
        return axios.post("http://192.168.0.10:5000/wye/groceries?list=" + username + "&item=" + item + "&is_checked=False")
            .then((res) => {
            dispatch(getItems(username))
        })
    .catch((err) => console.log(err))
    }
}

export const editItem = (username: string, item: string, isChecked: boolean) => {
    return (dispatch) => {
        return axios.put("http://192.168.0.10:5000/wye/groceries/" + username + "/" + item + "?is_checked=" + isChecked)
            .then((res) => {
            dispatch(getItems(username))
        })
    .catch((err) => console.log(err))
    }
}

export const deleteItem = (username: string, item: string) => {
    return (dispatch) => {
        return axios.delete("http://192.168.0.10:5000/wye/groceries/" + username + "/" + item)
            .then((res) => {
                dispatch(getItems(username))
            })
            .catch((err) => console.log(err))
    }
}