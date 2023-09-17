import { Component } from '@angular/core';
import {Auth,signInWithEmailAndPassword} from '@angular/fire/auth'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public auth:Auth,private router: Router){}
  onLogin(formValue: { email: string; password: string }){
    const { email, password } = formValue;
    signInWithEmailAndPassword(this.auth,email,password)
    .then((userCredential)=>{
      const user = userCredential.user;
      console.log('User logged in:', user);
      //rediret
      this.router.navigate(['/home']);
    })

    .catch((error)=>{
      alert(error.message);
      console.error('Error signing up:', error);
    })

  }

}
