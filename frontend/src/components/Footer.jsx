function Footer() {
  return (
    <footer className="relative mt-0">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 
        w-[60%] h-[1px] bg-gradient-to-r 
        from-transparent via-blue-500/40 to-transparent blur-sm" />

      <div className="bg-white/[0.04] backdrop-blur-xl 
        border-t border-white/10 
        py-6 text-center">

        <p className="text-gray-400 text-sm tracking-wide">
          © 2026 | React • FastAPI • PyTorch
        </p>

      </div>

    </footer>
  )
}

export default Footer