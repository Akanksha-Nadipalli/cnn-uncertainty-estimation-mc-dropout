import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, BarChart, Bar
} from "recharts"
import { motion } from "framer-motion"

function Charts({ result, classes }) {

  const chartData = result.distribution.map((v, i) => ({
    run: i + 1,
    confidence: v[result.prediction] * 100
  }))

  const freq = {}

  result.distribution.forEach((run) => {
    const predictedClass = run.indexOf(Math.max(...run))
    freq[predictedClass] = (freq[predictedClass] || 0) + 1
  })

  const probs = result?.distribution || []

const numClasses = probs[0]?.length || 0
const runs = probs.length

// 🔹 average probabilities
const meanProbs = Array(numClasses).fill(0)

probs.forEach(run => {
  run.forEach((p, i) => {
    meanProbs[i] += p
  })
})

const avgProbs = runs > 0
  ? meanProbs.map(v => v / runs)
  : []

// 🔹 vote counts (for uncertainty insight)
const voteCounts = Array(numClasses).fill(0)

probs.forEach(run => {
  const winner = run.indexOf(Math.max(...run))
  voteCounts[winner]++
})

// 🔹 combine
const combined = avgProbs.map((p, i) => ({
  class: classes[i] || `Class ${i}`,
  prob: p * 100,
  votes: runs > 0 ? voteCounts[i] / runs : 0
}))

// 🔹 sort
const sorted = [...combined].sort((a, b) => b.prob - a.prob)

// 🔹 top 5
const top5 = sorted.slice(0, 5)

// 🔹 others
const others = sorted.slice(5)

const othersProb = others.reduce((sum, c) => sum + c.prob, 0)
const othersVotes =
  others.reduce((sum, c) => sum + c.votes, 0)

// 🔹 final data
const classFrequency =
  othersProb > 1 && othersProb < 30
    ? [...top5, {
        class: "Others",
        prob: othersProb,
        votes: othersVotes
      }]
    : top5

  return (

    <div className="relative pb-20 md:pb-28 overflow-hidden text-white"> 

      {/* 🔵 TOP LEFT */}
<motion.div
  animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
  transition={{ duration: 30, repeat: Infinity }}
  className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px]
    bg-blue-600/60 blur-[140px] rounded-full pointer-events-none"
/>

{/* 🔵 TOP RIGHT */}
<motion.div
  animate={{ x: [0, -40, 20, 0], y: [0, 30, -20, 0] }}
  transition={{ duration: 32, repeat: Infinity }}
  className="absolute top-[-100px] right-[-100px] w-[350px] h-[350px]
    bg-blue-400/60 blur-[140px] rounded-full pointer-events-none"
/>

{/* 🔵 BOTTOM LEFT */}
<motion.div
  animate={{ x: [0, 30, -20, 0], y: [0, 20, -10, 0] }}
  transition={{ duration: 28, repeat: Infinity }}
  className="absolute bottom-[-120px] left-[-80px] w-[300px] h-[300px]
    bg-blue-400/60 blur-[140px] rounded-full pointer-events-none"
/>

{/* 🔵 BOTTOM RIGHT */}
<motion.div
  animate={{ x: [0, -30, 20, 0], y: [0, -20, 10, 0] }}
  transition={{ duration: 34, repeat: Infinity }}
  className="absolute bottom-[-120px] right-[-80px] w-[300px] h-[300px]
    bg-blue-500/60 blur-[140px] rounded-full pointer-events-none"
/>

      {/* HEADER */}
      <div className="text-center mt-16 mb-12">

        <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">
          Analysis
        </p>

        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded mb-4 mx-auto"></div>

        <h2 className="text-4xl font-semibold bg-gradient-to-r from-blue-300 to-white bg-clip-text text-transparent">
  Uncertainty Analysis
</h2>

      </div>

      <div className="space-y-16">

        {/* LINE GRAPH */}
        <div className="max-w-6xl mx-auto px-6">

          <div className="relative p-6 rounded-3xl overflow-hidden
  bg-white/[0.06] backdrop-blur-3xl
  border border-white/20
  shadow-[0_20px_60px_rgba(0,0,0,0.8)]
">

 
  <div className="absolute inset-0 rounded-3xl
    border border-white/30
    opacity-40 pointer-events-none" />

 
  <div className="absolute top-0 left-0 w-full h-[40%]
    bg-gradient-to-b from-white/40 to-transparent
    opacity-20 blur-sm pointer-events-none" />

  
  <div className="absolute inset-0
    bg-gradient-to-br from-white/10 via-transparent to-transparent
    pointer-events-none" />

            <div className="absolute inset-0 
              bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />

            <div className="absolute top-0 left-0 w-full h-[40%]
              bg-gradient-to-b from-white/20 to-transparent opacity-20 blur-sm pointer-events-none" />

            <h2 className="text-lg font-semibold mb-2 text-blue-100">
              Confidence Stability Across Monte Carlo Runs
            </h2>

            <p className="text-gray-400 text-sm mb-6">
              Shows how confidence varies across multiple stochastic runs.
              Higher variation → higher uncertainty.
            </p>

            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="run" stroke="#9ca3af" />
                <YAxis domain={[0, 100]} stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff"
                  }}
                />

                <defs>
  <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stopColor="#60a5fa" />
    <stop offset="100%" stopColor="#1d4ed8" />
  </linearGradient>
