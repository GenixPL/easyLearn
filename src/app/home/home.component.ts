import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SetsMenuComponent } from '../sets-menu/sets-menu.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'easyLearn';

  constructor(private router:Router) { }

  ngOnInit() {
  }

  moveToSetsMenuComponent() {
    this.router.navigate(["sets-menu"]);
  }

}
