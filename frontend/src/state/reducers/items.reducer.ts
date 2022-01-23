import { GET_ITEMS } from "../actions/items.actions"

const initialState: ItemState = { items: [] }

export default function itemsReducer(state = initialState, action: ItemAction) {
    switch (action.type) {
        case GET_ITEMS:
            return action.payload

        default:
            return state
    }
}