var World = {
	loaded: false,
	rotating: false,
	resourcesLoaded: false,
	resource3DLoaded: false,
	arrow: false,
	arrow3D: false,

	init: function initFn() {
		this.createOverlays();
	},

	createOverlays: function createOverlaysFn() {
		

		/**
		Carga de WTC propio con imágenes de reconocimiento propias
		*/

		this.targetCollectionResource = new AR.TargetCollectionResource("assets/propios.wtc", {
			onLoaded: function () {
				World.resourcesLoaded = true;
				this.worldLoaded;
			},
		});


		/*
			onTargetsLoaded: en este punto se carga la función que muestra la capa de instrucciones => this.worldLoaded
		*/
		this.tracker = new AR.ImageTracker(this.targetCollectionResource, {
			onTargetsLoaded: this.worldLoaded,
            onError: function(errorMessage) {
            	alert("OnError: " + errorMessage);
            }
		});

		/*
			Objeto Html superpuesto. 
			El segundo parámetro es el ancho porcentual según el elemento reconocido
			En las opciones está el alto y ancho de la vista
			En el caso de traslación, los valores parten desde el centro de la imagen.
			Una vez ubicado el punto de display se presenta el elemento ubicando ahí 
			la esquina superior derecha de la página.

		*/

		var htmlElement = new AR.HtmlDrawable({
			uri: "assets/html/info1.html"
		}, 1.8, {
			viewportWidth: 900,
			viewportHeight: 700,
			backgroundColor: "#FFFFFF",
			translate: { 
				x: -2.2, 
				y: -2.2, 
				z: 4.0 
			},
			horizontalAnchor: AR.CONST.HORIZONTAL_ANCHOR.RIGHT,
			verticalAnchor: AR.CONST.VERTICAL_ANCHOR.TOP,
			clickThroughEnabled: true,
			allowDocumentLocationChanges: false,
			onDocumentLocationChanged: function onDocumentLocationChangedFn(uri) {
				AR.context.openInBrowser(uri);
			}
		});

		// Inclusión de Objeto 3D
		this.desfibrilador = new AR.Model("assets/desfibrilador.wt3", {
			onLoaded: function () {
				
			},
			scale: {
				x: 0.038,
				y: 0.038,
				z: 0.038
			},
			rotate: {
				x: -75,
				y: -14.0,
				z: 0.0
			},
			translate: {
				x: -1.2,
				y: -1.8,
				z: 1.9
			},
			zOrder: 0
		});

		// Inclusión de flecha 3D
		this.arrow3D = new AR.Model("assets/arrow.wt3", {
			scale: {
				x: 0.010,
				y: 0.010,
				z: 0.010
			},
			rotate: {
				x: -70,
				y: -14.0,
				z: -2.0
			},
			translate: {
				x: -1.2,
				y: -1.8,
				z: 1.5
			},
			enabled: false,
			zOrder: 1
		});

		// Inclusión de flecha 2D
		var arrow = new AR.ImageResource("assets/flecha.png");
		World.arrow = new AR.ImageDrawable(arrow, 1, {
			translate: {
				x: -0.3,
				y: -4.8
			},
			rotate : { z: 45 },
			onClick : function() {
				// this.rotate.z += 10;
			},
			enabled: false,
			zOrder: 1
		});


		/*
			La clase ImageTrackable representa al elemento que une los elementos aumentados 
			en relación a un target (en este ejemplo, una imagen por eso es ImageTrackable)
			El segundo parámetro es el nombre del elemento en la colección que quiere usarse
			para reconocer en el escaneo
		*/
		var logoTecnoboda = new AR.ImageTrackable(this.tracker, "POSITIVO A COLOR ISOTIPO", {
			enableExtendedTracking: true,
			drawables: {
				cam: [htmlElement, World.arrow]
			},
			onImageRecognized: this.removeLoadingBar,
            onError: function(errorMessage) {
            	alert(errorMessage);
            }
		});

		var logoJD = new AR.ImageTrackable(this.tracker, "logo-jdrone-isotipo", {
			drawables: {
				cam: [htmlElement, this.desfibrilador]
			},
			onImageRecognized: this.removeLoadingBar,
            onError: function(errorMessage) {
            	alert(errorMessage);
            }
		});

		var logoCDI = new AR.ImageTrackable(this.tracker, "CDI Isotipo I", {
			enableExtendedTracking: true,
			drawables: {
				cam: [this.desfibrilador, this.arrow3D]
			},
			onImageRecognized: this.removeLoadingBar,
            onError: function(errorMessage) {
            	alert(errorMessage);
			},
			onExtendedTrackingQualityChanged: function (targetName, oldTrackingQuality, newTrackingQuality) {

				var newBackgroundClass;

				switch(newTrackingQuality) {
					case -1:
						newBackgroundClass = 'trackingBad';
						break;
					case 0:
						newBackgroundClass = 'trackingMedium';
						break;
					default:
						newBackgroundClass = 'trackingGood';
						break;
				}

				var trackingIndicatorDiv = document.getElementById('trackingIndicator');

				if (this.backgroundClass) {
					trackingIndicatorDiv.classList.remove(this.backgroundClass);
				}

				this.backgroundClass = newBackgroundClass;

				// add color indication class to the trackingIndicator div
				trackingIndicatorDiv.classList.add(this.backgroundClass);
			}
		});


		

	},

	/*
		Función para ocultar la capa de información
	*/
	removeLoadingBar: function() {
		if (!World.loaded) {
			var e = document.getElementById('loadingMessage');
			e.parentElement.removeChild(e);
			World.loaded = true;
		}
	},


	worldLoaded: function worldLoadedFn() {
		var cssDivInstructions = " style='display: table-cell;vertical-align: middle; text-align: right; width: 50%; padding-right: 15px;'";
		var cssDiv1 = " style='display: table-cell;vertical-align: middle; text-align: left; padding-right: 15px; width: 38px'";
		document.getElementById('loadingMessage').innerHTML =
			"<div" + cssDivInstructions + ">Escanea cada logo individual</div>" +
			"<div" + cssDiv1 + "><img src='assets/cdi.png'></img> <img src='assets/jdrone.png'></img></div>" +
			"<div" + cssDiv1 + "><img src='assets/tecnoboda.jpg'></img> <img src='assets/it3d.jpg'></img> </div>" ;

		//boton 1
		document.getElementById('b1').addEventListener('click', function() { 
			World.arrow.enabled = false; 
			World.arrow3D.enabled = true; 
		}, false);

		//boton 2
		document.getElementById('b1').addEventListener('click', function() { 
			World.arrow.enabled = false; 
			World.arrow3D.enabled = false; 
		}, false);
		
		
		//boton 3
		document.getElementById('b3').addEventListener('click', function() { 
			World.arrow.enabled = true; 
		}, false);

		// boton 4
		document.getElementById('b4').addEventListener('click', function() { 
			World.arrow.enabled = false; 
		}, false);
	}
};

World.init();