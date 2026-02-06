export default function Splash({ onNext }) {
  return (
    <div
      onClick={onNext}
      className="bg-gradient-radial min-h-screen w-full cursor-pointer"
      style={{
        fontFamily: "Montserrat, sans-serif",
        backgroundColor: "#050a18",
        color: "white",
        overflow: "hidden",
      }}
    >
      {/* LOCAL STYLES – DO NOT MODIFY */}
      <style>{`
        :root {
          --navy-deep: #050a18;
          --navy-accent: #0a1329;
          --electric-violet: #8b5cf6;
          --neon-glow: #a78bfa;
        }
        .neon-box {
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.3),
                      inset 0 0 15px rgba(139, 92, 246, 0.2);
          border: 1px solid rgba(167, 139, 250, 0.4);
        }
        .glow-text {
          text-shadow: 0 0 10px rgba(167, 139, 250, 0.6);
        }
        .bar-glow {
          box-shadow: 0 0 12px rgba(139, 92, 246, 0.8);
        }
        .bg-gradient-radial {
          background: radial-gradient(circle at center, #101e42 0%, #050a18 100%);
        }
      `}</style>

      <div className="relative flex min-h-screen w-full flex-col items-center justify-between px-6 py-12">
        <div className="h-12"></div>

        {/* CENTER LOGO */}
        <div className="flex flex-col items-center justify-center flex-grow w-full max-w-sm">
          <div className="relative flex items-center justify-center mb-10">
            <div className="absolute w-64 h-64 bg-primary/10 rounded-full blur-[80px]"></div>

            <div className="relative z-10 flex items-center justify-center bg-white/5 backdrop-blur-md w-36 h-36 rounded-[2rem] neon-box overflow-visible">
              <div className="flex items-center gap-1.5 px-4 h-full">
                <div className="w-1.5 h-10 bg-[var(--electric-violet)] rounded-full bar-glow"></div>
                <div className="w-1.5 h-16 bg-white/90 rounded-full"></div>
                <div className="w-1.5 h-24 bg-[var(--neon-glow)] rounded-full bar-glow"></div>
                <div className="w-1.5 h-14 bg-white/90 rounded-full"></div>
                <div className="w-1.5 h-8 bg-[var(--electric-violet)] rounded-full bar-glow"></div>
              </div>

              <div className="absolute -top-3 -right-3 bg-[var(--electric-violet)] text-white p-2.5 rounded-2xl border border-white/20">
                <span className="material-symbols-outlined text-[24px]">
                  stethoscope
                </span>
              </div>
            </div>
          </div>

          {/* TITLE */}
          <div className="w-full text-center space-y-3">
            <h1 className="text-white tracking-tight text-5xl font-extrabold glow-text">
              Scribe <span className="text-[var(--neon-glow)]">AI</span>
            </h1>
            <p className="text-blue-200/60 text-xs font-bold tracking-[0.2em] uppercase">
              Ambient Clinical Intelligence
            </p>
          </div>
        </div>

        {/* LOADING */}
        <div className="w-full max-w-xs flex flex-col gap-10 pb-6">
          <div className="flex flex-col gap-4">
            <div className="flex justify-center items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[var(--neon-glow)] rounded-full animate-pulse"></div>
              <p className="text-blue-100/40 text-[10px] font-semibold tracking-widest uppercase">
                AI Model Synchronizing
              </p>
            </div>

            <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden border border-white/5">
              <div className="h-full rounded-full bg-gradient-to-r from-[var(--electric-violet)] to-[var(--neon-glow)] w-[65%] bar-glow"></div>
            </div>
          </div>

          {/* SECURITY */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/10">
              <span className="material-symbols-outlined text-[14px] text-[var(--neon-glow)]">
                verified_user
              </span>
              <span className="text-[9px] font-bold text-blue-100/60 tracking-widest uppercase">
                HIPAA SECURE NODE
              </span>
            </div>
            <p className="text-white/20 text-[9px] text-center font-medium">
              Protected by 256-bit AES Encryption
            </p>
          </div>
        </div>

        <div className="h-1.5 w-32 bg-white/20 rounded-full mt-4"></div>
      </div>

      {/* BACKGROUND BLOBS */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[var(--electric-violet)] blur-[120px] rounded-full opacity-20"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-blue-600 blur-[100px] rounded-full opacity-10"></div>
      </div>
    </div>
  );
}
