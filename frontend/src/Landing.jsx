import { useState, useEffect, useRef } from "react"
import axios from "axios"

import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Features from "./components/Features"

import UploadSection from "./components/UploadSection"
import Results from "./components/Results"
import Charts from "./components/Charts"
import Footer from "./components/Footer"

function Landing() {

  const [image,setImage] = useState(null)
  const [preview,setPreview] = useState(null)
  const [result,setResult] = useState(false)
  const [classes,setClasses] = useState([])
  const [loading, setLoading] = useState(false)

  const resultsRef = useRef(null)

  useEffect(()=>{
    fetch("/classes.txt")
    .then(res=>res.text())
    .then(text=>setClasses(text.split("\n").map(c=>c.trim())))
  },[])

  useEffect(() => {
  if (result && resultsRef.current) {

    const yOffset = -133

    const y =
      resultsRef.current.getBoundingClientRect().top +
      window.pageYOffset +
      yOffset

    window.scrollTo({
      top: y,
      behavior: "smooth"
    })
  }
}, [result])

const classVotes = result
  ? result.distribution.map(
      probs => probs.indexOf(Math.max(...probs))
    )
  : []

const voteCounts = {}

classVotes.forEach(c => {
  voteCounts[c] = (voteCounts[c] || 0) + 1
})

const sortedVotes = Object.values(voteCounts).sort((a, b) => b - a)

const conflictDetected =
  result &&
  sortedVotes.length > 1 &&
  sortedVotes[1] > result.distribution.length * 0.2

  const handleFile = (e)=>{
    const file = e.target.files[0]
    setImage(file)
    if(file) setPreview(URL.createObjectURL(file))
  }

const runInference = async () => {

  if (!image) {
    alert("Upload image first")
    return
  }

  setLoading(true)

  const formData = new FormData()
  formData.append("file", image)

  try {
    // run API + delay
    const [res] = await Promise.all([
      axios.post("http://127.0.0.1:8000/predict", formData),
      new Promise(resolve => setTimeout(resolve, 1200)) 
    ])

    setResult(res.data)

  } catch (err) {
    console.error(err)
    alert("Something went wrong")
  }

  setLoading(false)
}

  return(
    <div className="bg-black text-white min-h-screen flex flex-col">

      <Navbar />

      <Hero />

      <Features />

      {/* DEMO SECTION */}
    
        <UploadSection
          preview={preview}
          handleFile={handleFile}
          runInference={runInference}
          loading={loading}
        />
      

      {/* RESULTS */}
      {result && (
  <>
    
    <div ref={resultsRef} className="mt-32">
      <Results 
  result={result} 
  classes={classes} 
  conflictDetected={conflictDetected}
/>
    </div>

    {/* CHARTS BELOW */}
    <div className="mt-32">
      <Charts result={result} classes={classes} />
    </div>
  </>
)}
<Footer result={result} />

    </div>
  )
}

export default Landing