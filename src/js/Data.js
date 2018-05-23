function Data() {
	
	var m_this = this;
	var API_KEY = "IOYDQtQU";
	
	this.getState = false;

	this.foodDataDone = "";
	this.url = "";
	
	this.foodJson = "";
	this.shopData = "";
	this.attractionData = "";
	
	this.xhttp = "";
	this.data = [];
	this.result = "";
	
	this.foodUrl = "https://cactuar.lnu.se/smapi/api/?controller=food&method=getall&debug=true&api_key=" + API_KEY;
	
	this.shopUrl = "https://cactuar.lnu.se/smapi/api/?controller=shop&method=getall&debug=true&api_key=" + API_KEY;
	
	this.attractionUrl = "https://cactuar.lnu.se/smapi/api/?controller=attraction&method=getall&debug=true&api_key=" + API_KEY;
	
	//---------------------------------------------------------------------------------------------
	
	
	
	/*------------------------------------------------
	*
	* Initiate the methods to fetch all data
	*
	*-------------------------------------------------
	*/
	
	this.initFood = function(foodDataDone, url, jsonUrl) {

		m_this.foodDataDone = foodDataDone;

		m_this.url = url;

		console.log("testtest");

		this.getFoodJson(jsonUrl);
		
		//this.getFoodInfo(foodDataDone, url);
		
	};
	
	
	
	/*------------------------------------------------
	*
	* AJAX call to fetch all food related data
	*
	*-------------------------------------------------
	*/



	this.getFoodJson = function(jsonUrl) {

	  this.xhttp = new XMLHttpRequest();
	  this.xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		  m_this.handleJson(this);
		}
	  };
		
	  this.xhttp.open("GET", jsonUrl, true);
	  this.xhttp.send();
	};


	
	this.handleJson = function(xhttp) {
		
		this.food = JSON.parse(xhttp.responseText);
		
		m_this.foodJson = this.food;

		console.log("test");

		this.getFoodInfo(m_this.foodDataDone, m_this.url);
		
	};


	//--------------------

	
	this.getFoodInfo = function(foodDataDone, url) {

	  this.xhttp = new XMLHttpRequest();
	  this.xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		  m_this.handleData(this);
			foodDataDone(this);
		}
	  };
		
	  this.xhttp.open("GET", url, true);
	  this.xhttp.send();
	};
	
	this.foodDataDone = function(xhttpData) {
		
		console.log("Food Data loaded successfully");
		this.response = JSON.parse(xhttpData.responseText);

		console.log(m_this.foodJson);

		m_this.combine(this.response, m_this.foodJson);

		//Main.populateWebsite(this.result);
		
	};
	
	this.handleData = function(xhttp) {
		
		this.food = JSON.parse(xhttp.responseText);
		
		m_this.foodData = this.food;
		
	};
	
	
	
	/*------------------------------------------------
	*
	* AJAX call to fetch all shop related data
	*
	*-------------------------------------------------
	*/
	
	this.getShopInfo = function(shopDataDone, url) {

	  this.xhttp = new XMLHttpRequest();
	  this.xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		  m_this.handleData(this);
			shopDataDone(this);
		}
	  };
		
	  this.xhttp.open("GET", url, true);
	  this.xhttp.send();
	};
	
	this.shopDataDone = function(xhttpData) {
		console.log("Shop Data loaded successfully");
		this.response = JSON.parse(xhttpData.responseText);
		Main.populateWebsite(this.response);
	};
	
	this.handleData = function(xhttp) {
		
		m_this.shopData = JSON.parse(xhttp.responseText);
		
		m_this.data.push(m_this.shopData);
		
	};
	
	
	
	/*------------------------------------------------
	*
	* AJAX call to fetch all attraction related data
	*
	*-------------------------------------------------
	*/
	
	this.getAttractionInfo = function(attractionDataDone, url) {

	  this.xhttp = new XMLHttpRequest();
	  this.xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		  m_this.handleData(this);
			attractionDataDone(this);
		}
	  };
		
	  this.xhttp.open("GET", url, true);
	  this.xhttp.send();
	};
	
	this.attractionDataDone = function(xhttpData) {
		console.log("Attraction Data loaded successfully");
		this.response = JSON.parse(xhttpData.responseText);
		Main.populateWebsite(this.response);
	};
	
	this.handleData = function(xhttp) {
		
		m_this.attractionData = JSON.parse(xhttp.responseText);
		
		m_this.data.push(m_this.attractionData);
		
		m_this.getState = true;
		
	};
	
	
	
	/*------------------------------------------------
	*
	* AJAX call to fetch all activity related data
	*
	*-------------------------------------------------
	*/
	
	this.getActivityInfo = function(activityDataDone, url) {

	  this.xhttp = new XMLHttpRequest();
	  this.xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		  m_this.handleData(this);
			activityDataDone(this);
		}
	  };
		
	  this.xhttp.open("GET", url, true);
	  this.xhttp.send();
	};
	
	this.activityDataDone = function(xhttpData) {
		console.log("Activity Data loaded successfully");
		this.response = JSON.parse(xhttpData.responseText);
		Main.populateWebsite(this.response);
	};
	
	this.handleData = function(xhttp) {
		
		m_this.activityData = JSON.parse(xhttp.responseText);
		
		m_this.data.push(m_this.activityData);
		
		m_this.getState = true;
		
	};
	
	
	
	
	/*------------------------------------------------
	*
	* AJAX call to fetch all accommodation related data
	*
	*-------------------------------------------------
	*/
	
	this.getAccommodationInfo = function(accommodationDataDone, url) {

	  this.xhttp = new XMLHttpRequest();
	  this.xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		  m_this.handleData(this);
			accommodationDataDone(this);
		}
	  };
		
	  this.xhttp.open("GET", url, true);
	  this.xhttp.send();
	};
	
	this.accommodationDataDone = function(xhttpData) {
		console.log("Accommodation Data loaded successfully");
		this.response = JSON.parse(xhttpData.responseText);
		Main.populateWebsite(this.response);
	};
	
	this.handleData = function(xhttp) {
		
		m_this.accommodationData = JSON.parse(xhttp.responseText);
		
		m_this.data.push(m_this.accommodationData);
		
		m_this.getState = true;
		
	};
	
	
	
	/*------------------------------------------------
	*
	* AJAX call to fetch all club related data
	*
	*-------------------------------------------------
	*/
	
	this.getClubInfo = function(clubDataDone, url) {
		
	this.clubUrl = "https://cactuar.lnu.se/smapi/api/?controller=activity&method=getall&descriptions=Nattklubb&debug=true&api_key=" + API_KEY;

	  this.xhttp = new XMLHttpRequest();
	  this.xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		  m_this.handleData(this);
			clubDataDone(this);
		}
	  };
		
	  this.xhttp.open("GET", url, true);
	  this.xhttp.send();
	};
	
	this.clubDataDone = function(xhttpData) {
		console.log("Club Data loaded successfully");
		this.response = JSON.parse(xhttpData.responseText);
		Main.populateWebsite(this.response);
	};
	
	this.handleData = function(xhttp) {
		
		m_this.clubData = JSON.parse(xhttp.responseText);
		
		m_this.data.push(m_this.clubData);
		
		m_this.getState = true;
		
	};


	/*
	*--------------------------------------------------------------------------------
	*
	* Combines the JSON file with the SMAPI result and returns it to the Main class
	*
	*---------------------------------------------------------------------------------
	*/

	this.combine = function(obj1, obj2) {

		var result = Object.assign({},obj2, obj1);

		console.log(result);

		Main.populateWebsite(result);
	};
}