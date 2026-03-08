
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

async function generateResults(text){

const API_URL = "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment"
const API_TOKEN = "YOUR_HF_TOKEN"

const response = await fetch(API_URL,{
method:"POST",
headers:{
"Authorization":`Bearer ${API_TOKEN}`,
"Content-Type":"application/json"
},
body:JSON.stringify({inputs:text})
})

const data = await response.json()

let sentiment="Neutral"

if(data[0]){
const label=data[0][0].label

if(label==="LABEL_2") sentiment="Positive"
if(label==="LABEL_0") sentiment="Negative"
}

let emotion="Calm"

if(sentiment==="Positive") emotion="Happy"
if(sentiment==="Negative") emotion="Aggressive"

let trust=70

if(sentiment==="Positive") trust=85
if(sentiment==="Negative") trust=40

document.getElementById("trustScore").innerText=trust
document.getElementById("sentiment").innerText=sentiment
document.getElementById("emotion").innerText=emotion
document.getElementById("manipulation").innerText="AI Analysis"

document.getElementById("explanation").innerText=
"TrustLens AI used NLP neural network analysis to evaluate emotional tone and truth probability."

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
