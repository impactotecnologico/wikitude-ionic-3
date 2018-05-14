import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-image-recognition',
  templateUrl: 'image-recognition.html'
})
export class ImageRecognitionPage {

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
      "www/assets/wikitude-tab2/index.html", 
      ["ir"],  
      <JSON>startupConfiguration
    );
  }

}
