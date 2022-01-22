import axios from 'axios';
import { useState } from 'react';
import { FetchState, UserData, ItemData } from '../types';

export function useGetUsers() {
  const [fetchState, setFetchState] = useState(FetchState.DEFAULT);
  const [users, setUsers] = useState<Array<UserData>>([]);
  const getUsers = async () => {
    try {
      setFetchState(FetchState.LOADING);

      const res = await axios.get("http://192.168.0.10:5000/wye/users/");
      const resData = res.data as Array<UserData>;

      setUsers(resData);
      setFetchState(FetchState.SUCCESS);
    } catch (err) {
      setFetchState(FetchState.ERROR);
    }
  };

  return [users, fetchState, getUsers] as const;
}

export function useGetItems() {
  const [fetchState, setFetchState] = useState(FetchState.DEFAULT);
  const [items, setItems] = useState<Array<ItemData>>([]);
  const getItems = async () => {
    try {
      setFetchState(FetchState.LOADING);

      const res = await axios.get("http://192.168.0.10:5000/wye/groceries/");
      const resData = res.data as Array<ItemData>;

      setItems(resData);
      setFetchState(FetchState.SUCCESS);
    } catch (err) {
      setFetchState(FetchState.ERROR);
    }
  };

  return [items, fetchState, getItems] as const;
}