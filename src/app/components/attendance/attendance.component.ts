import { Component,OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/home/Employee.1';
import {addDoc,collection,Firestore} from '@angular/fire/firestore'

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit{
  employees: Employee[] = [];
  employeeNames: any[] = [];
  name: string='';
  date: Date = new Date(); ;
  status: string= '';
  allemployees: Employee[] = []; 
  constructor(private employeeService: EmployeeService,public firestore: Firestore) {}
  

// 
async submitAttendance(value: any) {
  // Reference the Firestore collection where you want to add the data
  const dbInstance = collection(this.firestore, 'attendance'); // Change 'attendance' to your actual collection name

  try {
    const commonDate = this.date; // Get the common date outside the loop

    // Loop through the employeeNames array to create attendance records for each employee
    for (let i = 0; i < this.employeeNames.length; i++) {
      // Create an attendance record for the current employee
      const attendanceRecord = {
        date: commonDate, // Use the common date
        employeeName: value[`employeeName${i}`], // Extract the employee name using the index
        attendanceStatus: value[`attendanceStatus${i}`], // Extract the attendance status using the index
      };

      // Add the attendance record to Firestore
      await addDoc(dbInstance, attendanceRecord);

      console.log(`Attendance record added for ${attendanceRecord.employeeName}`);
    }

    console.log('All attendance records added to Firestore');
  } catch (error: any) {
    console.error('Error adding attendance records to Firestore: ', error);
    alert(error.message);
  }
}








  
  ngOnInit() {
    // Call the service method to fetch employee names
    this.employeeService.getEmployeeNames().subscribe((namesObject: any) => {
      // Convert the object to an array of strings
      this.employeeNames = Object.values(namesObject);
      console.log(this.employeeNames)
      this.employeeNames.forEach((employee: any, index: number) => {
        console.log(`${index}: ${employee.employeeName}`);
        
      });
    });
   
    
  }
  

  

}
