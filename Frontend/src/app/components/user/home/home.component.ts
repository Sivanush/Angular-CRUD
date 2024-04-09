import { Component } from '@angular/core';
import { BackendServiceService } from '../../../service/server/backend-service.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { HeaderComponent } from '../../constants/header/header.component';
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [RouterLink,HeaderComponent],
})
export class HomeComponent {




  selectedFile: File | undefined;
  imageUrl: string | undefined;
  userId: string | undefined | null



  constructor(private auth: BackendServiceService, private toster: ToastrService) { }


  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('ngon anne njan');
      const decodedToken: any = jwtDecode(token);
      console.log(decodedToken + '***************************');

      this.userId = this.auth.getTokendata(decodedToken)
    }
    this.userimageUrl()
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    this.updateProfileImage()
  }

  updateProfileImage() {
    if (!this.selectedFile) {
      console.error('No file selected.');
      return;
    }
    const formData = new FormData();
    formData.append('image', this.selectedFile);

    this.auth.updateImage(formData).subscribe({
      next: (response) => {
        this.toster.success('Profile Picture Updated', 'Success');
        this.imageUrl = response.imagePath;
      },
      error: (error) => {
        this.toster.error(error.error.message, 'Error');
      }
    })
  }



  userimageUrl() {

    this.auth.getUserImage().subscribe(
      (response: any) => {
        this.imageUrl = response.url; 
      },
      (error) => {
        console.error('Error fetching user image:', error);
      }
    );
  }

}

