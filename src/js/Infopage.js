function Infopage() {

	var m_this = this;

	this.currentObj = "";

	this.init = function() {

		this.initObj();

		this.populate();
	};



	this.initObj = function() {

		this.objId = localStorage.getItem("infoObject");

		this.objs = JSON.parse(localStorage.getItem("infoObjects"));

		for(var i=0; i<this.objs.payload.length; i++) {

			if(this.objId == this.objs.payload[i].id) {

				m_this.currentObj = this.objs.payload[i];
			}
		}

		console.log(m_this.currentObj);

	};




	this.populate = function() {

		//Create the name title
		this.titleElem = document.getElementsByClassName("title");
		this.titleElem[0].getElementsByTagName("h1")[0].innerHTML = m_this.currentObj.name;

		//Create the object description
		this.descElem = document.getElementsByClassName("description");
		this.descInfo = m_this.currentObj.description;
		this.newDescElem = document.createElement("p");
		this.newDescElem.innerHTML = this.descInfo;
		this.descElem[0].appendChild(this.newDescElem);

		this.ratingElem = document.getElementsByClassName("ratings");
		this.ratingInfo = Math.round( m_this.currentObj.rating * 10 ) / 10; //Limit the rating to one decimal
		this.newRatingElem = document.createElement("p");
		this.newRatingElem.innerHTML = this.ratingInfo;
		this.ratingElem[0].appendChild(this.newRatingElem);

	};	
}