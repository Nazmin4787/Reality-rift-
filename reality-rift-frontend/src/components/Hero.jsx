import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [glitch, setGlitch] = useState(false);
  const [mouseSpeed, setMouseSpeed] = useState(0);
  const [isIdle, setIsIdle] = useState(false);
  const [time, setTime] = useState(new Date());
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [creepyText, setCreepyText] = useState('');
  const [isCracking, setIsCracking] = useState(false);
  const [showThunder, setShowThunder] = useState(false);

  const handleEnterVoid = () => {
    setShowThunder(true);
    setIsCracking(true);
    setTimeout(() => {
      navigate('/map');
    }, 2000);
  };

  // Random Glitch Message Effect
  useEffect(() => {
    const messages = ["SIGNAL LOST…", "REALITY CORRUPTED…", "CONNECTION TO REAL WORLD: WEAK…"];
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        setCreepyText(messages[Math.floor(Math.random() * messages.length)]);
        setTimeout(() => setCreepyText(''), 2000);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Mouse tracking for speed and idle
  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let lastTime = Date.now();
    let idleTimer;

    const resetIdle = () => {
      setIsIdle(false);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setIsIdle(true), 5000); // Reduced to 5s for easier visibility
    };

    const handleMouseMove = (e) => {
      const now = Date.now();
      const dt = now - lastTime;
      if (dt > 50) { // Throttle
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        const speed = Math.sqrt(dx*dx + dy*dy) / dt;
        setMouseSpeed(speed);
        lastX = e.clientX;
        lastY = e.clientY;
        lastTime = now;
      }
      setMousePos({ x: e.clientX, y: e.clientY });
      resetIdle();
    };

    window.addEventListener('mousemove', handleMouseMove);
    resetIdle(); // Start timer

    // Clock interval
    const clockInterval = setInterval(() => setTime(new Date()), 1000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(idleTimer);
      clearInterval(clockInterval);
    };
  }, []);

  // Random glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const playWhisper = () => {
    if (audioRef.current) {
        audioRef.current.volume = 0.2;
        audioRef.current.playbackRate = 0.8; // Slow/Deep
        audioRef.current.play().catch(e => console.log("Audio play failed", e));
    }
  };

  const stopWhisper = () => {
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    }
  };

  const spores = React.useMemo(() => {
    const shapes = [
      'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', // Square/Rect
      'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)', // Pentagon
      'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)', // Trapezoid
      'polygon(0% 0%, 100% 20%, 80% 100%, 20% 80%)', // Irregular
      'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)' // Octagon-ish
    ];
    
    return [...Array(100)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 20}s`,
      animationDuration: `${10 + Math.random() * 20}s`,
      width: `${3 + Math.random() * 5}px`, // Increased size (3px base)
      height: `${3 + Math.random() * 5}px`, // Independent height
      opacity: 0.3 + Math.random() * 0.5,
      clipPath: shapes[Math.floor(Math.random() * shapes.length)]
    }));
  }, []);

  return (
    <div 
        className={`crt-container ${glitch ? 'glitch-active' : ''} ${showThunder ? 'thunder-shake' : ''}`}
        style={{
            '--mouse-x': `${mousePos.x}px`,
            '--mouse-y': `${mousePos.y}px`
        }}
    >
      <audio ref={audioRef} src="/audio/whisper.mp3" />
      <div className="scanlines"></div>
      <div className="vignette"></div>
      <div className="fog-layer"></div>
      <div className="shadow-figure"></div>
      <div className="glitch-overlay"></div>
      
      <div className="particles"></div>

      <div className="custom-cursor"></div>
      <div className="cursor-trail"></div>
      
      {/* Vecna Clock Background */}
      <div className="vecna-clock visible">
        <div className="clock-face">
            <div className="clock-hand hour"></div>
            <div className="clock-hand minute"></div>
            <div className="clock-center"></div>
        </div>
      </div>

      {/* Creepy Flash Text */}
      {creepyText && <div className="creepy-overlay">{creepyText}</div>}

      <div className="screen-content title-screen-mode">
        
        {/* Floating Spores (Upside Down Atmosphere) */}
        <div className="spores-container">
            {spores.map((spore) => (
                <div key={spore.id} className="spore" style={{
                    left: spore.left,
                    top: spore.top,
                    width: spore.width,
                    height: spore.height,
                    opacity: spore.opacity,
                    animationDelay: spore.animationDelay,
                    animationDuration: spore.animationDuration,
                    clipPath: spore.clipPath
                }} />
            ))}
        </div>

        {/* Corner Decor Elements */}
        <div className="corner top-left">
          <span className="label red-flicker upside-down">SIGNAL: LOST</span>
          <div className="real-time-clock">{time.toLocaleTimeString()}</div>
        </div>
        <div className="corner top-right">
          <span className="label cyan-text">LOC: HAWKINS_GATE</span>
        </div>
        <div className="corner bottom-left">
          <span className="label orange-text">HEURISTIC_ENGINE: ADAPTIVE</span>
          
          {/* Level 1: Signal Monitor */}
          <div className="signal-monitor">
            <div className="label-small">SIGNAL_STRENGTH</div>
            <div className="signal-bars">
                <div className="bar b1"></div>
                <div className="bar b2"></div>
                <div className="bar b3"></div>
                <div className="bar b4"></div>
                <div className="bar b5"></div>
            </div>
          </div>
        </div>
        <div className="corner bottom-right">
          <span className="label red-text">V1.09b</span>
          
          {/* Neural Activity Wave */}
          <div className="neural-wave-container">
            <div className="label-small">COGNITIVE_SENSORS: ACTIVE</div>
            <svg className="wave-svg" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path 
                    d="M0 10 Q 25 20, 50 10 T 100 10" 
                    fill="none" 
                    stroke="#0ff" 
                    strokeWidth="2" 
                    className={mouseSpeed > 0.5 ? 'high-activity' : 'low-activity'}
                />
            </svg>
          </div>
        </div>

        {/* Christmas Lights Decoration */}
        <div className="christmas-lights">
            <div className="light red"></div>
            <div className="light green"></div>
            <div className="light yellow"></div>
            <div className="light blue"></div>
            <div className="light red"></div>
            <div className="light green"></div>
            <div className="light yellow"></div>
            <div className="light blue"></div>
        </div>

        {/* Main Title Section */}
        <div className="center-stage">
            <div className="title-wrapper">
                <motion.h1 
                    className="main-title" 
                    data-text="REALITY RIFT"
                    onMouseEnter={playWhisper}
                    onMouseLeave={stopWhisper}
                    animate={{ 
                        rotateX: [10, -5, 10],
                        rotateY: [-10, 5, -10],
                        z: [0, 30, 0],
                        textShadow: [
                            "3px 3px 0px #3d0000, 0 0 5px var(--crt-red), 0 0 15px var(--crt-red)",
                            "-3px 3px 0px #3d0000, 0 0 10px var(--crt-red), 0 0 20px var(--crt-red)",
                            "3px 3px 0px #3d0000, 0 0 5px var(--crt-red), 0 0 15px var(--crt-red)"
                        ]
                    }}
                    transition={{
                        duration: 6,
                        ease: "easeInOut",
                        repeat: Infinity,
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    REALITY RIFT
                </motion.h1>
                <div className="rift-tear"></div>
            </div>
            
            <div className="rift-separator">
                <div className="line"></div>
                <div className="symbol">❖</div>
                <div className="line"></div>
            </div>

            <p className="tagline">WHERE DIMENSIONS COLLIDE</p>

            {/* Level Ticker */}
            <div className="level-ticker">
                <span className="ticker-label">NEXT DESTINATION:</span>
                <div className="ticker-text-wrapper">
                    <span className="ticker-text">HAWKINS LAB /// STARCOURT MALL /// THE UPSIDE DOWN /// CREEL HOUSE</span>
                </div>
            </div>

            {/* Level 4: Paradox Doors Icons */}
            <div className="paradox-doors-preview">
                <div className="door-icon red" title="Instinct Trap"></div>
                <div className="door-icon blue" title="Distraction"></div>
                <div className="door-icon green" title="Hidden Correct"></div>
            </div>

            {/* Central Action */}
            <div className="action-container">
                <div className="disclaimer">By entering, you consent to cognitive monitoring.</div>
                <button 
                    className="start-game-btn" 
                    onClick={handleEnterVoid}
                    style={{
                        '--mouse-x': `${mousePos.x}px`,
                        '--mouse-y': `${mousePos.y}px`
                    }}
                >
                    <span className="btn-text">ENTER THE VOID</span>
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
