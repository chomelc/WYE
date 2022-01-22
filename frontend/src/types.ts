export enum FetchState {
    DEFAULT = 'DEFAULT',
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
  }
  
  export type UserData = {
    first_name: string;
    last_name: string;
    initials: string;
    slug: string;
  };

  export type GroceryListData = {
    author: UserData;
  }

  export type ItemData = {
    item: string;
    is_checked: boolean;
    slug: string;
    g_list: GroceryListData;
  };