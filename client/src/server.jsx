import React, { useEffect } from 'react';
import { useStoreDispatch } from "./store";
import axios from "axios";

export default function useServer(reducer) {
  const dispatch = useStoreDispatch();

  const server = axios.create({
    baseURL: "http://localhost:3042",
  });

  const get = (path) => {
    return server.get(path).then(({ data }) => {
      if (typeof reducer === "string" && reducer.trim() !== "") {
        dispatch({
          type: reducer,
          payload: data
        });
      }

      return data;
    });
  }

  const post = (path, payload) => {
    return server.post(path, payload).then(({ data }) => {
      if (typeof reducer === "string" && reducer.trim() !== "") {
        dispatch({
          type: reducer,
          payload: data
        });
      }

      return data;
    });
  }

  return {
    get,
    post
  };
}
