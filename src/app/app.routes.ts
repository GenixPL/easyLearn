import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SetsMenuComponent } from './sets-menu/sets-menu.component';
import { CreateNewSetComponent } from './create-new-set/create-new-set.component';
import { SetsOnDeviceComponent } from './sets-on-device/sets-on-device.component';
import { ButtonImageComponent } from './ui/btn-img/btn-img.component';


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
  {
      path: 'sets-menu',
      component: SetsMenuComponent
  },
  {
      path: 'create-new-set',
      component: CreateNewSetComponent
  },
  {
	  path: 'sets-on-device',
	  component: SetsOnDeviceComponent
  },
];

export const components: any = [
    HomeComponent,
    SetsMenuComponent,
	CreateNewSetComponent,
	SetsOnDeviceComponent,
	ButtonImageComponent
];
