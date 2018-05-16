import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-animation',
  templateUrl: 'animation.html'
})
export class Animation {

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    console.log('Hello Animation Page');
  }

  ionViewDidEnter() {

    var startupConfiguration: any = {"camera_position": "back"};

    WikitudePlugin.loadARchitectWorld(
      function(success) {
        console.log("ARchitect World loaded successfully.");
      },
      function(fail) {
        console.log("Failed to load ARchitect World!");
      },          
      "www/assets/wikitude-tab4/index.html", 
      ["ir"],  
      <JSON>startupConfiguration
    );
  }

}
