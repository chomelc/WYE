import { GET_USER } from "../actions/user.actions"

const initialState: UserState = { user: [] }

export default function usersReducer(state = initialState, action: UserAction) {
    switch (action.type) {
        case GET_USER:
            return action.payload

        default:
            return state
    }
}