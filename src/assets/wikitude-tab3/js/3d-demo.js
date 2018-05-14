var World = {
	loaded: false,
	rotating: false,
	resourcesLoaded: false,
	resource3DLoaded: false,
	arrow: false,

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
			uri: "http://technoimpact.net/impact/signature/"
		}, 1.5, {
			viewportWidth: 820,
			viewportHeight: 670,
			backgroundColor: "#FFFFFF",
			translate: { x: -2.2, y: -4.2 },
			horizontalAnchor: AR.CONST.HORIZONTAL_ANCHOR.RIGHT,
			verticalAnchor: AR.CONST.VERTICAL_ANCHOR.TOP,
			clickThroughEnabled: true,
			allowDocumentLocationChanges: false,
			onDocumentLocationChanged: function onDocumentLocationChangedFn(uri) {
				AR.context.openInBrowser(uri);
			}
		});

		// Inclusión de Objeto 3D
		this.modelCar = new AR.Model("assets/corazon3D.wt3", {
			onLoaded: function () {
				World.resource3DLoaded = true;
				this.removeloading3DWorld;
			},
			scale: {
				x: 0.045,
				y: 0.045,
				z: 0.045
			},
			translate: {
				x: 0.8,
				y: 0.8,
				z: 0.8
			},
			rotate: {
				roll: -25
			}
		});

		// Inclusión de flecha
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
				cam: [htmlElement]
			},
			onImageRecognized: this.removeLoadingBar,
            onError: function(errorMessage) {
            	alert(errorMessage);
            }
		});

		var logoCDI = new AR.ImageTrackable(this.tracker, "CDI Isotipo I", {
			drawables: {
				cam: [this.modelCar]
			},
			onImageRecognized: this.removeLoadingBar,
            onError: function(errorMessage) {
            	alert(errorMessage);
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

		document.getElementById('b3').addEventListener('click', function() { World.arrow.enabled = true; }, false);
	}
};

World.init();