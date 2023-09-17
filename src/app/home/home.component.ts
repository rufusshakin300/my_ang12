import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';

interface Employee {
  id: string;
  employeeName: string;
  mobileNo: string;
  role: string;
  status: 'attended' | 'unattended'; 



}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allemployees: Employee[] = []; // Initialize as an empty array or with your data
  editMode: boolean = false;
  showForm: boolean = false;
  @ViewChild('employeeForm.value')
  form!: NgForm;
  status: string = 'click';
 


  constructor(private http: HttpClient) {}
  toggleStatus(employee: Employee) {
    employee.status = employee.status === 'attended' ? 'unattended' : 'attended';
    this.updateEmployee(employee);
  }
  

  ngOnInit() {
    this.getdata();
  }

  CreateEmployee() {
    this.getdata();
  }

  // Add an employee
  addEmployee(employees: { employeeName: string; mobileNo: string; role: string }) {
    console.log(employees);
    this.http.post('https://tu-ang-default-rtdb.firebaseio.com/employees.json', employees).subscribe(res => {
      console.log(res);
    });
  }

  // Update an employee
  updateEmployee(employee: Employee) {
    let  employeeId = employee.id;
    // let cur_employee= this.allemployees.find((e)=>{return e.id === employeeId})
    // console.log(this.form);
  //   //setform
  //   this.form.setValue({
  //   employeeName: cur_employee.employeeName,
  //   mobileNo: cur_employee.mobileNo,
  //   role: cur_employee.role,
    
  // })

    this.http
      .put(`https://tu-ang-default-rtdb.firebaseio.com/employees/${employeeId}.json`, employee)
      .subscribe(() => {
        console.log(employee);
        let cur_employee= this.allemployees.find((e)=>{return e.id === employeeId})
        console.log(this.form);
       
        // if (cur_employee) {
        //   // Check if cur_employee is not undefined
        //   this.form.setValue({
        //     employeeName: cur_employee.employeeName,
        //     mobileNo: cur_employee.mobileNo,
        //     role: cur_employee.role,
        //   });
        // }
    
    
    
     });
    
  // })
        
       
     
      
  }
  

  private getdata() {
    this.http
      .get<{ [key: string]: Employee }>('https://tu-ang-default-rtdb.firebaseio.com/employees.json')
      .pipe(
        map(res => {
          const employees = [];
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              employees.push({ ...res[key], id: key });
            }
          }
          return employees;
        })
      )
      .subscribe(employees => {
        console.log(employees);
        this.allemployees = employees;
      });
  }

  // Rest of your component code...
  deleteEmployee(id: string) {
    this.http.delete(`https://tu-ang-default-rtdb.firebaseio.com/employees/${id}.json`)
    .subscribe();
  }
}
