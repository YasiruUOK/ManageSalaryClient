import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private toast:NgToastService) { }
  value!: string;
  //email = new FormControl('', [Validators.email]);
  //userName = new FormControl('', [Validators.userName]);
  passwordsMatching = false;
  isConfirmPasswordDirty = false;
  confirmPasswordClass = 'form-control';
  newPassword = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);
  confirmPassword = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);
  userName = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c)
  ]);
  email = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    //Validators.email,
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
  ]);
  agreeCheckbox = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c)
  ]);
  
  loginForm = this.formBuilder.group(
    {
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword,
      userName:this.userName,
      email:this.email,
      agreed: new FormControl(false),
    },
    {
      validator: this.ConfirmedValidator('newPassword', 'confirmPassword'),
    }
  );


  onSubmit(): void {
    console.log(this.loginForm);
    if (!this.loginForm?.valid) {
      return;
    }
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  ngOnInit(): void {
  }
  // public loginForm = new FormGroup({
  //   username: new FormControl(''),
  //   email: new FormControl(''),
  //   password: new FormControl(''),
  //   confirmpassword: new FormControl(''),
  //   agreeCheckbox: new FormControl('')
  // });

  public RegisterUser(): void {
    // Logic to update the user will go here, but for now, we'll just log the values
    //console.log(
    //  this.loginForm.controls.username.value,
    //  this.loginForm.controls.email.value,
    //  this.loginForm.controls.password.value,
    //  this.loginForm.controls.confirmpassword.value,
    //  this.loginForm.controls.agreeCheckbox.value,
    //);
    const data = {
      "Id": "ssss",
      "userName": this.loginForm.controls['userName'].value,
      "email": this.loginForm.controls['email'].value,
      "password": this.loginForm.controls['newPassword'].value
    } 
    this.http.post('http://localhost:5136/api/User', data).subscribe((response: any) => {
      if(response=="User added sucessfully"){
        this.toast.success({detail:'Success',summary:'User added sucessfully', sticky:true,position:'tr'})
      }else{
        this.toast.error({detail:'Success',summary:'User already added', sticky:true,position:'tr'})
      }
      
    });
  }
}
