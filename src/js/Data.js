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

        if (jsonUrl != null) {
            this.getFoodJson(jsonUrl);
        } else {
            this.getFoodInfo(foodDataDone, url);
        }
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

        // console.log(m_this.foodJson);

        m_this.combine(this.response, m_this.foodJson.load);

        //Main.populateWebsite(this.result);

    };

    this.handleData = function(xhttp) {

        this.food = JSON.parse(xhttp.responseText);

        m_this.foodData = this.food;

    };


    /*
     *--------------------------------------------------------------------------------
     *
     * Combines the JSON file with the SMAPI result and returns it to the Main class
     *
     *---------------------------------------------------------------------------------
     */

    this.combine = function(obj1, obj2) {

        var result = {
            "payload": Object.assign(obj1.payload, obj2)
        };

        console.log(result);

        Main.populateWebsite(result);
    };
}
