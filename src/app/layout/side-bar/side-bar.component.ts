import { Component, OnInit } from '@angular/core';

interface Routers {
  route: string;
  icon: string;
}

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  routes: Array<Routers> = [
    {
      route: '/board/home',
      icon: 'dashboard',
    },
    {
      route: '/board/calendar',
      icon: 'calendar_today',
    },
    {
      route: '/board/users',
      icon: 'supervised_user_circle',
    }
  ];

  constructor() {}

  ngOnInit() {}
}
