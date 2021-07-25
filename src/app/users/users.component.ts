import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(1000)
      ]),
      transition('* => void', [
        animate(1000, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class UsersComponent implements OnInit {
  users: any = [];
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [];
  pageNumber = 1;
  isFlyIn: boolean = false;

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.loadUsers(this.pageNumber);
  }

  /**
   * loading the users according to the page number and getting the result from api
   * @param pageNumber 
   */
  loadUsers(pageNumber: Number) {
    this.http.getUsers(pageNumber).subscribe(resp => {
      this.users = resp['data'];
      this.length = resp['total'];
      this.pageSize = resp['per_page'];
      for (let i = this.pageSize; i <= this.length; i += this.pageSize) {
        this.pageSizeOptions.push(i)
      };
      this.isFlyIn = true;
    })
  }

  /**
   * this is an event method which gets executed when the user changes the page in pagination
   * @param event 
   */
  pageChange(event: any) {
    this.isFlyIn = false;
    this.loadUsers(event.pageIndex + 1);
  }

  /**
   * Opening the outlook to send email
   * @param email 
   */
  openOutlook(email:String) {
    window.location.href = 'mailto:'+email;
  }

}
