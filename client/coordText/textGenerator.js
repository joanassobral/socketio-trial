function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomIntMin(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function makeWord(size, paragraph_container) {
    let wordContainer = document.createElement("div")
    wordContainer.classList.add("word_container")
    wordContainer.classList.add("word_container" + "_" + size)
    paragraph_container.appendChild(wordContainer)
}

function makeLetter(letter, size, paragraph_container, letterIndex) {

    try {
        getLetterCoords(letter)

        let letterContainer = document.createElement("div")
        letterContainer.classList.add("letter_container")
        letterContainer.classList.add("letter_container_" + size)
        paragraph_container.lastChild.appendChild(letterContainer)

        let scale;
        if (isMobile) {
            if (size === "small") {
                scale = 0.017
            }
            if (size === "medium") {
                scale = 0.03
            }
            if (size === "big") {
                scale = 0.09
            }
        } else {
            if (size === "small") {
                scale = 0.04
            }
            if (size === "medium") {
                scale = 0.07
            }
            if (size === "big") {
                scale = 0.10
            }
        }

        letterContainer.style.width = letterCoords[0] * scale + "px"

        for (i = 1; i < letterCoords.length; i++) {
            let xCoord = letterCoords[i].split(" ")[0]
            let yCoord = letterCoords[i].split(" ")[1]

            let dot = document.createElement("div")
            dot.classList.add("dot")
            dot.style.marginLeft = (xCoord * scale) + "px"
            dot.style.marginTop = (-yCoord * scale) + "px"
            letterContainer.appendChild(dot)

            setTimeout(() => {
                dot.style.opacity = 1
            }, 20 * i + letterIndex * 20);

            if (!isMobile) {
                setTimeout(() => {
                    dot.parentElement.removeChild(dot)
                }, getRandomIntMin(1000, 600000))
            }


        }
    }
    catch (err) {
        return
    }
}

function clearParagraphContainer() {
    Array.prototype.forEach.call(
        document.querySelectorAll(".paragraph_container"),
        (el) => {
            el.parentElement.removeChild(el);
        }
    );
}

function makeTextFromString(string, size) {

    let dataCharacters = string.split("");

    let paragraph_container = document.createElement("div");
    paragraph_container.classList.add("paragraph_container");
    document.body.appendChild(paragraph_container);
    makeWord(size, paragraph_container)
    for (a = 0; a < dataCharacters.length; a++) {
        let currentCharacter = dataCharacters[a]

        if (currentCharacter === " ") {
            makeWord(size, paragraph_container);
        } else {
            makeLetter(currentCharacter, size, paragraph_container, a)
        }
    }
}
