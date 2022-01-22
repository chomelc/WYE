import { combineReducers } from "redux";
import usersReducer from "./users.reducer";


const reducers = combineReducers({
    users: usersReducer
})

export default reducers

export type RootState = ReturnType<typeof reducers>