import { Component } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth'
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(public auth: Auth, private router: Router) { }
  logout() {
    signOut(this.auth)
      .then(() => {
        // Remove the user information
        localStorage.removeItem('user'); // You can use localStorage or any other storage method
        console.log('User logged out.');
        // Redirect to the login page or any other desired page
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        alert(error.message);
        console.error('Error logging out:', error);
      });
  }
}

