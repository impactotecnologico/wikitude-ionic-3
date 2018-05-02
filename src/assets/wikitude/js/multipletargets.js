var World = {
	loaded: false,

	init: function initFn() {
		this.createOverlays();
	},

	createOverlays: function createOverlaysFn() {
		

		/**
		Carga de WTC propio con imágenes de reconocimiento propias
		*/

		this.targetCollectionResource = new AR.TargetCollectionResource("assets/propios.wtc", {
		});

		this.tracker = new AR.ImageTracker(this.targetCollectionResource, {
			onTargetsLoaded: this.worldLoaded,
            onError: function(errorMessage) {
            	alert(errorMessage);
            }
		});

		/*
			Creación de primer elemento a superponer: 
			Imagen ubicada según coordenadas x & y. 
			El valor corresponde de forma proporcional al tamaño de la imagen reconocida.
			Si se asigna 1.0 a X, se posiciona desde el centro hacia la derecha una vez el tamaño de la imagen reconocida
		*/
		var imgOne = new AR.ImageResource("assets/one.png");
		var overlayOne = new AR.ImageDrawable(imgOne, 1, {
			translate: {
				x: -1.0,
				y: -1.0
			},
			rotate : { z: 90 },
			onClick : function() {
				this.rotate.z += 10;
			},
			zOrder: 1
		});

		// Creación de botón. Puede apuntar a una url, no es obligatorio
		this.imgButton = new AR.ImageResource("assets/BOTON.png");
		var pageOneButton = this.createWwwButton("http://www.impactotecnologico.net", 0.15, {
			translate: {
				x: 0.5,
				y: 0.0
			},
			zOrder: 2
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
		}, 1.0, {
			viewportWidth: 820,
			viewportHeight: 670,
			backgroundColor: "#FFFFFF",
			translate: { x: 1.0, y: 1.0 },
			horizontalAnchor: AR.CONST.HORIZONTAL_ANCHOR.RIGHT,
			verticalAnchor: AR.CONST.VERTICAL_ANCHOR.TOP,
			clickThroughEnabled: true,
			allowDocumentLocationChanges: false,
			onDocumentLocationChanged: function onDocumentLocationChangedFn(uri) {
				AR.context.openInBrowser(uri);
			}
		});


		/*
			La clase ImageTrackable representa al elemento que une los elementos aumentados 
			en relación a un target (en este ejemplo, una imagen por eso es ImageTrackable)
			El segundo parámetro es el nombre del elemento en la colección que quiere usarse
			para reconocer en el escaneo
		*/
		var logoTecnoboda = new AR.ImageTrackable(this.tracker, "POSITIVO A COLOR ISOTIPO", {
			drawables: {
				cam: [overlayOne, pageOneButton, htmlElement]
			},
			onImageRecognized: this.removeLoadingBar,
            onError: function(errorMessage) {
            	alert(errorMessage);
            }
		});

		var logoJD = new AR.ImageTrackable(this.tracker, "logo-jdrone-isotipo", {
			drawables: {
				cam: [overlayOne, pageOneButton, htmlElement]
			},
			onImageRecognized: this.removeLoadingBar,
            onError: function(errorMessage) {
            	alert(errorMessage);
            }
		});

		var logoIT = new AR.ImageTrackable(this.tracker, "favicon-3d", {
			drawables: {
				cam: [overlayOne, pageOneButton, htmlElement]
			},
			onImageRecognized: this.removeLoadingBar,
            onError: function(errorMessage) {
            	alert(errorMessage);
            }
		});

		var logoCDI = new AR.ImageTrackable(this.tracker, "CDI Isotipo I", {
			drawables: {
				cam: [overlayOne, pageOneButton, htmlElement]
			},
			onImageRecognized: this.removeLoadingBar,
            onError: function(errorMessage) {
            	alert(errorMessage);
            }
		});

	},

	createWwwButton: function createWwwButtonFn(url, size, options) {
	/*
		Los botones requieren que se pase el evento con options.onClick para que sea 
		clicleable. La función que se ejecuta puede tener el comportamiento que se quiera,
		en este caso abrir una url

	*/
		options.onClick = function() {
			AR.context.openInBrowser(url);
		};
		return new AR.ImageDrawable(this.imgButton, size, options);
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
	}
};

World.init();
