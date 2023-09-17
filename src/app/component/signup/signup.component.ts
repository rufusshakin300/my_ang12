import { Component } from '@angular/core';
import {Auth, createUserWithEmailAndPassword,signInWithEmailAndPassword} from '@angular/fire/auth'
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(public auth:Auth,private router: Router){}
  
  onSignup(formValue: { email: string; password: string }){
    const { email, password } = formValue;
    createUserWithEmailAndPassword(this.auth,email,password)
    .then((userCredential)=>{
      const user = userCredential.user;
      console.log('User signed up:', user);
      //rediret
      this.router.navigate(['/login']);
    })

    .catch((error)=>{
      alert(error.message);
      console.error('Error signing up:', error);
    })


   
 }
}




  
  
  
   
    
   
    
    
    
    
    
    
  


