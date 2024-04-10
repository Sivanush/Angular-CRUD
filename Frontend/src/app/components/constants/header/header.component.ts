import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BackendServiceService } from '../../../service/server/backend-service.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private auth:BackendServiceService,private toster:ToastrService) {
    
  }

  isAdmin(){
    const data:any = this.auth.isAdmin().valueOf()
    return data 
  }


  logout(): void {
    this.auth.logout()
    this.toster.success('Logout Successfully', 'Success')
  }
}
