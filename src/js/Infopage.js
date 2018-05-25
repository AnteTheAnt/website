function Infopage() {

	var m_this = this;

	this.currentObj = "";

	this.init = function() {

		this.initObj();

		this.placeMapMarker(m_this.currentObj);

		this.populate();

		this.createOpenTimes();

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



	this.placeMapMarker = function(obj) {

		this.map = new Webmap();
		this.map.initMap();
		this.map.getPosData(obj);
	};




	this.populate = function() {

		//Create the name title
		this.titleElem = document.getElementsByClassName("title");
		this.titleElem[0].getElementsByTagName("h1")[0].innerHTML = m_this.currentObj.name;

		//Create the object description
		this.descElem = document.getElementById("infoDescription");
		this.descInfo = m_this.currentObj.description;
		this.descElem.innerHTML = this.descInfo;

		/*
		this.ratingElem = document.getElementsByClassName("ratings");
		this.ratingInfo = Math.round( m_this.currentObj.rating * 10 ) / 10; //Limit the rating to one decimal
		this.newRatingElem = document.createElement("p");
		this.newRatingElem.innerHTML = this.ratingInfo;
		this.ratingElem[0].appendChild(this.newRatingElem);
		*/





	/*
	**************************************************
	*
	* Create the elements for showcasing contact data
	*
	**************************************************
	*/

		this.contactElem = document.getElementsByClassName("contact");
		
		this.contactHeader = document.createElement("h4");
		this.contactHeader.innerHTML = "Kontakt";
		this.contactElem[0].appendChild(this.contactHeader);

		if(m_this.currentObj.address) {

			this.p1 = document.createElement("p");
			this.p1.innerHTML = m_this.currentObj.address;
			this.contactElem[0].appendChild(this.p1);

		}else{

			this.p1 = document.createElement("p");
			this.p1.innerHTML = "Info om address saknas";
			this.contactElem[0].appendChild(this.p1);
		}

		if(m_this.currentObj.telephone) {

			this.p2 = document.createElement("p");
			this.p2.innerHTML = m_this.currentObj.telephone;
			this.contactElem[0].appendChild(this.p2);

		}else{

			this.p2 = document.createElement("p");
			this.p2.innerHTML = "Info om telefonnummer saknas";
			this.contactElem[0].appendChild(this.p2);
		}

		if(m_this.currentObj.mail) {

			this.p3 = document.createElement("p");
			this.p3.innerHTML = m_this.currentObj.mail;
			this.contactElem[0].appendChild(this.p3);

		}else{

			this.p3 = document.createElement("p");
			this.p3.innerHTML = "Info om E-mail saknas";
			this.contactElem[0].appendChild(this.p3);
		}

		if(m_this.currentObj.website) {

			this.p4 = document.createElement("p");
			this.p4.innerHTML = m_this.currentObj.website;
			this.contactElem[0].appendChild(this.p4);

		}else{

			this.p4 = document.createElement("p");
			this.p4.innerHTML = "Info om webbplats saknas";
			this.contactElem[0].appendChild(this.p4);
		}

	};



	this.createOpenTimes = function() {

		this.days = ["Mån", "Tis", "Ons", "Tors", "Fre", "Lör", "Sön"];
		this.dbDays = [
		m_this.currentObj.mon_open+" - "+m_this.currentObj.mon_close,
		 m_this.currentObj.tue_open+" - "+m_this.currentObj.tue_close,
		 m_this.currentObj.wed_open+" - "+m_this.currentObj.wed_close,
		 m_this.currentObj.thu_open+" - "+m_this.currentObj.thu_close,
		 m_this.currentObj.fri_open+" - "+m_this.currentObj.fri_close,
		 m_this.currentObj.sat_open+" - "+m_this.currentObj.sat_close,
		 m_this.currentObj.sun_open+" - "+m_this.currentObj.sun_close];

		this.openDiv = document.getElementById("infoOpen");

		if(m_this.currentObj.mon_open) {

			for(var i = 0; i<this.days.length; i++) {

				this.dayP = document.createElement("p");

				if(this.dbDays[i] != "-1 - -1") {

					this.dayP.innerHTML = this.days[i] + ": " + this.dbDays[i] + "<br>";

				}else{

					this.dayP.innerHTML = this.days[i] + ": Stängt";
				}

				this.openDiv.appendChild(this.dayP);	
			}

		}else{

			this.dayP = document.createElement("p");
			this.dayP.innerHTML = "Öppettider saknas";
			this.openDiv.appendChild(this.dayP);
		}

	};	
}