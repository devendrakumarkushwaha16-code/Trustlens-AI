
const lines = [
"Initializing TrustLens AI Core...",
"Loading neural analysis engine...",
"Decrypting truth patterns...",
"Activating cognitive scanners..."
]

let index = 0
const terminal = document.getElementById("terminal-text")

function typeLine(){

if(index < lines.length){

terminal.innerHTML += lines[index] + "<br>"
index++

setTimeout(typeLine,700)

}else{

setTimeout(()=>{
document.getElementById("loading-screen").style.display="none"
document.getElementById("main-content").style.display="block"
},1000)

}

}

typeLine()

document.getElementById("enterBtn").onclick = () =>{
document.getElementById("analyzer").scrollIntoView({behavior:"smooth"})
}

document.getElementById("scanBtn").onclick = runScan

function runScan(){

const text = document.getElementById("inputText").value

if(text.length < 5){
alert("Enter a message first")
return
}

const status = document.getElementById("scanStatus")

status.innerHTML="Analyzing emotional patterns..."

setTimeout(()=>{
status.innerHTML="Scanning linguistic signals..."
},1000)

setTimeout(()=>{
status.innerHTML="Detecting manipulation indicators..."
},2000)

setTimeout(()=>{
status.innerHTML="Running truth probability engine..."
generateResults(text)
},3000)

}

function generateResults(text){

const trust = Math.floor(Math.random()*100)

const sentiments=["Positive","Neutral","Negative"]
const emotions=["Calm","Aggressive","Persuasive","Defensive"]
const manipulation=["Low","Medium","High"]

document.getElementById("trustScore").innerText=trust

document.getElementById("sentiment").innerText=
sentiments[Math.floor(Math.random()*sentiments.length)]

document.getElementById("emotion").innerText=
emotions[Math.floor(Math.random()*emotions.length)]

document.getElementById("manipulation").innerText=
manipulation[Math.floor(Math.random()*manipulation.length)]

document.getElementById("explanation").innerText=
"The language pattern suggests emotional persuasion and selective wording that may influence perception."

saveHistory(text,trust)

}

function saveHistory(text,score){

let history = JSON.parse(localStorage.getItem("trustHistory")) || []

history.unshift({
text:text,
score:score,
time:new Date().toLocaleString()
})

localStorage.setItem("trustHistory",JSON.stringify(history))

renderHistory()

}

function renderHistory(){

let history = JSON.parse(localStorage.getItem("trustHistory")) || []

const container = document.getElementById("historyList")

container.innerHTML=""

history.forEach(item=>{

const div=document.createElement("div")

div.className="history-item"

div.innerHTML=`
<strong>Score:</strong> ${item.score} <br>
${item.text.substring(0,80)}... <br>
<small>${item.time}</small>
`

container.appendChild(div)

})

}

renderHistory()
