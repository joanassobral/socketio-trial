const socket = io("ws://192.168.178.242:3500")
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

let paragraph_container;


function sendMessage(e) {
    e.preventDefault()
    const input = document.querySelector("input")
    if (input.value) {
        socket.emit("message", input.value)
        input.value = ""
    }
    input.focus()
}

if (document.querySelector("form")) {
    document.querySelector("form").addEventListener("submit", sendMessage)
}



let button1 = document.getElementById("button1")
button1.addEventListener("click", () => {
    socket.emit("button", button1.innerText)
})

let button2 = document.getElementById("button2")
button2.addEventListener("click", () => {
    socket.emit("button", button2.innerText)
})





if (!isMobile) {
    Array.prototype.forEach.call(document.querySelectorAll(".mobile_only"), (el) => {
        el.parentElement.removeChild(el)
    })

}



function makeVideo(elName, fileName) {
    elName.src = "media/" + fileName + ".mp4"
    elName.muted = true
    elName.autoplay = true
    elName.playsInline = true
    elName.loop = true

    if (fileName === "coord") {
        elName.style.left = 80 + "vw"
    }
}

let greenlightsVideo = document.createElement("video");
let exhDemoVideo = document.createElement("video");
let socketExpVideo = document.createElement("video");
let coordVideo = document.createElement("video");
let asciiVideo = document.createElement("video");
let scriptVideo = document.createElement("video");

let coordTextTypesImg = document.createElement("img")
let ascii1Img = document.createElement("img")
let ascii2Img = document.createElement("img")
let promptImg = document.createElement("img")


socket.on("message", (data) => {

    if (!isMobile) {


        if (data === "0") {
            clearParagraphContainer()

            makeTextFromString("Hello and welcome back!", "big")
            setTimeout(() => {
                makeTextFromString("Today:", "small")
                makeTextFromString("1. Since last episode", "small")
                makeTextFromString("2. Reviewing the whole season", "small")
            }, 2000)
        }


        if (data === "1") {
            clearParagraphContainer()

            makeVideo(greenlightsVideo, "greenlights")
            greenlightsVideo.style.height = 70 + "vh"
            greenlightsVideo.style.top = 20 + "vh"
            document.body.appendChild(greenlightsVideo)

            makeTextFromString("1. Since last episode", "big")
        }


        if (data === "2") {
            document.body.removeChild(greenlightsVideo)

            makeVideo(exhDemoVideo, "exhibitionDemo")
            document.body.appendChild(exhDemoVideo)

            makeTextFromString("a. Define final form", "small")
        }


        if (data === "3") {
            document.body.removeChild(exhDemoVideo)

            makeVideo(socketExpVideo, "socket")
            document.body.appendChild(socketExpVideo)

        }


        if (data === "4") {
            document.body.removeChild(socketExpVideo)

            makeVideo(coordVideo, "coord")
            document.body.appendChild(coordVideo)

            coordTextTypesImg.src = "media/coordTextTypes.jpg"
            document.body.appendChild(coordTextTypesImg)

        }


        if (data === "5") {
            document.body.removeChild(coordVideo)
            document.body.removeChild(coordTextTypesImg)

            ascii1Img.src = "media/ascii1.PNG"
            document.body.appendChild(ascii1Img)

            ascii2Img.src = "media/ascii2.PNG"
            ascii2Img.style.left = 80 + "vw"
            document.body.appendChild(ascii2Img)

        }


        if (data === "6") {
            document.body.removeChild(ascii1Img)
            document.body.removeChild(ascii2Img)

            makeVideo(asciiVideo, "asciiTyping")
            asciiVideo.style.left = 55 + "vw"
            document.body.appendChild(asciiVideo)

            promptImg.src = "media/prompt0.png"
            promptImg.classList.add("promtIMG")
            document.body.appendChild(promptImg)

            let promptImgIndex = 1
            setInterval(() => {
                promptImg.src = "media/prompt" + promptImgIndex + ".png"
                if (promptImgIndex > 3) {
                    promptImgIndex = 0
                } else {
                    promptImgIndex++
                }
            }, 500)
        }


        if (data === "7") {
            document.body.removeChild(asciiVideo)
            document.body.removeChild(promptImg)
            document.body.removeChild(document.querySelectorAll(".paragraph_container")[1])

            makeTextFromString("b. Focus the intention", "small")
            setTimeout(() => {
                makeTextFromString("c. Have a legible critical position", "small")
            }, 1000)
        }


        if (data === "8") {
            makeVideo(scriptVideo, "script")
            document.body.appendChild(scriptVideo)
        }


        if (data === "9") {
            document.body.removeChild(scriptVideo)
            clearParagraphContainer()

            makeTextFromString("2. Reviewing the whole season", "big")
        }


        if (data === "10") {
            makeTextFromString("A glass half-full: seeing work-in-progress-ness as a promise of growth, not as incomplete or flawed.", "small")
        }


        if (data === "11") {
            document.body.removeChild(document.querySelectorAll(".paragraph_container")[1])
            makeTextFromString("I want to design how a thing works and what it does, not necessarily how it looks.", "small")
        }


        if (data === "12") {
            document.body.removeChild(document.querySelectorAll(".paragraph_container")[1])
            makeTextFromString("A journey in confidence: from a strange visual essay to a terrifying Greenlights, to this presentation.", "small")
        }


        if (data === "13") {
            document.body.removeChild(document.querySelectorAll(".paragraph_container")[1])
            makeTextFromString("Back-end development is so scary.", "small")
        }


        if (data === "14") {
            clearParagraphContainer()

            makeTextFromString("Question Time!", "big")
            setTimeout(() => {
                makeTextFromString("Thank you all for listening and for your support :)", "small")
            }, 2000)
        }


        if (data === "r") {
            window.location.reload()
        }
    }
})


socket.on("button", (arg) => {
    if (!isMobile) {
        makeTextFromString(arg, "small")
    }
})