import { Component, OnInit, NgModule, ViewChild, ElementRef } from '@angular/core';
import { Page, EventData } from 'ui/page';
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';
import * as Toast from 'nativescript-toast';
import { prompt, PromptResult, inputType, PromptOptions } from "tns-core-modules/ui/dialogs";
import { registerElement } from "nativescript-angular/element-registry";
import { Button } from "tns-core-modules/ui/button";

import { addNewSet } from '../helping-classes/file-operater.tns'

registerElement("FilterableListpicker", () => require("nativescript-filterable-listpicker").FilterableListpicker);

@NgModule({
  imports: [TNSCheckBoxModule],
})
export class YourModule {}

@Component({
  selector: 'app-create-new-set',
  templateUrl: './create-new-set.component.html',
  styleUrls: ['./create-new-set.component.css']
})
export class CreateNewSetComponent implements OnInit {

  @ViewChild('CB1') check_box_add_to_library: ElementRef;
  @ViewChild('myfilter') myfilter: ElementRef;

  addToLibrary:boolean = false;
  newSetName: string = "set-name";
  language1: string;
  language2: string;
  listitems = [
    {
      "title":"EN",
      "description": "English"
    }, 
    {
      "title":"DE",
      "description": "German"
    },
  ];
  lastLanguage: string;

  constructor(private page:Page) {
    page.actionBarHidden = true;
  }

  ngOnInit() {
  }

  triggerCheckBox() {
    this.addToLibrary = !this.addToLibrary;
    Toast.makeText(String(this.addToLibrary)).show();
  }

  changeSetNameDialog() {
    let options: PromptOptions = {
      title: "Give new name:",
      defaultText: this.newSetName,
      inputType: inputType.text,
      okButtonText: "OK",
      cancelButtonText: "Cancel",
      cancelable: true
    };

    prompt(options).then((result: PromptResult) => {
      this.newSetName = result.text;
    });
  }

  

  cancelFilterableList() {
    this.lastLanguage = "";
  }

  itemTapped(args) {
    if (this.lastLanguage == "1") {
      this.language1 = args.selectedItem.title;
    } else {
      this.language2 = args.selectedItem.title;
    }
  }

  showPicker(event: EventData) {
    this.myfilter.nativeElement.show();

    let btn = <Button>event.object
    this.lastLanguage = btn.id;
  }

  saveSet() {
    let newSet = `{"setname": "${this.newSetName}", "firstLanguage": "${this.language1}", "secondLanguage": "${this.language2}"}`;

    addNewSet(this.newSetName, JSON.parse(newSet));
  }

}

export interface jsonSet {
  "setname": string;
  "firstLanguage": string;
  "secondLanguage": string;
}
