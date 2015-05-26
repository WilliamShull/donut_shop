  var body = document.getElementById("bodyId");
  var table = document.getElementById("doughnutTable");
  var tblBody = document.createElement("tbody");
  var tblhead = document.createElement("thead");


  function DoughnutShop(averageDoughnuts, minCustomersHour, maxCustomersHour) {
    this.averageDoughnuts = averageDoughnuts;
    this.minCustomersHour = minCustomersHour;
    this.maxCustomersHour = maxCustomersHour;
  }

  DoughnutShop.prototype.generateRandom = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  DoughnutShop.prototype.hourlyDoughnuts = function() {
    var customers = this.generateRandom(this.minCustomersHour, this.maxCustomersHour);
    return Math.floor(customers * this.averageDoughnuts);
  };

  DoughnutShop.prototype.dailyDoughnuts = function() {
    var totalDoughnuts = 0;
    var doughnutTime = [];
    var i = 0;
    for(i=0; i<12; i++) {
      doughnutTime.push(this.hourlyDoughnuts());
      totalDoughnuts += doughnutTime[i];
    }
    doughnutTime.push(totalDoughnuts);
    return doughnutTime;
  };

  DoughnutShop.prototype.render = function(locationName) {
    var doughnutSales = this.dailyDoughnuts();
    doughnutSales.unshift(locationName + ":");
    var row = document.createElement("tr");
    row.setAttribute("id", locationName);

    for(var j=0; j<doughnutSales.length; j++) {
      var cell = document.createElement("td");
      var cellText = document.createTextNode(doughnutSales[j]);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    cell = document.createElement("td");
    cellText = document.createTextNode(doughnutSales[12]);
    tblBody.appendChild(row);
    tblBody.setAttribute("align", "right");
  }

  var tableInit = function() {
    var time = ["Location", "7:00am", "8:00am", "9:00am", "10:00am", "11:00am", "12:00pm", "1:00pm", "2:00pm", "3:00pm", "4:00pm", "5:00pm", "6:00pm", "Total"];

    var i = 0;
    for(i=0; i<time.length; i++) {
      var tableH = document.createElement("th");
      var tableHText = document.createTextNode(time[i]);
      tableH.appendChild(tableHText);
      tblhead.appendChild(tableH);
    }

    //body.appendChild(table);
    table.appendChild(tblhead);
    table.appendChild(tblBody);
    tblhead.setAttribute("align", "right");
  }

  var createNewLocation = function(event) {
    var newLocationName = document.getElementById('locationInput').value;
    var newMin = parseInt(document.getElementById('minInput').value);
    var newMax = parseInt(document.getElementById('maxInput').value);
    var newAvg = parseInt(document.getElementById('avgInput').value);
    var newLocation = new DoughnutShop(newAvg, newMin, newMax);

    newLocation.render(newLocationName);
  }

  var downtown = new DoughnutShop(4.5, 8, 43);
  var capitolHill = new DoughnutShop(2, 4, 37);
  var southLakeUnion = new DoughnutShop(6.33, 9, 23);
  var wedgewood = new DoughnutShop(1.25, 2, 28);
  var ballard = new DoughnutShop(3.75, 8, 58);

  tableInit();
  downtown.render("Downtown");
  capitolHill.render("Capitol Hill");
  southLakeUnion.render("South Lake Union");
  wedgewood.render("Wedgewood");
  ballard.render("Ballard");

  var submitButtonListener = document.getElementById('submitButton');
  submitButtonListener.addEventListener('click', createNewLocation, false);

  var updateButtonListener = document.getElementById('updateButton');






