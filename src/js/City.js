function City() {

	var m_this = this;

	console.log("city");

	this.init = function(city) {

		this.selectedCity = city;

		this.setSelectedCity(this.selectedCity);

		console.log("cities");

	};



	this.setSelectedCity = function(city) {

		console.log("cities2");

		if (typeof(Storage) !== "undefined") {

			console.log("cities3");

		    	sessionStorage.setItem("activeCity", city.innerHTML);

		} else {
		    console.log("Sorry! No Web Storage support..");
		}

	};

}