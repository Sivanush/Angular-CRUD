import { User } from "./user.model";

export interface UserState{
    user:User[] 
    error:string,
    loading:boolean,
    deletedIds: number[]
}

export const initialState:UserState={
    user:[],
    error:'',
    loading:false,
    deletedIds: []
}

export  interface initialState2 {
    name:string,
    price:number
  }