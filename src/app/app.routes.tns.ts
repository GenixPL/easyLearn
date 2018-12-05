import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component.tns';

export const routes: Routes = [
  {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full',
  },
  {
      path: 'home',
      component: HomeComponent,
  },
];
