import React, { useEffect, useRef, useState } from 'react';
import { 
  ArrowRight, 
  Terminal, 
  Activity, 
  Layers, 
  Cpu, 
  Zap, 
  CheckCircle2, 
  ShieldAlert, 
  Workflow, 
  ChevronRight,
  Command,
  Database,
  Network,
  Globe2,
  Menu,
  X
} from 'lucide-react';

// --- SEO, GEO, & AIO: STRUCTURED DATA ---
const StructuredData = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "SCRAM-RS",
      "description": "We turn messy, manual businesses into AI-powered operating systems in 10-51 days. We build how your business runs.",
      "url": window.location.href,
      "areaServed": [
        { "@type": "Country", "name": "India" },
        { "@type": "Country", "name": "United States" },
        { "@type": "Country", "name": "United Arab Emirates" },
        { "@type": "Country", "name": "Saudi Arabia" }
      ],
      "knowsAbout": [
        "AI Operating Systems",
        "Workflow Automation",
        "AI ERP for SMEs",
        "Business Systems Architecture",
        "Operations Management"
      ],
      "slogan": "Your business is not broken. Your system is."
    });
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, []);
  return null;
};

// --- SANITY CMS INTEGRATION ---
const useSanityData = (query, fallbackData) => {
  const [data, setData] = useState(fallbackData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const PROJECT_ID = 'b10jvssm';
        const DATASET = 'production';
        const url = `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${encodeURIComponent(query)}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
           console.log("Sanity API restricted or not yet public. Using local fallback data.");
           return;
        }
        
        const result = await response.json();
        if (result.result && result.result.length > 0) {
          setData(result.result);
        }
      } catch (error) {
        console.log("Sanity connection pending (CORS/Network). Using local architectural blueprints.");
      }
    };
    fetchData();
  }, [query]);

  return data;
};

// --- UTILITY COMPONENTS & HOOKS ---

const FadeIn = ({ children, delay = 0, direction = 'up', className = "", duration = 1200 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (isVisible) return 'translate-y-0 translate-x-0 scale-100 rotate-0';
    switch (direction) {
      case 'up': return 'translate-y-12 scale-95 -rotate-1';
      case 'down': return '-translate-y-12 scale-95 rotate-1';
      case 'left': return 'translate-x-12 scale-95 rotate-1';
      case 'right': return '-translate-x-12 scale-95 -rotate-1';
      default: return 'translate-y-12 scale-95';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? 'opacity-100 blur-0' : 'opacity-0 blur-[12px]'
      } ${getTransform()} ${className}`}
      style={{ transitionDuration: `${duration}ms`, transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const RevealLine = ({ delay = 0, orientation = 'horizontal', className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const baseStyle = orientation === 'horizontal' 
    ? "h-[1px] w-full origin-left bg-white/[0.06]" 
    : "w-[1px] h-full origin-top bg-white/[0.06]";
    
  const transform = orientation === 'horizontal'
    ? (isVisible ? 'scale-x-100' : 'scale-x-0')
    : (isVisible ? 'scale-y-100' : 'scale-y-0');

  return (
    <div
      ref={ref}
      className={`transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${baseStyle} ${transform} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    />
  );
};

const ScrollRevealText = ({ children, className = "", baseColor = "#333333", revealColor = "#ffffff", as: Component = "span" }) => {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const start = windowHeight * 0.9; 
      const end = windowHeight * 0.4;   
      
      let p = (start - rect.top) / (start - end);
      p = Math.max(0, Math.min(1, p));
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    window.addEventListener('resize', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const percentage = progress * 100;

  return (
    <Component 
      ref={ref} 
      className={className}
      style={{
        backgroundImage: `linear-gradient(to bottom, ${revealColor} ${percentage - 20}%, ${revealColor} ${percentage}%, ${baseColor} ${percentage + 20}%)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: 'transparent',
        display: Component === 'span' ? 'inline' : 'block'
      }}
    >
      {children}
    </Component>
  );
};

const DecodeText = ({ text, className = "" }) => {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef(null);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

  const handleMouseOver = () => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setDisplay(text.split("").map((letter, index) => {
        if(index < iteration) return text[index];
        if(letter === " ") return " "; 
        return letters[Math.floor(Math.random() * letters.length)];
      }).join(""));
      
      if(iteration >= text.length) clearInterval(intervalRef.current);
      iteration += 1 / 3;
    }, 30);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, []);

  return (
    <span 
      onMouseEnter={handleMouseOver} 
      className={`relative inline-block ${className}`}
    >
      <span className="invisible whitespace-nowrap">{text}</span>
      <span className="absolute top-0 left-0 whitespace-nowrap">{display}</span>
    </span>
  );
};

const GlowCard = ({ children, className = "" }) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-[6px] transition-transform duration-500 hover:scale-[1.02] ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      const target = e.target;
      if (target.tagName.toLowerCase() === 'button' || target.closest('button') || target.closest('.interactive-hover') || target.tagName.toLowerCase() === 'a') {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      <div className="absolute w-1 h-1 bg-white rounded-full transition-transform duration-75" style={{ transform: `translate(${pos.x - 2}px, ${pos.y - 2}px)` }} />
      <div 
        className={`absolute w-8 h-8 border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 ease-out ${isHovering ? 'scale-150 border-white/50 bg-white/5' : 'scale-100'}`} 
        style={{ transform: `translate(${pos.x - 16}px, ${pos.y - 16}px)` }}
      >
        <div className="w-[1px] h-1 absolute top-[-1px] bg-white/50"></div>
        <div className="w-[1px] h-1 absolute bottom-[-1px] bg-white/50"></div>
        <div className="h-[1px] w-1 absolute left-[-1px] bg-white/50"></div>
        <div className="h-[1px] w-1 absolute right-[-1px] bg-white/50"></div>
      </div>
    </div>
  );
};

