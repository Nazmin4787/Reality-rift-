import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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

  return (
    <div 
        className={`crt-container ${glitch ? 'glitch-active' : ''}`}
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
            {[...Array(30)].map((_, i) => (
                <div key={i} className="spore" style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${10 + Math.random() * 10}s`
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
                <h1 
                    className="main-title" 
                    data-text="REALITY RIFT"
                    onMouseEnter={playWhisper}
                    onMouseLeave={stopWhisper}
                >
                    REALITY RIFT
                </h1>
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
                    onClick={() => navigate('/map')}
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
