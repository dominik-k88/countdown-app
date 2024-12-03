const input = document.querySelector("#number-input")
const outputBox = document.querySelector("#output-box")
const checkboxes = document.querySelectorAll("#checkbox > input")
const checkBoxItems = document.querySelector("#checkbox")
const subBtn = document.querySelector("#sub-btn")
const stopBtn = document.querySelector("#stop-btn")
const hoursSpan = document.querySelector("#hh")
const minutesSpan = document.querySelector("#mm")
const secondsSpan = document.querySelector("#ss")
const finalMsg = document.querySelector("#final-msg")

let interval = null
let isRunning = false
let isPaused = false
outputBox.classList.add("hide")    
let [hours, minutes, seconds] = [0, 0, 0]
const signal = new Audio("Alarm.mp3")
signal.loop = true

const getCheckbox = () => {
    let checked = ""
    checkboxes.forEach(box => {
        if (box.checked) {
            checked = box.value
        }
    })
    return checked
}
const setValue = (input => {
    const inputVal = Number(input.value)
    if (isNaN(inputVal) || inputVal < 0) {
        return alert("Please insert valid positive value")
    }
    finalMsg.className = "hide"
    
    if (getCheckbox() === "hours") {
        hours = inputVal
        updateDOM(hoursSpan, hours)
    } else if (getCheckbox() === "minutes") {
        minutes = inputVal
        updateDOM(minutesSpan, minutes)
    } else if (getCheckbox() === "seconds") {
        seconds = inputVal
        updateDOM(secondsSpan, seconds)
    } else {
        return alert("Select time type")
    }

    if (hours > 0 || minutes > 0 || seconds > 0) {
        clearInterval(interval)
        interval = setInterval(startCountdown, 1000)
        checkBoxItems.classList.toggle("hide")
        outputBox.classList.toggle("hide")
        isRunning = true
        isPaused = false
        input.value = ""
        subBtn.classList.add("paused")
        subBtn.textContent = "Pause"
    } else {
        return alert("Please insert a valid time")
    }
}
)
/** SUPPORT FUNCTIONS Start**/
function uncheckBox (){
    checkboxes.forEach(box =>{
        box.checked = false
    })
}
function reset() {
    interval = null
    isRunning = false
    isPaused = false
    hours = 0
    minutes = 0
    seconds = 0
    finalMsg.className = "hide"
    outputBox.classList.add("hide")
    checkBoxItems.classList.remove("hide")
    uncheckBox()
}

function updateDOM(elem, time) {
    elem.textContent = formateTime(time)
}

function formateTime(time) {
    return time < 10 ? `0${time}` : time
}
function startCountdown() {
    if (hours > 0 || minutes > 0 || seconds > 0) {
        if (seconds > 0) {
            seconds--
            secondsSpan.textContent = seconds
        } else if (minutes > 0) {
            minutes--
            seconds = 59
        } else if (hours > 0) {
            hours--
            minutes = 59
            seconds = 59
        }
        updateDOM(hoursSpan, hours)
        updateDOM(minutesSpan, minutes)
        updateDOM(secondsSpan, seconds)

    } else {        
    stopCount()       
    }
}
function pauseContinue() {    
    
    if (!isPaused) {
        clearInterval(interval)
        isPaused = true
        finalMsg.className = "show"
        subBtn.classList.remove("paused")
        stopBtn.classList.toggle("show")
        stopBtn.classList.toggle("hide")
        subBtn.textContent = "Continue"
        finalMsg.textContent = "Countdown is paused"
        finalMsg.style.color = "orange"
    }else{
        interval = setInterval(startCountdown, 1000)
        finalMsg.className = "hide"
        isPaused = false
        if (subBtn.textContent == "Continue") {
            subBtn.textContent = "Pause"
            subBtn.classList.add("paused")
            stopBtn.classList.toggle("show")
            stopBtn.classList.toggle("hide")
        }
    }    
}

function stopCount() {
    
        if (isRunning && !isPaused) {
            clearInterval(interval)
            finalMsg.className = "show"
            finalMsg.textContent = "Countdown is finished"
            finalMsg.style.color = "red"
            subBtn.textContent = "Start"
            subBtn.classList.remove("paused")            
            setTimeout(()=>{                   
                signal.play()                           
                alert("Finished")
                signal.pause()
                signal.currentTime = 0
                reset()
            },0)
        }else{
            const wantStop = confirm("Do you want to exit counting?")
            if(wantStop){
                reset()
                clearInterval(interval)        
                subBtn.textContent = "Start"
                subBtn.classList.remove("paused")
                updateDOM(hoursSpan, 0)
                updateDOM(minutesSpan, 0)
                updateDOM(secondsSpan, 0)
                stopBtn.classList.toggle("show")
                stopBtn.classList.toggle("hide")
            }
        }        
    }
    /** SUPPORT FUNCTIONS End**/

subBtn.addEventListener("click", () => {
    if (isRunning && !isPaused) {        
        pauseContinue()
    } else if (isPaused) {    
        pauseContinue()
    } else {
        setValue(input)
    }
})
stopBtn.addEventListener("click",()=>{
    stopCount()
})

input.addEventListener("input", () => {
    if (input.value.length > input.maxLength) input.value = input.value.slice(0, input.maxLength);
})
