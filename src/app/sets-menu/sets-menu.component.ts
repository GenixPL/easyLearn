import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sets-menu',
  templateUrl: './sets-menu.component.html',
  styleUrls: ['./sets-menu.component.css']
})
export class SetsMenuComponent implements OnInit {

  constructor(private router:Router) { 

  }

  ngOnInit() {
  }

  moveToHomeComponent() {
    this.router.navigate(["home"]);
  }

}
