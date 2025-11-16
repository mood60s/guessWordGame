class main {
    constructor() {
        this.chosenKey = "";
        this.chosenValue = "";
        this.chosenWordValue = [];
        this.status = false;
    this.words = {
      programming: ["php","javascript","go","scala","fortran","r","mysql","python"],
      movies: ["prestige","inception","parasite","interstellar","whiplash","memento","coco","up"],
      people: ["albert Einstein","hitchcock","alexander","cleopatra","mahatma ghandi"],
      countries: ["syria","palestine","yemen","egypt","bahrain","qatar"]
    };
    }
    selectElemetns() {
        this.lettersContainer = document.querySelector(".letters");
        this.guessContainer = document.querySelector(".letters-guess");
        this.categorySpan = document.querySelector(".game-info .category span")
        this.theDraw = document.querySelector(".hangman-draw");
    }
    generateLetters() {
          const letters = "abcdefghijklmnopqrstuvwxyz";
        this.lettersContainer.innerHTML = "";
        letters.split("").forEach((letter) => {
            const span = document.createElement("span");
            span.className = "letter-box";
            span.textContent = letter;
            this.lettersContainer.append(span)
        })
    }
    pickRandomWord() {
        const keys = Object.keys(this.words);
        this.chosenKey = keys[Math.floor(Math.random() * keys.length)];
        const arr = this.words[this.chosenKey]
        
        this.chosenValue = arr[Math.floor(Math.random() * arr.length)];
        this.chosenWordValue = [...this.chosenValue];
        this.categorySpan.textContent = this.chosenKey;
    }
    generateGuessBoxes() {
        this.guessContainer.innerHTML = "";
        this.chosenWordValue.forEach(letter => {
            const span = document.createElement("span");
            if (letter === " ") span.className = "has-space"
            this.guessContainer.append(span)
        })
    }
    registerLetterClick() {

        let wrongAttempts = 0;
        document.addEventListener("click", (e) => {
            if (!e.target.classList.contains("letter-box")) return;
            e.target.classList.add("clicked");
            const clicked = e.target.textContent.toLowerCase();
            let correct = false;
            this.chosenWordValue.forEach((wordLetter, index) => {
                if (wordLetter.toLowerCase() === clicked) {
                    this.guessContainer.children[index].textContent = clicked;
                    correct = true;
                }
            })
            this.status = correct;
            if (this.status !==true) {
                // increase WrongAttempts
                wrongAttempts++;
                // Class Wrong To The Draw Ele,
                this.theDraw.classList.add(`wrong-${wrongAttempts}`)
                document.getElementById("fail").play()
                if (wrongAttempts == 8) {
                    this.lettersContainer.classList.add("Finished")
                  this.loseGame()
                }
            } else {
                document.getElementById("sucess").play()
                let AllSpans = document.querySelectorAll(".letters-guess span");
                let NotEmptySpans = Array.from(AllSpans);
                NotEmptySpans = NotEmptySpans.filter((ele)=> ele.textContent !== "")
              
                if (this.chosenValue.length == NotEmptySpans.length) {
                    this.winGame()
                }
            }
        })
       
    }

    loseGame() {
        document.getElementById("lose").play()
        let div = document.createElement("div");
        let divText = document.createTextNode(`Game Over The Word Is ${this.chosenValue}`);
        div.append(divText);
        // Add Class To div,
        div.className = "popup";
        document.body.append(div)
    }
    winGame() {
        this.lettersContainer.classList.add("Finished")
        let div = document.createElement("div");
        let divText = document.createTextNode(`Congartz Hero`);
        div.append(divText);
        // Add Class To div,
        div.className = "popup";
        document.body.append(div)
        document.getElementById("winner").play()
    }
    start() {
        this.selectElemetns()
        this.generateLetters();
        this.pickRandomWord();
        this.generateGuessBoxes();
        this.registerLetterClick();

    }
}
window.onload = () => {
    const game = new main();
    game.start()
}



console.log("%cCoded Mood60S","color:white;background:black;padding:10px;font-size:50px;border-radius:4px;display:block;")