// My word-guess game
    var UScityNames = ["chicago",
                        "new york",
                        "boston",
                        "atlanta",
                        "los angeles"];
                        var UScityImages = ["chicago-illinois-skyline-skyscrapers-161963.jpeg",
                        "new-york-city-pexels-photo-466685.jpeg",
                        "boston-pexels-photo.jpg",
                        "atlanta-1617318_1920.jpg",
                        "losAngeles-1031706_1920.jpg"];
                        
    var gameChoices = ["r", "p", "s"];
    var currentCity_array = [];
    var currentCity_visibleLetters = [];
    var currentCity_display = [];
    var currentCity_display2 = [];
    var guessedLetters = [];
    var currentCityWords = [];

    var currentCity = document.getElementById("current-city");
    var currentCity2 = document.getElementById("current-city2");
    var winsText = document.getElementById("wins-text");
    var lossesText = document.getElementById("losses-text");
    var guessesRemaining = document.getElementById("guesses-remaining");
    var lettersGuessed = document.getElementById("letters-guessed");
    var varImage = document.getElementById("left-column-image");
    var cityIndex;
    var guessesRemainingCount;
    var winsCount;
    var lossesCount;
    var wordDividerCharacterPosition;

    var cityIndex;

    // perform one-time initialization
    winsCount = 0;
    lossesCount = 0;

    //  Start the game
    resetGame();
    document.onkeyup = function(event) {
    var userChoice, computerChoice;

    userChoice=event.key;
    if (userChoice == "Shift") {
    return;
    }
    if (isLetterInCity(userChoice)) {
        updateCurrentCityDisplay();
    }
    if ((currentCity.textContent.indexOf("_") >= 0) || (currentCity2.textContent.indexOf("_") >= 0)) {
    guessesRemainingCount--;
    if (guessesRemainingCount==0) {
    lossesCount++;
    alert("Sorry. No guesses remaining. Try again");
    resetGame();
    }
    guessesRemaining.textContent = guessesRemainingCount;
    if (lettersGuessed.textContent === "") {
    lettersGuessed.textContent += userChoice;
    } else {
    lettersGuessed.textContent += ", " + userChoice;
    }
    } else {
    winsCount++;
    //  Start the game from scratch
    resetGame();
    alert("You are a WINNER!!!");
    }
    winsText.textContent = winsCount;
    lossesText.textContent = lossesCount;
    console.log("user's choice=" + userChoice, "computer's choice=" + computerChoice, "user wins=" + winsCount, "user losses=" + lossesCount);
    }
    function changeImage(imageIndex)
    {
    var newSource = "assets/images/" + UScityImages[imageIndex];
    varImage.setAttribute("src", newSource);
    }
    //____________________________________________________________
    function initializeCurrentCityDisplay() {
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
    }
    //____________________________________________________________
    function updateCurrentCityDisplay() {
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
    }
    //____________________________________________________________
    function isLetterInCity(letter) {
        var result = false;
        var cityWords = UScityNames[cityIndex].split(" ");
        for (i=0;i<cityWords.length;i++) {
        var reconstructedWord = "";
        var guessedLettersWord = guessedLetters[i];
        var currentCityWord = cityWords[i];
        for (var j=0;j<currentCityWord.length;j++) {
        // if (letter.toLowerCase() === UScityNames[cityIndex][i]) {
            if (letter.toLowerCase() === currentCityWord.charAt(j)) {
                reconstructedWord += letter.toLowerCase();
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
    }
    //________________________________________________________________
    function initializeVariableValues() {
        cityIndex = Math.floor(Math.random() * UScityNames.length);
        guessesRemainingCount = 10; 
        winsText.textContent = 0;
        lossesText.textContent = 0;
        guessesRemaining.textContent = guessesRemainingCount;
        lettersGuessed.textContent = "";
    }
    //__________________________________________________________
    function resetGame() {
        initializeVariableValues();
        changeImage(cityIndex);
        initializeCurrentCityDisplay();
        updateCurrentCityDisplay();
    }