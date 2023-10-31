import { Component } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isAuthenticated = false;
  constructor(public auth: Auth) { }
  // Implement your authentication logic here

  logout() {
    // Implement logout logic here
    this.isAuthenticated = false;
    signOut(this.auth).then(() => {
      console.log('logOut!');
    })
      .catch((error) => {
        console.log('An error happened.')
      });
  }

}
