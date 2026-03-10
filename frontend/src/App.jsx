import { useState, useEffect, useRef } from "react"
import axios from "axios"

import {
LineChart,
Line,
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
CartesianGrid
} from "recharts"

function App(){

const [image,setImage] = useState(null)
const [preview,setPreview] = useState(null)
const [result,setResult] = useState(null)
const [classes,setClasses] = useState([])
const [history,setHistory] = useState([])
const [showModelInfo, setShowModelInfo] = useState(false)

const resultsRef = useRef(null)

useEffect(()=>{

fetch("/classes.txt")
.then(res=>res.text())
.then(text=>setClasses(text.split("\n").map(c=>c.trim())))

},[])

const handleFile = (e)=>{

const file = e.target.files[0]

setImage(file)

if(file){
setPreview(URL.createObjectURL(file))
}

}
const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })
const runInference = async()=>{

const formData = new FormData()
formData.append("file",image)

const res = await axios.post(
"http://127.0.0.1:8000/predict",
formData
)

console.log("Backend result:", res.data)
console.log("Distribution example:", res.data.distribution?.[0])

setResult(res.data)

setHistory(prev=>[
{
class:classes[res.data.prediction],

confidence:(res.data.confidence*100).toFixed(1),
uncertainty:res.data.uncertainty.toFixed(3)
},
...prev
].slice(0,5))

setTimeout(()=>{
resultsRef.current?.scrollIntoView({behavior:"smooth"})
},200)

}

const chartData = result && result.distribution
  ? result.distribution.map((v, i) => {

      const conf = v?.[result.mc_prediction ?? result.prediction] ?? 0

      return {
        run: i + 1,
        confidence: conf * 100
      }

    })
  : []

const classFrequency = result && result.distribution
? (() => {

  const probs = result.distribution

  if(!probs || probs.length === 0) return []

  const meanProbs = Array(probs[0].length).fill(0)

  probs.forEach(run => {
    run.forEach((p,i)=>{
      meanProbs[i] += p
    })
  })

  const averaged = meanProbs.map(v => v / probs.length)

  const pairs = averaged.map((p,i)=>({
    class: (classes[i] || `Class ${i}`)
        .replace("Speed limit ", "")
        .replace("km/h", " km/h")
        .replace("Dangerous curve to the right", "Dangerous curve")
        .replace("End of all speed and passing limits", "End restrictions"),
    prob: p * 100
  }))

  const sorted = pairs.sort((a,b)=>b.prob-a.prob)

  const top5 = sorted.slice(0,5)

  const othersProb = sorted.slice(5).reduce((sum,c)=>sum+c.prob,0)

  return [
    ...top5,
    {class:"Others", prob:othersProb}
  ]

})()
: []

const getUncertaintyLevel = (u)=>{

if(u < 0.9)
return {
label:"Highly Reliable",
color:"green",
action:"System proceeds normally."
}

if(u < 1.6)
return {
label:"Moderate Uncertainty",
color:"orange",
action:"Slow down and verify using additional sensors or models."
}

return {
label:"High Uncertainty",
color:"red",
action:"Request human override or driver assistance."
}

}

const classVotes = result
? result.distribution.map(
    probs => probs.indexOf(Math.max(...probs))
  )
: []

const voteCounts = {}

classVotes.forEach(c=>{
  voteCounts[c] = (voteCounts[c] || 0) + 1
})

const sortedVotes = Object.values(voteCounts).sort((a,b)=>b-a)

const conflictDetected =
result &&
sortedVotes.length > 1 &&
sortedVotes[1] > result.distribution.length * 0.2

