//Person object
var person = {
    firstName: "John",
    lastName: "Musselman",
    jobTitle: "Product Support Representative - IPM",
    homeOffice: "Research Park Plaza",
    tellMeMore: "I spend most of my time with my family, or studying. I am currently working on a degree in Software Development at WGU. My two girls are Amelia and Clementine, and they definitely keep my wife and I on our toes. We enjoy taking them to the park, and watching movies."
};
//Response Array
var responses = [
    "Similar to a slippery object, this is getting out of hand.",
    "OH MY GOSH, DAD!",
    "I am tired of this... 'Hi tired, nice to meet you!'",
    "Leave",
    "I can't stand these jokes. It'll be better if I sit down.",
    "UUUGH",
    "These jokes are not funny, they're hilarious!",
    "I did not enjoy this, better click this button to make it go away.",
    "Please stop, nobody is laughing",
    "Oh my gosh, Dad! You're embarassing me!",
    "Please stop",
    "I asked you nicely, now please stop.",
    "These jokes are like a vacuum, they SUCK!",
    "I am running out of ideas for these responses. Please stop clicking that button.",
    "Why are you still getting jokes?",
    "Beep Boop. Does not compute"
];
//Variables to hold elements to be modified
var tempAttribute;
var tempBtn;
var tempJokeResponse;
var tempJoke;
//Location Variables
var locationInfo;
var lat;
var long;

$(".arrow").hover(function(){
    $(".scroll").css("opacity", "1");
}, function(){
    $(".scroll").css("opacity", "0");
});
//Function to handle click event for Person Object / List
$(".list").click(function(event) {
    if(event.target.className == "list"){
        $(".target").remove();
        return;
    } else {
        $(".target").remove();
        tempAttribute = $("<p class='target'></p>").text("");
        $("#sectionList").append(tempAttribute);
        $(".target").text(person[event.target.className]);
        $(".target").css({
            "backgroundColor": "rgba(23, 90, 6, 0.7)",
            "animationName": "slide",
            "animationDuration": "0.7s"
        });
    }
});

//Randomly choose response array text for removeJoke button
function buttonText(){
    var num = Math.floor(Math.random() * responses.length);
    tempJokeResponse = responses[num];
    console.log(tempJokeResponse);
    return;
}

//Joke Post function
function postJoke(arg){
    $(tempJoke).remove();
    buttonText();
    tempJoke = $("<p class='joke'></p>");
    $(tempJoke).text(arg);
    if($("#jokeSection").has(tempBtn)){
        $(tempJoke).remove();
        $(tempBtn).remove();
        tempBtn = $('<button class="remove" onclick="removeJoke()"></button>').text(tempJokeResponse);
        $("#jokeSection").append(tempJoke);
        $("#jokeSection").append(tempBtn);
    } else {
        tempBtn = $('<button class="remove" onclick="removeJoke()"></button>').text(tempJokeResponse);
        $("#jokeSection").append(tempJoke);
        $("#jokeSection").append(tempBtn);
    }
}

//Fetch to icanhazdadjoke API
function joke(){
fetch('https://icanhazdadjoke.com/', {headers: { 'Accept': 'application/json' } })
  .then(function(response) {
      console.log(response);
    return response.json();
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
    postJoke(myJson.joke);
  });
 
}

//remove joke and button
function removeJoke(){
    $(tempJoke).remove();
    $(tempBtn).remove();
}

//JQuery plugin script
$('.pic').click(function() {
    $(this).toggleClass('active');
    $('.backdrop').toggleClass('underlay');
  });

//Geolocation Information

function getLocationInfo(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPos);
    locationInfo = '<p>Your coordinates are <br> Longitude: ' + long + '<br> Latitude: ' + lat;
  } else {
    locationInfo = '<p>Location Servies are currently not active on your browser.</p>';
  }
}

function showPos(pos){
  lat = pos.coords.latitude;
  long = pos.coords.longitude;
  console.log(lat);
  console.log(long);
}

getLocationInfo();

function fetchSunMoon(){

    if(lat && long == undefined){
        tempSunInfo = $("<p class='sunInfo'>It looks like you do not have the location settings enabled in your browser. Please adjust this in order to retrieve information.</p>");
        $('.weatherSection').append(tempSunInfo);
    } else {

    fetch('https://api.sunrise-sunset.org/json?lat=' + lat + '&lng=' + long + '&date=today', {headers: { 'Accept': 'application/json' } })
      .then(function(response) {
          console.log(response);
        return response.json();
      })
      .then(function(myJson) {
        console.log(JSON.stringify(myJson));
        postSun(myJson.results.sunrise, myJson.results.sunset);
      });
    }
     
}


var tempSunInfo = $("<p class='sunInfo'></p>");
var tempSunBtn;

function postSun(arg1, arg2){
    
    let tempSunText = "The sun will rise at " + arg1 + ". The sun will set at " + arg2 + ".";
    
    if($(".weatherSection").has(tempSunInfo)){
        console.log("registered initial info");
        $(tempSunInfo).remove();
        $(tempSunBtn).remove();
        tempSunBtn = $('<button class="removeSun" onclick="removeSun()">Thats cool, but I am done now.</button>');
        $(tempSunInfo).text(tempSunText);
        $(".weatherSection").append(tempSunInfo);
        $(".weatherSection").append(tempSunBtn);
    } else {
        tempSunBtn = $('<button class="removeSun" onclick="removeSun()">Thats cool, but I am done now.</button>');
        $(tempSunInfo).text(tempSunText);
        $(".weatherSection").append(tempSunInfo);
        $(".weatherSection").append(tempSunBtn);
    }
}

function removeSun(){
    $(tempSunInfo).remove();
    $(tempSunBtn).remove();
}