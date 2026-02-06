export default function Review({ onBack, onApprove }) {
  // 🔹 Load backend result
  const stored = sessionStorage.getItem("soapResult");
  const data = stored ? JSON.parse(stored) : null;

  const soap = data?.soap_note || {};

  return (
    <div className="bg-background-dark text-slate-200 font-sans antialiased min-h-screen flex flex-col">

      {/* TOP SAFE AREA */}
      <div className="h-12 w-full bg-background-dark sticky top-0 z-30"></div>

      {/* HEADER */}
      <header className="sticky top-12 z-20 bg-background-dark/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center px-4 py-3 justify-between">
          <div className="flex items-center gap-1">
            <button onClick={onBack} className="p-2 -ml-2 text-primary">
              <span className="material-symbols-outlined text-[28px] leading-none">
                chevron_left
              </span>
            </button>
            <h1 className="text-white text-lg font-extrabold tracking-tight">
              Review Note
            </h1>
          </div>

          <div className="flex items-center gap-1">
            <button className="w-10 h-10 flex items-center justify-center text-slate-400">
              <span className="material-symbols-outlined">history</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center text-slate-400">
              <span className="material-symbols-outlined">more_horiz</span>
            </button>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="flex-1 pb-44">

        {/* PATIENT CARD (UNCHANGED) */}
        <div className="px-4 py-6">
          <div className="bg-surface-dark rounded-3xl p-5 border border-white/5 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl border-2 border-white/10 overflow-hidden shrink-0">
                <img
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPM6YZqAqXmeMtyeeRDi3SD6BkCKFk_0nY2gYMkBuViPJAdaOTRKdkl1sd8pNl9xJUAyHB46qyFqCAjF9NBdAIDpOzkQ_O8jD33Wqc9UWalrl6HT6xwjDnQ6W1HlbwMeAxQM0u77rIGFZB5xzY1C7YfjJSZf3f776EyWuppsNEdIcGz5O180zHK9vid2SzpVd3RhfXHbr5rLeilWrfJ_RlJt6C50lrwQxp1w1ZbJLEPqdvssKIKutK6CVBwwd1n2tggnn5RmIr7g"
                  alt="Patient"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h2 className="text-xl font-extrabold text-white truncate">
                    John Doe
                  </h2>
                  <span className="bg-primary/10 text-primary text-[10px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider border border-primary/20">
                    Verified
                  </span>
                </div>

                <p className="text-slate-400 text-sm font-medium">
                  42y Male • ID: 88219 • 05/12/82
                </p>

                <div className="flex items-center gap-1.5 mt-2">
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                    <span className="material-symbols-outlined text-emerald-400 text-[14px] fill-1">
                      auto_awesome
                    </span>
                    <span className="text-emerald-400 text-[11px] font-bold">
                      AI Draft
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* SECTION TABS (FIXED – NO DYNAMIC CLASSES) */}
        <div className="sticky top-[109px] z-10 bg-background-dark/95 backdrop-blur-sm px-4 py-2 border-b border-white/5">
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            <a href="#subjective" className="px-4 py-2 rounded-full bg-subjective/10 border border-subjective/20 text-subjective text-xs font-extrabold uppercase tracking-widest">
              Subjective
            </a>
            <a href="#objective" className="px-4 py-2 rounded-full bg-objective/10 border border-objective/20 text-objective text-xs font-extrabold uppercase tracking-widest">
              Objective
            </a>
            <a href="#assessment" className="px-4 py-2 rounded-full bg-assessment/10 border border-assessment/20 text-assessment text-xs font-extrabold uppercase tracking-widest">
              Assessment
            </a>
            <a href="#plan" className="px-4 py-2 rounded-full bg-plan/10 border border-plan/20 text-plan text-xs font-extrabold uppercase tracking-widest">
              Plan
            </a>
          </div>
        </div>

        {/* SOAP CONTENT (NOW FROM BACKEND) */}
        <div className="px-4 pt-4 space-y-10">

          <section id="subjective" className="scroll-mt-40">
            <h3 className="text-subjective text-sm font-extrabold uppercase tracking-[0.2em] mb-3">
              Subjective
            </h3>
            <p className="note-body text-slate-300">
              {soap.subjective?.join(" ") || "Not documented"}
            </p>
          </section>

          <section id="objective" className="scroll-mt-40">
            <h3 className="text-objective text-sm font-extrabold uppercase tracking-[0.2em] mb-3">
              Objective
            </h3>
            <p className="note-body text-slate-300">
              {soap.objective?.join(" ") || "Not documented"}
            </p>
          </section>

          <section id="assessment" className="scroll-mt-40">
            <h3 className="text-assessment text-sm font-extrabold uppercase tracking-[0.2em] mb-3">
              Assessment
            </h3>
            <p className="note-body text-slate-300">
              {soap.assessment?.join(" ") || "Not documented"}
            </p>
          </section>

          <section id="plan" className="scroll-mt-40">
            <h3 className="text-plan text-sm font-extrabold uppercase tracking-[0.2em] mb-3">
              Plan
            </h3>
            <p className="note-body text-slate-300">
              {soap.plan?.join(" ") || "Not documented"}
            </p>
          </section>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="fixed bottom-0 left-0 right-0 bg-background-dark/90 backdrop-blur-2xl border-t border-white/5 pt-4 pb-10 px-4 z-30">
        <div className="max-w-md mx-auto space-y-3">
          <div className="flex gap-3">
            <button className="flex-1 bg-white/5 text-white font-bold py-4 rounded-2xl border border-white/10">
              Edit
            </button>
            <button className="flex-1 bg-white/5 text-white font-bold py-4 rounded-2xl border border-white/10">
              Export
            </button>
          </div>

          <button
            onClick={onApprove}
            className="w-full bg-primary text-white font-extrabold py-4.5 rounded-2xl shadow-lg shadow-primary/30"
          >
            Approve & Sign Note
          </button>
        </div>
      </footer>

    </div>
  );
}
