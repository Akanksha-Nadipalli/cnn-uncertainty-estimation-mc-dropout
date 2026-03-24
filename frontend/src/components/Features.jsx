import { useState } from "react"
import { motion } from "framer-motion"
import { Brain, BarChart3, AlertTriangle, Activity } from "lucide-react"

function Features(){

  const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemAnim = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

  const [hovered, setHovered] = useState(null)

  const features = [
    {
      title: "Accurate Traffic Sign Classification",
      desc: "A deep CNN trained on real-world datasets to identify traffic signs with high precision.",
      icon: <Brain size={34} />
    },
    {
      title: "Prediction Confidence",
      desc: "Understand how confident the model is in every prediction using probability scores.",
      icon: <BarChart3 size={34} />
    },
    {
      title: "Uncertainty Estimation",
      desc: "Detect unreliable predictions using Monte Carlo Dropout and uncertainty analysis.",
      icon: <AlertTriangle size={34} />
    },
    {
      title: "Stochastic Inference",
      desc: "Multiple forward passes reveal how stable or variable your model predictions are.",
      icon: <Activity size={34} />
    }
  ]

  return(
    
    <section 
      id="features" 
      className="relative min-h-screen flex items-center px-24 
                 bg-black text-white overflow-hidden"
    >
      <div className="absolute inset-0 
  bg-gradient-to-r from-blue-900/20 via-transparent to-indigo-900/20 
  pointer-events-none" />

      {/* BLOBS */}
      <motion.div
        animate={{ x: [0, 60, -40, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -left-40 w-[700px] h-[700px] 
                   bg-blue-600/40 blur-[140px] rounded-full pointer-events-none"
      />

      <motion.div
        animate={{ x: [0, -60, 40, 0], y: [0, 50, -30, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-250px] right-[-250px] w-[600px] h-[600px] 
                   bg-indigo-500/35 blur-[140px] rounded-full pointer-events-none"
      />

      <motion.div
        animate={{ x: [0, 30, -20, 0], y: [0, 20, -10, 0] }}
        transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[30%] left-[40%] w-[400px] h-[400px] 
                   bg-blue-500/20 blur-[140px] rounded-full pointer-events-none"
      />

      <motion.div
  animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
  transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
  className="absolute top-[10%] left-[-600px] w-[600px] h-[600px] 
             bg-blue-700/40 blur-[140px] rounded-full pointer-events-none"
/>

      {/* CONTENT */}
<div className="w-full flex items-center">

  {/* LEFT TEXT */}
  <motion.div
  className="w-1/2 pr-10 relative z-10"
  initial={{ opacity: 0, x: -40 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: false, amount: 0.3 }}
>

  <div className="absolute -left-10 top-10 w-[400px] h-[400px] 
    bg-blue-500/20 blur-[120px] rounded-full -z-10" />

  {/* MAIN TITLE */}
  <h2 className="text-6xl md:text-7xl font-semibold leading-[1.05] mb-6 tracking-tight">

    <span className="relative">

  
      <span className="bg-gradient-to-r from-blue-300 via-white to-blue-400 
        text-transparent bg-clip-text">
        Key Features
      </span>

      <span className="absolute inset-0 
        text-white/3 blur-[2px] pointer-events-none">
        Key Features
      </span>

    </span>

  </h2>

  {/* SUBTEXT */}
  <p className="text-gray-300 text-xl max-w-lg leading-relaxed">
    Not just predictions — understand how reliable your AI truly is.
  </p>

</motion.div>

        {/* RIGHT CARDS */}
        <motion.div
  className="w-1/2 grid grid-cols-2 gap-8 mt-20"
  variants={container}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>

          {features.map((item, i) => (

  <motion.div
    key={i}
    variants={itemAnim}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false }} 
    onMouseMove={(e) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * 8
      const rotateY = ((x - centerX) / centerX) * -8

      setHovered({ i, rotateX, rotateY, x, y })
    }}
    onMouseLeave={() => setHovered(null)}

    

    animate={
  hovered?.i === i
    ? {
        rotateX: hovered.rotateX,
        rotateY: hovered.rotateY,
        scale: 1.04
      }
    : {
        rotateX: 0,
        rotateY: 0,
        scale: 1
      }
}

    

    transition={{ type: "spring", stiffness: 200, damping: 15 }}

    className="relative p-8 rounded-3xl overflow-hidden
      bg-white/[0.06] backdrop-blur-2xl
      border border-white/20
      shadow-[0_20px_50px_rgba(0,0,0,0.7)]
      will-change-transform"
  >


              <div className="absolute inset-0 rounded-3xl 
                border border-white/20 
                opacity-70 blur-[1px] pointer-events-none" />

          
              <div className="absolute inset-0 rounded-3xl 
                bg-gradient-to-br from-white/20 via-transparent to-transparent 
                opacity-40 pointer-events-none" />

        
              <div className="absolute inset-0 rounded-3xl 
                bg-gradient-to-r from-blue-400/10 via-transparent to-transparent 
                opacity-40 pointer-events-none" />

      
              <div className="absolute top-0 left-0 w-full h-[40%]
                bg-gradient-to-b from-white/20 to-transparent
                opacity-20 blur-sm pointer-events-none" />

              <div className="relative text-blue-300 mb-4">
                {item.icon}
              </div>

              {/* TITLE */}
              <h3 className="relative font-semibold text-lg mb-3">
                {item.title}
              </h3>

              {/* DESC */}
              <p className="relative text-gray-300 text-sm leading-relaxed">
                {item.desc}
              </p>

            </motion.div>
          ))}

        </motion.div>

      </div>

    </section>
  )
}

export default Features