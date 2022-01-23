import { GET_USERS } from "../actions/users.actions"

const initialState: UsersState = { users: [] }

export default function usersReducer(state = initialState, action: UsersAction) {
    switch (action.type) {
        case GET_USERS:
            return action.payload

        default:
            return state
    }
}