import { Injectable } from '@angular/core'

import { Employee } from './home/Employee.1'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee: Employee | null = null;
  private employees: Employee[] = [];
  setSelectedEmployee(employee: Employee) {
    this.selectedEmployee = employee;
  }
  setEmployees(employees: Employee[]) {
    this.employees = employees;
  }
  

  constructor(private http: HttpClient) {
    
   }
  
  private apiUrl = 'https://tu-ang-default-rtdb.firebaseio.com/employees.json';
 
  getEmployeeNames(): Observable<string[]> {
    
    return this.http.get<string[]>(this.apiUrl);
      

  }
  
}




