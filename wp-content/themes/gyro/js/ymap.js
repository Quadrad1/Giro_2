//-----  Yandex Map  -----//
ymaps.ready(function () {
	
	var myMap = new ymaps.Map('map', {
		center: [55.7325802772642, 37.64122749999994],
		zoom: 15,
		behaviors: ['default'],
		controls: ['zoomControl']
	}),
	clusterer = new ymaps.Clusterer({
		preset: 'islands#invertedBlueClusterIcons',
		groupByCoordinates: false,
		clusterDisableClickZoom: false,
		clusterHideIconOnBalloonOpen: false,
		geoObjectHideIconOnBalloonOpen: false
	}),
	getPointOptions = function() {
		return {
			preset: 'islands#blueIcon'
		};
	},
	getPointStyle = function() {
		return {
			iconLayout: 'default#image',
			iconImageHref: 'wp-content/themes/gyro/images/placemark.png',
			iconImageSize: [66, 82],
			iconImageOffset: [-33, -82]
		};
	},
	points = [
		[[55.7314802772642, 37.63466749999994], ['Москва, ул. Новокузнецкая 42с5, м. Павелецкая']]
	],
	geoObjects = [];

	// Создаем метки
	for(var i=0, len=points.length; i<len; i++) {
		geoObjects[i] = new ymaps.Placemark(points[i][0], {}, getPointStyle());
		myMap.geoObjects.add(geoObjects[i]);
	}
	
	// Отключаем зум при прокрутке
	myMap.behaviors.disable('scrollZoom');
	
})