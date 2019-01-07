var myG2ame = {
    UScityNames: ["chicago",
                    "new york",
                    "boston",
                    "atlanta",
                    "los angeles",
                    "albuquerque",
                    "seattle",
                    "new orleans",
                    "pittsburgh",
                    "san francisco",
                    "miami",
                    "las vegas"],
    UScityImages: ["chicago-illinois-skyline-skyscrapers-161963.jpeg",
                    "new-york-city-pexels-photo-466685.jpeg",
                    "boston-pexels-photo.jpg",
                    "atlanta-1617318_1920.jpg",
                    "losAngeles-1031706_1920.jpg",
                    "Albuquerque.jpg",
                    "seattle-city-skyline-693502_1280.jpg",
                    "new-orleans-mardi-gras-1176483_1280.jpg",
                    "pittsburgh-996347_1920.jpg",
                    "san-francisco-1630372_1920.jpg",
                    "miami-cloudscape-967987_1920.jpg",
                    "las-vegas-1128811_1920.jpg"],
    UScityNameHints: ["The windy city",
                    "The big apple",
                    "Beantown",
                    "Gate city of the south",
                    "Tinseltown",
                    "The duke city",
                    "Emerald city",
                    "The big easy",
                    "Steel city",
                    "Baghdad by the Bay",
                    "Magic city",
                    "Sin city"],
    gameChoices: ["r", "p", "s"],
    currentCity_array: [],
    currentCity_visibleLetters: [],
    currentCity_display: [],
    currentCity_display2: [],
    guessedLetters: [],
    currentCityWords: [],
    selectedCities: [],
    //  web page element variables
    currentCity : document.getElementById("current-city"),
    currentCity2 : document.getElementById("current-city2"),
    winsText : document.getElementById("wins-text"),
    lossesText : document.getElementById("losses-text"),
    guessesRemaining : document.getElementById("guesses-remaining"),
    lettersGuessed : document.getElementById("letters-guessed"),
    varImage : document.getElementById("left-column-image"),
    myUserAlertButton : document.getElementById("my-user-alert-button"),
    cityPictureHintText : document.getElementById("city-picture-hint-text"),
    // audioElement_wonGame : document.createElement("audio"),
    audioObject : function(source) {
        var thisAudioObect = new Audio;
        thisAudioObject.src = source;
        thisAudioObject.preload = "auto";
        return thisAudioObject;
    },
    audioElement_wonGame : audioObject("assets/sounds/Audience_Applause-Matthiew11-1206899159.mp3"),
    audioElement_lostGame : audioObject("assets/sounds/hahaha-Peter_De_Lang-1639076107.mp3"),

    audioElement : document.createElement("audio"),
    cityIndex,
    guessesRemainingCount,
    winsCount,
    lossesCount,
    userButtonClicked,
    lostGameMessage : "Sorry. You lost this game. Click to continue playing",
    wonGameMessage : "You are a WINNER!!! Click to continue playing",
    //  web page element variables
    currentCity : document.getElementById("current-city"),
    currentCity2 : document.getElementById("current-city2"),
    winsText : document.getElementById("wins-text"),
    lossesText : document.getElementById("losses-text"),
    guessesRemaining : document.getElementById("guesses-remaining"),
    lettersGuessed : document.getElementById("letters-guessed"),
    varImage : document.getElementById("left-column-image"),
    myUserAlertButton : document.getElementById("my-user-alert-button"),
    cityPictureHintText : document.getElementById("city-picture-hint-text"),
    //___________________________________________________________
    changeImage: function (imageIndex)
    {
        var newSource = "assets/images/" + UScityImages[imageIndex];
        varImage.setAttribute("src", newSource);
        cityPictureHintText.textContent = UScityNameHints[imageIndex];
    },
    //____________________________________________________________
    initializeCurrentCityDisplay: function () {
        var currentCityWord = "";
        guessedLetters= [];
        // load current city words array with the words from the current city
        var currentCityWords = UScityNames[cityIndex].split(" ");
        for (i=0;i<currentCityWords.length;i++) {
            currentCityWord = currentCityWords[i];
            console.log("Current US city word=" + currentCityWord);

            guessedLetters[i]="";
            for (var j=0;j<currentCityWord.length;j++) {
                guessedLetters[i] += "_";
            }
        }
        console.log("guessedLetters="+ guessedLetters);
    },
    //____________________________________________________________
    updateCurrentCityDisplay: function () {
        var currentWord;

        currentCity.textContent = "";
        currentCity2.textContent = "";
        for (i=0;i<guessedLetters.length;i++) {
            currentWord = guessedLetters[i];
            for (var j=0;j<currentWord.length;j++) {
                if (i==0) {
                    currentCity.textContent += currentWord.charAt(j) + " ";
                } else {
                    currentCity2.textContent += currentWord.charAt(j) + " ";                       
                }
            }
        }
        console.log("updateCurrentCityDisplay: Current city context="+currentCity.textContent);
    },
    //____________________________________________________________
    isLetterInCity: function (letter) {
        var result = false;
        var cityWords = UScityNames[cityIndex].split(" ");
        for (i=0;i<cityWords.length;i++) {
            var reconstructedWord = "";
            var guessedLettersWord = guessedLetters[i];
            var currentCityWord = cityWords[i];
            for (var j=0;j<currentCityWord.length;j++) {
            // if (letter.toLowerCase() === UScityNames[cityIndex][i]) {
                if (letter.toLowerCase() === currentCityWord.charAt(j)) {
                    if (j == 0) {
                        reconstructedWord += letter.toUpperCase();
                        // alert("letter="+letter.toUpperCase());
                    } else {
                        reconstructedWord += letter.toLowerCase();
                    }
                    result = true;
                    console.log("isLetterInCity: currentCity="+ currentCity + " letter="+letter + " currentCity_display="+ currentCity_display);
                } else {
                    reconstructedWord += guessedLettersWord.charAt(j);
                }
            }
            // save the reconstructed word currently being displayed on the web page
            guessedLetters[i] = reconstructedWord;
        }
        console.log("isLetterInCity: reconstructedWord=" + reconstructedWord);
       return result;
    },
    //________________________________________________________________
    initializeVariableValues: function () {
        // select the city to be guessed
        var numSelectedCities = 0;
        do {
            cityIndex = Math.floor(Math.random() * UScityNames.length);
            if (selectedCities[cityIndex]) {
                numSelectedCities++;
                if (numSelectedCities == selectedCities.length) {      
                    break;
                }
            }
        } while (selectedCities[cityIndex]);
        if (numSelectedCities == selectedCities.length) {
            alert("You have played all of the cities in this game.");
            initializeSessionVariables();
            resetGame();
            return;
        }         
        selectedCities[cityIndex]=true; // mark that this city has already been selected
        guessesRemainingCount = 5; 
        winsText.textContent = winsCount;
        lossesText.textContent = lossesCount;
        guessesRemaining.textContent = guessesRemainingCount;
        lettersGuessed.textContent = "";
    },
   // __________________________________________________________
    resetGame: function () {
        myUserAlertButton.style.visibility = "hidden";
        initializeVariableValues();
        changeImage(cityIndex);
        initializeCurrentCityDisplay();
        updateCurrentCityDisplay();
    },
    //__________________________________________________________
    initializeSessionVariables: function () {
        winsCount = 0;
        lossesCount = 0;
        for (var i=0;i<UScityNames.length;i++)
            selectedCities[i]=false;    
    },
    //__________________________________________________________
    enableButton: function (buttonLabel) {
        myUserAlertButton.style.visibility = "visible";
        myUserAlertButton.innerText = buttonLabel;
        waitingForReset = true;
        if (buttonLabel == wonGameMessage) {
            audioElement = audioElement_wonGame;
        } else {
            audioElement = audioElement_lostGame;
        }
        audioElement.currentTime=0;
        audioElement.play();
        myUserAlertButton.onclick = function() {
            audioElement.pause();
            resetGame();
            return;
        }
    }
}   // var game {}

   // perform one-time initialization
   game.initializeSessionVariables();
   //  Start the game
   game.resetGame();
   document.onkeyup = function(event) {
       var userChoice, computerChoice;

       // check to see if we are waiting for user to play the next game
       if (myUserAlertButton.style.visibility == "visible") {
           return;
       }
       userChoice=event.key;
       if (userChoice == "Shift") {
           return;
       }
       if (isLetterInCity(userChoice)) {
           updateCurrentCityDisplay();
       } else {
           guessesRemainingCount--;
       }
       if ((currentCity.textContent.indexOf("_") >= 0) || (currentCity2.textContent.indexOf("_") >= 0)) {
           if (guessesRemainingCount==0) {
               lossesCount++;
               enableButton(lostGameMessage);
            }
           guessesRemaining.textContent = guessesRemainingCount;
           if (lettersGuessed.textContent === "") {
               lettersGuessed.textContent += userChoice.toUpperCase();
           } else {
               lettersGuessed.textContent += " " + userChoice.toUpperCase();
           }
       } else {
           winsCount++;
           //  Start the game from scratch
           enableButton(wonGameMessage);
       }
       winsText.textContent = winsCount;
       lossesText.textContent = lossesCount;
       console.log("user's choice=" + userChoice, "computer's choice=" + computerChoice, "user wins=" + winsCount, "user losses=" + lossesCount);
   }
