function Populate(category) {
	
	var m_this = this;
	var API_KEY = "IOYDQtQU";
	
	this.category = category;
	this.elementOne = "";

	this.p1 = "";
	
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
			
			this.elementOne = document.getElementsByClassName("foodName");
			
			this.li = document.createElement("li");
			this.listElement.appendChild(this.li);
			
			this.objDiv = document.createElement("div");
			this.objDiv.className = "objektList";
			this.objDiv.id = m_this.category.payload[i].id;
			this.li.appendChild(this.objDiv);
			
			this.img = document.createElement("img");
			this.img.src = "../pics/beefdish.jpg";
			this.img.alt = "Mountain View";
			this.objDiv.appendChild(this.img);
			
			this.p0 = document.createElement("p");
			this.p0.className = "foodName";
			this.p0.href = "";
			this.objDiv.appendChild(this.p0);

			//Adds eventlistener to pass the right object onto the next page
			this.p0.addEventListener("click", this.initInfo);
			
			m_this.p1 = document.createElement("p");
			m_this.p1.className = "ElemDescription";
			this.objDiv.appendChild(m_this.p1);
			
			this.p2 = document.createElement("p");
			this.p2.innerHTML = "Öppet/Stängt";
			this.objDiv.appendChild(this.p2);

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

		this.descriptionElems = document.getElementsByClassName("ElemDescription");

		this.info = "";
		
		for(var i=0; i<m_this.category.payload.length; i++) {

			this.info = m_this.category.payload[i];
			
			m_this.elementOne[i].innerHTML = "<h2>"+ this.info.name +"</h2>";
			this.descriptionElems[i].innerHTML = this.info.description;
		}
		
		//m_this.elementOne[0].innerHTML = "<h2>"+m_this.category.payload[0].name+"</h2>";
		
	};



	this.initInfo = function(event) {

		localStorage.setItem("infoObject", String(event.target.parentNode.parentNode.id));
		window.location.href = "objekt.html";

	};
	
}