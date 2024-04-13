import { createReducer, on } from "@ngrx/store";
import { initialState } from "./user.state";
import { DeleteUser, DeleteUserError, DeleteUserSuccess, getUser, getUserError, getUserSucess } from "./user.action";

















const userReducerHelper = createReducer(
  initialState,
  on(getUser,(state)=>{
    return{
      ...state,
      loading:true,
      error:''
    }
  }),
  on(getUserSucess,(state,{user})=>{
    console.log(user);
    return{
      ...state,
      user:user,
      loading:false,
      error:''
    }
  }),
  on(getUserError,(state, { error }) => {
    return {
      ...state,
      loading: false,
      error: error
    };
  }),




  on(DeleteUser, (state) => {
    return {
      ...state,
      loading:true
    };
  }),

  on(DeleteUserSuccess, (state, { userId }) => {
    console.log(state.user);
    const updatedUsers = state.user.filter((user: any) => user._id.toString() !== userId); 
    return {
      ...state,
      user: updatedUsers,
      loading:false
    };
  }),

  on(DeleteUserError, (state, { error }) => {
    return {
      ...state,
      error: error,
      loading:false
    };
  })


  



)





export function userReducer(state:any, action:any) {
  return userReducerHelper(state, action);
}