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