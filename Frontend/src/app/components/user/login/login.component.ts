import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BackendServiceService } from '../../../service/server/backend-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  loginForm : FormGroup 
  toster: any;
  
  constructor(private backendServiceService:BackendServiceService, fb:FormBuilder ,private tosters: ToastrService ,private router: Router) {
    
    this.loginForm = fb.group({
      email:[null,[Validators.required]],
      password:[null,[Validators.required]]
    })

  }

  
  LoginUser(){


    this.backendServiceService.logIn(this.loginForm.value).subscribe({
      next:(response)=>{
        this.tosters.success('Login successfully', 'Success');
        this.loginForm.reset()
        console.log(JSON.stringify(response)+'&&&&&&&&&&&&&&&&&&&');
        
        localStorage.setItem('token', response.token);
        // localStorage.setItem('user', response.token);
        this.router.navigate(['/home'])
      },
      error:(error)=>{
        console.log(error);
        this.tosters.error(error.error.message, 'Error');
        
      }
    })
  }

}
