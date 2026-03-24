import { useNavigate } from "react-router-dom"

function Navbar() {

  const navigate = useNavigate()

  return (
    <div className="fixed top-0 left-0 w-full z-50 px-10 py-6 flex justify-end">

       <div className="relative flex items-center gap-6 px-6 py-2.5 
  bg-white/[0.06] backdrop-blur-3xl backdrop-saturate-150
  rounded-full border border-white/20
  shadow-[0_10px_40px_rgba(0,0,0,0.6)]
  overflow-hidden">


  <div className="absolute top-0 left-0 w-full h-[50%] 
    bg-gradient-to-b from-white/20 via-white/5 to-transparent 
    opacity-30 blur-sm pointer-events-none" />

  <div className="absolute inset-0 
    bg-gradient-to-r from-blue-400/10 via-transparent to-transparent 
    opacity-40 pointer-events-none" />


  <div className="absolute inset-0 rounded-full 
    border border-white/20 opacity-50 pointer-events-none" />


  <div className="absolute inset-0 
    bg-gradient-to-r from-transparent via-white/10 to-transparent 
    opacity-0 hover:opacity-100 transition duration-700 
    pointer-events-none" />


<div className="absolute inset-0 rounded-full 
  border border-white/30 
  opacity-80 pointer-events-none" />

  
<div className="absolute inset-[1px] rounded-full 
  bg-gradient-to-b from-white/20 via-transparent to-transparent 
  opacity-40 pointer-events-none" />


  {/* buttons */}


        <button
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  className="relative z-10 text-sm text-gray-300 hover:text-white transition group"
>
  Home

  <span className="absolute left-0 -bottom-1 w-0 h-[2px] 
                   bg-gradient-to-r from-blue-400 to-blue-600 
                   transition-all duration-300 
                   group-hover:w-full" />
</button>

        <button
  onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
  className="relative z-10 text-sm text-gray-300 hover:text-white transition group"
>
  Features

  <span className="absolute left-0 -bottom-1 w-0 h-[2px] 
                   bg-gradient-to-r from-blue-400 to-blue-600 
                   transition-all duration-300 
                   group-hover:w-full" />
</button>

       

        <button
          onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
          className="text-sm bg-gradient-to-r from-blue-500 to-blue-700 
                     text-white px-5 py-2 rounded-full f
                     shadow-lg shadow-blue-500/20
                     hover:scale-105 hover:shadow-blue-500/40 transition"
        >
          Try Demo
        </button>

      </div>

    </div>
  )
}

export default Navbar