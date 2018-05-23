function City() {

	var m_this = this;

	this.init = function(city) {

		this.selectedCity = city;

		this.setSelectedCity(this.selectedCity);

	};



	this.setSelectedCity = function(city) {

		if (typeof(Storage) !== "undefined") {

		    	sessionStorage.setItem("activeCity", city.innerHTML);

		} else {
		    console.log("Sorry! No Web Storage support..")
		}

	};



	this.getSelectedCity = function() {

		console.log(sessionStorage.getItem("activeCity"));
	};

}