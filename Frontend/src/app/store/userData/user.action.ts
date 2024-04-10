import { createAction, props } from "@ngrx/store";


export const getUser = createAction('[users] get users');
export const getUserSucess =createAction('[users] get users sucess',props<{user:any}>());
export const getUserError =createAction('[users] get users failure',props<{error:string}>());


export const DeleteUser = createAction('[Delete] Delete user',props<{userId:string}>())
export const DeleteUserSuccess  = createAction('[Delete] Delete user sucess ',props<{userId:string}>())
export const DeleteUserError = createAction('[Delete] Delete user failure',props<{error:string}>())