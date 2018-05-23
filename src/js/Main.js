//JavaScript Document

Main = {

	objs : "",
	
	init : function() {

		Main.path;
		Main.path = window.location.pathname;

		if(!Main.path.includes("objekt")) {

			Main.initSorting();

			Main.initCitySelection();

		}

		Main.initSavedList();

		Main.initRemoveSaves();

		Main.initData();

	},



	initData : function() {

		Main.path;
		Main.path = window.location.pathname;
		Main.page = Main.path.substring(Main.path.lastIndexOf('/')+1);
		
		if(Main.path.includes("shopping")) {
			
			Main.getShopUrl();
			
		}else if(Main.path.includes("rest")) {
			
			Main.getFoodUrl();
			
		}else if(Main.path.includes("sev")) {
			
			Main.getAttractionUrl();
			
		}else if(Main.path.includes("aktiviteter")) {
			
			Main.getActivityUrl();
			
		}else if(Main.path.includes("boende")) {
			
			Main.getAccommodationUrl();
			
		}else if(Main.path.includes("klubb")) {
			
			Main.getClubUrl();
			
		}else if(Main.path.includes("objekt")) {
			
			Main.infopage = new Infopage();
			Main.infopage.init();
			
		}
	},


	initSorting : function() {

		Main.sort;

		Main.sort = document.getElementById("sortby");

		console.log(Main.sort);

		Main.sort.addEventListener("change", Main.changeSorting);
	},



	changeSorting : function(event) {

		Main.initData(); //Update the data on website to match the new settings

		Main.initSaveEvents();

		Main.initSavedList();
	},



	initCitySelection : function() {

		Main.cityTitle;

		Main.cityTitle = document.getElementsByClassName("dropbtn");

		if(sessionStorage.getItem("activeCity")) {

			Main.cityTitle[0].innerHTML = sessionStorage.getItem("activeCity");
		}



		Main.dropDown;

		Main.dropDown = document.getElementsByClassName("citySelects");

		console.log(Main.dropDown);

		for(var i=0; i<Main.dropDown.length; i++) {

			Main.dropDown[i].addEventListener("click", Main.selectCity);
		}
		
	},



	initUrl : function(controller) {

		Main.url;

		Main.url = new Url(controller);

		Main.url.init();

		console.log(Main.url);

	},


	initSavedList : function() {

		Main.save;

		Main.save = new Save();

		Main.save.initArray();

		Main.save.initPopulate();
	},


	initRemoveSaves : function() {

		Main.removeBtns;

		Main.removeBtns = document.getElementsByClassName("fa fa-close");

		for(var i=0; i<Main.removeBtns.length; i++) {

			Main.removeBtns[i].addEventListener("click", Main.removeSavedElems);
		}
	},


	removeSavedElems : function(event) {

		Main.save;

		Main.save = new Save();

		Main.save.remove(event.target.parentNode);
	},



	selectCity : function(event) {

		Main.city;

		Main.city = new City();

		Main.selected;

		Main.selected = event.target;

		Main.city.init(Main.selected);


		Main.cityTitle;

		Main.cityTitle = document.getElementsByClassName("dropbtn");

		console.log(Main.cityTitle[0]);

		Main.cityTitle[0].innerHTML = sessionStorage.getItem("activeCity");

		Main.initData(); //Update the data on the page

		
	},



	/*
	*-----------------------------------------------
	*
	* Manages the fetching of data regarding clubs
	*
	*-----------------------------------------------
	*/

	getFoodUrl : function() {
		
		Main.url;
		Main.url = new Url("food", Main.getFoodData);
		Main.url.init();
		
	},
	
	getFoodData : function(url, jsonUrl) {
		
		Main.data;
		Main.data = new Data();
		Main.data.initFood(Main.data.foodDataDone, url, jsonUrl);
		
	},


	/*
	*-----------------------------------------------
	*
	* Manages the fetching of data regarding shops
	*
	*-----------------------------------------------
	*/

	getShopUrl : function() {
		
		Main.url;
		Main.url = new Url("shop", Main.getShopData);
		Main.url.init();
		
	},
	
	getShopData : function(url, jsonUrl) {

		console.log(url);
		
		Main.data;
		Main.data = new Data();
		Main.data.initFood(Main.data.foodDataDone, url, jsonUrl);
		
	},


	/*
	*-----------------------------------------------
	*
	* Manages the fetching of data regarding attractions
	*
	*-----------------------------------------------
	*/

	getAttractionUrl : function() {
		
		Main.url;
		Main.url = new Url("attraction", Main.getAttractionData);
		Main.url.init();
		
	},
	
	getAttractionData : function(url, jsonUrl) {
		
		Main.data;
		Main.data = new Data();
		Main.data.getAttractionInfo(Main.data.attractionDataDone, url, jsonUrl);
		
	},


	/*
	*-----------------------------------------------
	*
	* Manages the fetching of data regarding activities
	*
	*-----------------------------------------------
	*/

	getActivityUrl : function() {
		
		Main.url;
		Main.url = new Url("activity", Main.getActivityData);
		Main.url.init();
		
	},
	
	getActivityData : function(url, jsonUrl) {
		
		Main.data;
		Main.data = new Data();
		Main.data.getActivityInfo(Main.data.activityDataDone, url, jsonUrl);
		
	},


	/*
	*-----------------------------------------------
	*
	* Manages the fetching of data regarding accommodations
	*
	*-----------------------------------------------
	*/

	getAccommodationUrl : function() {
		
		Main.url;
		Main.url = new Url("accommodation", Main.getAccommodationData);
		Main.url.init();
		
	},
	
	getAccommodationData : function(url, jsonUrl) {
		
		Main.data;
		Main.data = new Data();
		Main.data.initFood(Main.data.accommodationDataDone, url, jsonUrl);
		
	},


	/*
	*-----------------------------------------------
	*
	* Manages the fetching of data regarding clubs
	*
	*-----------------------------------------------
	*/

	getClubUrl : function() {
		
		Main.url;
		Main.url = new Url("club", Main.getClubData);
		Main.url.init();
		
	},
	
	getClubData : function(url, jsonUrl) {
		
		Main.data;
		Main.data = new Data();
		Main.data.getClubInfo(Main.data.clubDataDone, url, jsonUrl);
		
	},


	/*
	*-----------------------------------------------
	*
	* Populates the website with relevant data
	*
	*-----------------------------------------------
	*/
	
	populateWebsite : function(xhttpData) {
		
		Main.populate;
		Main.populate = new Populate(xhttpData);
		
		Main.populate.init();
		
		Main.map;
		Main.map = new Webmap();
		Main.map.initMap();
		Main.map.getPosData(xhttpData);

		Main.objs = xhttpData;
		localStorage.setItem("infoObjects", JSON.stringify(Main.objs));

		Main.initSaveEvents();
	},


	initSaveEvents : function() {

		Main.saveBtns = document.getElementsByClassName("saveBtns");

		for(var i=0; i<Main.saveBtns.length; i++) {

			Main.saveBtns[i].removeEventListener("click", Main.saveObj);

			Main.saveBtns[i].addEventListener("click", Main.saveObj);
		}
	},


	saveObj : function(event) {

		Main.save;

		Main.save = new Save(event.target.parentNode.parentNode, Main.objs);

		Main.save.init();
	}
	
	
};

/*
*	Bootstrap -------------------------
*	Runs the code when DOM is loaded in
*/
window.addEventListener("load", Main.init);