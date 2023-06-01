import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(private formBuilder: FormBuilder, private dataService: DataService) { }

  ngOnInit(): void { }

  onSubmit() {
    if (this.userForm.valid) {
      this.dataService.createUser(this.userForm.value).subscribe(() => {
        console.log('User created successfully');
        this.userForm.reset();
      });
    }
  }
}
