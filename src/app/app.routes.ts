import { Routes } from '@angular/router';
import { from } from 'rxjs';

import { HomeComponent } from './home/home.component';
import { SetsMenuComponent } from './sets-menu/sets-menu.component';
import { CreateNewSetComponent } from './create-new-set/create-new-set.component';
import { SetsOnDeviceComponent } from './sets-on-device/sets-on-device.component';
import { MarketComponent } from './market/market.component';
import { AuthComponent } from './auth/auth.component';
import { SignInEmailPasswordComponent } from './auth/sign-in-email-password/sign-in-email-password.component';
import { SignUpEmailPasswordComponent } from './auth/sign-up-email-password/sign-up-email-password.component';
import { GoogleAuthComponent } from './auth/google-auth/google-auth.component';


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
  	{
		path: 'market',
		component: MarketComponent
	},
	{
		path: 'auth',
		component: AuthComponent
	},
	{
		path: 'sign-in-email-password',
		component: SignInEmailPasswordComponent
	},
	{
		path: 'sign-up-email-password',
		component: SignUpEmailPasswordComponent
	},
	{
		path: 'google-auth',
		component: GoogleAuthComponent
	},
];


export const components: any = [
    HomeComponent,
    SetsMenuComponent,
	CreateNewSetComponent,
	SetsOnDeviceComponent,
	MarketComponent,
	AuthComponent,
	SignInEmailPasswordComponent,
	SignUpEmailPasswordComponent,
	GoogleAuthComponent
];
