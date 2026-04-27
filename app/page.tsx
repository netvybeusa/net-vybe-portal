"use client";

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden">

      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/NVMportal2.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Foreground Buttons */}
      <div
        className="
          absolute
          bottom-[18%]        /* ← Perfect lower‑third placement */
          left-1/2
          -translate-x-1/2
          z-20
          flex flex-col items-center space-y-6
        "
      >

        {/* Top Row: New Account + Login */}
        <div className="flex flex-row items-center space-x-6">
          <a
            href="/signup"
  className="px-10 py-3 rounded-full bg-[var(--nv-purple)] text-white font-semibold 
             shadow-[var(--nv-glow-purple)] hover:bg-[var(--nv-blue)] hover:shadow-[var(--nv-glow-blue)] 
             transition-all backdrop-blur-sm whitespace-nowrap"
          >
            New Account
          </a>

          <a
            href="/login"
            className="px-10 py-3 rounded-full bg-[var(--nv-purple)] text-white font-semibold 
                       shadow-[var(--nv-glow-purple)] hover:bg-[var(--nv-blue)] hover:shadow-[var(--nv-glow-blue)] 
                       transition-all backdrop-blur-sm"
          >
            Login
          </a>
        </div>

        {/* Home Button Underneath */}
        <a
          href="https://netvybemusic.com"
          className="px-10 py-3 rounded-full bg-[var(--nv-purple)] text-white font-semibold 
                     shadow-[var(--nv-glow-purple)] hover:bg-[var(--nv-blue)] hover:shadow-[var(--nv-glow-blue)] 
                     transition-all backdrop-blur-sm"
        >
          Home
        </a>

      </div>
    </main>
  );
}