</defs>

                <Line
  type="linear"
  dataKey="confidence"
  stroke="url(#lineGradient)"
  strokeWidth={3}
  dot={false}
/>
              </LineChart>
            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR GRAPH */}
        <div className="max-w-6xl mx-auto px-6">

          <div className="relative p-6 rounded-3xl overflow-hidden
  bg-white/[0.06] backdrop-blur-3xl
  border border-white/20
  shadow-[0_20px_60px_rgba(0,0,0,0.8)]
">

  
  <div className="absolute inset-0 rounded-3xl
    border border-white/30
    opacity-40 pointer-events-none" />

  
  <div className="absolute top-0 left-0 w-full h-[40%]
    bg-gradient-to-b from-white/40 to-transparent
    opacity-20 blur-sm pointer-events-none" />

  <div className="absolute inset-0
    bg-gradient-to-br from-white/10 via-transparent to-transparent
    pointer-events-none" />

            
            <div className="absolute inset-0 
              bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />

            
            <div className="absolute top-0 left-0 w-full h-[40%]
              bg-gradient-to-b from-white/20 to-transparent opacity-20 blur-sm pointer-events-none" />

            <h2 className="text-lg font-semibold mb-2 text-blue-100">
              Class Probability Distribution (Monte Carlo Averaging)
            </h2>

            <p className="text-gray-400 text-sm mb-6">
              Shows average confidence and model agreement across runs.
              Multiple strong classes → higher uncertainty.
            </p>

            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={classFrequency}>
                <CartesianGrid stroke="rgba(255,255,255,0.1)" />

                <XAxis
                  dataKey="class"
                  angle={0}
                  textAnchor="end"
                  interval={0}
                  stroke="#9ca3af"
                />

                <YAxis domain={[0, 100]} stroke="#9ca3af" />

                <Tooltip
  contentStyle={{
    backgroundColor: "#0b1220",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "10px",
    color: "#fff"
  }}
  formatter={(value, name, props) => {
  if (props.payload.class === "Others") {
    return [`${value.toFixed(1)}%`, "Confidence"]
  }

  return [
    `${value.toFixed(1)}% (votes: ${((props.payload?.votes || 0) * 100).toFixed(0)}%)`,
    "Confidence"
  ]
}}
/>

                <defs>
  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stopColor="#93c5fd" stopOpacity={1} />
    <stop offset="100%" stopColor="#1e3a8a" stopOpacity={0.9} />
  </linearGradient>
</defs>

              
<Bar
  dataKey="prob"
  fill="url(#barGradient)"
  radius={[10, 10, 0, 0]}
  animationDuration={800}
/>

              </BarChart>
            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Charts