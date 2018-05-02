import { Component } from '@angular/core';

import { ImageRecognitionPage } from '../image-recognition/image-recognition';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ImageRecognitionPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
