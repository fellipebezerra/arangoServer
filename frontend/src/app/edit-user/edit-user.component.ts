import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userForm!: FormGroup;  // Adicione a exclamação para indicar que esses campos serão inicializados posteriormente.
  userId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userId = userId;
      this.dataService.getUser(this.userId).subscribe((user: any) => {
        this.userForm = this.formBuilder.group({
          name: [user.name, Validators.required],
          email: [user.email, [Validators.required, Validators.email]]
        });
      });
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.dataService.updateUser(this.userId, this.userForm.value).subscribe(() => {
        console.log('User updated successfully');
      });
    }
  }
}
