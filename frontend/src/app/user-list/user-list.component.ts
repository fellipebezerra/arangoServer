import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getUsers().subscribe((users: any[]) => {
      this.users = users;
    });
  }
}
