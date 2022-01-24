import { combineReducers } from "redux";
import daysReducer from "./days.reducer";
import itemsReducer from "./items.reducer";
import userReducer from "./user.reducer";
import usersReducer from "./users.reducer";


const reducers = combineReducers({
    users: usersReducer,
    user: userReducer,
    days: daysReducer,
    items: itemsReducer
})

export default reducers

export type RootState = ReturnType<typeof reducers>