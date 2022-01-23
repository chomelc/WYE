interface IUser {
    first_name: string
    last_name: string
    initials: string
    slug: string
}

type UserState = {
    user: IUser[]
}

type UserAction = {
    type: string,
    payload: IUser
}

type UsersState = {
    users: IUser[]
}

type UsersAction = {
    type: string
    payload: IUser[]
}

interface IGroceryList {
    author: IUser
}

interface IItem {
    item: string
    is_checked: boolean
    slug: string
    g_list: IGroceryList
}

type ItemState = {
    items: IItem[]
}

type ItemAction = {
    type: string
    item: IItem
}

type DispatchType = ((args: UserAction) => UserAction) | ((args: ItemAction) => ItemAction)