const MetricsTicker = () => {
  return (
    <div className="relative z-20 w-full border-y thin-border bg-[#050505] overflow-hidden flex py-4 opacity-90 mt-auto">
      <div className="animate-ticker flex whitespace-nowrap items-center text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
        {[...Array(3)].map((_, i) => (
          <React.Fragment key={i}>
            <span className="mx-8 text-white/80">14+ Architectures Deployed</span> <span className="text-white/20">///</span>
            <span className="mx-8 text-white/80">$1.2B+ Revenue Routed</span> <span className="text-white/20">///</span>
            <span className="mx-8 text-white/80">100k+ Human Hours Reclaimed</span> <span className="text-white/20">///</span>
            <span className="mx-8 text-white/80">Zero Data Breaches</span> <span className="text-white/20">///</span>
            <span className="mx-8 text-white/80">Global Operations</span> <span className="text-white/20">///</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

const HeroSystemAnimation = () => {
  return (
    <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] flex items-center justify-center opacity-80 mix-blend-screen pointer-events-none animate-float">
      <div className="absolute w-[200px] h-[200px] bg-white/[0.03] blur-[60px] rounded-full animate-pulse-slow"></div>
      <div className="absolute inset-0 rounded-full border border-white/[0.04] border-dashed animate-[spin_40s_linear_infinite]"></div>
      <div className="absolute inset-10 rounded-full border border-white/[0.02] animate-[spin_30s_linear_infinite_reverse]"></div>
      <div className="absolute inset-20 rounded-full border border-white/[0.06] border-dashed animate-[spin_20s_linear_infinite]"></div>
      <div className="w-16 h-16 bg-[#0a0a0a] border border-white/10 rounded-[6px] flex items-center justify-center rotate-45 relative z-10 shadow-[0_0_40px_rgba(255,255,255,0.05)]">
        <div className="w-6 h-6 border border-white/20 rounded-sm -rotate-45 animate-pulse flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
        </div>
      </div>
      <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white/50 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
      </div>
      <div className="absolute inset-10 animate-[spin_15s_linear_infinite_reverse]">
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1 h-1 bg-neutral-400 rounded-full"></div>
         <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white/30 rounded-full"></div>
      </div>
      <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 400 400">
         <path d="M200 200 L100 100 L100 20" fill="none" stroke="#fff" strokeWidth="0.5" className="animate-data-stream" strokeDasharray="15 400" strokeLinecap="round" />
         <path d="M200 200 L300 300 L380 300" fill="none" stroke="#fff" strokeWidth="0.5" className="animate-data-stream-reverse" strokeDasharray="15 400" strokeLinecap="round" />
         <path d="M200 200 L200 350 L120 350" fill="none" stroke="#fff" strokeWidth="0.5" className="animate-data-stream" strokeDasharray="15 400" strokeLinecap="round" />
         <path d="M200 200 L300 100 L350 100" fill="none" stroke="#fff" strokeWidth="0.5" className="animate-data-stream-reverse" strokeDasharray="15 400" strokeLinecap="round" />
      </svg>
    </div>
  );
};

// --- COMPONENT: SYSTEM BOOT PRELOADER ---
const SystemBootLoader = ({ onComplete }) => {
  const [logs, setLogs] = useState([]);
  // Define fullLogs outside or use useMemo if complex, but simple array is fine here if we don't put it in dependency array
  
  useEffect(() => {
    const fullLogs = [
      "INITIALIZING SCRAM-RS CORE...",
      "ESTABLISHING SECURE CONNECTION...",
      "LOADING ARCHITECTURAL SCHEMAS...",
      "MOUNTING AI LOGIC LAYERS...",
      "BYPASSING HUMAN BOTTLENECKS...",
      "SYSTEMS OPTIMAL. ACCESS GRANTED."
    ];
    let currentLog = 0;
    
    // We clear logs on mount to ensure a clean start if React strict mode double-invokes
    setLogs([]);

    const interval = setInterval(() => {
      if (currentLog < fullLogs.length) {
        // Use functional state update to avoid stale closures
        setLogs(prev => [...prev, fullLogs[currentLog]]);
        currentLog++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 600); 
      }
    }, 250); 
    
    return () => clearInterval(interval);
  // Empty dependency array is CRITICAL here so the interval isn't repeatedly destroyed and recreated
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 z-[99999] bg-[#020202] flex flex-col justify-end p-12 overflow-hidden animate-out fade-out duration-1000 fill-mode-forwards">
      <NoiseBackground />
      <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-500/30 animate-scanline shadow-[0_0_20px_rgba(6,182,212,0.5)] pointer-events-none"></div>
      
      <div className="relative z-10 font-mono text-[10px] md:text-xs text-neutral-500 uppercase tracking-widest space-y-4 px-[3%]">
        {logs.map((log, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="text-cyan-800/60">[{(Math.random() * 10000).toFixed(0).padStart(5, '0')}]</span>
            <span className={i === logs.length - 1 ? "text-white" : "text-neutral-400"}>{log}</span>
          </div>
        ))}
        {/* Simplified the "waiting" condition so it doesn't rely on the external fullLogs length which was causing issues */}
        {logs.length < 6 && (
          <div className="flex items-center gap-4 animate-pulse">
            <span className="text-cyan-800/60">[WAIT]</span>
            <span className="text-white">_</span>
          </div>
        )}
      </div>
    </div>
  );
};

const AuditJourney = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisLogs, setAnalysisLogs] = useState([]);
  const [report, setReport] = useState(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const questions = [
    {
      id: 'data', metric: "DATA_STORAGE",
      question: "Where does your company's operational data live right now?",
      options: [
        { label: "Spreadsheets, WhatsApp, and human memory.", score: 95 },
        { label: "Multiple disconnected SaaS tools.", score: 80 },
        { label: "A rigid, legacy ERP system.", score: 65 },
        { label: "A fully integrated, real-time database.", score: 10 }
      ]
    },
    {
      id: 'vacation', metric: "SYSTEM_DEPENDENCY",
      question: "What happens if your core operations team goes offline for two weeks?",
      options: [
        { label: "Total collapse. We are completely human-dependent.", score: 100 },
        { label: "Major delays and dropped follow-ups.", score: 85 },
        { label: "We survive, but decision-making halts.", score: 60 },
        { label: "Nothing. The system routes work automatically.", score: 10 }
      ]
    },
    {
      id: 'robotic', metric: "BANDWIDTH_WASTE",
      question: "How much of your team's day is spent doing robotic work (moving data, formatting)?",
      options: [
        { label: "Most of it. My team acts like human APIs.", score: 95 },
        { label: "About half. Noticeable operational drag.", score: 75 },
        { label: "A small amount. Standard friction.", score: 40 },
        { label: "Zero. Machines talk to machines.", score: 5 }
      ]
    },
    {
      id: 'speed', metric: "VELOCITY",
      question: "How fast can you pull an accurate, 100% up-to-date executive report?",
      options: [
        { label: "It takes days of manual compilation.", score: 95 },
        { label: "A few hours, after pinging the team.", score: 70 },
        { label: "Within the hour.", score: 40 },
        { label: "Instantaneous. I have a live dashboard.", score: 5 }
      ]
    },
    {
      id: 'fragmentation', metric: "SYSTEM_FRAGMENTATION",
      question: "How many different software tools does an employee open to complete a single core workflow?",
      options: [
        { label: "5+. It's a constant alt-tab nightmare.", score: 90 },
        { label: "3 to 4. We use Zapier to tape some of it together.", score: 70 },
        { label: "1 to 2. Mostly centralized.", score: 30 },
        { label: "One unified interface. Everything connects.", score: 5 }
      ]
    },
    {
      id: 'exceptions', metric: "EXCEPTION_ROUTING",
      question: "When a critical error or edge-case occurs, how is it resolved?",
      options: [
        { label: "A chaotic WhatsApp thread tagging the founders.", score: 100 },
        { label: "A manual email chain that takes days to untangle.", score: 80 },
        { label: "It goes to a dedicated support team queue.", score: 40 },
        { label: "AI flags it, suggests a fix, and routes to the right owner.", score: 5 }
      ]
    },
    {
      id: 'scale', metric: "SCALE_THRESHOLD",
      question: "If your inbound volume suddenly 10x'd tomorrow, what would break first?",
      options: [
        { label: "Everything. We would immediately drown.", score: 95 },
        { label: "Our team capacity. We'd have to mass-hire immediately.", score: 80 },
        { label: "Some edge cases, but the core system would hold.", score: 30 },
        { label: "Nothing. Our system scales infinitely without headcount.", score: 5 }
      ]
    }
  ];

  const currentValues = Object.values(answers);
  const liveProbability = currentValues.length > 0 
    ? Math.round(currentValues.reduce((acc, curr) => acc + curr.score, 0) / currentValues.length)
    : 0;

  const progressPercent = ((step) / questions.length) * 100;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep(0);
      setAnswers({});
      setReport(null);
      setIsAnalyzing(false);
      setName('');
      setEmail('');
      setPhone('');
      setIsSending(false);
      setEmailSent(false);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => document.body.style.overflow = 'auto';
  }, [isOpen]);

  const handleSelect = (option) => {
    const newAnswers = { ...answers, [questions[step].id]: { ...option, question: questions[step].question } };
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      runAnalysis(newAnswers);
    }
  };

  const runAnalysis = (finalAnswers) => {
    setIsAnalyzing(true);
    const logs = [
      "> INITIATING DIAGNOSTIC PROTOCOL...",
      "> ANALYZING DATA VELOCITY RESPONSES...",
      "> DETECTING 'HUMAN API' BOTTLENECKS...",
      "> CALCULATING OPERATIONAL DEBT...",
      "> SIMULATING SCRAM-RS INTEGRATION...",
      "> FINALIZING AUTOMATION PROBABILITY INDEX..."
    ];
    let currentLog = 0;
    setAnalysisLogs([]);
    const logInterval = setInterval(() => {
      if (currentLog < logs.length) {
        setAnalysisLogs(prev => [...prev, logs[currentLog]]);
        currentLog++;
      } else {
        clearInterval(logInterval);
        setTimeout(() => {
          generateReport(finalAnswers);
          setIsAnalyzing(false);
        }, 800); 
      }
    }, 400); 
  };

  const generateReport = (finalAnswers) => {
    const values = Object.values(finalAnswers);
    const avgScore = Math.round(values.reduce((acc, curr) => acc + curr.score, 0) / values.length);
    let summary = "";
    if (avgScore > 80) {
      summary = "CRITICAL: Your business is surviving on human effort, not systems. You are acting as the router for your own company. A SCRAM-RS deployment will immediately reclaim 40%+ of your operational bandwidth and remove you from the day-to-day.";
    } else if (avgScore > 50) {
      summary = "WARNING: Moderate operational drag. Your systems are fragmented. Scalable architecture is required to connect your data silos and automate predictive decision-making before you hit a plateau.";
    } else {
      summary = "OPTIMAL: High system maturity detected. You have strong automation primitives in place. Further architecture is only required for complex predictive AI layering.";
    }
    setReport({ potential: avgScore, summary, rawAnswers: finalAnswers });
  };

  const handleDispatch = async (e) => {
    e.preventDefault();
    if (!report) return;

    setIsSending(true);

    let reportText = `=== SCRAM-RS : DIAGNOSTIC REPORT ===\n\n`;
    reportText += `CONTACT INFORMATION\n`;
    reportText += `Name: ${name}\n`;
    reportText += `Email: ${email}\n`;
    reportText += `Phone: ${phone}\n\n`;
    reportText += `AUTOMATION PROBABILITY INDEX: ${report.potential}%\n`;
    reportText += `VERDICT: ${report.summary}\n\n`;
    reportText += `--- RAW TELEMETRY ---\n`;
    Object.values(report.rawAnswers).forEach((ans, i) => {
      reportText += `Q${i+1}: ${ans.question}\n`;
      reportText += `A: ${ans.label} (Risk Score: ${ans.score})\n\n`;
    });
    reportText += `================================================`;

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer re_av5aMsKt_8TaWYjY3X5ACrt6JaeKkKdXA'
        },
        body: JSON.stringify({
          from: 'SCRAM-RS Audit <onboarding@resend.dev>',
          to: ['complete.anant@gmail.com'],
          subject: `Audit Request: ${report.potential}% Automation Potential - ${name}`,
          text: reportText
        })
      });

      if (response.ok) {
        setEmailSent(true);
      } else {
        console.error("Failed to send email via Resend");
        alert("Transmission failed due to server policy. Check console for details.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Transmission error. Check console for details.");
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-center bg-[#050505] animate-in fade-in duration-300 overflow-y-auto">
      <NoiseBackground />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/[0.015] blur-[120px] rounded-full pointer-events-none animate-float"></div>
      <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5 z-30">
        <div 
          className="h-full bg-white transition-all duration-500 ease-out"
          style={{ width: `${isAnalyzing || report ? 100 : progressPercent}%` }}
        ></div>
      </div>
      <div className="absolute top-0 left-0 w-full px-[3%] py-8 md:py-12 flex justify-between items-center z-20 mt-2">
        <div className="text-[10px] font-mono text-neutral-500 tracking-widest uppercase flex items-center gap-3">
           <div className="w-2 h-2 rounded-full bg-red-500/80 animate-pulse"></div>
           SYS.DIAGNOSTIC // ROOT_ACCESS
        </div>
        <button 
          onClick={onClose}
          className="text-[10px] text-white uppercase tracking-[0.2em] font-medium hover:text-red-400 transition-colors interactive-hover"
        >
          [ ABORT SEQUENCE ]
        </button>
      </div>

      <div className="relative z-10 w-full mx-auto px-[3%] flex flex-col items-center py-24 mt-12 md:mt-0">
        <div className="w-full max-w-4xl flex flex-col items-start text-left">
          {!isAnalyzing && !report && (
            <FadeIn direction="up" duration={500} className="w-full">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 mb-12">
                <div className="text-[10px] font-mono text-neutral-600 tracking-[0.3em] uppercase border border-white/10 px-3 py-1 bg-white/[0.02]">
                  <DecodeText text={`METRIC_PROBE: ${questions[step].metric}`} />
                </div>
                <div className="text-[10px] font-mono tracking-[0.2em] uppercase flex items-center gap-3 text-neutral-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                  AUTOMATION_PROBABILITY_INDEX: <span className="text-white ml-1">{liveProbability}%</span>
                </div>
              </div>
            </FadeIn>
          )}

          {!isAnalyzing && !report && (
            <>
              <FadeIn key={`q-${step}`} direction="left" duration={300}>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight tracking-tight mb-12">
                  {questions[step].question}
                </h2>
              </FadeIn>

              <div className="w-full space-y-3">
                {questions[step].options.map((opt, i) => (
                  <FadeIn key={`opt-${step}-${i}`} delay={i * 50} direction="up" duration={300}>
                    <button 
                      onClick={() => handleSelect(opt)}
                      className="w-full group flex items-center gap-6 p-5 sm:p-6 border thin-border bg-white/[0.01] hover:bg-white/[0.05] transition-all duration-200 text-left interactive-hover overflow-hidden relative rounded-[6px]"
                    >
                      <div className="absolute left-0 top-0 h-full w-[3px] bg-white transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-200"></div>
                      <span className="text-[10px] font-mono text-neutral-600 group-hover:text-white transition-colors shrink-0">
                        [0x{Math.floor(Math.random() * 1000).toString(16).toUpperCase().padStart(3, '0')}]
                      </span>
                      <span className="text-sm sm:text-base font-light text-neutral-400 group-hover:text-white transition-colors">{opt.label}</span>
                    </button>
                  </FadeIn>
                ))}
              </div>
            </>
          )}

          {isAnalyzing && (
            <div className="w-full flex flex-col items-start text-left">
               <div className="text-white text-3xl font-light tracking-tight mb-16 flex items-center gap-6">
                 <div className="relative w-8 h-8 flex items-center justify-center">
                   <div className="absolute inset-0 border border-t-transparent border-white/80 rounded-full animate-spin"></div>
                   <div className="absolute inset-2 border border-b-transparent border-neutral-500 rounded-full animate-[spin_0.5s_linear_infinite_reverse]"></div>
                 </div>
                 <DecodeText text="Compiling Telemetry..." />
               </div>
               
               <div className="space-y-4 font-mono text-xs sm:text-sm text-neutral-500 uppercase tracking-widest w-full">
                 {analysisLogs.map((log, i) => (
                   <div key={i} className="flex items-center gap-4 animate-in slide-in-from-left-4 fade-in duration-200">
                     <span className="text-[10px] text-cyan-800/50">{(Math.random() * 100000).toFixed(0)}</span>
                     <span className="text-white">{log}</span>
                 </div>
                 ))}
                 <div className="animate-pulse flex items-center gap-4 mt-4">
                   <span className="text-[10px] text-cyan-800/50">WAIT</span>
                   <span>_</span>
                 </div>
               </div>
            </div>
          )}

          {report && !emailSent && (
            <div className="w-full flex flex-col items-start text-left animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="text-[10px] font-mono text-neutral-500 tracking-[0.3em] uppercase mb-8 border border-white/10 px-3 py-1 bg-white/[0.02] flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                Diagnostic Complete
              </div>
              
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tight mb-4">
                Automation Probability Index: <span className="text-white font-medium">{report.potential}%</span>
              </h2>
              
              <div className="w-full h-[2px] bg-white/10 mb-6 relative overflow-hidden mt-6">
                 <div 
                   className="absolute top-0 left-0 h-full bg-white transition-all duration-1500 ease-out"
                   style={{ width: `${report.potential}%` }}
                 ></div>
              </div>
              
              <div className="text-[10px] font-mono text-neutral-600 tracking-[0.2em] uppercase mb-4">
                SCRAM-RS Output
              </div>
              <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed mb-10 border-l border-white/10 pl-6">
                {report.summary}
              </p>

              <form onSubmit={handleDispatch} className="w-full mt-4 border thin-border p-6 sm:p-8 bg-white/[0.01] rounded-[6px]">
                <div className="text-[10px] font-mono text-neutral-500 tracking-[0.3em] uppercase mb-6 block">Dispatch Telemetry</div>
                <div className="flex flex-col gap-4 mb-8">
                  <input type="text" required placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className="w-full bg-[#050505] border thin-border rounded-[6px] px-4 py-3 text-sm font-light text-white outline-none focus:border-cyan-500/50 transition-colors placeholder:text-neutral-600" />
                  <input type="email" required placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-[#050505] border thin-border rounded-[6px] px-4 py-3 text-sm font-light text-white outline-none focus:border-cyan-500/50 transition-colors placeholder:text-neutral-600" />
                  <input type="tel" required placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-[#050505] border thin-border rounded-[6px] px-4 py-3 text-sm font-light text-white outline-none focus:border-cyan-500/50 transition-colors placeholder:text-neutral-600" />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-6 w-full">
                  <button type="submit" disabled={isSending} className="group relative flex items-center justify-between gap-8 text-[10px] sm:text-xs text-black bg-white px-8 py-4 uppercase tracking-[0.2em] font-medium hover:bg-neutral-200 transition-colors interactive-hover rounded-[6px] disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto">
                    <DecodeText text={isSending ? "Transmitting..." : "Dispatch Report"} />
                    {!isSending && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                  </button>
                  <button type="button" onClick={onClose} className="text-[10px] sm:text-xs text-neutral-400 border thin-border px-8 py-4 uppercase tracking-[0.2em] font-medium hover:text-white hover:bg-white/[0.05] transition-colors interactive-hover rounded-[6px] w-full sm:w-auto">
                    <DecodeText text="Close Diagnostics" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {report && emailSent && (
            <div className="w-full flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-8 duration-700 py-12">
               <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                 <CheckCircle2 className="w-8 h-8 text-green-500" />
               </div>
               <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight mb-4">Transmission Successful.</h2>
               <p className="text-base text-neutral-400 font-light leading-relaxed mb-10 max-w-lg">
                 Your diagnostic telemetry has been securely dispatched to the SCRAM-RS team. We will review your systems and contact you shortly.
               </p>
               <button onClick={onClose} className="text-[10px] sm:text-xs text-black bg-white px-10 py-4 uppercase tracking-[0.2em] font-medium hover:bg-neutral-200 transition-colors interactive-hover rounded-[6px]">
                 <DecodeText text="Return to Main Console" />
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- BACKGROUND COMPONENTS ---

const NoiseBackground = () => (
  <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-overlay">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full preserve-3d">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
    </svg>
  </div>
);

const HeroBackground = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">
    <div className="absolute inset-0 opacity-[0.25]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='100' viewBox='0 0 60 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M30 100V50L0 33.5v-17L30 33.5v-17L60 0v17L30 33.5V50l30 17v17L30 67.5V100zM0 83.5V67l30-17v17L0 83.5zM60 83.5V67L30 50v17l30 17z' stroke='%23ffffff' stroke-width='1' stroke-opacity='0.07'/%3E%3C/g%3E%3C/svg%3E")` }}></div>
    <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]"></div>
    <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent h-1/2 bottom-0"></div>
    <NoiseBackground />
  </div>
);

const GradientMeshBackground = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#030303]">
    <div className="absolute top-0 right-[-10%] w-[60%] h-[100%] bg-gradient-to-bl from-white/[0.03] to-transparent blur-[100px] animate-mesh-pan"></div>
    <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[80%] bg-gradient-to-tr from-white/[0.02] to-transparent blur-[80px] animate-mesh-pan-reverse"></div>
  </div>
);

const StripedBackground = () => (
  <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
    <div className="h-full w-full animate-mesh-pan" style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '100px 100%' }}></div>
  </div>
);

// --- NEW COMPONENT: GLOBAL NETWORK MAP ---
const GlobalNetworkMap = () => {
  const nodes = [
    { label: "US East", top: "35%", left: "25%" },
    { label: "Dubai", top: "45%", left: "62%" },
    { label: "Riyadh", top: "48%", left: "60%" },
    { label: "Pune", top: "52%", left: "70%" },
  ];

  return (
    <div className="relative w-full mx-auto h-[300px] sm:h-[400px] border thin-border bg-[#030303] rounded-[6px] overflow-hidden mt-16 transition-transform duration-700 hover:scale-[1.01]">
       <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgwem0yMCAyMGgyMHYyMEgyMHoiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]"></div>
       <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/[0.02]"></div>
       <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/[0.02]"></div>
       
       {nodes.map((node, i) => (
         <div key={i} className="absolute flex flex-col items-center" style={{ top: node.top, left: node.left, transform: 'translate(-50%, -50%)' }}>
            <div className="relative flex items-center justify-center w-8 h-8">
              <div className="absolute w-full h-full bg-cyan-500/20 rounded-full animate-ping"></div>
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
            </div>
            <div className="mt-1 text-[8px] font-mono tracking-widest text-neutral-500 uppercase">{node.label}</div>
         </div>
       ))}
       <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 animate-scanline shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
    </div>
  );
};

// --- ABOUT PAGE COMPONENT ---
const AboutPage = ({ onOpenAudit }) => {
  const team = [
    { name: "Preksha", role: "Chief Executive Officer", desc: "Directing global strategy and client scale. Ensuring every deployed architecture multiplies revenue." },
    { name: "Anant", role: "Chief Technology Officer", desc: "The core architect. Hardcoding operational truth into custom AI models, middleware, and infrastructure." },
    { name: "Amit", role: "Chief Operating Officer", desc: "Commanding deployment execution. Mapping chaotic workflows into ruthless, streamlined logic gates." }
  ];

  return (
    <div className="w-full flex flex-col items-center animate-in fade-in duration-1000">
      <section className="relative min-h-[70vh] flex items-center justify-center pt-32 pb-12 w-full">
        <HeroBackground />
        <div className="relative z-10 w-full px-[3%] flex flex-col items-start mt-[-5vh]">
          <FadeIn direction="up">
            <div className="flex items-center gap-3 mb-10 border border-white/5 rounded-[6px] px-3 py-1 bg-[#111111] w-fit interactive-hover">
              <span className="w-1 h-1 rounded-full bg-neutral-500"></span>
              <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-[0.3em] pt-[1px] cursor-default">
                <DecodeText text="Identity & Manifesto" />
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={150} direction="up" duration={1200}>
            <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] font-light leading-[1.05] tracking-tight mb-8">
              <ScrollRevealText>We don't run an agency.</ScrollRevealText><br />
              <ScrollRevealText revealColor="#777777">We engineer leverage.</ScrollRevealText>
            </h1>
          </FadeIn>
        </div>
      </section>

      <section className="relative w-full py-32 bg-[#020202]">
        <RevealLine orientation="horizontal" className="absolute top-0 left-0" />
        <NoiseBackground />
        <div className="relative z-10 w-full mx-auto px-[3%]">
          <FadeIn className="max-w-4xl mb-32">
            <h2 className="text-2xl sm:text-4xl font-light leading-snug tracking-tight">
              <ScrollRevealText>
                We spent years inside scaling startups and legacy enterprises. What we saw was universally terrifying: million-dollar operations held together by WhatsApp groups, nested Excel sheets, and sheer human anxiety.
              </ScrollRevealText>
            </h2>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-24">
             <div>
               <FadeIn>
                 <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-[0.2em] mb-6 block">The Catalyst</span>
                 <h3 className="text-2xl font-light text-white mb-6 max-w-lg">Founders were breaking under their own success.</h3>
                 <div className="max-w-xl space-y-6">
                   <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
                     We realized the industry didn't need more "consultants" offering advice, or "agencies" selling monthly retainers to do manual work. It needed architects. Teams who could tear down bloated processes and hardcode operational truth into a unified system.
                   </p>
                   <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
                     So we stopped giving advice and started building the infrastructure. We replace human routers with AI decision engines. We turn chaotic, fragile growth into inevitable, systematic scale.
                   </p>
                 </div>
               </FadeIn>
             </div>
             
             <div>
               <FadeIn delay={200}>
                 <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-[0.2em] mb-6 block">Rules of Engagement</span>
                 <div className="space-y-8 max-w-xl">
                   {[
                     { title: "No Retainers", desc: "We build the system, train your team, and exit. You own your infrastructure forever." },
                     { title: "No Fluff", desc: "We don't do 'strategy mapping sessions'. We do deep system audits and rapid deployment." },
                     { title: "Zero Delegation", desc: "When you hire SCRAM-RS, you get the core team. Not a junior developer or a generic account manager." }
                   ].map((rule, i) => (
                     <div key={i} className="border-l border-white/10 pl-6 group">
                        <h4 className="text-white font-medium text-sm mb-2 group-hover:text-white transition-colors">{rule.title}</h4>
                        <p className="text-neutral-500 font-light text-sm leading-relaxed">{rule.desc}</p>
                     </div>
                   ))}
                 </div>
               </FadeIn>
             </div>
          </div>
        </div>
      </section>

      {/* NEW: THE TEAM SECTION */}
      <section className="relative w-full py-40 bg-[#030303]">
         <RevealLine orientation="horizontal" className="absolute top-0 left-0" />
         <div className="relative z-10 w-full mx-auto px-[3%]">
            <FadeIn className="mb-24">
              <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-[0.2em] mb-6 block">The Architects</span>
              <h2 className="text-3xl sm:text-5xl font-light tracking-tight">
                <ScrollRevealText>SCRAM-RS Leadership</ScrollRevealText>
              </h2>
            </FadeIn>
            
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, i) => (
                <FadeIn key={i} delay={i * 150} direction="up">
                  <GlowCard className="h-full border thin-border bg-white/[0.01] p-10 flex flex-col group">
                     <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 rounded-full border border-white/10 bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden group-hover:border-cyan-500/50 transition-colors duration-500">
                          <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <span className="text-white font-mono text-sm relative z-10">{member.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h4 className="text-white text-lg font-light">{member.name}</h4>
                          <span className="text-[9px] font-mono text-cyan-500 uppercase tracking-widest">{member.role}</span>
                        </div>
                     </div>
                     <p className="text-neutral-500 font-light text-sm leading-relaxed">
                        {member.desc}
                     </p>
                  </GlowCard>
                </FadeIn>
              ))}
            </div>
         </div>
      </section>

      {/* Philosophy of Leverage */}
      <section className="relative w-full py-40 bg-[#020202]">
         <RevealLine orientation="horizontal" className="absolute top-0 left-0" />
         <div className="relative z-10 w-full mx-auto px-[3%] grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <FadeIn>
                <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-[0.2em] mb-6 block">Core Principle</span>
                <h2 className="text-3xl sm:text-5xl font-light tracking-tight mb-8">
                  <ScrollRevealText>The Philosophy of</ScrollRevealText><br/>
                  <ScrollRevealText revealColor="#777777">Absolute Leverage.</ScrollRevealText>
                </h2>
                <p className="text-sm text-neutral-400 font-light leading-relaxed max-w-xl">
                  Leverage is the gap between effort applied and output generated. If you add 10 clients and have to hire 2 account managers, you have zero leverage. True architecture ensures your operations handle 10x volume without increasing your payroll by a single dollar.
                </p>
              </FadeIn>
            </div>
            <div className="space-y-6 max-w-xl">
               {[
                 { title: "Code is cheaper than human logic.", desc: "Algorithms do not sleep, they do not forget edge cases, and they do not require management." },
                 { title: "Bandwidth is finite.", desc: "Every minute a founder spends routing information is a minute not spent acquiring capital." },
                 { title: "Complexity is an enemy.", desc: "We aggressively prune software. If a tool doesn't reduce friction, it gets uninstalled." }
               ].map((item, i) => (
                 <FadeIn key={i} delay={i * 100} className="border thin-border p-6 bg-white/[0.01] rounded-[6px] transition-transform duration-500 hover:scale-[1.02]">
                   <h4 className="text-white font-medium text-sm mb-2">{item.title}</h4>
                   <p className="text-neutral-500 font-light text-sm leading-relaxed">{item.desc}</p>
                 </FadeIn>
               ))}
            </div>
         </div>
      </section>

      <section className="relative w-full py-40 bg-[#030303]">
         <RevealLine orientation="horizontal" className="absolute top-0 left-0" />
         <div className="relative z-10 w-full mx-auto px-[3%]">
            <FadeIn className="mb-24">
              <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-[0.2em] mb-6 block">Capital Allocation</span>
              <h2 className="text-3xl sm:text-5xl font-light tracking-tight">
                <ScrollRevealText>The Engagement Model</ScrollRevealText>
              </h2>
            </FadeIn>
            
            <div className="grid md:grid-cols-2 gap-8">
              <FadeIn delay={100} className="border thin-border p-12 bg-white/[0.01] rounded-[6px] relative group overflow-hidden interactive-hover">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-neutral-800 group-hover:bg-white transition-colors duration-500"></div>
                <h3 className="text-2xl font-light text-white mb-4">Architecture Audit</h3>
                <div className="text-3xl font-light text-neutral-400 mb-8">$5,000 <span className="text-sm">/ flat</span></div>
                <p className="text-sm text-neutral-500 font-light leading-relaxed mb-8 border-l border-white/10 pl-4 max-w-lg">
                  A 3-day deep dive into your operations. You receive a complete wireframe of your current operational debt and a hardcoded blueprint of the required AI architecture.
                </p>
                <button onClick={onOpenAudit} className="text-[10px] font-mono tracking-widest uppercase text-white hover:text-neutral-400 transition-colors flex items-center gap-3">
                  Initiate Audit <ArrowRight className="w-3 h-3" />
                </button>
              </FadeIn>

              <FadeIn delay={200} className="border thin-border p-12 bg-white/[0.01] rounded-[6px] relative group overflow-hidden interactive-hover">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-neutral-800 group-hover:bg-cyan-500 transition-colors duration-500"></div>
                <h3 className="text-2xl font-light text-white mb-4">System Deployment</h3>
                <div className="text-3xl font-light text-neutral-400 mb-8">Custom <span className="text-sm">/ 10-51 days</span></div>
                <p className="text-sm text-neutral-500 font-light leading-relaxed mb-8 border-l border-white/10 pl-4 max-w-lg">
                  SCRAM-RS acts as your interim CTO of Operations. We build the central database, write the middleware, train the AI logic layers, and deploy the entire system live.
                </p>
                <button onClick={onOpenAudit} className="text-[10px] font-mono tracking-widest uppercase text-white hover:text-cyan-400 transition-colors flex items-center gap-3">
                  Request Deployment <ArrowRight className="w-3 h-3" />
                </button>
              </FadeIn>
            </div>
         </div>
      </section>
    </div>
  );
};

// --- DEPLOYMENTS (CASE STUDIES) PAGE COMPONENT ---
const DeploymentsPage = ({ onOpenAudit }) => {
  const defaultLogs = [
    {
      id: "SYS-089",
      client: "National Agri-Distribution Network",
      metrics: ["-80% Manual Tracking", "7 Days to Real-time Reporting", "Zero Lost Inventory"],
      before: "Operations were spread across 40+ WhatsApp groups and 12 distinct Excel sheets maintained by 8 different regional managers. Executive reporting took 7 days to compile, meaning leadership was always making decisions based on week-old ghost data.",
      after: "Deployed a centralized, AI-driven ingestion engine. Regional managers now send plain-text WhatsApp messages. The AI instantly parses the NLP, updates the central PostgreSQL database, and reflects live on a custom Next.js executive dashboard.",
      quote: "For the first time in three years, I know exactly what is in my warehouses right now without having to call seven different people. The system just handles it."
    },
    {
      id: "SYS-104",
      client: "B2B Logistics & Freight Co.",
      metrics: ["100% Automated Dispatch", "Founders removed from triage", "42 Days to Deploy"],
      before: "Founders were acting as high-paid dispatchers. Every exception, delay, or client query had to be manually routed through them because the data lived in a closed legacy ERP system.",
      after: "Architected a custom middleware layer sitting on top of the legacy ERP. Built a Slack-integrated internal AI Copilot. When ground teams face a delay, they ping the Copilot. It checks the database, autonomously notifies the client via webhook, and updates the ERP.",
      quote: "We were about to hire 4 more operations managers just to handle email traffic. The AI architecture eliminated that entire hiring requirement in 6 weeks."
    },
    {
      id: "SYS-112",
      client: "Global E-Commerce Aggregator",
      metrics: ["Zero Stockouts", "Dynamic Price Routing", "-90% Data Entry"],
      before: "Inventory matching across 14 different international marketplaces required a team of 6 doing daily manual CSV uploads. Price changes took 48 hours to propagate, leading to massive arbitrage losses.",
      after: "Built a central node via Supabase and Make.com. AI vision models now scan incoming supplier invoices instantly, updating central inventory. A custom logic engine pushes price syncs to all 14 APIs simultaneously.",
      quote: "The speed at which we can adjust pricing globally is now our biggest competitive advantage. We literally operate faster than our competitors can refresh their sheets."
    }
  ];

  const logs = useSanityData('*[_type == "systemLog"] | order(_createdAt desc)', defaultLogs);

  return (
    <div className="w-full flex flex-col items-center animate-in fade-in duration-1000">
      
      <section className="relative min-h-[100svh] flex flex-col w-full">
        <HeroBackground />
        
        <div className="flex-1 flex items-center justify-center pt-32 pb-12 w-full relative z-10 px-[3%]">
          <div className="w-full flex flex-col items-start mt-[-5vh]">
            <FadeIn direction="up">
              <div className="flex items-center gap-3 mb-10 border border-white/5 rounded-[6px] px-3 py-1 bg-[#111111] w-fit interactive-hover">
                <span className="w-1 h-1 rounded-full bg-cyan-500"></span>
                <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-[0.3em] pt-[1px] cursor-default">
                  <DecodeText text="System Logs" />
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={150} direction="up" duration={1200}>
              <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] font-light leading-[1.05] tracking-tight mb-8">
                <ScrollRevealText>Architectural</ScrollRevealText><br />
                <ScrollRevealText revealColor="#777777">Deployments.</ScrollRevealText>
              </h1>
            </FadeIn>
            <FadeIn delay={300} direction="up" className="w-full">
              <ScrollRevealText as="p" className="max-w-xl text-sm sm:text-[15px] leading-relaxed font-light mb-14" baseColor="#333333" revealColor="#aaaaaa">
                A public record of operational transformations deployed across the globe. Proof that engineered leverage outperforms human effort.
              </ScrollRevealText>
              <GlobalNetworkMap />
            </FadeIn>
          </div>
        </div>
        
        <MetricsTicker />
      </section>

      {/* NEW: Industry Agnostic Section */}
      <section className="relative w-full py-20 bg-[#040404]">
        <RevealLine orientation="horizontal" className="absolute top-0 left-0" />
        <div className="relative z-10 w-full px-[3%]">
           <FadeIn className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
              <div>
                 <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-[0.2em] mb-4 block">Agnostic Architecture</span>
                 <h2 className="text-2xl font-light tracking-tight text-white">Logic applies everywhere.</h2>
              </div>
              <div className="flex flex-wrap gap-4 text-xs font-mono uppercase tracking-widest text-neutral-500">
                 {['Fintech', 'Logistics', 'Agri-Tech', 'E-Commerce', 'B2B SaaS', 'Healthcare'].map((ind, i) => (
                    <span key={i} className="border thin-border px-4 py-2 rounded-[4px] bg-white/[0.01] hover:bg-white/[0.05] transition-colors">{ind}</span>
                 ))}
              </div>
           </FadeIn>
        </div>
      </section>

      {/* Deep Dives with Quotes */}
      <section className="relative w-full py-20 bg-[#020202]">
        <RevealLine orientation="horizontal" className="absolute top-0 left-0" />
        <NoiseBackground />
        <div className="relative z-10 w-full mx-auto px-[3%] space-y-40">
          
          {logs.map((log, i) => (
            <div key={i} className="grid lg:grid-cols-12 gap-16 relative group">
              <RevealLine delay={100} className="absolute -top-16 left-0" />
              
              <div className="lg:col-span-4 flex flex-col items-start">
                <FadeIn>
                  <div className="text-[10px] font-mono text-neutral-600 uppercase tracking-[0.2em] mb-4">Log Ref: {log.id}</div>
                  <h3 className="text-2xl font-light text-white mb-8 pr-8">{log.client}</h3>
                  <div className="space-y-4 w-full mb-10">
                    <div className="text-[9px] font-mono text-neutral-600 uppercase tracking-[0.2em] mb-2">Outcomes</div>
                    {log.metrics.map((metric, j) => (
                       <div key={j} className="flex items-center gap-3 border-b border-white/[0.02] pb-3 last:border-0">
                         <div className="w-1.5 h-1.5 bg-white/20 rounded-full"></div>
                         <span className="text-xs text-neutral-400 font-light tracking-wide">{metric}</span>
                       </div>
                    ))}
                  </div>
                  
                  {/* Founder's Signal (Quote) */}
                  <div className="border-l-2 border-cyan-500/50 pl-4 py-1">
                     <div className="text-[9px] font-mono text-cyan-500/80 uppercase tracking-[0.2em] mb-3">Founder's Signal</div>
                     <p className="text-sm font-light text-neutral-300 italic leading-relaxed max-w-sm">"{log.quote}"</p>
                  </div>
                </FadeIn>
              </div>

              <div className="lg:col-span-8 grid sm:grid-cols-2 gap-12 bg-white/[0.01] border thin-border p-8 md:p-12 hover:bg-white/[0.02] transition-colors interactive-hover rounded-[6px]">
                <FadeIn delay={150}>
                  <div className="text-[10px] font-mono text-neutral-600 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                    <span className="text-red-500/80">■</span> Previous Architecture
                  </div>
                  <ScrollRevealText as="p" className="text-sm font-light leading-relaxed text-neutral-400" revealColor="#aaaaaa">
                    {log.before}
                  </ScrollRevealText>
                </FadeIn>
                <FadeIn delay={250}>
                  <div className="text-[10px] font-mono text-neutral-600 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                    <span className="text-white/80">■</span> Deployed System
                  </div>
                  <ScrollRevealText as="p" className="text-sm font-light leading-relaxed text-white" revealColor="#ffffff">
                    {log.after}
                  </ScrollRevealText>
                </FadeIn>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* The Graveyard */}
      <section className="relative w-full py-40 bg-[#030303]">
        <RevealLine orientation="horizontal" className="absolute top-0 left-0" />
        <div className="relative z-10 w-full mx-auto px-[3%] grid lg:grid-cols-2 gap-24 items-center">
           <div>
             <FadeIn>
               <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-[0.2em] mb-6 block">Decommissioned</span>
               <h2 className="text-3xl sm:text-5xl font-light tracking-tight mb-8">
                 <ScrollRevealText>The Graveyard of</ScrollRevealText><br/>
                 <ScrollRevealText revealColor="#777777">Bad Systems.</ScrollRevealText>
               </h2>
               <p className="text-sm text-neutral-400 font-light leading-relaxed max-w-lg">
                 A system is only as strong as its weakest link. Over the years, we have systematically ripped out, bypassed, or completely replaced these operational hazards. If your company relies on these for core data truth, you are bleeding bandwidth.
               </p>
             </FadeIn>
           </div>
           <div className="grid grid-cols-2 gap-4">
              {['VBA Macros', 'Endless Zapier Chains', 'WhatsApp "Official" Groups', 'Paper Invoices', 'Nested Excel Files', 'Legacy On-Prem ERPs'].map((item, i) => (
                <FadeIn key={i} delay={i * 100} className="border thin-border p-4 bg-white/[0.01] flex items-center gap-3 rounded-[6px] transition-transform duration-500 hover:-translate-y-1">
                  <div className="w-1.5 h-1.5 bg-red-500/50 rounded-full animate-pulse"></div>
                  <span className="text-xs font-mono text-neutral-500 line-through decoration-red-500/50">{item}</span>
                </FadeIn>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

// --- SIGNAL (INSIGHTS) PAGE COMPONENT ---
const SignalPage = ({ onOpenAudit }) => {
  const [subscribed, setSubscribed] = useState(false);
  const [events, setEvents] = useState([
    "Node US_EAST synchronized... 0.04ms",
    "AI_Router intercepted generic query. Resolved.",
    "Payment ledger reconciled. 0 anomalies.",
    "Webhook received. Processing external payload..."
  ]);
  
  useEffect(() => {
    const randomEvents = [
      "Database read successful... 12ms latency.",
      "Anomaly detected in Node DXB. Rerouting logic...",
      "Founders ping blocked. Copilot responded.",
      "Inventory synced globally across 14 APIs.",
      "Redundant Zapier flow terminated."
    ];
    
    const interval = setInterval(() => {
      const newEvent = randomEvents[Math.floor(Math.random() * randomEvents.length)];
      setEvents(prev => [newEvent, ...prev.slice(0, 4)]);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);
  
  const defaultPosts = [
    { date: "SYS_LOG // 001", title: "Why Your New SaaS Subscription Won't Save You.", snippet: "Founders buy software hoping it buys them systems. But software without logic mapping just creates faster chaos. Here is why you must map your business reality before buying another tool." },
    { date: "SYS_LOG // 002", title: "The Math Behind Human APIs.", snippet: "If a human's job is to read an email, extract a PDF, and type the data into a CRM, they are a Human API. It is the most expensive, error-prone bandwidth leak in scaling companies." },
    { date: "SYS_LOG // 003", title: "Founders as Routers: The Ultimate Bottleneck.", snippet: "When every critical decision must pass through the founder's WhatsApp, the company's growth ceiling is the founder's sleep schedule. Systematizing exception handling is the only way out." },
    { date: "SYS_LOG // 004", title: "Data Velocity > Data Quality.", snippet: "A perfectly accurate report delivered 7 days late is ghost data. Operations require telemetry. Here is how to architect instantaneous feedback loops." },
    { date: "SYS_LOG // 005", title: "The End of the 'Data Entry' Job.", snippet: "With LLMs acting as parsing layers, hiring entry-level staff purely for data formatting is mathematically obsolete. Why routing logic replaces manual input." },
    { date: "SYS_LOG // 006", title: "Building Defensibility Through Architecture.", snippet: "Your moat isn't your brand; it's your execution speed. Companies with automated operational backends can iterate, ship, and deliver 10x faster than manually heavy competitors." }
  ];

  const posts = useSanityData('*[_type == "transmission"] | order(_createdAt desc)', defaultPosts);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <div className="w-full flex flex-col items-center animate-in fade-in duration-1000">
      <section className="relative min-h-[60vh] flex items-center justify-center pt-32 pb-12 w-full">
        <HeroBackground />
        <div className="relative z-10 w-full px-[3%] flex flex-col items-start mt-[-5vh]">
          <FadeIn direction="up">
            <div className="flex items-center gap-3 mb-10 border border-white/5 rounded-[6px] px-3 py-1 bg-[#111111] w-fit interactive-hover">
              <span className="w-1 h-1 rounded-full bg-neutral-300 animate-pulse"></span>
              <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-[0.3em] pt-[1px] cursor-default">
                <DecodeText text="Transmissions" />
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={150} direction="up" duration={1200}>
            <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] font-light leading-[1.05] tracking-tight mb-8">
              <ScrollRevealText>Signal.</ScrollRevealText><br />
              <ScrollRevealText revealColor="#777777">No noise.</ScrollRevealText>
            </h1>
          </FadeIn>
          
          <FadeIn delay={300} direction="up" className="max-w-xl">
            <ScrollRevealText as="p" className="text-sm sm:text-[15px] leading-relaxed font-light mb-14" baseColor="#333333" revealColor="#aaaaaa">
              Hard truths on operational debt, system architecture, and why human effort is the most expensive commodity in business.
            </ScrollRevealText>
          </FadeIn>
        </div>
      </section>

      {/* Live System Events */}
      <section className="relative w-full py-20 bg-[#030303]">
        <RevealLine orientation="horizontal" className="absolute top-0 left-0" />
        <div className="relative z-10 w-full mx-auto px-[3%] flex flex-col items-center">
           <FadeIn className="w-full max-w-4xl border thin-border bg-[#050505] rounded-[6px] overflow-hidden transition-transform duration-700 hover:scale-[1.01]">
             <div className="border-b thin-border p-4 bg-[#0a0a0a] flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] font-mono text-neutral-500 tracking-widest uppercase">Global_Telemetry_Stream</span>
             </div>
             <div className="p-6 font-mono text-[10px] sm:text-xs text-neutral-600 uppercase tracking-wider space-y-4 h-[200px] overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] opacity-20 z-10 pointer-events-none"></div>
                {events.map((log, i) => (
                  <div key={i} className={`flex items-center gap-4 transition-all duration-500 ${i === 0 ? 'text-white translate-y-0 opacity-100' : 'opacity-50'}`}>
                    <span className="text-cyan-900">[{new Date().toISOString().split('T')[1].substring(0, 8)}]</span>
                    {log}
                  </div>
                ))}
             </div>
           </FadeIn>
        </div>
      </section>

      {/* Insights Grid */}
      <section className="relative w-full py-20 bg-[#040404]">
        <RevealLine orientation="horizontal" className="absolute top-0 left-0" />
        <div className="relative z-10 w-full mx-auto px-[3%]">
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {posts.map((post, i) => (
              <FadeIn key={i} delay={i * 100} direction="up">
                <GlowCard className="group h-full flex flex-col items-start p-10 border thin-border bg-white/[0.01] hover:bg-white/[0.03] transition-colors interactive-hover cursor-pointer">
                  <div className="text-[9px] font-mono text-neutral-600 uppercase tracking-[0.2em] mb-6 transition-colors group-hover:text-neutral-400">
                    <DecodeText text={post.date} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-light text-white mb-6 group-hover:translate-x-2 transition-transform duration-500">
                    {post.title}
                  </h3>
                  <p className="text-sm text-neutral-500 font-light leading-relaxed mb-10 group-hover:text-neutral-400 transition-colors">
                    {post.snippet}
                  </p>
                  <div className="mt-auto flex items-center gap-3 text-[10px] uppercase font-mono tracking-widest text-neutral-600 group-hover:text-white transition-colors">
                    Access Transmission <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </GlowCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Encrypted Subscription Terminal */}
      <section className="relative w-full py-40 bg-[#020202]">
        <RevealLine orientation="horizontal" className="absolute top-0 left-0" />
        <div className="relative z-10 w-full mx-auto px-[3%] flex flex-col items-center text-center">
           <FadeIn>
             <h2 className="text-3xl font-light tracking-tight mb-8">
               <ScrollRevealText>Establish a direct line.</ScrollRevealText>
             </h2>
             <p className="text-sm text-neutral-400 font-light max-w-lg mb-12">
               No spam. Just highly tactical system architecture blueprints and essays sent directly to your comm channel once a month.
             </p>
             <form onSubmit={handleSubscribe} className="w-full max-w-md mx-auto border thin-border bg-[#050505] flex p-2 pl-6 items-center rounded-[6px] relative overflow-hidden transition-transform duration-500 hover:scale-[1.02]">
                <span className="text-cyan-500 font-mono text-xs mr-4 animate-pulse">{">"}</span>
                <input 
                  type="email" 
                  required
                  placeholder="enter_email_address..." 
                  className="bg-transparent border-none outline-none w-full text-white font-mono text-xs placeholder:text-neutral-600"
                />
                <button type="submit" className="bg-white text-black px-6 py-3 text-[10px] font-mono tracking-widest uppercase hover:bg-neutral-200 transition-colors interactive-hover rounded-[6px]">
                  Establish
                </button>
                {/* Success State Overlay */}
                <div className={`absolute inset-0 bg-green-500 flex items-center justify-center transition-transform duration-300 ${subscribed ? 'translate-y-0' : 'translate-y-full'}`}>
                  <span className="text-[10px] font-mono text-black uppercase tracking-widest font-bold">CONNECTION ESTABLISHED</span>
                </div>
             </form>
           </FadeIn>
        </div>
      </section>
    </div>
  );
};

// --- STACK PAGE COMPONENT ---
const StackPage = ({ onOpenAudit }) => {
  const externalIntegrations = [
    { tool: "Next.js", purpose: "Core Framework", why: "The frontend and website framework itself. Essential for dynamic journeys, interactive tools, better SEO, and long-term extensibility." },
    { tool: "Sanity", purpose: "Headless CMS", why: "Cleaner content modeling, easier editorial experience, and better fit for a modern case-study-heavy site than standard WP/Wix." },
    { tool: "HubSpot", purpose: "CRM & Lead Engine", why: "Everything flows here: contact forms, quiz submissions, booking intent, and source tracking. Marketing + sales in one place." },
    { tool: "Cal.com", purpose: "Booking Layer", why: "For consults and discovery calls. Embeds natively with pre-filled context so prospects never repeat themselves." },
    { tool: "Tally", purpose: "Initial Logic Forms", why: "Start fast with Brand Readiness Quizzes and Brief Builders before migrating to custom React. Clean, notion-like UI." },
    { tool: "Resend", purpose: "Transactional Email", why: "Dedicated mail layer for quiz results, booking confirmations, brief submissions, and internal lead alerts." },
    { tool: "n8n", purpose: "Automation Core", why: "The operational glue. Pushes form data to CRM, triggers slack alerts, routes leads, and generates PDFs autonomously." },
    { tool: "GA4 + Clarity + GSC", purpose: "Measurement Layer", why: "Tracks where traffic comes from, how far they scroll, where they drop, and exactly which tools actually convert." }
  ];

  const internalModules = [
    "Brand Readiness Quiz",
    "Brief Builder",
    "Service Recommender",
    "Case Study Finder",
    "Scope Estimator",
    "Credentials Generator"
  ];

  return (
    <div className="w-full flex flex-col items-center animate-in fade-in duration-1000">
       {/* Hero */}
       <section className="relative min-h-[60vh] flex items-center justify-center pt-32 pb-12 w-full">
        <HeroBackground />
        <div className="relative z-10 w-full px-[3%] flex flex-col items-start mt-[-5vh]">
          <FadeIn direction="up">
            <div className="flex items-center gap-3 mb-10 border border-white/5 rounded-[6px] px-3 py-1 bg-[#111111] w-fit interactive-hover">
              <span className="w-1 h-1 rounded-full bg-cyan-500"></span>
              <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-[0.3em] pt-[1px] cursor-default">
                <DecodeText text="System Architecture" />
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={150} direction="up" duration={1200}>
            <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] font-light leading-[1.05] tracking-tight mb-8">
              <ScrollRevealText>The Operating</ScrollRevealText><br />
              <ScrollRevealText revealColor="#777777">Stack.</ScrollRevealText>
            </h1>
          </FadeIn>
          
          <FadeIn delay={300} direction="up" className="max-w-xl w-full">
            <ScrollRevealText as="p" className="text-sm sm:text-[15px] leading-relaxed font-light mb-8" baseColor="#333333" revealColor="#aaaaaa">
              React does not need a plugin jungle. It needs a clean operating stack: one CMS, one CRM, one booking layer, one email layer, one automation layer, and one analytics layer. 
            </ScrollRevealText>
            <ScrollRevealText as="p" className="text-sm sm:text-[15px] leading-relaxed font-light" baseColor="#333333" revealColor="#aaaaaa">
              That gives you a site that is easy to manage, easy to scale, and infinitely more powerful than a generic template without becoming complicated.
            </ScrollRevealText>
          </FadeIn>
        </div>
      </section>

      {/* Integration Timeline Component */}
      <section className="relative w-full py-20 bg-[#030303]">
        <RevealLine orientation="horizontal" className="absolute top-0 left-0" />
        <div className="relative z-10 w-full px-[3%]">
           <FadeIn className="mb-16">
             <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-[0.2em] mb-6 block">Deployment Phasing</span>
             <h2 className="text-2xl font-light tracking-tight text-white">How we build the stack.</h2>
           </FadeIn>
           <div className="flex flex-col md:flex-row gap-4 w-full">
              {['Phase 1: Foundation (Next.js + Sanity + Vercel)', 'Phase 2: CRM Routing (HubSpot + Tally + n8n)', 'Phase 3: React Modules (Brief Builder + Analyzers)'].map((step, i) => (
                <FadeIn key={i} delay={i*150} className="flex-1 border thin-border p-6 bg-white/[0.01] rounded-[6px] transition-transform duration-500 hover:-translate-y-1">
                  <div className="text-[10px] font-mono text-cyan-500 mb-4">0{i+1}</div>
                  <div className="text-sm text-neutral-300 font-light">{step}</div>
                </FadeIn>
              ))}
           </div>
        </div>
      </section>

      {/* Integrations Grid */}
      <section className="relative w-full py-20 bg-[#040404]">
        <RevealLine orientation="horizontal" className="absolute top-0 left-0" />
        <div className="relative z-10 w-full mx-auto px-[3%]">
          <FadeIn className="mb-24">
             <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-[0.2em] mb-6 block">External Integration Layer</span>
             <h2 className="text-3xl sm:text-5xl font-light tracking-tight">
               <ScrollRevealText>One tool.</ScrollRevealText><br/>
               <ScrollRevealText revealColor="#777777">One purpose.</ScrollRevealText>
             </h2>
           </FadeIn>
           
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
             {externalIntegrations.map((item, i) => (
               <FadeIn key={i} delay={i*100}>
                 <GlowCard className="border thin-border bg-white/[0.01] p-8 h-full hover:bg-white/[0.02] transition-colors interactive-hover">
                    <div className="text-[9px] font-mono text-cyan-500/80 uppercase tracking-widest mb-4">{item.purpose}</div>
                    <h4 className="text-white text-xl font-light mb-4 pb-4 border-b border-white/5">{item.tool}</h4>
                    <p className="text-neutral-500 font-light text-xs leading-relaxed">{item.why}</p>
                 </GlowCard>
               </FadeIn>
             ))}
           </div>
        </div>
      </section>

      {/* Internal Modules */}
      <section className="relative w-full py-40 bg-[#020202]">
        <RevealLine orientation="horizontal" className="absolute top-0 left-0" />
        <div className="relative z-10 w-full mx-auto px-[3%] grid lg:grid-cols-2 gap-24 items-center">
           <div>
             <FadeIn>
               <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-[0.2em] mb-6 block">Internal React Modules</span>
               <h2 className="text-3xl sm:text-5xl font-light tracking-tight mb-8">
                 <ScrollRevealText>Custom product flows,</ScrollRevealText><br/>
                 <ScrollRevealText revealColor="#777777">not generic pages.</ScrollRevealText>
               </h2>
               <p className="text-sm text-neutral-400 font-light leading-relaxed mb-6 max-w-lg">
                 This is the real reason to move to a structured React architecture. These are not static web pages. They are product-like flows designed to capture intent, score leads, and guide users.
               </p>
               <div className="flex flex-wrap gap-2 mb-8 max-w-lg">
                 {['Tailwind CSS', 'shadcn/ui', 'React Hook Form', 'Zod', 'Framer Motion'].map((tech, i) => (
                   <span key={i} className="text-[9px] font-mono text-neutral-500 border border-white/10 px-2 py-1 rounded-[4px] bg-white/[0.02] transition-colors hover:text-white">{tech}</span>
                 ))}
               </div>
             </FadeIn>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {internalModules.map((module, i) => (
                <FadeIn key={i} delay={i * 100} className="border thin-border p-5 bg-white/[0.01] flex items-center gap-4 rounded-[6px] transition-transform duration-500 hover:-translate-y-1">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  <span className="text-xs font-mono text-neutral-300">{module}</span>
                </FadeIn>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

// --- PRE-FOOTER COMPONENT ---
const PreFooter = ({ onOpenAudit }) => {
  return (
    <section className="relative w-full py-40 bg-[#050505] border-t thin-border overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-900/20 blur-[120px] rounded-full animate-pulse-slow"></div>
      </div>
      <div className="relative z-10 w-full mx-auto px-[3%] flex flex-col items-center text-center">
         <FadeIn>
           <div className="flex items-center justify-center gap-3 mb-8 border border-white/5 rounded-[6px] px-3 py-1 bg-[#111111] w-fit mx-auto interactive-hover">
             <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
             <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-[0.25em] pt-[1px]">Systems Online</span>
           </div>
           <h2 className="text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tight mb-10 leading-[1.1]">
             <ScrollRevealText>Ready to fix</ScrollRevealText><br />
             <ScrollRevealText revealColor="#777777">your operations?</ScrollRevealText>
           </h2>
           <button 
              onClick={onOpenAudit}
              className="group relative inline-flex items-center justify-center gap-6 text-xs text-black bg-white px-10 py-5 uppercase tracking-[0.2em] font-medium hover:bg-neutral-200 transition-colors interactive-hover rounded-[6px]"
            >
              <DecodeText text="Initialize Diagnostics" />
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
         </FadeIn>
      </div>
    </section>
  );
};

// --- ANIMATED FOOTER COMPONENT ---
const AnimatedFooter = ({ setCurrentPage }) => {
  return (
    <footer className="relative w-full bg-[#020202] overflow-hidden pt-24 pb-12 flex flex-col items-center z-10 border-t border-white/[0.02]">
      {/* Blend gradient to smoothly melt into the preceding section */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#050505] to-transparent z-10 pointer-events-none"></div>

      <div className="absolute inset-0 pointer-events-none z-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.8)] animate-scanline"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgwem0yMCAyMGgyMHYyMEgyMHoiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')] [mask-image:linear-gradient(to_bottom,black_10%,transparent_90%)]"></div>
        <div className="absolute top-[20%] left-0 w-full overflow-hidden opacity-[0.02] select-none flex">
          <div className="animate-marquee whitespace-nowrap text-[15vw] font-black tracking-tighter text-transparent" style={{ WebkitTextStroke: '2px white' }}>
            SCRAM-RS // ENGINEER LEVERAGE // SCRAM-RS // ENGINEER LEVERAGE // 
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full mx-auto px-[3%] flex flex-col items-start gap-24">
        <div className="grid sm:grid-cols-3 gap-12 w-full max-w-6xl">
          <div className="flex flex-col gap-6">
            <div className="text-[10px] font-mono text-neutral-600 uppercase tracking-[0.2em]">Index</div>
            <ul className="space-y-4">
              {['Home', 'Deployments', 'Signal', 'About Us', 'The Stack'].map((link, i) => (
                <li key={i}>
                  <button 
                    onClick={() => setCurrentPage(link.toLowerCase().replace(' ', ''))}
                    className="text-sm font-light text-neutral-400 hover:text-white transition-colors interactive-hover relative group overflow-hidden"
                  >
                    <DecodeText text={link} />
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6" itemScope itemType="https://schema.org/DefinedTerm">
            <div className="text-[10px] font-mono text-neutral-600 uppercase tracking-[0.2em]">Knowledge Base</div>
            <div className="text-xs text-neutral-500 font-light leading-relaxed border border-white/[0.02] bg-white/[0.01] p-6 rounded-[6px] text-left hover:bg-white/[0.03] transition-colors">
              <span itemProp="name" className="text-neutral-300 block mb-1">AI Operating System (AI-OS)</span>
              <span itemProp="description">A centralized architectural framework replacing disjointed manual workflows with unified, AI-driven automation, enabling real-time visibility and structured scale.</span>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="text-[10px] font-mono text-neutral-600 uppercase tracking-[0.2em]">Global Operations</div>
            <div className="text-xs text-neutral-400 font-light space-y-3">
               <div className="flex items-center gap-3"><Globe2 className="w-4 h-4 text-neutral-600"/> India</div>
               <div className="flex items-center gap-3"><Globe2 className="w-4 h-4 text-neutral-600"/> USA</div>
               <div className="flex items-center gap-3"><Globe2 className="w-4 h-4 text-neutral-600"/> UAE</div>
               <div className="flex items-center gap-3"><Globe2 className="w-4 h-4 text-neutral-600"/> KSA</div>
            </div>
          </div>
        </div>

        <div className="w-full pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
           <div className="flex items-center gap-4">
             <Command className="w-3 h-3" />
             <span>© {new Date().getFullYear()} SCRAM-RS</span>
           </div>
           
           <div className="flex items-center gap-8">
             <a href="#" className="hover:text-neutral-300 transition-colors interactive-hover"><DecodeText text="LinkedIn" /></a>
             <a href="#" className="hover:text-neutral-300 transition-colors interactive-hover"><DecodeText text="Twitter" /></a>
             <a href="mailto:complete.anant@gmail.com" className="hover:text-white transition-colors interactive-hover">complete.anant@gmail.com</a>
           </div>
        </div>
      </div>
    </footer>
  );
};

// --- MAIN APPLICATION ---
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-400 font-sans selection:bg-neutral-800 selection:text-white overflow-x-hidden antialiased">
      <StructuredData />
      <CustomCursor />
      
      {/* Initial Boot Sequence Preloader */}
      {isBooting && <SystemBootLoader onComplete={() => setIsBooting(false)} />}
      
      <AuditJourney isOpen={isAuditOpen} onClose={() => setIsAuditOpen(false)} />
      
      <style dangerouslySetInnerHTML={{__html: `
        :root { color-scheme: dark; }
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; letter-spacing: -0.01em; cursor: none !important; }
        a, button, [role="button"], input { cursor: none !important; }
        h1, h2, h3, h4, h5, h6 { letter-spacing: -0.04em; font-weight: 300; }
        .thin-border { border-color: rgba(255, 255, 255, 0.04); }
        
        @keyframes data-stream { 0% { stroke-dashoffset: 400; } 100% { stroke-dashoffset: 0; } }
        @keyframes data-stream-reverse { 0% { stroke-dashoffset: -400; } 100% { stroke-dashoffset: 0; } }
        .animate-data-stream { animation: data-stream 3s linear infinite; }
        .animate-data-stream-reverse { animation: data-stream-reverse 4s linear infinite; }

        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 30s linear infinite; display: flex; width: max-content; }
        
        @keyframes ticker { 0% { transform: translateX(0%); } 100% { transform: translateX(-100%); } }
        .animate-ticker { animation: ticker 40s linear infinite; }
        
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(1000%); } }
        .animate-scanline { animation: scanline 8s linear infinite; }

        @keyframes random-blink { 0%, 100% { opacity: 0.1; } 50% { opacity: 1; } }

        @keyframes slow-drift { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(8%, 4%) scale(1.05); } }
        .animate-slow-drift { animation: slow-drift 20s ease-in-out infinite; }
        
        @keyframes slow-drift-reverse { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-8%, -4%) scale(0.95); } }
        .animate-slow-drift-reverse { animation: slow-drift-reverse 25s ease-in-out infinite; }

        @keyframes mesh-pan { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-5%, 5%) scale(1.1); } }
        .animate-mesh-pan { animation: mesh-pan 15s ease-in-out infinite; }
        
        @keyframes mesh-pan-reverse { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(5%, -5%) scale(1.05); } }
        .animate-mesh-pan-reverse { animation: mesh-pan-reverse 18s ease-in-out infinite; }
        
        @keyframes aurora-wave { 0%, 100% { transform: rotate(0deg) scale(1); opacity: 0.3; } 50% { transform: rotate(3deg) scale(1.2); opacity: 0.5; } }
        .animate-aurora { animation: aurora-wave 12s ease-in-out infinite; transform-origin: center bottom; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}} />

      {/* MOBILE MENU OVERLAY */}
      <div className={`fixed inset-0 z-[40] bg-[#050505]/95 backdrop-blur-3xl flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-10'}`}>
         <NoiseBackground />
         <div className="flex flex-col items-center gap-10 z-10">
            {['Home', 'Deployments', 'Signal', 'About Us', 'The Stack'].map((link, i) => (
              <button 
                key={i}
                onClick={() => setCurrentPage(link.toLowerCase().replace(' ', ''))}
                className={`text-2xl font-light tracking-[0.2em] uppercase transition-colors interactive-hover ${currentPage === link.toLowerCase().replace(' ', '') ? 'text-white' : 'text-neutral-500 hover:text-white'}`}
              >
                <DecodeText text={link} />
              </button>
            ))}
         </div>
      </div>

      {/* NAVBAR */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled || isMobileMenuOpen ? 'bg-[#050505]/80 backdrop-blur-2xl border-b thin-border' : 'bg-transparent border-b border-transparent'}`}>
        <nav className={`w-full mx-auto px-[3%] flex items-center justify-between transition-all duration-700 ${isScrolled || isMobileMenuOpen ? 'h-16' : 'h-24'}`}>
          <div 
            onClick={() => setCurrentPage('home')}
            className="text-white text-[11px] font-medium tracking-[0.2em] uppercase flex items-center gap-3 group interactive-hover cursor-none z-50"
          >
            <Command className="w-4 h-4 text-neutral-500 group-hover:rotate-90 transition-transform duration-500" />
            <DecodeText text="SCRAM-RS" className="hidden sm:inline-block" />
          </div>
          
          <div className="flex items-center gap-4 sm:gap-8 z-50">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
               <button 
                 onClick={() => setCurrentPage('home')} 
                 className={`text-[9px] font-medium transition-colors tracking-[0.2em] uppercase interactive-hover ${currentPage === 'home' ? 'text-white' : 'text-neutral-600 hover:text-white'}`}
               >
                  <DecodeText text="Home" />
               </button>
               <button 
                 onClick={() => setCurrentPage('deployments')} 
                 className={`text-[9px] font-medium transition-colors tracking-[0.2em] uppercase interactive-hover ${currentPage === 'deployments' ? 'text-white' : 'text-neutral-600 hover:text-white'}`}
               >
                  <DecodeText text="Deployments" />
               </button>
               <button 
                 onClick={() => setCurrentPage('signal')} 
                 className={`text-[9px] font-medium transition-colors tracking-[0.2em] uppercase interactive-hover ${currentPage === 'signal' ? 'text-white' : 'text-neutral-600 hover:text-white'}`}
               >
                  <DecodeText text="Signal" />
               </button>
               <button 
                 onClick={() => setCurrentPage('aboutus')} 
                 className={`text-[9px] font-medium transition-colors tracking-[0.2em] uppercase interactive-hover ${currentPage === 'aboutus' ? 'text-white' : 'text-neutral-600 hover:text-white'}`}
               >
                  <DecodeText text="About Us" />
               </button>
               <button 
                 onClick={() => setCurrentPage('thestack')} 
                 className={`text-[9px] font-medium transition-colors tracking-[0.2em] uppercase interactive-hover ${currentPage === 'thestack' ? 'text-white' : 'text-neutral-600 hover:text-white'}`}
               >
                  <DecodeText text="The Stack" />
               </button>
            </div>
            
            <button 
              onClick={() => setIsAuditOpen(true)}
              className="text-[9px] font-medium text-white border border-white/10 px-4 sm:px-5 py-2 sm:py-2.5 rounded-[6px] hover:bg-white hover:text-black transition-all duration-500 tracking-[0.2em] uppercase interactive-hover shrink-0"
            >
              <DecodeText text="Request Audit" />
            </button>

            {/* Mobile Nav Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-neutral-400 hover:text-white interactive-hover p-2"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Hide main content while booting to prevent scroll issues */}
      <div className={isBooting ? "opacity-0" : "opacity-100 transition-opacity duration-1000"}>
        <main className="relative flex flex-col items-center w-full" itemScope itemType="https://schema.org/Service">
          <meta itemProp="serviceType" content="AI Operations Consulting" />
          
          {/* ROUTES */}
          {currentPage === 'home' && (
            <>
              {/* 1. HERO SECTION */}
              <section className="relative min-h-[100svh] flex flex-col w-full">
                <HeroBackground />
                
                <div className="flex-1 flex items-center justify-center pt-32 pb-12 w-full relative z-10">
                  <div className="w-full px-[3%] flex flex-col lg:flex-row items-center justify-between mt-[-5vh] gap-12">
                    <div className="max-w-3xl lg:w-3/5 flex flex-col items-start">
                      <FadeIn direction="up">
                        <div className="flex items-center gap-3 mb-10 border border-white/5 rounded-[6px] px-3 py-1 bg-[#111111] w-fit interactive-hover">
                          <span className="w-1 h-1 rounded-full bg-white/80 animate-pulse"></span>
                          <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-[0.3em] pt-[1px] cursor-default">
                            <DecodeText text="Ready for Deployment" />
                          </span>
                        </div>
                      </FadeIn>

                      <FadeIn delay={150} direction="up" duration={1200}>
                        <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] font-light leading-[1.05] tracking-tight mb-8">
                          <ScrollRevealText>
                            Your business<br />
                            is not broken.
                          </ScrollRevealText>
                          <br />
                          <ScrollRevealText revealColor="#777777">Your system is.</ScrollRevealText>
                        </h1>
                      </FadeIn>

                      <FadeIn delay={300} direction="up" className="max-w-xl">
                        <ScrollRevealText as="p" className="text-sm sm:text-[15px] leading-relaxed font-light mb-14" baseColor="#333333" revealColor="#aaaaaa">
                          <span itemProp="description">We rebuild operations into AI-powered systems that eliminate manual work, fix workflows, and scale execution — in 10 to 51 days.</span>
                        </ScrollRevealText>
                      </FadeIn>

                      <FadeIn delay={450} direction="up" className="flex gap-8 items-center">
                        <button 
                          onClick={() => setIsAuditOpen(true)}
                          className="text-[9px] text-white uppercase tracking-[0.3em] font-light hover:text-neutral-300 transition-colors interactive-hover"
                        >
                          Fix My System
                        </button>
                        <div className="w-10 h-[1px] bg-neutral-700"></div>
                        <button 
                          onClick={() => {
                            const archSection = document.getElementById('architecture');
                            if(archSection) archSection.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="text-[9px] text-[#555555] uppercase tracking-[0.3em] font-light hover:text-white transition-colors interactive-hover"
                        >
                          View Architecture
                        </button>
                      </FadeIn>
                    </div>

                    <FadeIn delay={600} direction="left" duration={1500} className="hidden lg:flex lg:w-2/5 justify-end">
                      <HeroSystemAnimation />
                    </FadeIn>
                  </div>
                </div>
                
                <MetricsTicker />
              </section>

              {/* NEW: Operational Decay Section */}
              <section className="relative w-full py-32 bg-[#030303]">
                 <RevealLine orientation="horizontal" className="absolute top-0 left-0" />
                 <div className="relative z-10 w-full mx-auto px-[3%]">
                    <FadeIn className="mb-16">
                      <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-[0.2em] mb-4 block">The Lifecycle of Chaos</span>
                      <h2 className="text-2xl font-light tracking-tight text-white">The 3 Stages of Operational Decay</h2>
                    </FadeIn>
                    <div className="grid md:grid-cols-3 gap-6">
                       {[
                         { step: "01", title: "Human Glue", desc: "You hire great people. They build manual processes (spreadsheets, emails) to hold things together. Growth feels amazing, but margin per employee drops." },
                         { step: "02", title: "The Fragmentation", desc: "You buy 10 different SaaS tools to fix the manual work. None of them talk to each other. The 'Human Glue' now spends their entire day copy-pasting between systems." },
                         { step: "03", title: "Founder as Router", desc: "Exceptions rise. Edge cases break the Zapier flows. Every critical decision is now routed back to the founder's WhatsApp. Scale halts entirely." }
                       ].map((item, i) => (
                         <FadeIn key={i} delay={i*150} className="border thin-border p-8 bg-white/[0.01] rounded-[6px] transition-transform duration-500 hover:-translate-y-2">
                            <div className="text-[10px] font-mono text-cyan-500 mb-6">{item.step}</div>
                            <h3 className="text-lg font-light text-white mb-4">{item.title}</h3>
                            <p className="text-xs text-neutral-500 leading-relaxed font-light">{item.desc}</p>
                         </FadeIn>
                       ))}
                    </div>
                 </div>
              </section>

              {/* 2. THE PROBLEM */}
              <section className="relative w-full py-40 bg-[#020202]">
                <RevealLine orientation="horizontal" className="absolute top-0 left-0" />
                <NoiseBackground />
                <div className="relative z-10 w-full mx-auto px-[3%]">
                  <FadeIn>
                    <h2 className="text-2xl sm:text-4xl font-light mb-32 leading-snug max-w-2xl tracking-tight">
                      <ScrollRevealText>
                        Successful businesses don't hit a wall due to a lack of effort. They plateau because of fragile systems.
                      </ScrollRevealText>
                    </h2>
                  </FadeIn>

                  <div className="grid md:grid-cols-2 gap-x-20 gap-y-20 max-w-5xl">
                    {[
                      { title: "Scattered Data", desc: "Teams running on Excel, WhatsApp, and memory. Nothing connects. Truth is fragmented." },
                      { title: "Blind Operations", desc: "No real-time visibility. Decisions are delayed because nothing is live." },
                      { title: "Slipping Follow-ups", desc: "Leads, tasks, and operational criticals dropping through the cracks silently." },
                      { title: "Manual Bottlenecks", desc: "Founders stuck playing routing switchboards instead of leading the company." }
                    ].map((item, i) => (
                      <div key={i} className="group relative">
                        <RevealLine delay={i * 100} className="mb-8" />
                        <FadeIn delay={i * 150} direction="up">
                          <div className="flex flex-col gap-4">
                            <h3 className="font-light text-base tracking-wide flex items-center gap-3">
                              <span className="w-1.5 h-1.5 rounded-full bg-neutral-800 group-hover:bg-cyan-500 transition-colors duration-500"></span>
                              <ScrollRevealText revealColor="#ffffff">{item.title}</ScrollRevealText>
                            </h3>
                            <ScrollRevealText as="p" className="text-xs sm:text-sm leading-relaxed font-light pl-4.5" revealColor="#a3a3a3">
                              {item.desc}
                            </ScrollRevealText>
                          </div>
                        </FadeIn>
                      </div>
                    ))}
                  </div>
                  
                  <FadeIn delay={400} className="mt-40 border-l border-white/10 pl-6 max-w-2xl">
                    <ScrollRevealText as="p" className="text-sm font-light tracking-wide" revealColor="#ffffff" baseColor="#333333">
                      This is not a people problem.<br/>
                      This is a system bottleneck.
                    </ScrollRevealText>
                  </FadeIn>
                </div>
              </section>

              {/* COST OF INACTION */}
              <section className="relative w-full py-40 bg-[#030303]">
                <RevealLine orientation="horizontal" className="absolute top-0 left-0" />
                <div className="relative z-10 w-full mx-auto px-[3%] grid lg:grid-cols-2 gap-24 items-center">
                   <div>
                     <FadeIn>
                       <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-[0.2em] mb-6 block">The Cost of Human APIs</span>
                       <h2 className="text-3xl sm:text-5xl font-light tracking-tight mb-8">
                         <ScrollRevealText>Operations running on human bandwidth</ScrollRevealText><br/>
                         <ScrollRevealText revealColor="#777777">will eventually collapse.</ScrollRevealText>
                       </h2>
                       <p className="text-sm text-neutral-400 font-light leading-relaxed max-w-xl">
                         If your process requires a human to move data from Tool A to Tool B, you are paying a salary for an API call. Manual routing is the ultimate silent killer of margin. 
                       </p>
                     </FadeIn>
                   </div>
                   <div className="space-y-6 max-w-xl w-full">
                      {[
                        { stat: "30%", text: "of payroll in SMEs is spent on repetitive manual data entry and formatting." },
                        { stat: "7 Days", text: "is the average delay for executive reporting in un-systematized companies." },
                        { stat: "100%", text: "of manual follow-ups will eventually drop at scale. Human error is inevitable." }
                      ].map((item, i) => (
                        <FadeIn key={i} delay={i * 100} className="border thin-border p-6 bg-white/[0.01] flex items-center gap-6 rounded-[6px] transition-transform duration-500 hover:translate-x-2">
                          <div className="text-3xl font-light text-white w-24 shrink-0">{item.stat}</div>
                          <div className="w-[1px] h-8 bg-neutral-800"></div>
                          <span className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">{item.text}</span>
                        </FadeIn>
                      ))}
                   </div>
                </div>
              </section>

              {/* 3. THE SHIFT */}
              <section className="relative w-full py-40 overflow-hidden bg-[#020202]">
                <RevealLine orientation="horizontal" className="absolute top-0 left-0" />
                <GradientMeshBackground />
                <div className="relative z-10 w-full mx-auto px-[3%] grid lg:grid-cols-2 gap-24 items-center">
                  <div>
                    <FadeIn direction="left">
                      <h2 className="text-3xl sm:text-4xl font-light mb-8 leading-snug tracking-tight max-w-lg">
                        <ScrollRevealText>
                          You don't need<br />more people.
                        </ScrollRevealText>
                        <br />
                        <ScrollRevealText revealColor="#777777">You need a system<br />that thinks.</ScrollRevealText>
                      </h2>
                    </FadeIn>
                  </div>
                  
                  <div className="space-y-0 relative max-w-xl">
                    <RevealLine orientation="vertical" className="absolute left-[-2rem] top-0 hidden lg:block" delay={300} />
                    {[
                      ["Manual workflows", "AI-driven flows"],
                      ["Static reporting", "Live operational dashboards"],
                      ["Dropped follow-ups", "Autonomous tracking"],
                      ["Operational chaos", "Structured execution"]
                    ].map((shift, i) => (
                      <div key={i} className="relative group">
                        <RevealLine delay={i * 100} className="absolute top-0 left-0" />
                        <FadeIn delay={i * 150} direction="right" className="flex flex-col sm:flex-row sm:items-center justify-between py-8 transition-transform duration-500 hover:translate-x-4">
                          <ScrollRevealText as="span" className="line-through decoration-neutral-800 text-sm font-light mb-2 sm:mb-0" revealColor="#777777" baseColor="#222222">{shift[0]}</ScrollRevealText>
                          <ArrowRight className="w-3 h-3 text-cyan-500 hidden sm:block opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0" />
                          <ScrollRevealText as="span" className="font-light text-sm" revealColor="#ffffff">{shift[1]}</ScrollRevealText>
                        </FadeIn>
                      </div>
                    ))}
                    <RevealLine className="absolute bottom-0 left-0" delay={400} />
                  </div>
                </div>
              </section>

              {/* CLIENT SIGNAL (TESTIMONIALS) */}
              <section className="relative w-full py-40 bg-[#040404]">
                <RevealLine orientation="horizontal" className="absolute top-0 left-0" />
                <div className="relative z-10 w-full mx-auto px-[3%]">
                   <FadeIn className="mb-24 interactive-hover">
                     <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-[0.2em] mb-6 block">
                       <DecodeText text="Client Telemetry" />
                     </span>
                     <h2 className="text-3xl sm:text-5xl font-light tracking-tight">
                       <ScrollRevealText>Endorsements from the field.</ScrollRevealText>
                     </h2>
                   </FadeIn>

                   <div className="grid md:grid-cols-3 gap-8">
                      {[
                        { quote: "We were about to hire 4 more operations managers just to handle email traffic. The AI architecture eliminated that entire hiring requirement in 6 weeks.", author: "CEO, Global Freight Co." },
                        { quote: "For the first time in three years, I know exactly what is in my warehouses right now without having to call seven different people. The system just handles it.", author: "Founder, Agri-Distribution" },
                        { quote: "The speed at which we can adjust pricing globally is now our biggest competitive advantage. We literally operate faster than our competitors can refresh their sheets.", author: "COO, E-Commerce Aggregator" }
                      ].map((test, i) => (
                        <FadeIn key={i} delay={i * 150}>
                          <GlowCard className="h-full border thin-border p-10 bg-white/[0.01] hover:bg-white/[0.02] transition-colors flex flex-col justify-between interactive-hover rounded-[6px]">
                             <div className="text-3xl text-neutral-700 font-serif mb-6 leading-none">"</div>
                             <p className="text-neutral-400 font-light text-sm leading-relaxed mb-8">
                               {test.quote}
                             </p>
                             <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 bg-cyan-500/50 rounded-full"></div>
                                <span className="text-[10px] font-mono text-white uppercase tracking-widest">{test.author}</span>
                             </div>
                          </GlowCard>
                        </FadeIn>
                      ))}
                   </div>
                </div>
              </section>

              {/* THE 4 LAYER ARCHITECTURE */}
              <section id="architecture" className="relative w-full py-40 bg-[#030303]">
                 <RevealLine orientation="horizontal" className="absolute top-0 left-0" />
                 <div className="relative z-10 w-full mx-auto px-[3%]">
                    <FadeIn className="mb-24">
                      <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-[0.2em] mb-6 block">Structural Integrity</span>
                      <h2 className="text-3xl sm:text-5xl font-light tracking-tight">
                        <ScrollRevealText>The 4-Layer Architecture</ScrollRevealText>
                      </h2>
                    </FadeIn>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {[
                        { icon: Database, name: "Layer 1: Ingestion", desc: "We unify inputs. Forms, emails, legacy ERPs, and APIs push data into a single, centralized truth node." },
                        { icon: Network, name: "Layer 2: Middleware", desc: "The logic core. Webhooks and automation scripts instantly route data without human touch." },
                        { icon: Cpu, name: "Layer 3: AI Brain", desc: "Predictive decision making. LLMs analyze incoming strings, categorize intent, and trigger responses." },
                        { icon: Activity, name: "Layer 4: Interface", desc: "Live dashboards for the executive team. Read-only, real-time, zero-latency visibility into operations." }
                      ].map((LayerItem, i) => {
                        const Icon = LayerItem.icon;
                        return (
                          <FadeIn key={i} delay={i*100} className="border thin-border p-8 bg-white/[0.01] rounded-[6px] h-full flex flex-col group transition-transform duration-500 hover:-translate-y-2">
                             <Icon className="w-6 h-6 text-neutral-500 mb-8 group-hover:text-cyan-500 transition-colors duration-500" />
                             <h3 className="text-white font-medium text-sm mb-4">{LayerItem.name}</h3>
                             <p className="text-neutral-500 font-light text-sm leading-relaxed mt-auto">{LayerItem.desc}</p>
                          </FadeIn>
                        );
                      })}
                    </div>
                 </div>
              </section>

              {/* 4. WHAT YOU ACTUALLY DO */}
              <section className="relative w-full py-40 bg-[#020202]">
                <div className="w-full mx-auto px-[3%]">
                  <FadeIn className="mb-24 interactive-hover max-w-4xl mx-auto">
                    <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-[0.2em] mb-6 block">
                      <DecodeText text="Methodology" />
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-light tracking-tight">
                      <ScrollRevealText>We Build AI Operating Systems</ScrollRevealText>
                    </h2>
                  </FadeIn>

                  <div className="flex flex-col w-full max-w-4xl mx-auto">
                    {[
                      { step: "01", title: "Workflow Reconstruction", desc: "We don't automate a broken process. We map everything from scratch, identify leaks, delays, and redundancies, and rebuild the logic." },
                      { step: "02", title: "System Architecture", desc: "Designing your business like high-performance software. Structuring roles, permissions, data flows, and strict operational dependencies." },
                      { step: "03", title: "AI Integration", desc: "Embedding AI decision layers. Creating internal copilots for your teams, enabling predictive analytics, and automating reactive tasks." },
                      { step: "04", title: "Deployment", desc: "Going live in 10–51 days. We don't build useless prototypes. We deploy real, stress-tested systems that your team uses day one." }
                    ].map((pillar, i) => (
                      <GlowCard key={i} className="group border-t thin-border -mx-6 px-6 interactive-hover">
                        <FadeIn delay={i * 150} direction="up" className="py-12 flex flex-col md:flex-row gap-6 md:gap-12">
                          <div className="text-neutral-700 font-mono text-[10px] pt-1 w-8">{pillar.step}</div>
                          <div className="md:w-1/3">
                            <h3 className="text-lg font-light tracking-wide group-hover:translate-x-2 transition-transform duration-500">
                              <ScrollRevealText revealColor="#ffffff">{pillar.title}</ScrollRevealText>
                            </h3>
                          </div>
                          <div className="md:w-1/2 md:ml-auto">
                            <ScrollRevealText as="p" className="font-light leading-relaxed text-xs sm:text-sm" revealColor="#a3a3a3">
                              {pillar.desc}
                            </ScrollRevealText>
                          </div>
                        </FadeIn>
                      </GlowCard>
                    ))}
                    <RevealLine className="mt-0" />
                  </div>
                </div>
              </section>

              {/* 5. TIMELINE */}
              <section className="relative w-full py-40 overflow-hidden bg-[#030303]">
                <StripedBackground />
                <div className="relative z-10 w-full mx-auto px-[3%] flex flex-col lg:flex-row gap-24">
                  <FadeIn direction="right" className="lg:w-1/3 max-w-lg">
                    <h2 className="text-3xl sm:text-4xl font-light mb-8 leading-snug tracking-tight">
                      <ScrollRevealText>10–51 Days.</ScrollRevealText><br />
                      <ScrollRevealText revealColor="#777777">No Excuses.</ScrollRevealText>
                    </h2>
                    <ScrollRevealText as="p" className="font-light text-xs sm:text-sm leading-relaxed" revealColor="#a3a3a3">
                      You don't wait 6 months to fix operations. Speed of execution is the ultimate differentiator.
                    </ScrollRevealText>
                  </FadeIn>

                  <div className="lg:w-2/3 relative max-w-3xl">
                    <RevealLine orientation="vertical" delay={200} className="absolute left-[3px] top-2 bottom-2" />
                    
                    <div className="space-y-16">
                      {[
                        { day: "Day 0–3", title: "Chaos Audit", desc: "Deep dive system mapping. Finding exactly where you bleed time and money." },
                        { day: "Day 4–15", title: "Architecture & Flows", desc: "Building the underlying database, logic, and rewriting operational rules." },
                        { day: "Day 16–35", title: "Build & AI Layer", desc: "Connecting the tech stack, injecting AI decision models, building live dashboards." },
                        { day: "Day 36–51", title: "Deployment", desc: "System goes live. Team training. Rapid optimization based on real usage." }
                      ].map((phase, i) => (
                        <FadeIn key={i} delay={i * 200 + 300} direction="left" className="relative pl-10 group">
                          <div className="absolute left-[-1px] top-1.5 w-2 h-2 rounded-full bg-[#050505] border border-neutral-700 group-hover:border-cyan-500 group-hover:scale-150 transition-all duration-500"></div>
                          <div className="text-[10px] font-mono text-neutral-600 tracking-widest uppercase mb-3">{phase.day}</div>
                          <h3 className="text-sm font-light tracking-wide mb-2">
                            <ScrollRevealText revealColor="#ffffff">{phase.title}</ScrollRevealText>
                          </h3>
                          <ScrollRevealText as="p" className="font-light text-xs sm:text-sm leading-relaxed max-w-sm" revealColor="#a3a3a3">
                            {phase.desc}
                          </ScrollRevealText>
                        </FadeIn>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

          {currentPage === 'aboutus' && <AboutPage onOpenAudit={() => setIsAuditOpen(true)} />}
          {currentPage === 'deployments' && <DeploymentsPage onOpenAudit={() => setIsAuditOpen(true)} />}
          {currentPage === 'signal' && <SignalPage onOpenAudit={() => setIsAuditOpen(true)} />}
          {currentPage === 'thestack' && <StackPage onOpenAudit={() => setIsAuditOpen(true)} />}
          
          <PreFooter onOpenAudit={() => setIsAuditOpen(true)} />
          <AnimatedFooter setCurrentPage={setCurrentPage} />
          
        </main>
      </div>
    </div>
  );
}
