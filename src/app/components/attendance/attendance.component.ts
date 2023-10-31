import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/home/Employee.1';
import { addDoc, collection, Firestore, getDocs, deleteDoc, doc } from '@angular/fire/firestore'
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  employees: Employee[] = [];
  employeeNames: any[] = [];
  name: string = '';
  date: Date = new Date();;
  status: string = '';
  allemployees: Employee[] = [];
  public data: any = [];
  public today: string;
  public selectedDate: string = '';
  @ViewChild('employeeOptions', { static: false })
  employeeOptions!: ElementRef;
  selectedEmployees: string[] = [];
  message: string = '';
  showMessageFlag: boolean = false;
  @ViewChild('attendanceForm', { static: false })
  attendanceForm!: NgForm;
  showPopup: boolean = false;


  constructor(private employeeService: EmployeeService, public firestore: Firestore, public dialog: MatDialog) {
    this.getdata()
    this.today = new Date().toISOString().slice(0, 10);
  }
  showMessage() {
    this.message = "Attendance submitted successfully!";
    this.showMessageFlag = true;

    // Set a timeout to make the message disappear after 3 seconds (3000 milliseconds).
    setTimeout(() => {
      this.message = '';
      this.showMessageFlag = false;
    }, 3000);
  }







  // async submitAttendance(formData: any) {
  //   // Reference the Firestore collection where you want to add the data
  //   const dbInstance = collection(this.firestore, 'attendance'); // Change 'attendance' to your actual collection name

  //   try {
  //     const selectedEmployeeName = formData.employeeName;
  //     const selectedStatus = formData.attendanceStatus;
  //     const selectedDate = formData.date;

  //     // Create an attendance record with the selected data
  //     const attendanceRecord = {
  //       employeeName: selectedEmployeeName,
  //       attendanceStatus: selectedStatus,
  //       date: selectedDate,
  //     };

  //     // Add the attendance record to Firestore
  //     const docRef = await addDoc(dbInstance, attendanceRecord);

  //     console.log('Attendance record added to Firestore with ID: ', docRef.id);
  //   } catch (error: any) {
  //     console.error('Error adding attendance record to Firestore: ', error);
  //     alert(error.message);
  //   }
  //   this.getdata()
  // }
  async submitAttendance(formData: any) {
    // Reference the Firestore collection where you want to add the data
    const dbInstance = collection(this.firestore, 'attendance'); // Change 'attendance' to your actual collection name

    try {
      // Get the selected employee names
      const selectedEmployeeNames = this.selectedEmployees;
      const selectedStatus = formData.attendanceStatus;
      const selectedDate = formData.date;

      // Iterate over selected employees and add attendance records for each
      for (const selectedEmployeeName of selectedEmployeeNames) {
        // Create an attendance record with the selected data
        const attendanceRecord = {
          employeeName: selectedEmployeeName,
          attendanceStatus: selectedStatus,
          date: selectedDate,
        };

        // Add the attendance record to Firestore
        const docRef = await addDoc(dbInstance, attendanceRecord);

        console.log('Attendance record added to Firestore with ID: ', docRef.id);

      }
      this.attendanceForm.resetForm();
    } catch (error: any) {
      console.error('Error adding attendance record(s) to Firestore: ', error);
      alert(error.message);
    }
    this.getdata();
  }


  // getdata() {
  //   const dbInstance = collection(this.firestore, 'attendance');
  //   getDocs(dbInstance)
  //     .then((response) => {
  //       this.data = response.docs.map((item) => {
  //         return { ...item.data(), id: item.id };
  //       });
  //     });
  //   // .then((response) => {
  //   //   console.log(response.docs.map((item) => {
  //   //     return { ...item.data(), id: item.id }
  //   //   }))
  //   // })

  // }
  // getdata() {
  //   const dbInstance = collection(this.firestore, 'attendance');
  //   getDocs(dbInstance)
  //     .then((response) => {

  //       this.data = response.docs.map((item) => {
  //         return { ...item.data(), id: item.id };
  //       });

  //       // Filter the data for today's date (assuming today is in 'YYYY-MM-DD' format)
  //       const today = new Date().toISOString().slice(0, 10);
  //       this.data = this.data.filter((item: any) => item.date === today);
  //     });





  getdata() {
    const dbInstance = collection(this.firestore, 'attendance');
    getDocs(dbInstance)
      .then((response) => {
        this.data = response.docs.map((item) => {
          return { ...item.data(), id: item.id };
        });

        if (this.selectedDate) { // Check if a date is selected
          this.data = this.data.filter((item: any) => item.date === this.selectedDate);
        } else {
          // If no date is selected, show today's data
          this.data = this.data.filter((item: any) => item.date === this.today);
        }
      });
  }
  selectDate() {
    this.getdata(); // Refresh the data based on the selected date
  }
  deleteItem(id: string) {
    const dataToDelete = doc(this.firestore, 'attendance', id);
    deleteDoc(dataToDelete)
      .then(() => {
        alert('Data Deleted');
        this.getdata()
      })
      .catch((err) => {
        alert(err.message)
      })
  }



















  // ngOnInit() {
  //   // Call the service method to fetch employee names
  //   this.employeeService.getEmployeeNames().subscribe((namesObject: any) => {
  //     // Convert the object to an array of strings
  //     this.employeeNames = Object.values(namesObject);
  //     console.log(this.employeeNames)
  //     this.employeeNames.forEach((employee: any, index: number) => {
  //       console.log(`${index}: ${employee.employeeName}`);

  //     });
  //   });
  // }
  ngOnInit() {
    // Call the service method to fetch employee names
    this.employeeService.getEmployeeNames().subscribe((namesObject: any) => {
      // Convert the object to an array of strings
      this.employeeNames = Object.values(namesObject);
      console.log(this.employeeNames);

      // Use a for loop to iterate only up to the max length of the array
      for (let index = 0; index < this.employeeNames.length; index++) {
        const employee = this.employeeNames[index];
        console.log(`${index}: ${employee.employeeName}`);
      }
    });
  }








}
