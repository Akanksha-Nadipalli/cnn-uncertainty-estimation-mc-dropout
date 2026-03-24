import { motion } from "framer-motion"
import { Upload, Brain, Activity, BarChart3 } from "lucide-react"

function UploadSection({ preview, handleFile, runInference, loading }) {

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.25 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  

  return (
    <motion.section
      id="demo"
      className="relative min-h-screen flex items-center px-6 md:px-10 pt-5 scroll-mt-5 
                 bg-black text-white overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >

      {/* BLUE BLOB */}
      <motion.div
        animate={{ x: [0, 60, -40, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute -top-40 -left-40 w-[600px] h-[600px] 
                   bg-blue-600/40 blur-[140px] rounded-full"
      />

      <motion.div
        animate={{ x: [0, -60, 40, 0], y: [0, 50, -30, 0] }}
        transition={{ duration: 30, repeat: Infinity }}
        className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] 
                   bg-blue-400/40 blur-[140px] rounded-full"
      />

      <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto w-full items-center">

        {/* LEFT */}
        <div>

          <h1 className="text-5xl md:text-6xl font-semibold mb-6 leading-tight
            bg-gradient-to-r from-blue-400 via-white to-blue-200 
            text-transparent bg-clip-text">
            Try the Model Live
          </h1>

          <p className="text-gray-400 mb-8 text-lg max-w-md">
            Upload a traffic sign image and explore how confident the model is in its prediction.
          </p>

          {/* STEPS */}
          <motion.div
            className="relative space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
          >

          
            <div className="absolute left-5 top-2 bottom-2 w-[2px] bg-white/10"></div>

            {/* STEP 1 */}
            <motion.div variants={itemVariants} className="flex items-start gap-6">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Upload className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-white">
                  Upload Traffic Sign Image
                </p>
                <p className="text-sm text-gray-400">
                  Provide a traffic sign image to begin analysis.
                </p>
              </div>
            </motion.div>

            {/* STEP 2 */}
            <motion.div variants={itemVariants} className="flex items-start gap-6">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Brain className="w-5 h-5 text-blue-300" />
              </div>
              <div>
                <p className="font-medium text-white">
                  Model Predicts the Sign
                </p>
                <p className="text-sm text-gray-400">
                  CNN identifies the most likely traffic sign.
                </p>
              </div>
            </motion.div>

            {/* STEP 3 */}
            <motion.div variants={itemVariants} className="flex items-start gap-6">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Activity className="w-5 h-5 text-blue-300" />
              </div>
              <div>
                <p className="font-medium text-white">
                  Confidence & Uncertainty Analysis
                </p>
                <p className="text-sm text-gray-400">
                  Multiple predictions measure reliability and confidence.
                </p>
              </div>
            </motion.div>

            {/* STEP 4 */}
            <motion.div variants={itemVariants} className="flex items-start gap-6">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-300" />
              </div>
              <div>
                <p className="font-medium text-white">
                  Results & Insights Visualization
                </p>
                <p className="text-sm text-gray-400">
                  Explore predictions and uncertainty through graphs.
                </p>
              </div>
            </motion.div>

          </motion.div>

        </div>

        {/* RIGHT */}
        <div className="relative bg-white/[0.04] backdrop-blur-3xl 
  border border-white/10 
  p-10 rounded-3xl overflow-hidden
  shadow-[0_25px_80px_rgba(0,0,0,0.8)]
  hover:shadow-blue-500/20 transition duration-300">
    
<div className="absolute top-0 left-0 w-full h-[45%] 
  bg-gradient-to-b from-white/25 via-white/10 to-transparent 
  opacity-20 blur-sm pointer-events-none" />


<div className="absolute inset-0 rounded-3xl 
  bg-gradient-to-br from-blue-400/10 via-transparent to-transparent 
  opacity-40 pointer-events-none" />


<div className="absolute inset-0 rounded-3xl 
  bg-gradient-to-tr from-white/10 via-transparent to-transparent 
  opacity-30 pointer-events-none" />


<div className="absolute inset-0 rounded-3xl 
  border border-white/20 blur-[1px] opacity-40 pointer-events-none" />
  <div className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-500
  bg-gradient-to-r from-transparent via-white/10 to-transparent 
  blur-xl pointer-events-none" />

         
          <div className="absolute inset-0 rounded-3xl 
            bg-gradient-to-br from-white/10 via-transparent to-transparent" />

        
         <label 
  htmlFor="fileUpload"
  className="relative flex flex-col items-center justify-center 
    border-2 border-dashed border-white/20 
    rounded-2xl p-12 cursor-pointer 
    hover:border-blue-400 hover:bg-white/5 transition z-10"
>

  <input 
    id="fileUpload"
    type="file"
    accept="image/*"
    onChange={(e) => handleFile(e)}
    className="hidden"
  />

  <p className="text-gray-400 text-sm">
    Click or drag image to upload
  </p>

</label>

          {/* PREVIEW */}
          {preview && (
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-400 mb-2">Preview</p>

              <img 
                src={preview} 
                className="w-44 mx-auto rounded-xl border border-white/10 shadow-lg"
              />
            </div>
          )}

          {/* BUTTON */}
          <button
  onClick={runInference}
  disabled={!preview}
  className="mt-8 w-full py-3 rounded-full relative overflow-hidden
    bg-gradient-to-r from-blue-500 to-blue-700
    text-white font-medium
    shadow-lg shadow-blue-500/30
    hover:scale-105 hover:shadow-blue-500/50
    transition duration-300"
>

  
  <span className="absolute inset-0 rounded-full 
    bg-gradient-to-r from-white/20 via-transparent to-transparent 
    opacity-40 pointer-events-none" />

  
  <span className="absolute inset-0 rounded-full 
    border border-white/10 pointer-events-none" />

  <span className="relative">
    {loading ? "Analyzing your image..." : "Run Prediction"}
  </span>

</button>

        </div>

      </div>

    </motion.section>
  )
}

export default UploadSection