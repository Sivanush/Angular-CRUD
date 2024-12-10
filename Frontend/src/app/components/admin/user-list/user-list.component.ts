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
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-user-list',
    standalone: true,
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    imports: [HeaderComponent, TableModule, ButtonModule, FormsModule, CommonModule, ConfirmDialogModule, ToastModule, DialogModule]
})
export class UserListComponent implements OnInit {
  isLoading: boolean = false;
  users!: User[] | any;
  isModalOpen: boolean = false; 
  editedUser: User = {} as User;
  userId: string = '';
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  isSaving: boolean = false;

  constructor(
    private toster: ToastrService,
    private store: Store<AppState>, 
    private auth: BackendServiceService
  ) {}

  ngOnInit(): void { 
    this.store.dispatch(getUser());
    this.getUserList();
    this.store.select(getLoading).subscribe(loading => {
      this.isLoading = loading;
    });
  }

  getUserList(){
     this.store.select(getUsers).subscribe((data:any) => {
      this.users = data;
     });
  }

  editUser(user: User) {
    // Create a deep copy of the user to edit
    this.editedUser = {...user}; 
    this.userId = user._id;
    this.imagePreview = null;
    this.selectedFile = null;
    this.openModal();
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.imagePreview = null;
    this.selectedFile = null;
  }

  deleteUser(userId: string){
    this.store.dispatch(DeleteUser({userId: userId}));
    this.ngOnInit();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result || null;
      };
      reader.readAsDataURL(file);
    }
  }


  uploadToCloudinary():Promise<string>|null{
    if (!this.selectedFile) {
      console.error('No file selected.');
      return null
    }else{
      const formData = new FormData();
      formData.append('image', this.selectedFile);
      console.log('Selected File:', this.selectedFile);
      console.log('FormData:', formData.get('image'));
      
      return new Promise((resolve, reject) => {
        this.auth.uploadImage(formData).subscribe({
          next: (response) => {
            // this.toster.success('Profile Picture Updated', 'Success');
            resolve(response.url);  
          },
          error: (error) => {
            this.toster.error(error.error.message, 'Error');
            reject(error); 
          }
        });
      });
    }
  }

  async saveChanges() {
    this.isSaving = true
    if (!this.userId) return;

    if (this.selectedFile) {
      const cloudinaryUrl = await this.uploadToCloudinary();
      this.editedUser.image = cloudinaryUrl as string;
    }

    this.auth.updateUser(this.userId, this.editedUser)
      .subscribe(
        (response) => {
          console.log('User updated successfully:', response);
          this.closeModal();
          this.ngOnInit();
          this.isSaving = false
        },
        (error) => {
          console.error('Error updating user:', error);
          this.isSaving = false
        }
      );


  }
}