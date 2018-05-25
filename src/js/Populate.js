function Populate(category) {

	var m_this = this;
	var API_KEY = "IOYDQtQU";

	this.category = category;
	this.elementOne = "";

	this.p1 = "";
	this.p2 = "";

	//---------------------------------------------------------------------------------------------



	/*------------------------------------------------
	*
	* Initiate the methods to fetch all data
	*
	*-------------------------------------------------
	*/

	this.init = function() {

		this.createElements();

		this.insertData();
	};



	/*------------------------------------------------
	*
	* Creates the HTML template for list elements
	*
	*-------------------------------------------------
	*/

	this.createElements = function() {

		//Removes the existing list and creates a new empty one to fill

		this.listDiv = document.getElementById("scrollList");

		this.listUl = document.getElementById("scrollUl");

		this.listDiv.removeChild(this.listUl);

		this.listNewUl = document.createElement("ul");
		this.listNewUl.id = "scrollUl";
		this.listDiv.appendChild(this.listNewUl);

		//Adds a new element for every object in the payload
		for(var i=0; i<m_this.category.payload.length; i++) {

			this.listElement = document.getElementById("scrollUl");


			this.li = document.createElement("li");
			this.listElement.appendChild(this.li);

			this.objDiv = document.createElement("div");
			this.objDiv.className = "objektList";
			this.objDiv.id = m_this.category.payload[i].id;
			this.li.appendChild(this.objDiv);

			this.img = document.createElement("img");

		this.path;
		this.path = window.location.pathname;
		
		if(this.path.includes("shopping")) {
			
			this.img.src = "../pics/beefdish.jpg";
			
		}else if(this.path.includes("rest")) {
			
			this.img.src = "../pics/beefdish.jpg";
			
		}else if(this.path.includes("sev")) {
			
			this.img.src = "../pics/beefdish.jpg";
			
		}else if(this.path.includes("aktiviteter")) {
			
			this.img.src = "../pics/artist.jpg";
			
		}else if(this.path.includes("boende")) {
			
			this.img.src = "../pics/beefdish.jpg";
			
		}else if(this.path.includes("klubb")) {
			
			this.img.src = "../pics/drinks.jpg";
			
		}

			this.img.alt = "Mountain View";
			this.objDiv.appendChild(this.img);

			m_this.a = document.createElement("a");
			this.a.className = "foodName";
			this.a.href = "#";
			this.objDiv.appendChild(m_this.a);


			//Adds eventlistener to pass the right object onto the next page
			this.a.addEventListener("click", this.initInfo);

			m_this.p2 = document.createElement("p");
			m_this.p2.className = "rating";
			this.objDiv.appendChild(m_this.p2);

			this.saveDiv = document.createElement("div");
			this.saveDiv.className = "saveBtns";
			this.objDiv.appendChild(this.saveDiv);

			this.p3 = document.createElement("p");
			this.p3.innerHTML = "Spara ";
			this.saveDiv.appendChild(this.p3);

			this.saveHeart = document.createElement("i");
			this.saveHeart.className = "fa fa-heart fa-lg";
			this.p3.appendChild(this.saveHeart);

		}

	};



	/*----------------------------------------------------------------
	*
	* Fills the previously created list elements with dynamic data
	*
	*-----------------------------------------------------------------
	*/

	this.insertData = function() {

		m_this.elementOne = document.getElementsByClassName("foodName");

		this.ratings = document.getElementsByClassName("rating");

		this.info = "";

		for(var i=0; i<m_this.category.payload.length; i++) {

			this.info = m_this.category.payload[i];

			this.rating = parseInt(this.info.rating);

			if(!this.rating) {
				this.rating = "Info saknas";
			}

			m_this.elementOne[i].innerHTML = "<h2>"+ this.info.name +"</h2>";
			this.ratings[i].innerHTML = "Betyg: " + this.rating;
		}

	};



	this.initInfo = function(event) {

		localStorage.setItem("infoObject", String(event.target.parentNode.parentNode.id));
		window.location.href = "objekt.html";

	};

}
