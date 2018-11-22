import { Component } from '@angular/core';


@Component({
  selector: 'btn-img',
  templateUrl: './btn-img.component.html',
  styleUrls: ['./btn-img.component.css']
})


export class ButtonImageComponent {
	
	onTappedFun(){
    	console.log("Hey i was tapped");
	}
}