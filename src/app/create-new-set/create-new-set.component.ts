import { Component, OnInit, NgModule, ViewChild, ElementRef } from '@angular/core';
import { Page } from 'ui/page';
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';
import * as Toast from 'nativescript-toast';
import { prompt, PromptResult, inputType, PromptOptions } from "tns-core-modules/ui/dialogs";
import * as dialogs from "tns-core-modules/ui/dialogs";

@NgModule({
  imports: [TNSCheckBoxModule],
  // etc.
})
export class YourModule {}

@Component({
  selector: 'app-create-new-set',
  templateUrl: './create-new-set.component.html',
  styleUrls: ['./create-new-set.component.css']
})
export class CreateNewSetComponent implements OnInit {

  @ViewChild('CB1') check_box_add_to_library: ElementRef;

  addToLibrary:boolean = false;
  newSetName: string = "set name";
  language1: string;
  language2: string;

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

}
