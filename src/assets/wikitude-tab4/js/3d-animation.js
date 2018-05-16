var World = {
	loaded: false,
	rotating: false,
	resourcesLoaded: false,

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

		
		// Inclusión de Objeto 3D
		this.horno = new AR.Model("assets/3dmodels/horno.wt3", {
			onLoaded: function () {
				
			},
			scale: {
				x: 0.388,
				y: 0.388,
				z: 0.388
			},
			rotate: {
				x: -90,
				y: -14.0,
				z: -10
			},
			translate: {
				x: -1.2,
				y: 1.8,
				z: 1.0
			},
			zOrder: 0
		});

		// Creación de elemento de animación
		this.appearingAnimation = this.createAppearingAnimation(this.horno, 0.045);

	
		/*
			La clase ImageTrackable representa al elemento que une los elementos aumentados 
			en relación a un target (en este ejemplo, una imagen por eso es ImageTrackable)
			El segundo parámetro es el nombre del elemento en la colección que quiere usarse
			para reconocer en el escaneo
		*/
		var logoTecnoboda = new AR.ImageTrackable(this.tracker, "POSITIVO A COLOR ISOTIPO", {
			enableExtendedTracking: true,
			drawables: {
				cam: [this.horno]
			},
			onImageRecognized: this.removeLoadingBar,
            onError: function(errorMessage) {
            	alert(errorMessage);
            }
		});

		var logoJD = new AR.ImageTrackable(this.tracker, "logo-jdrone-isotipo", {
			drawables: {
				cam: [this.horno]
			},
			onImageRecognized: this.removeLoadingBar,
            onError: function(errorMessage) {
            	alert(errorMessage);
            }
		});

	},

	createAppearingAnimation: function createAppearingAnimationFn(model, scale) {
		var sx = new AR.PropertyAnimation(model, "scale.x", 0, scale, 1500, {
			type: AR.CONST.EASING_CURVE_TYPE.EASE_OUT_ELASTIC
		});
		var sy = new AR.PropertyAnimation(model, "scale.y", 0, scale, 1500, {
			type: AR.CONST.EASING_CURVE_TYPE.EASE_OUT_ELASTIC
		});
		var sz = new AR.PropertyAnimation(model, "scale.z", 0, scale, 1500, {
			type: AR.CONST.EASING_CURVE_TYPE.EASE_OUT_ELASTIC
		});

		return new AR.AnimationGroup(AR.CONST.ANIMATION_GROUP_TYPE.PARALLEL, [sx, sy, sz]);
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
			"<div" + cssDivInstructions + ">Escanea cualquiera de los logos</div>" +
			"<div" + cssDiv1 + "><img src='assets/tecnoboda.jpg'></img> <img src='assets/jdrone.png'></img></div>";
		//World.appearingAnimation.start();
	}
};

World.init();