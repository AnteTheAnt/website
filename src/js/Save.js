function Save(savedElem, targetObjs) {

	var m_this = this;

	this.savedObjsArray = [];

	this.activeObj;

	this.init = function() {

		if(localStorage.getItem("savedObjs")) {


			this.parse = JSON.parse(localStorage.getItem("savedObjs"));

			this.initArray();


			this.doubleResult = this.doubleCheck(savedElem, m_this.savedObjsArray);

			console.log(this.doubleResult);

			if(this.doubleResult == false) {

				this.save();
			}

		}else{

			this.save();
		}

		this.initPopulate();
		
	};


	this.initPopulate = function() {

		this.container = document.getElementById("popupObjekts");

		this.orgListUl = document.getElementsByClassName("savedList");

		this.container.removeChild(this.orgListUl[0]);

		this.listUl = document.createElement("ul");
		this.listUl.className = "savedList";
		this.container.appendChild(this.listUl);

		if(m_this.savedObjsArray != null) {
			for(var i=0; i<m_this.savedObjsArray.length; i++) {

				this.populateSaveList(i);
			}
		}
	};


	this.initArray = function() {

		this.parse = JSON.parse(localStorage.getItem("savedObjs"));

		m_this.savedObjsArray = this.parse;

	}



	this.save = function() {

		//Change the visuals of the heart indicating a successful save
		this.heart = savedElem.getElementsByTagName("i");

		this.heart[0].className = "fa fa-heart-o";

		for(var i=0; i<targetObjs.payload.length; i++) {

			if(savedElem.id == targetObjs.payload[i].id) {

				m_this.activeObj = targetObjs.payload[i];

				m_this.savedObjsArray.push(targetObjs.payload[i]);

				localStorage.setItem("savedObjs", JSON.stringify(m_this.savedObjsArray));
			}
		}

	};


	this.populateSaveList = function(i) {

		this.container = document.getElementById("savedList");

		this.li = document.createElement("li");
		this.listUl.appendChild(this.li);

		this.div = document.createElement("div");
		this.div.className = "savedObjekt";
		this.div.id = m_this.savedObjsArray[i].id;
		this.li.appendChild(this.div);

		this.hrDiv = document.createElement("hr");
		this.div.appendChild(this.hrDiv);

		this.h2 = document.createElement("h2");
		this.div.appendChild(this.h2);

		this.a = document.createElement("a");
		this.a.href = "objekt.html";
		this.a.innerHTML = m_this.savedObjsArray[i].name;
		this.h2.appendChild(this.a);

		//Adds eventlistener to pass the right object onto the next page
		this.a.addEventListener("click", this.initInfo);

		this.iElem = document.createElement("i");
		this.iElem.className = "fa fa-close";
		this.iElem.style = "float: right; margin-top:auto;";
		this.div.appendChild(this.iElem);

		this.iElem.addEventListener("click", Main.removeSavedElems);


	};


	this.doubleCheck = function(obj, list) {

	    for (var i = 0; i < list.length; i++) {

	        if (list[i].id === obj.id) {

	            return true;
	        }
	    }

	    	return false;
	};



	this.remove = function(elem) {

		this.path = window.location.pathname;


		this.parent = elem.parentNode;

		this.initArray();

		for(var i=0; i<m_this.savedObjsArray.length; i++) {

			if(m_this.savedObjsArray[i].id == elem.id) {

				elem.removeEventListener("click", Main.removeSavedElems);

				m_this.savedObjsArray.splice(i, 1);

				localStorage.setItem("savedObjs", JSON.stringify(m_this.savedObjsArray));

				this.parent.removeChild(elem);

			}
		}

		if(!this.path.includes("objekt")) {

			//Change the visuals of the heart indicating a successful removal
			this.listElem = document.getElementsByClassName("objektList");

			this.listArray = [].slice.call(this.listElem);

			var obj = this.listArray.find(function (obj) { return obj.id === elem.id; });

			obj.getElementsByTagName("i")[0].className = "fa fa-heart fa-lg";

		}else{

			elem.getElementsByTagName("i")[0].className = "fa fa-heart fa-lg";
		}
	};


	this.initInfo = function(event) {

		localStorage.setItem("infoObject", String(event.target.parentNode.parentNode.id));

	};


}