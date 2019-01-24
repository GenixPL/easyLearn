import { Routes } from '@angular/router';

import { AppComponent } from './app.component.tns';
import { AuthComponent } from '../auth/auth.component.tns';
import { CreateNewSetComponent } from '../managing-sets/create-new-set/create-new-set.component.tns';
import { HomeComponent } from '../home/home.component.tns';
import { MarketComponent } from '../managing-sets/market/market.component.tns';
import { SetsMenuComponent } from '../managing-sets/sets-menu.component.tns';
import { ShowMySetsComponent } from '../managing-sets/show-my-sets/show-my-sets.component.tns';
import { ManageSetComponent } from '../managing-sets/manage-set/manage-set.component.tns';
import { ListViewSetsComponent } from '../ui/listView-sets/listView-sets.component.tns';
import { AddWordsComponent } from '../managing-sets/manage-set/add-words/add-words.component.tns';
import { DisplaySetsComponent } from '../display-sets/display-sets.component.tns';
import { DisplaySetComponent } from '../display-sets/display-set/display-set.component.tns';


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
		path: 'market',
		component: MarketComponent
	},
	{
		path: 'auth',
		component: AuthComponent
	},
	{
		path: 'show-my-sets',
		component: ShowMySetsComponent
	},
	{
		path: 'manage-set',
		component: ManageSetComponent
	},
	{
		path: 'add-words',
		component: AddWordsComponent
	},
	{
		path: 'display-sets',
		component: DisplaySetsComponent
	},
	{
		path: 'display-set',
		component: DisplaySetComponent
	},
];


export const components: any = [
	AppComponent,
    HomeComponent,
    SetsMenuComponent,
	CreateNewSetComponent,
	MarketComponent,
	AuthComponent,
	ShowMySetsComponent,
	ManageSetComponent,
	ListViewSetsComponent,
	AddWordsComponent,
	DisplaySetsComponent,
	DisplaySetComponent
];
