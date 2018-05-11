import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { ImageRecognitionPage } from '../image-recognition/image-recognition';
import { Overloaping3D } from '../overloaping-3D/overloaping-3D';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ImageRecognitionPage;
  tab3Root = Overloaping3D;

  constructor() {

  }
}
