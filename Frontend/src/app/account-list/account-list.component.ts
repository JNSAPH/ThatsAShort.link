import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {

  readonly ROOT_URL = "http://localhost:3000/TASL"
  //readonly ROOT_URL = document.location.origin + "/TASL"
  response: any;
  user: any = localStorage.getItem('username');

  constructor(private http: HttpClient, private router: Router,) { }

  ngOnInit(): void {
    if (!localStorage.getItem('loggedin')) this.router.navigateByUrl("admin/login");

    this.http.post(this.ROOT_URL + '/getAccounts', {}, {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('jwt'),
      }),
    })
    .subscribe((data) => {
      this.response = data
      console.log(data)
    });
  }

  deleteAccount(uname) {
    if(uname == localStorage.getItem("username")) return console.log("Deleting your own Account isn't possible.")
 

    this.http.post(this.ROOT_URL + '/deleteAccount', {}, {
      headers: new HttpHeaders({
        'authorization':localStorage.getItem('jwt'),
        'username': uname
      })
    })
    .subscribe((data: any) => {
      console.log(data)
      this.ngOnInit();
    })
  } 

}
