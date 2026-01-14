const { useState, useEffect } = React;

// Composants d'icônes Lucide simplifiés
const Clock = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Globe = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <path
      d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      strokeWidth="2"
    />
  </svg>
);

function WorldClock() {
  const [time, setTime] = useState(new Date());
  const [timezone, setTimezone] = useState("Europe/Paris");

  const timezones = [
    { value: "Europe/Paris", label: "Paris (GMT+1)" },
    { value: "Europe/London", label: "Londres (GMT+0)" },
    { value: "America/New_York", label: "New York (GMT-5)" },
    { value: "America/Los_Angeles", label: "Los Angeles (GMT-8)" },
    { value: "America/Chicago", label: "Chicago (GMT-6)" },
    { value: "Asia/Tokyo", label: "Tokyo (GMT+9)" },
    { value: "Asia/Shanghai", label: "Shanghai (GMT+8)" },
    { value: "Asia/Dubai", label: "Dubaï (GMT+4)" },
    { value: "Australia/Sydney", label: "Sydney (GMT+11)" },
    { value: "Pacific/Auckland", label: "Auckland (GMT+13)" },
    { value: "America/Sao_Paulo", label: "São Paulo (GMT-3)" },
    { value: "Africa/Cairo", label: "Le Caire (GMT+2)" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = () => {
    return time.toLocaleTimeString("fr-FR", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const formatDate = () => {
    return time.toLocaleDateString("fr-FR", {
      timeZone: timezone,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const timeString = formatTime();
  const [hours, minutes, seconds] = timeString.split(":");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border border-white/20">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-purple-300" />
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Horloge Mondiale
            </h1>
          </div>

          <div className="mb-6 sm:mb-8">
            <label className="flex items-center gap-2 text-purple-200 mb-2 sm:mb-3 text-sm font-medium">
              <Globe className="w-4 h-4" />
              Fuseau horaire
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full bg-white/20 text-white border border-white/30 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-400 backdrop-blur-sm"
            >
              {timezones.map((tz) => (
                <option
                  key={tz.value}
                  value={tz.value}
                  className="bg-slate-800"
                >
                  {tz.label}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-4 sm:p-8 mb-6 border border-white/20">
            <div className="flex items-center justify-center gap-1 sm:gap-2 text-5xl sm:text-7xl md:text-8xl font-bold text-white mb-4 font-mono">
              <span className="bg-white/10 px-2 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl">
                {hours}
              </span>
              <span className="text-purple-300 animate-pulse">:</span>
              <span className="bg-white/10 px-2 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl">
                {minutes}
              </span>
              <span className="text-purple-300 animate-pulse">:</span>
              <span className="bg-white/10 px-2 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl">
                {seconds}
              </span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-purple-200 text-base sm:text-xl capitalize px-2">
              {formatDate()}
            </p>
          </div>
        </div>

        <footer className="mt-6 text-center">
          <p className="text-purple-300 text-sm">
            Créé par{" "}
            <a
              href="https://www.linkedin.com/in/rami-regaieg-555475166/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-semibold hover:text-purple-200 transition-colors underline"
            >
              Rami REGAIEG
            </a>{" "}
            via{" "}
            <a
              href="https://claude.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-semibold hover:text-purple-200 transition-colors underline"
            >
              Claude AI
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

// Rendu de l'application
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<WorldClock />);
