const EiffelTower = () => {
  // More detailed rim lights along the tower edges - like the real Eiffel Tower's golden lighting
  const rimLights = [
    // Left leg outer rim
    { x: 15, y: 390 }, { x: 20, y: 370 }, { x: 25, y: 350 }, { x: 30, y: 330 },
    { x: 35, y: 310 }, { x: 40, y: 290 }, { x: 45, y: 270 }, { x: 50, y: 250 },
    { x: 55, y: 230 }, { x: 60, y: 210 }, { x: 65, y: 190 }, { x: 70, y: 170 },
    { x: 75, y: 150 }, { x: 80, y: 130 }, { x: 85, y: 110 }, { x: 90, y: 90 },
    // Left leg inner rim
    { x: 45, y: 390 }, { x: 48, y: 370 }, { x: 52, y: 350 }, { x: 56, y: 330 },
    { x: 60, y: 310 }, { x: 63, y: 290 }, { x: 66, y: 270 }, { x: 69, y: 250 },
    // Right leg outer rim
    { x: 185, y: 390 }, { x: 180, y: 370 }, { x: 175, y: 350 }, { x: 170, y: 330 },
    { x: 165, y: 310 }, { x: 160, y: 290 }, { x: 155, y: 270 }, { x: 150, y: 250 },
    { x: 145, y: 230 }, { x: 140, y: 210 }, { x: 135, y: 190 }, { x: 130, y: 170 },
    { x: 125, y: 150 }, { x: 120, y: 130 }, { x: 115, y: 110 }, { x: 110, y: 90 },
    // Right leg inner rim
    { x: 155, y: 390 }, { x: 152, y: 370 }, { x: 148, y: 350 }, { x: 144, y: 330 },
    { x: 140, y: 310 }, { x: 137, y: 290 }, { x: 134, y: 270 }, { x: 131, y: 250 },
    // Spire lights
    { x: 100, y: 80 }, { x: 100, y: 65 }, { x: 100, y: 50 }, { x: 100, y: 35 }, { x: 100, y: 20 }, { x: 100, y: 8 },
    // Platform 1 (bottom) horizontal lights
    { x: 50, y: 280 }, { x: 65, y: 280 }, { x: 80, y: 280 }, { x: 100, y: 280 }, { x: 120, y: 280 }, { x: 135, y: 280 }, { x: 150, y: 280 },
    // Platform 2 (middle) horizontal lights
    { x: 75, y: 165 }, { x: 88, y: 165 }, { x: 100, y: 165 }, { x: 112, y: 165 }, { x: 125, y: 165 },
    // Platform 3 (top) horizontal lights
    { x: 92, y: 88 }, { x: 100, y: 88 }, { x: 108, y: 88 },
  ];

  // Cross-bracing lights
  const crossLights = [
    // Lower section cross lights
    { x: 55, y: 340 }, { x: 75, y: 320 }, { x: 90, y: 300 },
    { x: 145, y: 340 }, { x: 125, y: 320 }, { x: 110, y: 300 },
  ];

  return (
    <div className="fixed inset-0 z-[5] pointer-events-none flex items-end justify-center pb-4 md:pb-8">
      {/* Reduced glow backdrops for better text visibility */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[400px] h-[500px]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 85%, hsl(40 100% 65% / 0.08) 0%, hsl(35 100% 50% / 0.04) 35%, transparent 60%)',
          filter: 'blur(30px)',
        }}
      />
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[250px] h-[400px]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 80%, hsl(45 100% 70% / 0.12) 0%, transparent 50%)',
          filter: 'blur(20px)',
        }}
      />

      {/* SVG Eiffel Tower - more detailed and realistic */}
      <svg
        viewBox="0 0 200 400"
        className="w-[200px] h-[400px] md:w-[260px] md:h-[520px] relative z-10"
        style={{
          filter: 'drop-shadow(0 0 8px hsl(45 100% 60% / 0.4)) drop-shadow(0 0 15px hsl(35 100% 50% / 0.25))',
        }}
      >
        <defs>
          {/* Realistic golden gradient like the actual tower */}
          <linearGradient id="towerGold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF3B0" />
            <stop offset="20%" stopColor="#FFE066" />
            <stop offset="40%" stopColor="#FFD700" />
            <stop offset="60%" stopColor="#DAA520" />
            <stop offset="80%" stopColor="#B8860B" />
            <stop offset="100%" stopColor="#8B7500" />
          </linearGradient>
          
          {/* Secondary gradient for depth */}
          <linearGradient id="towerGoldDark" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#CC9900" />
            <stop offset="50%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#CC9900" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Stronger glow for accent elements */}
          <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Main tower structure - more realistic proportions */}
        <g stroke="url(#towerGold)" strokeWidth="1.2" fill="none" filter="url(#glow)">
          {/* Four main legs - curved like real tower */}
          <path d="M 15 400 Q 30 350 40 300 Q 55 240 65 200 Q 75 160 85 120 Q 92 90 100 55" strokeWidth="2.5" />
          <path d="M 45 400 Q 55 350 62 300 Q 70 250 77 210 Q 85 170 92 130 Q 96 100 100 55" strokeWidth="1.8" />
          <path d="M 155 400 Q 145 350 138 300 Q 130 250 123 210 Q 115 170 108 130 Q 104 100 100 55" strokeWidth="1.8" />
          <path d="M 185 400 Q 170 350 160 300 Q 145 240 135 200 Q 125 160 115 120 Q 108 90 100 55" strokeWidth="2.5" />
          
          {/* First platform (base) - the iconic arch */}
          <path d="M 35 290 Q 100 340 165 290" strokeWidth="3" stroke="url(#towerGoldDark)" />
          <rect x="35" y="275" width="130" height="18" fill="url(#towerGold)" fillOpacity="0.2" stroke="url(#towerGold)" strokeWidth="1" />
          
          {/* Horizontal cross-beams */}
          <line x1="25" y1="360" x2="175" y2="360" strokeWidth="1.5" />
          <line x1="32" y1="330" x2="168" y2="330" strokeWidth="1.5" />
          <line x1="58" y1="240" x2="142" y2="240" strokeWidth="1.2" />
          <line x1="68" y1="210" x2="132" y2="210" strokeWidth="1.2" />
          
          {/* Second platform (middle observation deck) */}
          <rect x="70" y="160" width="60" height="12" fill="url(#towerGold)" fillOpacity="0.3" stroke="url(#towerGold)" strokeWidth="1" />
          <line x1="78" y1="145" x2="122" y2="145" strokeWidth="1" />
          <line x1="82" y1="130" x2="118" y2="130" strokeWidth="1" />
          
          {/* Third platform (top observation deck) */}
          <rect x="88" y="85" width="24" height="8" fill="url(#towerGold)" fillOpacity="0.4" stroke="url(#towerGold)" strokeWidth="1" />
          
          {/* Spire/antenna */}
          <line x1="100" y1="55" x2="100" y2="5" strokeWidth="2" />
          <circle cx="100" cy="5" r="2" fill="#FFE066" />
          
          {/* Decorative lattice work - lower section */}
          <path d="M 30 360 L 50 330 M 50 360 L 30 330" strokeWidth="0.6" opacity="0.8" />
          <path d="M 150 360 L 170 330 M 170 360 L 150 330" strokeWidth="0.6" opacity="0.8" />
          <path d="M 40 330 L 55 300 M 55 330 L 40 300" strokeWidth="0.6" opacity="0.8" />
          <path d="M 145 330 L 160 300 M 160 330 L 145 300" strokeWidth="0.6" opacity="0.8" />
          
          {/* Decorative lattice work - middle section */}
          <path d="M 58 240 L 68 210 M 68 240 L 58 210" strokeWidth="0.5" opacity="0.7" />
          <path d="M 132 240 L 142 210 M 142 240 L 132 210" strokeWidth="0.5" opacity="0.7" />
          
          {/* Inner structural supports */}
          <path d="M 60 290 L 80 240" strokeWidth="0.8" />
          <path d="M 140 290 L 120 240" strokeWidth="0.8" />
          <path d="M 75 200 L 85 165" strokeWidth="0.7" />
          <path d="M 125 200 L 115 165" strokeWidth="0.7" />
        </g>

        {/* Rim lights along the edges - like the real golden tower */}
        {rimLights.map((light, i) => (
          <circle
            key={`rim-${i}`}
            cx={light.x}
            cy={light.y}
            r="1.5"
            fill="#FFF8DC"
            style={{
              filter: 'drop-shadow(0 0 3px #FFD700) drop-shadow(0 0 6px #FFA500)',
              animation: `twinkle ${1.5 + (i % 7) * 0.2}s ease-in-out ${(i * 0.08) % 1.5}s infinite`,
            }}
          />
        ))}

        {/* Cross-bracing lights */}
        {crossLights.map((light, i) => (
          <circle
            key={`cross-${i}`}
            cx={light.x}
            cy={light.y}
            r="1.2"
            fill="#FFE4B5"
            style={{
              filter: 'drop-shadow(0 0 3px #FFD700)',
              animation: `twinkle ${2 + (i % 4) * 0.3}s ease-in-out ${(i * 0.15)}s infinite`,
            }}
          />
        ))}

        {/* Key beacon lights - brighter accent lights */}
        {[
          { cx: 100, cy: 5, r: 3 },   // Top beacon
          { cx: 100, cy: 55, r: 2.5 },  // Top platform center
          { cx: 100, cy: 88, r: 2.2 },  // Upper platform
          { cx: 100, cy: 165, r: 2.5 }, // Middle platform center
          { cx: 70, cy: 165, r: 2 },   // Middle platform left
          { cx: 130, cy: 165, r: 2 },  // Middle platform right
          { cx: 100, cy: 280, r: 2.5 }, // Lower platform center
          { cx: 35, cy: 290, r: 2 },   // Arch left
          { cx: 165, cy: 290, r: 2 },  // Arch right
        ].map((light, i) => (
          <circle
            key={`beacon-${i}`}
            cx={light.cx}
            cy={light.cy}
            r={light.r}
            fill="#FFFACD"
            filter="url(#strongGlow)"
            style={{
              animation: `twinkle ${1.8 + Math.random() * 0.5}s ease-in-out ${Math.random() * 1.5}s infinite`,
            }}
          />
        ))}

        {/* Sparkling effect lights - simulating the famous 5-minute sparkle */}
        {Array.from({ length: 30 }).map((_, i) => {
          const x = 30 + Math.random() * 140;
          const y = 100 + Math.random() * 280;
          return (
            <circle
              key={`sparkle-${i}`}
              cx={x}
              cy={y}
              r="0.8"
              fill="#FFFFFF"
              opacity="0"
              style={{
                animation: `sparkle ${0.8 + Math.random() * 0.4}s ease-in-out ${Math.random() * 5}s infinite`,
              }}
            />
          );
        })}
      </svg>

      {/* CSS for sparkle animation */}
      <style>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.9; }
        }
      `}</style>
    </div>
  );
};

export default EiffelTower;