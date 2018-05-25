function Url(controller, callback) {

	var m_this = this;

	var API_KEY = "IOYDQtQU";

	this.cities = "";

	this.selectedCity = "";

	this.restrictions = "";

	this.sort = "";

	this.controller = controller;

	this.jsonUrl = "";



	this.init = function() {

		m_this.sort = document.getElementById("sortby");

		if(m_this.sort.value != "sort") {

			m_this.sort = "&order_by=" + m_this.sort.value;
		}else{

			m_this.sort = "";
		}

		this.createJsonUrl();

		this.getCityData();
	};



	this.getCityData = function() {


	this.xhttp = new XMLHttpRequest();
	  this.xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		  m_this.handleData(this);
		}
	  };

	  this.xhttp.open("GET", "../Json/städer.json", true);
	  this.xhttp.send();

	  console.log("test1");

	};

	this.handleData = function(xhttp) {

		console.log("test2");

		m_this.cities = JSON.parse(xhttp.responseText);

		this.getActiveCity(m_this.cities);

	};



	this.getActiveCity = function(cities) {

		for(var i=0; i<cities.city.length; i++) {

			if(cities.city[i].name == sessionStorage.getItem("activeCity")) {

				m_this.selectedCity = cities.city[i];
				console.log("success");
				break;

			}else{
				console.log("fail");
				m_this.selectedCity = null;
			}
		}

		this.createUrl();

	};




	this.createUrl = function() {

		this.createRestrictions();

			this.method;

			if(m_this.selectedCity != "" && m_this.selectedCity != null) {

				this.method = "getFromLatLng&lat="+m_this.selectedCity.lat+"&lng="+m_this.selectedCity.lng+"&radius=15";
			}else {
				this.method = "getall";
			}

			this.url = "https://cactuar.lnu.se/smapi/api/?controller="+m_this.controller+"&method=" + this.method + m_this.restrictions + m_this.sort + "&debug=true&api_key=" + API_KEY;

			console.log(this.url);

		callback(this.url, m_this.jsonUrl);

	};



	this.createJsonUrl = function() {

		if(controller == "food") {

			m_this.jsonUrl = "../Json/restaurang2.json";

		}else if(controller == "shop") {

			m_this.jsonUrl = "../Json/gallerior.json"

		}else if(controller == "attraction") {

			m_this.jsonUrl = null;

		}else if(controller == "activity") {

			m_this.jsonUrl = "../Json/aktiviteter.json"

		}else if(controller == "accommodation") {

			m_this.jsonUrl = "../Json/boende.json"

		}else if(controller == "club") {

			m_this.jsonUrl = "../Json/nattklubbar.json"

		}
	};



	this.createRestrictions = function() {

		if(controller == "shop") {

			m_this.restrictions = "&categories=MALL,FOOD,BEAUTY,FASHION,LIQUOR"
		}

		if(controller == "club") {

			m_this.controller = "activity";

			m_this.restrictions = "&descriptions=Nattklubb"
		}
	};


}
