import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../constants/header/header.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { Store, } from '@ngrx/store';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CommonModule } from '@angular/common';
import { AppState } from '../../../store/app.state';
import { DeleteUser, getUser } from '../../../store/userData/user.action';
import { User } from '../../../store/userData/user.model';
import { getLoading, getUsers } from '../../../store/userData/user.selector';
import { ToastModule } from 'primeng/toast';
import { BackendServiceService } from '../../../service/server/backend-service.service';
import { DialogModule } from 'primeng/dialog';


@Component({
    selector: 'app-user-list',
    standalone: true,
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    imports: [HeaderComponent, TableModule, ButtonModule, FormsModule, CommonModule, ConfirmDialogModule, ToastModule, DialogModule]
})
export class UserListComponent implements OnInit {

  isLoading:boolean=false
  users!: User[] | any
  visible: boolean = false; 
  editedUser!: User;
  userId: any 

  constructor(private store:Store<AppState>, private auth:BackendServiceService) {
    
  }

  editUser(user: User) {
    this.editedUser = {...user}; // Copy user data to editedUser object
    this.showDialog(); // Show the dialog
    this.userId = user._id;
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
      this.users = data;
     })
  }

  deleteUser(userId:string){
    this.store.dispatch(DeleteUser({userId:userId}))
    this.ngOnInit()
  }

  showDialog() {
    this.visible = true; // Set visibility to true to show the dialog
  }

  closeDialog() {
    this.visible = false; // Set visibility to false to close the dialog
  }

  saveChanges() {
    this.auth.updateUser(this.userId, this.editedUser)
      .subscribe(
        (response) => {
          console.log('User updated successfully:', response);
          this.closeDialog(); // Close the dialog after successful update
          this.ngOnInit(); // Reload user data
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
  }
}
