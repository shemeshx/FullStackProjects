let chartInterval; // variable to point on the interval of the chart.


//################    Ready Function     ###################
$(() => {

  // Event Listeners
  $("#Home").click(showAllCoins);
  $("#LiveReports").click(showLiveChart);
  $("#searchBtn").click(search);
  $("#About").click(showAbout);
  
  // Initialize the array for saving the coins by ID and Symbol
  if (
    sessionStorage.getItem("coinsArray") == null &&
    sessionStorage.getItem("symbolArray") == null
  ) {
    sessionStorage.setItem("coinsArray", JSON.stringify([]));
    sessionStorage.setItem("symbolArray", JSON.stringify([]));
  }
 
  //Setting the parallax effect with Library (Parallax JS)   
  $('.parallax-window').parallax({imageSrc: 'background.jpg'});

  // Sets the navbar efect for fixed position.
  let navbar = $("#nav");
  
  AdjustHeader(); 
  $(window).scroll(function() {
      AdjustHeader();
  });
  // the function sets class to the navbar if the top passed 60px (the size of the navbar).
  function AdjustHeader(){
    if ($(window).scrollTop() > 60) {
      if (!navbar.hasClass("fixed-top")) {
        navbar.addClass("fixed-top");
      }
    } else {
      navbar.removeClass("fixed-top");
    }
  }
})


//sets the size of the parallax window to the correct height.
function setSizeOfWrap(){
  let height = $(".container").height();
  if (height <= $(window).height())
    $(".parallax-window").css("min-height",$(window).height()+"px")
  else
    $(".parallax-window").css("min-height",(height+100)+"px")
  
    //Setting the parallax effect with Library (Parallax JS)   
  $('.parallax-window').parallax({imageSrc: 'background.jpg'});

}


// The function performs search 
function search() {
  //Initialize components
  $("#info").empty();
  $("#Home").removeClass("active");
  $("#LiveReports").removeClass("active");
  $("#About").removeClass("active");
  clearInterval(chartInterval);

  //Get request for the list of the coins. 
  $.ajax({
    type: "GET",
    url: `https://api.coingecko.com/api/v3/coins/list`,
    beforeSend: () => {
      // sets the loader
      $("body").append(
        `<div id="loader" class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`
      );
    },
    complete: () => {
      // remove the loader
      $(`#loader`).remove();
    },
    success: data => {
      for (let i = 0; i < data.length; i++) {
        // check if the input search includes in the ID or Symbol list.
        if (
          data[i]["name"].toLowerCase().includes(
            $("#searchInp")
              .val()
              .toLowerCase()
          ) ||
          data[i]["symbol"].toLowerCase().includes(
            $("#searchInp")
              .val()
              .toLowerCase()
          )
        ) {
          addCoinCard(data[i]); // show the card of the coin
          coinSwitchOn(data[i].id); // switch the toggle on if needed
        }
      }
      $(".moreInfo").click(moreInfo); // sets the more info button

      // sets the toggle callback.
      $(".custom-control-input").change(e => {
        if ($(e.target).is(":checked")) // if the toggle is one, add it to the list.
          addOrRemoveCoinFromArray(
            $(e.target)
              .parent()
              .parent()[0].id,
            "add"
          );
        else
        // switch to off and remove the coin from the list.
          addOrRemoveCoinFromArray(
            $(e.target)
              .parent()
              .parent()[0].id,
            "remove"
          );
      });
      setSizeOfWrap();
    }
  });
}

//The function show all the coins (100) with cards
function showAllCoins() {

  //Initialize components
  $("#info").empty();
  $("#Home").addClass("active");
  $("#LiveReports").removeClass("active");
  $("#About").removeClass("active");
  clearInterval(chartInterval);

  //Get request to all coins
  $.ajax({
    type: "GET",
    url: `https://api.coingecko.com/api/v3/coins/list`,
    beforeSend: () => {
      //Show loader
      $("body").append(
        `<div id="loader" class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`
      );
    },
    complete: () => {
      //Remove loader
      $(`#loader`).remove();
    },
    success: data => {
      // Add all coins and sets toggle on if needed
      for (let i = 0; i < 100; i++) {
        addCoinCard(data[i]);
        coinSwitchOn(data[i].id);
      }
      // sets listeners to the cards
      $(".moreInfo").click(moreInfo);//sets more info
      $(".custom-control-input").change(e => { 
        if ($(e.target).is(":checked")) //if toggle on add it to the list.
          addOrRemoveCoinFromArray(
            $(e.target)
              .parent()
              .parent()[0].id,
            "add"
          );
        else 
        // toggle off the remove from the list.
          addOrRemoveCoinFromArray(
            $(e.target)
              .parent()
              .parent()[0].id,
            "remove"
          );
      });
      setSizeOfWrap();
    }
  });
}

