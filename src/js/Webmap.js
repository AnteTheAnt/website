function Webmap() {
	
	var m_this = this;

	this.map = "";
	
	this.API_KEY = "AIzaSyA4DLFI01J0kW7oM2KrziTAM43Y05J8YYY";
	
	this.initMap = function() {
		
		m_this.map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 56.8874856, lng: 15.4927702},
          zoom: 11
        });

    };
	
	
		
	this.addMarker = function(coords, info) {
			
		var marker = new google.maps.Marker({position:coords,map:m_this.map});

		this.infoContent = '<div class="infoWindow"> <h4>'+info.name+'</h4> <p>'+info.description+'</p> </div>';

		var infoWindow = new google.maps.InfoWindow({
        	content: this.infoContent
    	});

    		google.maps.event.addListener(marker, 'click', function() {
        	infoWindow.open(m_this.map, marker);
    	});

	};
	

	
	this.getPosData = function(posData) {

		if(posData.payload) {

			for(var i=0; i<posData.payload.length; i++) {
				
				this.lat = posData.payload[i].lat;
				this.lng = posData.payload[i].lng;
				this.info = posData.payload[i];
				
				this.coords = {lat: parseFloat(this.lat), lng: parseFloat(this.lng)};
				
				this.addMarker(this.coords, this.info);

			}
		}else{

			this.lat = posData.lat;
			this.lng = posData.lng;
			this.info = posData;
			
			this.coords = {lat: parseFloat(this.lat), lng: parseFloat(this.lng)};
				
			this.addMarker(this.coords, this.info);
		}
		
		console.log("Map and markers loaded successfully");

		this.center = new google.maps.LatLng(this.coords.lat, this.coords.lng);

		m_this.map.panTo(this.center);
		
	};
	
}
