import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TabsPage } from '../pages/tabs/tabs';
/// <reference path="WikitudePlugin.d.ts" />


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      WikitudePlugin._sdkKey = "L0Rcsk9805x/zGM5tbzwrpCt3HMmi3b9R4hGKLLppNYi7KuW554ffexSXYOfqUyefOlbRnl1EUFMhQCBG48zqsEfst7NAkBQnKdO/CbvkcwPgmI1LYzYmYZF4FmVtyX7x/LTyPngMyGAEc6Xm50nxwliwmJa6WlxpeEOnZyobO1TYWx0ZWRfX/fr1t7Olmo8Rb93/It8rbGGR707a++H3Z7pOwm2fccTptaM9Obc8HGmpaQ/gy1CyZDu9NovYiiCr8A7v1UYbLCq94YuVQdXhTiyBz7FRSnN3t8luVznP/fnue9kY5deRE5D4VtKjf/0k+rnDFMr+IAMGBf02SM1aYp5X17VikzyHmZxxwXzM1vWyJSbCN2aBB0+cnUx6Kh/xc7AI1yik3XfwETqCiwZuqNLTIwlXrIDjI57TyuHCqbmlMUd8MRdJE/k3hHL12FfmhR9aXle4cT6PSP9EE0gA5Wezo9t8hP4t/GuOUcSPWD1ZSwtYEnHWwce/ldo5js91wUmZW0Dnf8AK1kyHzfu2gJJV6bEAKNK84a0ChjfsfGqSKDiHRi4PyZb8G0rwhJDs8LGKxxucOQh0ol+bUPR6fWD6uJMqtFx8/knQn9pUs9X1YumjPghA4i5qnxi66dT7x0qInPl0oq1AMt+LNNX30LCbkvFoKuH2GBNNcjO7W0=";

      /** Check if your device supports AR */
      WikitudePlugin.isDeviceSupported(
          function(success) {
            console.log("Your platform supports AR/Wikitude. Have fun developing!!");
          },
          function(fail) {
            console.log("Your platform failed to run AR/Wikitude: "+fail);
          },
          [WikitudePlugin.FeatureGeo] // or WikitudePlugin.Feature2DTracking 
      );




      /** The Wikitude AR View creates it's own context. 
       * Communication between the main Ionic App and Wikitude SDK works 
       * through the function below for the direction Ionic app --> Wikitude SDK 
       * For calls from Wikitude SDK --> Ionic app see the captureScreen example in 
       * WikitudeIonic3StarterApp/www/assets/07_3dModels_6_3dModelAtGeoLocation/js/3dmodelatgeolocation.js*/
      // set the function to be called, when a "communication" is indicated from the AR View  
      WikitudePlugin.setJSONObjectReceivedCallback(obj => {

          console.log("setJSONObjectReceivedCallback ..."+JSON.stringify(obj));
          // this an example of how to receive a call from a function in the Wikitude SDK (Wikitude SDK --> Ionic)
          if (obj["action"]){
              switch (obj["action"]) {
                  case "closeWikitudePlugin":
                      // close wikitude plugin
                      WikitudePlugin.close();
                      break;
                  case "captureScreen":

                      WikitudePlugin.captureScreen(
                          (absoluteFilePath) => {
                              console.log("snapshot stored at:\n" + absoluteFilePath);
          
                              // this an example of how to call a function in the Wikitude SDK (Ionic2 app --> Wikitude SDK)
                              WikitudePlugin.callJavaScript("World.testFunction('Screenshot saved at: " + absoluteFilePath +"');");
                          },
                          (errorMessage) => {
                              console.log(errorMessage);
                          },
                          true, null
                      );

                      break;
                  default:
                      console.warn("action not handled => ", obj);
                      break;
              } // end switch
          } // end if (obj.action)
      });

      /**
       * Define the generic ok callback
       */
      WikitudePlugin.onWikitudeOK = function() {
          console.log("Things went ok.");
      }
      
      /**
       * Define the generic failure callback
       */
      WikitudePlugin.onWikitudeError = function() {
          console.log("Something went wrong");
      }

      // Just as an example: set the location within the Wikitude SDK, if you need this (You can get the geo coordinates by using ionic native 
      // GeoLocation plugin: http://ionicframework.com/docs/v2/native/geolocation/
      //WikitudePlugin.setLocation(47, 13, 450, 1);

      // for Android only
      WikitudePlugin.setBackButtonCallback(
          () => {
              console.log("Back button has been pressed...");
          }
      ); 





       
    });
  }
}
