import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../constants/header/header.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import { CommonModule } from '@angular/common';
import { AppState } from '../../../store/app.state';
import { DeleteUser, DeleteUserSuccess, getUser } from '../../../store/userData/user.action';
import { User } from '../../../store/userData/user.model';
import { getLoading, getUsers } from '../../../store/userData/user.selector';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [HeaderComponent,TableModule,ButtonModule,FormsModule,CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit{
  
  isLoading:boolean=false
  users!:User[];

  constructor(private store:Store<AppState>) {
    
  }

  ngOnInit(): void {
      this.store.dispatch(getUser());
      this.getUser();
      this.store.select(getLoading).subscribe(loading => {
        this.isLoading = loading;
      });
  }

  getUser(){
     this.store.select(getUsers).subscribe((data:any)=>{
      this.users = data.users;
      console.log("Log from Selectors from User List Component",this.users );
     })
  }


  deleteUser(userId:string){
    this.store.dispatch(DeleteUser({userId:userId}))
  }


 
}
