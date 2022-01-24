import { GET_DAYS } from "../actions/days.actions"

const initialState: DayState = { days: [] }

export default function dayssReducer(state = initialState, action: DayAction) {
    switch (action.type) {
        case GET_DAYS:
            return action.payload

        default:
            return state
    }
}