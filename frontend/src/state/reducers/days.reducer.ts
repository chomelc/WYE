import { GET_DAYS } from "../actions/days.actions"

const initialState: DaysState = { days: [] }

export default function daysReducer(state = initialState, action: DaysAction) {
    switch (action.type) {
        case GET_DAYS:
            return action.payload

        default:
            return state
    }
}