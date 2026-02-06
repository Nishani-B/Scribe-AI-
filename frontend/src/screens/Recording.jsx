import { useRef } from "react";
import { endpoints } from "../config";

export default function Recording({ onFinish, onClose }) {
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // START RECORDING (can be auto-triggered later if needed)
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorder.start();
  };

  // STOP + SEND TO BACKEND
  const stopAndSend = async () => {
    const recorder = mediaRecorderRef.current;
    if (!recorder) return;

    recorder.stop();

    recorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });

      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");

      try {
        await fetch(endpoints.processAudio, {
          method: "POST",
          body: formData,
        });

        // move to review screen only AFTER backend success
        onFinish();
      } catch (err) {
        console.error("Audio upload failed:", err);
      }
    };
  };

  return (
    <div className="bg-bg-deep font-display text-white min-h-screen transition-colors duration-300 antialiased">
      <div className="relative flex h-screen w-full flex-col overflow-hidden max-w-[400px] mx-auto bg-bg-deep border-x border-white/5 shadow-2xl">

        {/* HEADER */}
        <div className="flex items-center bg-bg-deep/90 backdrop-blur-xl p-6 pb-4 justify-between z-30">
          <button
            onClick={onClose}
            className="text-white flex size-10 items-center justify-start cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
          >
            <span className="material-symbols-outlined">close</span>
          </button>

          <div className="flex flex-col items-center flex-1">
            <h2 className="text-white text-base font-extrabold leading-tight tracking-tight uppercase">
              John Doe
            </h2>
            <p className="text-white/40 text-[10px] font-bold tracking-[0.1em]">
              PATIENT ID: #8849-DX
            </p>
          </div>

          <div className="flex size-10 items-center justify-end">
            <span className="material-symbols-outlined text-accent-cyan opacity-80">
              shield_lock
            </span>
          </div>
        </div>

        {/* SECURE BADGE */}
        <div className="flex justify-center px-6">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <div className="size-1.5 rounded-full bg-accent-cyan shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
            <span className="text-[9px] font-extrabold text-white/60 uppercase tracking-widest">
              Secure Recording Active
            </span>
          </div>
        </div>

        {/* MAIN AREA */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 relative mt-[-20px]">

          {/* SOUND WAVES */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-64 flex items-center justify-center gap-1.5 px-4 pointer-events-none opacity-40">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="sound-bar"></div>
            ))}
          </div>

          {/* TEXT */}
          <div className="relative z-20 text-center mb-12">
            <h1 className="text-white text-4xl font-black tracking-tighter mb-3">
              Recording...
            </h1>
            <div className="flex items-center justify-center gap-2 text-white/50">
              <span className="material-symbols-outlined text-xs text-accent-cyan">
                sensors
              </span>
              <span className="text-xs font-bold uppercase tracking-widest">
                Ambient Capture Mode
              </span>
            </div>
          </div>

          {/* MIC BUTTON */}
          <div className="relative flex items-center justify-center py-20 z-20">
            <div className="absolute size-40 rounded-full border border-accent-cyan/20 aura-pulse"></div>
            <div className="absolute size-40 rounded-full border border-accent-purple/20 aura-pulse [animation-delay:1s]"></div>

            <button
              onClick={startRecording}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-tr from-accent-cyan to-accent-purple rounded-full blur-xl opacity-40 group-active:opacity-60 transition duration-500"></div>
              <div className="relative flex size-36 items-center justify-center rounded-full bg-card-dark border-2 border-white/10 recording-glow transition-all active:scale-95 duration-75">
                <div className="flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-white/10 to-white/5 shadow-inner">
                  <div className="size-10 bg-red-500 rounded-sm"></div>
                </div>
              </div>
            </button>
          </div>

          {/* TIMER */}
          <div className="relative z-20 flex flex-col items-center">
            <div className="flex items-baseline gap-1">
              <span className="text-6xl font-black text-white tracking-tighter">14</span>
              <span className="text-4xl font-bold text-white/40">:</span>
              <span className="text-6xl font-black text-white tracking-tighter">02</span>
            </div>
            <p className="mt-2 text-accent-cyan font-extrabold text-[10px] tracking-[0.2em] uppercase">
              Session Duration
            </p>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="p-6 pt-0 bg-gradient-to-t from-bg-deep via-bg-deep to-transparent z-30">
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 h-14 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-sm">
              <span className="material-symbols-outlined text-xl">pause_circle</span>
              Pause
            </button>

            <button
              onClick={stopAndSend}
              className="flex items-center justify-center gap-2 h-14 rounded-2xl bg-white text-bg-deep font-bold text-sm active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-xl">check_circle</span>
              Finish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
