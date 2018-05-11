import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'overloaping-3D',
  templateUrl: 'overloaping-3D.html'
})
export class Overloaping3D {

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    console.log('Hello ARView Page');
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
      "www/assets/wikitude-tab3/index.html", 
      ["ir"],  
      <JSON>startupConfiguration
    );
  }

}
