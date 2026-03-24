import { motion } from "framer-motion"

function Results({ result, classes, conflictDetected}) {

  const getUncertaintyLevel = (val) => {
    if (val < 0.8) return { label: "Low", color: "green", action: "Prediction is reliable." }
    if (val < 1.8) return { label: "Medium", color: "orange", action: "Some uncertainty present." }
    return { label: "High", color: "red", action: "Prediction may not be reliable." }
  }

  const level = getUncertaintyLevel(result.uncertainty)

  return (
   <div className="relative max-w-6xl mx-auto px-6 mt-4 text-white">

5
  <motion.div
  animate={{ x: [0, 60, -40, 0], y: [0, -40, 30, 0] }}
  transition={{ duration: 25, repeat: Infinity }}
  className="absolute top-[-150px] left-[5%] w-[500px] h-[500px] 
             bg-blue-600/30 blur-[120px] rounded-full pointer-events-none"
/>

<motion.div
  animate={{ x: [0, -60, 40, 0], y: [0, 50, -30, 0] }}
  transition={{ duration: 30, repeat: Infinity }}
  className="absolute bottom-[-150px] right-[5%] w-[500px] h-[500px] 
             bg-blue-400/30 blur-[120px] rounded-full pointer-events-none"
/>



      {/* HEADER */}
      <div className="text-center mb-10 -mt-4">
        <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">
          Results
        </p>

        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded mb-4 mx-auto"></div>

        <h2 className="text-4xl font-semibold">
          Model Predictions
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-stretch">

        {/* STANDARD CNN */}
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="relative p-6 rounded-3xl overflow-hidden
            bg-white/[0.05] backdrop-blur-2xl
            border border-white/10
            shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
        >

      
          <div className="absolute inset-0 
            bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />

        
          <div className="absolute top-0 left-0 w-full h-[40%]
            bg-gradient-to-b from-white/20 to-transparent opacity-20 blur-sm pointer-events-none" />

          <h2 className="text-3xl font-semibold mb-2 text-blue-100">
            Standard CNN
          </h2>

          <p className="text-gray-400 mb-3">
            Deterministic Prediction
          </p>

          <h3 className="text-3xl font-bold text-blue-400 mb-4">
            {classes[result.prediction] || `Class ${result.prediction}`}
          </h3>

          <div className="bg-white/[0.05] border border-white/10 p-4 rounded-xl">

            <p className="text-xl text-gray-400">
              Confidence
            </p>

            <p className="text-white font-semibold text-2xl">
              {(result.confidence * 100).toFixed(2)}%
            </p>

            <div className="mt-3 text-sm text-gray-500">
              Prediction based on single forward pass.
            </div>

          </div>

        </motion.div>

        {/* MC DROPOUT */}
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="relative p-6 rounded-3xl overflow-hidden
            bg-white/[0.05] backdrop-blur-2xl
            border border-white/10
            shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
        >

          
          <div className="absolute inset-0 
            bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />

          <div className="absolute top-0 left-0 w-full h-[40%]
            bg-gradient-to-b from-white/20 to-transparent opacity-20 blur-sm pointer-events-none" />

          <h2 className="text-3xl font-semibold mb-2 text-blue-100">
            MC Dropout CNN
          </h2>

          <p className="text-gray-400 mb-3">
            Stochastic Prediction Distribution
          </p>

          <h3 className="text-3xl font-bold mb-4 text-blue-400">
            {classes[result.mc_prediction]}
          </h3>

          <div className="grid md:grid-cols-2 gap-4">

            {/* MEAN */}
            <div className="bg-white/[0.05] border border-white/10 p-4 rounded-xl">

              <p className="text-xl text-gray-400">
                Mean Probability
              </p>

              <p className="text-2xl font-semibold text-white">
                {(result.mc_confidence * 100).toFixed(2)}%
              </p>

            </div>

            {/* ENTROPY */}
            <div className="bg-white/[0.05] border border-white/10 p-4 rounded-xl">

              <p className="text-xl text-gray-400">
                Predictive Entropy
              </p>

              <div className="mt-2">

                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">

                  <div
                    className={`h-2 rounded-full ${
                      result.uncertainty < 0.8
                        ? "bg-blue-400"
                        : result.uncertainty < 1.5
                        ? "bg-blue-500"
                        : "bg-blue-600"
                    }`}
                    style={{ width: `${Math.min(result.uncertainty * 60, 100)}%` }}
                  ></div>

                </div>

                <p className="text-sm text-gray-400 mt-2">
                  Entropy: {result.uncertainty.toFixed(3)}
                </p>

              </div>

            </div>

          </div>

          {/* UNCERTAINTY */}
          <div className="mt-6">

            <span
  className={`px-3 py-1 rounded-full text-xs font-semibold
  ${level.color === "green" ? "bg-green-100 text-green-700 border border-green-500" : ""}
  ${level.color === "orange" ? "bg-orange-100 text-orange-700 border border-orange-500" : ""}
  ${level.color === "red" ? "bg-red-100 text-red-700 border border-red-500" : ""}
  `}
>
  Uncertainty Level: {level.label}
</span>

            <p className="text-sm text-gray-400 mt-2">
              Recommended Action: {level.action}
            </p>

          </div>

          {/* WARNING */}
          {conflictDetected && (
  <div className="mt-6 p-4 rounded-xl 
    bg-yellow-500/10 border border-yellow-500/30 
    text-yellow-300 backdrop-blur-md">

    ⚠ Multiple class predictions detected across MC runs.
    Model is uncertain between multiple traffic signs.

  </div>
)}

        </motion.div>

      </div>

    </div>
    
  )
}

export default Results