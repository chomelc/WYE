import { GET_USERS } from "../actions/users.actions"

const initialState: UserState = { users: [] }

export default function usersReducer(state = initialState, action: UserAction) {
    switch (action.type) {
        case GET_USERS:
            return action.payload

        default:
            return state
    }
}