// The function gets coind id and type ("add" or "remove").The function handles adding or removing coin with the toggle button.
function addOrRemoveCoinFromArray(coinid, type) {
  //sets the arrays of the coins id and coins symbol.
  let arr = JSON.parse(sessionStorage.getItem("coinsArray"));
  let sArr = JSON.parse(sessionStorage.getItem("symbolArray"));
  //gets the symbol with given id
  let symbol = $(`#${coinid}`)
    .children(":first")
    .text();
  if (type == "add") {
    if (arr.length == 5) { // if the array is more than 5 it shows the modal.
      showModal(coinid, symbol);
    } else { // adding the new coin to the storage
      arr.push(coinid);
      sArr.push(symbol);
      sessionStorage.setItem("coinsArray", JSON.stringify(arr));
      sessionStorage.setItem("symbolArray", JSON.stringify(sArr));
    }
  } else {
    // delete the given coin from storage.
    arr = arr.filter(item => item !== coinid);
    sArr = sArr.filter(item => item !== symbol);
    sessionStorage.setItem("coinsArray", JSON.stringify(arr));
    sessionStorage.setItem("symbolArray", JSON.stringify(sArr));
  }
}
// The function gets id and symbol of coin.The function shows modal (popup) to handle setting new coin and removing exist one.
function showModal(coinid, symbol) {
  //gets data from storage
  let arr = JSON.parse(sessionStorage.getItem("coinsArray"));
  
  //the loop shows all coins that exist in the storage
  for (let i = 0; i < 5; i++) {
    $("#popupBody").append(`
    <div class = "coinRow">
    <div class="row">
      <div class="col-md-10 modalRow">${arr[i]}</div>
      <div class="col-md-2 ml-auto"><button type="button" class="trashBtn"></button></div>
     </div>
     <hr>
     </div>
  `);
  }
  //The listener handles the disappearing of the popup
  $("#popup").on("hidden.bs.modal", function(e) {
    $(".coinRow").remove(); // remove lines
    let arr = JSON.parse(sessionStorage.getItem("coinsArray"));
    if (!arr.includes(coinid)) coinSwitchOff(coinid);
  });
  //The listener handles removing coin by click on trash btn.
  $(".trashBtn").click(e => {
    $(".coinRow").remove(); // remove lines
    //get data from storage
    let arr = JSON.parse(sessionStorage.getItem("coinsArray"));
    let sArr = JSON.parse(sessionStorage.getItem("symbolArray"));
    let idToRemove = $(e.target) //gets the id that need to remove
      .parent()
      .prev()
      .html();
    // update the storage data.
    let i
    for(i=0;i<arr.length;i++) if (arr[i] == idToRemove) break;
    arr = arr.filter(item => item !== idToRemove); 
    sArr = sArr.filter(item =>(item !== sArr[i]));
    
    arr.push(coinid);
    sArr.push(symbol);
    sessionStorage.setItem("coinsArray", JSON.stringify(arr));
    sessionStorage.setItem("symbolArray", JSON.stringify(sArr));
    // switch the toggle.
    coinSwitchOn(coinid);
    coinSwitchOff(idToRemove);
    $("#popup").modal("hide");
  });
  $("#popup").modal();
}
//The function gets id of coin and sets the toggle of the coin on.
function coinSwitchOn(coinid) {
  let arr = JSON.parse(sessionStorage.getItem("coinsArray"));
  if (arr.includes(coinid)) $(`#customSwitch_${coinid}`).prop("checked", true);
}
//The function gets id of coin and sets the toggle of the coin off.
function coinSwitchOff(coinid) {
  $(`#customSwitch_${coinid}`).prop("checked", false);
}
//The function gets obj and shows card of a coin
function addCoinCard(obj) {
  $(".row").append(`
                    <div class="card" style="background: radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(0,0,0,0.47522759103641454) 100%);;;width: 18rem; margin:5px;">
                        <div id="${
                          obj.id
                        }" class="card-body" style="position:relative;">
                            <h3 class="card-title" style="color:#fff;display:inline-block">${
                              obj["symbol"]
                            }</h3>
                            <div class="custom-control custom-switch" style="position:absolute;top:25px;right:0;display:inline-block">
                            <input type="checkbox" class="custom-control-input" id="customSwitch_${
                              obj.id
                            }">
                            <label class="custom-control-label" for="customSwitch_${
                              obj.id
                            }"></label>
                            </div>
                            </br>
                            <h4 class="card-subtitle mb-2 text-muted">${
                              obj["name"]
                            }</h4>
                            </br>
                            <button type="button" class="moreInfo btn btn-secondary ">More Info</button>
                            <div id="moreInfo_${
                              obj.id
                            }" style="display:none;margin-top:5px;min-height: 0;"></div>
                            </div>
                    </div>
                `);
}
//the function sets the behavior of more info btn.
function moreInfo(e) {
  e.preventDefault();

  // the function gets id of coin and sets the card of more info.
  let show = (id) =>{ 
    let data = JSON.parse(sessionStorage.getItem(id))[0];
    $(`#moreInfo_${id}`)
      .slideToggle(350,"linear", () => {
        $(`#moreInfo_${id}`).html(`
          <div class="card">
              <div class="card-body">
                  <img src="${data.image.thumb}"> 
                  <div>ILS - ${
                    data.market_data.current_price.ils
                  } ${String.fromCharCode(8362)}</div>
                  <div>USD - ${
                    data.market_data.current_price.usd
                  } ${String.fromCharCode(36)}</div>
                  <div>EUR - ${
                    data.market_data.current_price.eur
                  } ${String.fromCharCode(8364)}</div>
              </div>
          </div>
          `).stop();
      });}
  let id = $(e.target)
    .parent()
    .attr("id"); // get id from parent of btn
  if (sessionStorage.getItem(id) != null) {
    // if element is exsit in local storage
    let time = JSON.parse(sessionStorage.getItem(id))[1]; // get time from the element
    let currTime = new Date().getTime();
    currTime /= 1000;
    if (currTime - time > 120) {
      // check if 2 minutes didn't pass then create new get request.
      $.ajax({
        type: "GET",
        url: `https://api.coingecko.com/api/v3/coins/${id}`,
        beforeSend: () => {
          $("body").append(
            `<div id="loader" class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`
          );
        },
        complete: () => {
          $(`#loader`).remove();
        },
        success: data => {
          sessionStorage.setItem(
            id,
            JSON.stringify([data, new Date().getTime() / 1000])
          );
          show(id);
        }
      });
    }else
      show(id)
  } else {
    // if the element doesn't exists in the local storage
    $.ajax({
      type: "GET",
      url: `https://api.coingecko.com/api/v3/coins/${id}`,
      beforeSend: () => {
        $("body").append(
          `<div id="loader" class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`
        );
      },
      complete: () => {
        $(`#loader`).remove();
      },
      success: data => {
        sessionStorage.setItem(
          id,
          JSON.stringify([data, new Date().getTime() / 1000])
        );
        show(id);
      }
    });
  }

 
}
//The function shows the chart.
//Using Chart js library.
function showLiveChart() {
  //Intialize 
  $("#info").empty();
  $("#Home").removeClass("active");
  $("#About").removeClass("active");
  $("#LiveReports").addClass("active");
  $("#info").append(
    `<canvas id="chart" style="background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);"></canvas>`
  );
  clearInterval(chartInterval);
  //sets variable of canvas.
  let c = document.getElementById("chart");
  let ctx = c.getContext("2d");
  
  //set the configuration of the chart.
  let cfg = {
    type: "line",
    data: { datasets: [] },
    options: {
      responsive: true,
      title: {
        display: true,
        text: "RealTime Crypto"
      },
      scales: {
        xAxes: [
          {
            type: "time",
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Current Time"
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Current Coin Value"
            }
          }
        ]
      }
    }
  };
  let chart = new Chart(ctx, cfg); // object of the chart.

  //interval of the chart. showing the data when get result from the api by using promise.
  let promise = Promise.resolve(true);
  setSizeOfWrap();
  chartInterval = setInterval(function() {
    promise = promise.then(function() {
      return new Promise(function(resolve) {
        //gets new data and wait until finish.
        updateChart(chart);
        resolve(true);
      });
    });
  }, 2000);
}
//The function gets chart object and sets the dataset of the chart.
async function updateChart(chart) {
  let colors = [
    /*red*/ "rgb(255, 99, 132)",
    /*orange*/ "rgb(255, 159, 64)",
    /*yellow*/ "rgb(255, 205, 86)",
    /*green*/ "rgb(75, 192, 192)",
    /*blue*/ "rgb(54, 162, 235)"
  ];
  let sArr = JSON.parse(sessionStorage.getItem("symbolArray"));
  try {
    let resArr = await getCurrentCurrencyValue(sArr); // wait for data 
    // if the chart is empty, sets the datasets with new information for each coin that has result from the API.
    if (chart.data.datasets.length == 0) {
      for (let i = 0; i < resArr.length; i++) {
        chart.data.datasets.push({
          label: resArr[i][0],
          backgroundColor: colors[i],
          borderColor: colors[i],
          fill: false,
          data: [{ x: resArr[i][2], y: resArr[i][1] }]
        });
      }
    } else { // get new data and sets it in the end of the dataset of each coin.
      for (let i = 0; i < resArr.length; i++) {
        chart.data.datasets[i].data.push({ x: resArr[i][2], y: resArr[i][1] });
        if (chart.data.datasets[i].data.length == 11)// remove the first data and enter new data to the end
          chart.data.datasets[i].data.shift();
      }
    }
    chart.update(); 
  } catch (error) { // if there is no coin information from the API.
    clearInterval(chartInterval);
    alert("There is no value for those coins.");
  }
}