return(

<div className="relative min-h-screen bg-gradient-to-br from-blue-200 via-white to-purple-200 px-10 pb-10 pt-30 overflow-hidden">

{/* BACKGROUND GLOW EFFECTS */}

<div className="absolute top-[-150px] left-[-100px] w-[400px] h-[400px] bg-blue-200 rounded-full blur-3xl opacity-40"></div>

<div className="absolute top-[50px] right-[-120px] w-[400px] h-[400px] bg-purple-200 rounded-full blur-3xl opacity-40"></div>

{/* HERO + FEATURES + UPLOAD */}

<div className="max-w-6xl mx-auto mb-20">
{/* TITLE */}

<div className="text-center mb-20 mt-10">

<h1 className="text-5xl md:text-6xl font-bold leading-tight">

Reliable Traffic Sign Recognition

<br/>

<span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
with Uncertainty Estimation
</span>

</h1>

<p className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto">

Analyze traffic sign predictions and visualize model uncertainty
using Monte Carlo Dropout.

</p>

</div>

<div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-10 rounded"></div>
{/* FEATURES + UPLOAD GRID */}

<div className="grid md:grid-cols-2 gap-16 items-center">

{/* FEATURES LEFT */}

<div className="flex flex-col justify-center">

<h2 className="text-2xl font-semibold mb-6">
Key Features
</h2>

<div className="space-y-6">


<div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition">  

<h3 className="font-semibold text-lg mb-2">
🚦Traffic Sign Recognition
</h3>

<p className="text-gray-600">
Classifies traffic signs using a trained convolutional neural network
based on the German Traffic Sign Recognition Benchmark dataset.
</p>

</div>

<div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition">
<h3 className="font-semibold text-lg mb-2">
📊 Prediction Confidence Analysis
</h3>

<p className="text-gray-600">
Displays the prediction confidence of a standard CNN model,
indicating how strongly the model favors the predicted class.
</p>

</div>

<div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition">
<h3 className="font-semibold text-lg mb-2">
🧠Uncertainty Estimation
</h3>

<p className="text-gray-600">
Uses Monte Carlo Dropout to estimate epistemic uncertainty,
revealing how stable the model prediction is across stochastic runs.
</p>

</div>

</div>

</div>


{/* UPLOAD RIGHT */}

<div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition p-10 mt-10 text-center">

<h2 className="text-2xl font-semibold mb-6">
Upload Traffic Sign
</h2>

<div className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-blue-400 transition">

<p className="text-gray-500 mb-4">
Drag & Drop a traffic sign image
</p>

<input
type="file"
onChange={handleFile}
className="mb-4"
/>

</div>

{preview && (
<img
src={preview}
className="w-40 h-40 object-contain rounded-lg shadow-md mt-6 mx-auto"
/>
)}

<button
onClick={runInference}
className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
>

Run Inference

</button>

</div>
</div>

</div>

{/* RESULTS */}

{result && (

<div className="mb-20">

<div className="text-center mb-8">

<p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
Results
</p>

<h2 className="text-3xl font-semibold">
Model Predictions
</h2>

</div>

<div className="border-t border-gray-200 mb-12"></div>

<div ref={resultsRef} className="grid grid-cols-2 gap-10">


{/* STANDARD CNN */}

<div className="bg-white/80 backdrop-blur p-8 rounded-xl shadow-lg">

<h2 className="text-xl font-semibold mb-2">
Standard CNN
</h2>

<p className="text-gray-500 mb-6">
Deterministic Prediction
</p>

{/* PREDICTED CLASS */}

<div className="mb-6">



<h3 className="text-3xl font-bold">
{classes[result.prediction] || `Class ${result.prediction}`}
</h3>

</div>


{/* CONFIDENCE CARD */}

<div className="bg-blue-50 border border-blue-100 p-5 rounded-lg hover:shadow-lg transition">

<p className="text-sm text-gray-500">
Confidence
</p>

<p className="text-gray-900 font-semibold text-2xl">
{(result.confidence*100).toFixed(2)}%
</p>

</div>

</div>
{/* MC DROPOUT */}

<div className="bg-white/80 backdrop-blur p-8 rounded-xl shadow-lg">

<h2 className="text-xl font-semibold mb-2">
MC Dropout CNN
</h2>

<p className="text-gray-500 mb-6">
Stochastic Prediction Distribution
</p>

<h3 className="text-3xl font-bold mb-4">
{classes[result.mc_prediction]}
</h3>

<div className="grid grid-cols-2 gap-6 mt-6">

<div className="bg-indigo-50 border border-indigo-100 p-5 rounded-lg hover:shadow-lg transition">

<p className="text-sm text-gray-500">
Confidence
</p>

<p className="text-xl font-semibold text-gray-800">
{(result.mc_confidence*100).toFixed(2)}%
</p>

</div>

<div className="bg-indigo-50 border border-indigo-100 p-5 rounded-lg hover:shadow-lg transition">

<p className="text-sm text-gray-500">
Predictive Entropy
</p>

<div className="mt-2">

<div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">

<div
className={`h-3 rounded-full ${
result.uncertainty < 0.8
? "bg-green-500"
: result.uncertainty < 1.5
? "bg-orange-500"
: "bg-red-500"
}`}
style={{ width: `${Math.min(result.uncertainty * 60, 100)}%` }}
></div>

</div>

<p className="text-sm text-gray-600 mt-2">
Entropy: {result.uncertainty.toFixed(3)}
</p>

</div>

</div>

</div>


{/* UNCERTAINTY INTERPRETATION */}

<div className="mt-6">

{(()=>{

const level = getUncertaintyLevel(result.uncertainty)

return(

<div className="mt-4">

<span
className={`px-4 py-2 rounded-full text-sm font-semibold
${level.color === "green" ? "bg-green-100 text-green-700 border border-green-500" : ""}
${level.color === "orange" ? "bg-orange-100 text-orange-700 border border-orange-500" : ""}
${level.color === "red" ? "bg-red-100 text-red-700 border border-red-500" : ""}
`}
>

Uncertainty Level: {level.label}

</span>
<p className="text-sm text-gray-600 mt-2">
Recommended Action: {level.action}
</p>
</div>

)

})()}

</div>

{/* CONFLICT WARNING */}


{conflictDetected &&(  

<div className="mt-4 p-4 bg-yellow-100 rounded">

⚠ Multiple class predictions detected across MC runs.
The model is uncertain between multiple traffic signs.

</div>

)}

</div>

</div>
</div>

)}

{/* GRADCAM HEATMAP */}

{result?.heatmap && (

<div className="max-w-5xl mx-auto mb-20">

<div className="bg-white p-10 rounded-xl shadow">

<h2 className="text-xl font-semibold mb-4">
Model Attention (Grad-CAM)
</h2>

<p className="text-gray-600 text-sm mb-6">
Highlights the regions of the image that influenced the CNN prediction.
Brighter areas indicate stronger model attention.
</p>

<img
src={`data:image/png;base64,${result.heatmap}`}
className="rounded-lg shadow-md mx-auto"
/>

</div>

</div>

)}

{/* GRAPHS */}

{result && (

<div className="mb-20">

<div className="text-center mb-8">

<p className="text-xs text-gray-400 uppercase tracking-widest mb-2">
Analysis
</p>

<h2 className="text-3xl font-semibold">
Uncertainty Analysis
</h2>

</div>

<div className="border-t border-gray-200 mb-12"></div>

<div className="space-y-16">
{/* CONFIDENCE STABILITY GRAPH */}

<div className="bg-white p-10 rounded-xl shadow">

<h2 className="text-xl font-semibold mb-4">
Confidence Stability Across Monte Carlo Runs
</h2>

<p className="text-gray-600 mb-6 text-sm">
Shows how the predicted class confidence varies across stochastic
Monte Carlo runs. Large variation indicates higher uncertainty.
</p>

<ResponsiveContainer width="100%" height={470}>

<LineChart
  data={chartData}
  margin={{ top: 30, right: 10, left: 15, bottom: 50}}
>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis 
dataKey="run"
label={{value:"Monte Carlo Run", position:"insideBottom", offset:-10}}
/>

<YAxis 
domain={[0,100]}
label={{value:"Prediction Confidence (%)", angle:-90}}
/>

<Tooltip/>

<Line
type="linear"
dataKey="confidence"
stroke="#6366f1"
strokeWidth={3}
dot={false}
/>

</LineChart>

</ResponsiveContainer>

</div>


{/* CLASS PREDICTION FREQUENCY GRAPH */}

<div className="bg-white p-14 rounded-xl shadow">

<h2 className="text-xl font-semibold mb-4">
Class Prediction Distribution (Monte Carlo Voting)
</h2>

<p className="text-gray-600 mb-6 text-sm">
Displays how often each class was predicted across Monte Carlo runs.
If multiple classes appear with similar counts, the model may be
confused between them.
</p>

<ResponsiveContainer width="100%" height={470}>


<BarChart 
  data={classFrequency}
  margin={{ top: 30, right: 20, left: 15, bottom: 50 }}
> 

<CartesianGrid strokeDasharray="3 3"/>

<XAxis
dataKey="class"
label={{value:"Traffic Sign Class", position:"insideBottom", offset:-10}}
/>

<YAxis
label={{value:"Prediction Probability (%)", angle:-90}}
/>
<Tooltip/>

<Bar
dataKey="prob"
fill="#8b5cf6"
radius={[4,4,0,0]}
/>

</BarChart>

</ResponsiveContainer>

</div>

</div>
</div>

)}

{/* MODEL INFO PANEL */}

<div className="max-w-5xl mx-auto mb-20">

<button
onClick={()=>setShowModelInfo(!showModelInfo)}
className="w-full bg-white shadow p-5 rounded-xl flex justify-between items-center hover:bg-gray-50 transition"
>

<span className="font-semibold text-lg">
Model Information
</span>

<span className="text-gray-500">
{showModelInfo ? "▲" : "▼"}
</span>

</button>

{showModelInfo && (

<div className="bg-white p-8 rounded-b-xl shadow border-t">

<div className="grid md:grid-cols-2 gap-6 text-sm">

<div>
<p className="text-gray-500">Project Title</p>
<p className="font-semibold">
Uncertainty Estimation in CNN Image-Based Classification using Monte Carlo Dropout
</p>
</div>

<div>
<p className="text-gray-500">Model Architecture</p>
<p className="font-semibold">Convolutional Neural Network (CNN)</p>
</div>

<div>
<p className="text-gray-500">Dataset</p>
<p className="font-semibold">German Traffic Sign Recognition Benchmark (GTSRB)</p>
</div>

<div>
<p className="text-gray-500">Number of Classes</p>
<p className="font-semibold">43 Traffic Sign Categories</p>
</div>

<div>
<p className="text-gray-500">Uncertainty Method</p>
<p className="font-semibold">Monte Carlo Dropout</p>
</div>

<div>
<p className="text-gray-500">Uncertainty Metric</p>
<p className="font-semibold">Predictive Entropy</p>
</div>

<div>
<p className="text-gray-500">Monte Carlo Runs</p>
<p className="font-semibold">{result?.distribution?.length || "N/A"}</p>
</div>

</div>

</div>

)}

</div>
<div className="text-center text-gray-500 text-sm mt-24">

Traffic Sign Uncertainty Dashboard

<br/>

Built with React • PyTorch • FastAPI

</div>
</div>

)

}

export default App
