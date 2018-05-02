# Wikitude-Ionic 3 - Demo

Demo de integración del plugin cordova de wikitude en una app ionic 3.

## Pasos iniciales

Se siguieron los pasos iniciales de https://www.wikitude.com/external/doc/documentation/latest/phonegap/setupguidecordovacli.html#PhoneGapEmptyApp hasta el paso 6 (cordova build)

## Pasos Angular 4

### Inclusión de Wrapper

El wrapper se encuentra en src/app/WikitudePlugin.d.ts

### Carga de arquitectura para ejecución

El app.component tiene 3 configuraciones muy importantes:

- SDK Licence Key: está seteada una licencia demo. Se deberá cambiar por la licencia real
- Verificación de soporte por el dispositivo: se tiene una verificación para informar si el dispositivo en uso soporta el SDK
- Carga de conectividad Ionic - Wikitude: bloque de código que establece la comunicación vía js entre Ionic y la librería

### Ejecución

Para ejecutar el reconocimiento y realida aumentada se añade la carga de arquitectura en el evento ionViewDidEnter. El código propio del plugin de wikitude para realizar el reconocimiento y la aplicación de realidad aumentada debe estar en un archivo en javascript ya que las funciones no están disponibles en typescript.

Para ejecutar este ejemplo se tienen imagenes de ejemplo para reconocer en la carpeta target-images

#### Assets 

La carpeta assets del proyecto debe tener una carpeta con nombre "wikitude" (puede cambiarse en todos los lugares donde se utilice) donde estarán los assets para realidad aumentada: 

+ assets
  + Colección de targets: archivo wtc obtenido del Target Manager de Wikitude
  + Componentes para aumentar: conjunto de imágenes, vídeo, objetos 3D, etc
+ js 
  + *.js: archivo o archivos js con el código de realidad aumentada de wikitude
