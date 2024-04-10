import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { DeleteUser, DeleteUserSuccess, getUser, getUserError, getUserSucess } from "./user.action";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { BackendServiceService } from "../../service/server/backend-service.service";


@Injectable()
export class UserEffects {
  constructor(private actions$:Actions,private userService:BackendServiceService){};

  loadUser$=createEffect(()=>
    this.actions$.pipe(
      ofType(getUser),
      switchMap(()=>{
         return this.userService.getAllUser().pipe(
            tap((data)=>console.log(data)),
            map((res:any)=> getUserSucess({user:res})),
            catchError( (err) => of(getUserError({ error: err.message })))
          )
      })
    )
  )

  deleteUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(DeleteUser),
    switchMap((action) =>
      this.userService.deleteUser(action.userId).pipe(
        tap(() => console.log(`User ${action.userId} deleted`)),
        map(() => DeleteUserSuccess({ userId : action.userId})),
        catchError((err) => of(getUserError({ error: err.message })))
      )
    )
  )
);
}