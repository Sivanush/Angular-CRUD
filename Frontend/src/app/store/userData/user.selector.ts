import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { UserState } from "./user.state";


const userIntialState =(state:AppState)=>state.user;

export const getUsers = createSelector(
  userIntialState,
  (user:UserState)=>{
    return user.user
  }
)
export const getLoading = createSelector(
  userIntialState,
  (user:UserState)=>{
    return user.loading
  }
)
export const getError = createSelector(
  userIntialState,
  (user:UserState)=>{
    return user.error
  }
)