// the function gets the symbol of the coins and return promise with data from the API
function getCurrentCurrencyValue(sArr) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${sArr
        .join(",")
        .toUpperCase()}&tsyms=USD`,
      type: "GET",
      success: res => {
        let arr = [];
        if (res.Response === "Error") reject(); // If the response is error send reject.
        let i = 0;
        let time = moment();
        for (let symbol in res) { // sets new array with all the data of coins that has infromation from the API
          arr[i] = [symbol, res[symbol]["USD"], time];
          i++;
        }
        resolve(arr);
      }
    });
  });
}
//the function shows the about page.
function showAbout(){
  $("#info").empty();
  $("#Home").removeClass("active");
  $("#LiveReports").removeClass("active");
  $("#About").removeClass("active");
  clearInterval(chartInterval);

  setSizeOfWrap();
  $("#info").append(`
  <div id="box-1">
      <h1 id= "box-header1">Who Am I ?</h1>
      <div id= "box-content1">I'm Idan Shemesh.</div>
    </div>
    <div id="box-2">
        <svg viewBox="0 0 960 300">
        <symbol id="s-text">
          <text text-anchor="middle" x="50%" y="80%">My Project</text>
        </symbol>
      
        <g class = "g-ants">
          <use xlink:href="#s-text" class="text-copy"></use>
          <use xlink:href="#s-text" class="text-copy"></use>
          <use xlink:href="#s-text" class="text-copy"></use>
          <use xlink:href="#s-text" class="text-copy"></use>
          <use xlink:href="#s-text" class="text-copy"></use>
        </g>
      </svg>
      <div id="content-box2">
        <p>My project contain 3 parts:
        </p>
          <ul>
            <li> Search + Home - those parts connet to API and gets crypto coins and show for each coin the information.
            </li>
            <li> Chart - the chart show in realtime and infomation of the selcted coins by dollars value.
            </li>
            <li> About - Information about me and the project.
            </li>
          </ul>
      </div>
    </div>
    <div id="box-3">
      <h1 id="box-content3">Thank You!</h1>
    </div>
  `)

}


