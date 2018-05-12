import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from "@angular/forms";
import 'rxjs/add/operator/debounceTime'


function passwordMatcher(c: AbstractControl):{[key:string]:boolean}|null{
  let passwordControl = c.get('password');
  let confirmPasswordControl = c.get('cPassword');
  if(passwordControl.pristine || confirmPasswordControl.pristine)
    return null;
  if(passwordControl.value === confirmPasswordControl.value)
    return null;
  return {'matchPasswords':true};
}

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;
  userExists:boolean=false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.userForm = this.formBuilder.group({
      firstName: ['',[Validators.required, Validators.minLength(3)]],
      lastName:  ['',[Validators.required, Validators.maxLength(50)]],
      email:  ['',[Validators.required, Validators.email]],
      username:  ['',[Validators.required, Validators.minLength(3)]],
      password:  ['',[Validators.required, Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$')]],
      cPassword:  ['',[Validators.required]]
    });

    this.userForm.get('username').valueChanges.debounceTime(1000).subscribe(value=>{
      if(value==='admin')
        this.userExists=true;
      else this.userExists=false;
    })
  }

  populateTestData(){
    this.userForm.patchValue({
      email: 'jkowal@wp.pl',
      username: 'jkowal'
    });
  }


}
