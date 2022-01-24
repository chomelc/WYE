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

interface IDish {
    name: string
    slug: string
}

interface IDay {
    day: string
    date: string
    slug: string
    breakfast: IDish
    lunch: IDish
    dinner: IDish
}

type DayState = {
    day: IDay[]
}

type DayAction = {
    type: string
    payload: IDay
}

type DaysState = {
    days: IDay[]
}

type DaysAction = {
    type: string
    payload: IDay[]
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
    payload: IItem
}

type DispatchType = ((args: UserAction) => UserAction) | ((args: UsersAction) => UsersAction) | ((args: DayAction) => DayAction) | ((args: DaysAction) => DaysAction) | ((args: ItemAction) => ItemAction)
