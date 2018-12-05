import { Routes } from '@angular/router';

import { AuthComponent } from '../auth/auth.component.tns';
import { FacebookAuthComponent } from '../auth/facebook-auth/facebook-auth.component.tns';
import { GoogleAuthComponent } from '../auth/google-auth/google-auth.component.tns';
import { SignInEmailPasswordComponent } from '../auth/email-password-auth/sign-in-email-password/sign-in-email-password.component.tns';
import { SignUpEmailPasswordComponent } from '../auth/email-password-auth/sign-up-email-password/sign-up-email-password.component.tns';
import { CreateNewSetComponent } from '../managing-sets/create-new-set/create-new-set.component.tns';
import { HomeComponent } from '../home/home.component.tns';
import { MarketComponent } from '../managing-sets/market/market.component.tns';
import { SetsMenuComponent } from '../managing-sets/sets-menu/sets-menu.component.tns';
import { SetsOnDeviceComponent } from '../managing-sets/sets-on-device/sets-on-device.component.tns';


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
	{
		path: 'facebook-auth',
		component: FacebookAuthComponent
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
	GoogleAuthComponent, 
	FacebookAuthComponent
];
