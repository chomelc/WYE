import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import usersReducer from "./users.reducer";


const reducers = combineReducers({
    users: usersReducer,
    user: userReducer
})

export default reducers

export type RootState = ReturnType<typeof reducers>