// create-employee.component.ts
import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {


    employee: Employee = new Employee();
    firstNameError: string | null = null;
    lastNameError: string | null = null;
    ageError: string | null = null;
    contactError: string | null = null;
  
    constructor(private employeeService: EmployeeService, private router: Router) { }
  
    ngOnInit(): void {
      // Initialize error variables to null on component initialization
      this.resetErrors();
    }
  
    private resetErrors(): void {
      this.firstNameError = null;
      this.lastNameError = null;
      this.ageError = null;
      this.contactError = null;
    }
  
    isAlphaOnly(value: string): boolean {
      return /^[a-zA-Z]*$/.test(value);
    }
  
    isYoungerThan18(dob: Date | null): boolean {
      if (dob === null || dob === undefined) {
        return false;
      }
  
      const today = new Date();
      const dobDate = new Date(dob);
      const age = today.getFullYear() - dobDate.getFullYear();
      return age <= 18;
    }
  
    isValidContactNumber(contactNumber: string): void {
      const isValidFormat = /^\d{10}$/.test(contactNumber);
  
      if (!isValidFormat) {
          this.contactError = 'Please enter a valid 10-digit contact number.';
          const contactElement = document.getElementById('contactNumber');
          if (contactElement) {
              contactElement.focus();
          }
      } else {
          this.contactError = null; // Reset contactError if the format is valid
      }
  }
    saveEmployee(): void {
      this.employeeService.createEmployee(this.employee).subscribe(data => {
        console.log(data);
        this.goToEmployeeList();
      },
      error => console.log(error));
    }
  
    goToEmployeeList(): void {
      this.router.navigate(['/employees']);
    }
  
    onSubmit(): void {
      // Reset error messages on each submission
      this.resetErrors();
  
      if (!this.isAlphaOnly(this.employee.firstName)) {
        this.firstNameError = 'Please enter alphabets only.';
      }
  
      if (!this.isAlphaOnly(this.employee.lastName)) {
        this.lastNameError = 'Please enter alphabets only.';
      }
  
      if (!this.isYoungerThan18(this.employee.dob)) {
        this.ageError = 'Age must be 18 or greater.';
      }
  
      
  
      console.log(this.employee);
      this.saveEmployee();
    }
  }