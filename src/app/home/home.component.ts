import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Employee } from './Employee.1';
import { EmployeeService } from '../employee.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  [x: string]: any;
  allemployees: Employee[] = []; // Initialize as an empty array or with your data
  editMode: boolean = false;
  showForm: boolean = false;
  @ViewChild('employeeForm')
  form!: NgForm;
  status: string = 'click';


  employee: Employee | null = null;

  constructor(private http: HttpClient, private employeeService: EmployeeService) { }

  toggleStatus(employee: Employee) {
    employee.status =
      employee.status === 'attended' ? 'unattended' : 'attended';
    this.updateEmployee(employee);
  }




  selectEmployee(employee: Employee) {
    this.employeeService.setSelectedEmployee(employee);
  }

  ngOnInit() {
    this.getdata();
  }
  // CreateEmployee() {
  //   this.getdata();

  // }

  // Add an employee
  addEmployee(employees: {
    employeeName: string;
    mobileNo: string;
    role: string;
  }) {
    console.log(employees);
    this.http
      .post(
        'https://tu-ang-default-rtdb.firebaseio.com/employees.json',
        employees
      )
      .subscribe((res) => {
        console.log(res);
        this.getdata();
      });
  }

  // Update an employee
  updateEmployeeRecord(updatedEmployeeData: {
    employeeName: string;
    mobileNo: string;
    role: string;
  }) {
    if (this.employee) {
      const updatedEmployee: Employee = {
        ...this.employee,
        ...updatedEmployeeData
      };

      // Update the local data
      this.updateEmployee(updatedEmployee);
      this.editMode = false;

      // Reset the form
      this.form.reset();

      // Store the employee ID in a variable
      const employeeId = this.employee.id;
      if (employeeId) {
        this.http
          .put(
            `https://tu-ang-default-rtdb.firebaseio.com/employees/${employeeId}.json`,
            updatedEmployee
          )
          .subscribe(() => {
            console.log("Employee data updated on Firebase.");
            this.getdata();

            // Now, set this.employee to null after the update is complete
            this.employee = null;
          });
      }
    }
  }



  updateEmployee(employee: Employee) {
    let employeeId = employee.id;
    this.editMode = true; // Set editMode to true
    this.employee = employee;

    // Populate the form with employee data
    this.form.setValue({
      employeeName: employee.employeeName,
      mobileNo: employee.mobileNo,
      role: employee.role
    });

  }




  private getdata() {
    this.http
      .get<{ [key: string]: Employee }>(
        'https://tu-ang-default-rtdb.firebaseio.com/employees.json'
      )
      .pipe(
        map((res) => {
          const employees = [];
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              employees.push({ ...res[key], id: key });
            }
          }
          return employees;
        })
      )
      .subscribe((employees) => {
        console.log(employees);
        this.allemployees = employees;
        // Set the employees in the EmployeeService
        this.employeeService.setEmployees(employees);
      });
  }

  // Rest of your component code...
  deleteEmployee(id: string) {
    this.http
      .delete(`https://tu-ang-default-rtdb.firebaseio.com/employees/${id}.json`)
      .subscribe();
    this.getdata();
  }
  // Inside your HomeComponent or relevant component
}