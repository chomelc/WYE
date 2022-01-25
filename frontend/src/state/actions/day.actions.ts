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

export const editBreakfast = (slug: string, breakfast_slug :string) => {
    return (dispatch) => {
        return axios.get("http://192.168.0.10:5000/wye/days/"+slug+"?breakfast="+breakfast_slug)
            .then((res) => {
                dispatch({ type: GET_DAY, payload: res.data })
            })
            .catch((err) => console.log(err))
    }
}

export const editLunch = (slug: string, lunch_slug :string) => {
    return (dispatch) => {
        return axios.get("http://192.168.0.10:5000/wye/days/"+slug+"?lunch="+lunch_slug)
            .then((res) => {
                dispatch({ type: GET_DAY, payload: res.data })
            })
            .catch((err) => console.log(err))
    }
}

export const editDinner = (slug: string, dinner_slug :string) => {
    return (dispatch) => {
        return axios.get("http://192.168.0.10:5000/wye/days/"+slug+"?dinner="+dinner_slug)
            .then((res) => {
                dispatch({ type: GET_DAY, payload: res.data })
            })
            .catch((err) => console.log(err))
    }
}