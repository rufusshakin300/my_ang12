import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isAuthenticated = false;

  // Implement your authentication logic here

  logout() {
    // Implement logout logic here
    this.isAuthenticated = false;
  }

}
