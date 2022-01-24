import { GET_DAY } from "../actions/day.actions"

const initialState: DayState = { day: [] }

export default function dayReducer(state = initialState, action: DayAction) {
    switch (action.type) {
        case GET_DAY:
            return action.payload

        default:
            return state
    }
}