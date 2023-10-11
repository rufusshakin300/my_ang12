
// employee.interface.ts

export interface Employee {
    id: string;
    employeeName: string;
    mobileNo: string;
    role: string;
    status: 'attended' | 'unattended';
    dailyAttendance: { date: string; status: 'attended' | 'unattended'; }[];
  }
  
