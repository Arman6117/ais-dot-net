/* ═══════════════════════════════════════════════════════════
   INLINE SVG ANIMATIONS — zero external deps, always render
   ═══════════════════════════════════════════════════════════ */

  export  const ThesisAnimation = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.9"/>
        </linearGradient>
        <filter id="tglow"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* Document stack */}
      <rect x="55" y="45" width="90" height="115" rx="6" fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5"/>
      <rect x="60" y="50" width="90" height="115" rx="6" fill="rgba(59,130,246,0.06)" stroke="rgba(59,130,246,0.2)" strokeWidth="1.5"/>
      <rect x="65" y="55" width="90" height="115" rx="6" fill="rgba(15,10,40,0.9)" stroke="rgba(59,130,246,0.5)" strokeWidth="1.5"/>
      {/* Lines of text */}
      {[0,1,2,3,4,5,6,7].map(i => (
        <g key={i}>
          <rect x="78" y={74 + i*12} rx="2" height="4" fill="rgba(59,130,246,0.5)" width="0">
            <animate attributeName="width" values="0;62;62" dur="2s" begin={`${i*0.18}s`} fill="freeze"/>
            <animate attributeName="opacity" values="0.3;0.8;0.5;0.8" dur="3s" begin={`${i*0.2 + 2}s`} repeatCount="indefinite"/>
          </rect>
        </g>
      ))}
      {/* Glowing title line */}
      <rect x="78" y="65" width="50" height="5" rx="2.5" fill="url(#tg1)" filter="url(#tglow)">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
      </rect>
      {/* Pen cursor */}
      <g filter="url(#tglow)">
        <line x1="130" y1="138" x2="145" y2="123" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round">
          <animateTransform attributeName="transform" type="translate" values="0,0;-8,-8;-8,-8;0,0" dur="3s" repeatCount="indefinite"/>
        </line>
        <circle cx="130" cy="138" r="3" fill="#06B6D4">
          <animateTransform attributeName="transform" type="translate" values="0,0;-8,-8;-8,-8;0,0" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite"/>
        </circle>
      </g>
      {/* Floating particles */}
      {[{cx:85,cy:40,r:2},{cx:155,cy:65,r:1.5},{cx:160,cy:140,r:2},{cx:70,cy:155,r:1.5}].map((p,i)=>(
        <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill="#3B82F6" opacity="0.5">
          <animate attributeName="opacity" values="0.2;0.8;0.2" dur={`${2+i*0.5}s`} repeatCount="indefinite"/>
          <animate attributeName="cy" values={`${p.cy};${p.cy-6};${p.cy}`} dur={`${2.5+i*0.4}s`} repeatCount="indefinite"/>
        </circle>
      ))}
    </svg>
  );
  
 export const DissertationAnimation = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1"/><stop offset="100%" stopColor="#3B82F6"/>
        </linearGradient>
        <filter id="dglow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* Mortar board */}
      <ellipse cx="100" cy="85" rx="38" ry="8" fill="url(#dg1)" opacity="0.9" filter="url(#dglow)">
        <animate attributeName="ry" values="8;10;8" dur="3s" repeatCount="indefinite"/>
      </ellipse>
      <rect x="80" y="63" width="40" height="22" rx="3" fill="rgba(99,102,241,0.15)" stroke="rgba(99,102,241,0.5)" strokeWidth="1.5"/>
      <polygon points="100,50 62,85 138,85" fill="rgba(99,102,241,0.25)" stroke="rgba(99,102,241,0.6)" strokeWidth="1.5"/>
      <polygon points="100,50 62,85 138,85" fill="url(#dg1)" opacity="0.7"/>
      {/* Tassel */}
      <line x1="138" y1="85" x2="148" y2="110" stroke="#6366F1" strokeWidth="2">
        <animate attributeName="x2" values="148;152;144;148" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="y2" values="110;106;114;110" dur="2s" repeatCount="indefinite"/>
      </line>
      <circle cx="148" cy="112" r="4" fill="#6366F1" filter="url(#dglow)">
        <animate attributeName="cx" values="148;152;144;148" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="cy" values="112;108;116;112" dur="2s" repeatCount="indefinite"/>
      </circle>
      {/* Scroll below */}
      <rect x="68" y="105" width="64" height="44" rx="4" fill="rgba(15,10,40,0.9)" stroke="rgba(99,102,241,0.4)" strokeWidth="1.5"/>
      <ellipse cx="68" cy="127" rx="6" ry="22" fill="rgba(99,102,241,0.2)" stroke="rgba(99,102,241,0.4)" strokeWidth="1.5"/>
      <ellipse cx="132" cy="127" rx="6" ry="22" fill="rgba(99,102,241,0.2)" stroke="rgba(99,102,241,0.4)" strokeWidth="1.5"/>
      {[0,1,2].map(i=>(
        <rect key={i} x="80" y={114+i*10} width={i===1?32:24} height="3" rx="1.5" fill="rgba(99,102,241,0.6)">
          <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" begin={`${i*0.3}s`} repeatCount="indefinite"/>
        </rect>
      ))}
      {/* Stars */}
      {[{x:55,y:55},{x:152,y:60},{x:50,y:145},{x:158,y:148}].map((s,i)=>(
        <g key={i} transform={`translate(${s.x},${s.y})`}>
          <circle r="2" fill="#6366F1" opacity="0.6">
            <animate attributeName="r" values="2;3.5;2" dur={`${1.5+i*0.4}s`} repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.3;0.9;0.3" dur={`${1.5+i*0.4}s`} repeatCount="indefinite"/>
          </circle>
        </g>
      ))}
    </svg>
  );
  
  export const ResearchAnimation = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rg1" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#8B5CF6"/><stop offset="100%" stopColor="#A78BFA"/>
        </linearGradient>
        <filter id="rglow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* Bar chart */}
      {[{x:55,h:40,d:"0s"},{x:80,h:65,d:"0.2s"},{x:105,h:50,d:"0.4s"},{x:130,h:80,d:"0.6s"}].map((b,i)=>(
        <g key={i}>
          <rect x={b.x} y={145-b.h} width="18" height={b.h} rx="3" fill="rgba(139,92,246,0.15)" stroke="rgba(139,92,246,0.3)" strokeWidth="1"/>
          <rect x={b.x} y="145" width="18" height="0" rx="3" fill="url(#rg1)" opacity="0.85">
            <animate attributeName="height" values={`0;${b.h};${b.h}`} dur="1.5s" begin={b.d} fill="freeze"/>
            <animate attributeName="y" values={`145;${145-b.h};${145-b.h}`} dur="1.5s" begin={b.d} fill="freeze"/>
            <animate attributeName="opacity" values="0.6;0.95;0.7;0.95" dur="3s" begin={`${parseFloat(b.d)+1.5}s`} repeatCount="indefinite"/>
          </rect>
        </g>
      ))}
      {/* X axis */}
      <line x1="48" y1="145" x2="158" y2="145" stroke="rgba(139,92,246,0.4)" strokeWidth="1.5"/>
      {/* Trend line */}
      <polyline points="64,128 89,102 114,118 148,78" fill="none" stroke="#A78BFA" strokeWidth="2" strokeDasharray="150" strokeDashoffset="150" filter="url(#rglow)">
        <animate attributeName="stroke-dashoffset" values="150;0" dur="2s" begin="1s" fill="freeze"/>
      </polyline>
      {[{cx:64,cy:128},{cx:89,cy:102},{cx:114,cy:118},{cx:148,cy:78}].map((p,i)=>(
        <circle key={i} cx={p.cx} cy={p.cy} r="4" fill="#8B5CF6" filter="url(#rglow)" opacity="0">
          <animate attributeName="opacity" values="0;1" dur="0.3s" begin={`${1.4+i*0.3}s`} fill="freeze"/>
          <animate attributeName="r" values="4;6;4" dur="2s" begin={`${1.7+i*0.3}s`} repeatCount="indefinite"/>
        </circle>
      ))}
      {/* Magnifier */}
      <circle cx="152" cy="58" r="14" fill="none" stroke="rgba(139,92,246,0.5)" strokeWidth="2"/>
      <circle cx="152" cy="58" r="9" fill="rgba(139,92,246,0.08)"/>
      <line x1="162" y1="68" x2="170" y2="76" stroke="rgba(139,92,246,0.7)" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="152" cy="58" r="14" fill="none" stroke="#8B5CF6" strokeWidth="1" opacity="0.5">
        <animate attributeName="r" values="14;17;14" dur="2.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite"/>
      </circle>
    </svg>
  );
  
  export const ArticleAnimation = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ag1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A855F7"/><stop offset="100%" stopColor="#EC4899"/>
        </linearGradient>
        <filter id="aglow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* Newspaper-style layout */}
      <rect x="45" y="40" width="110" height="130" rx="5" fill="rgba(15,10,40,0.9)" stroke="rgba(168,85,247,0.4)" strokeWidth="1.5"/>
      {/* Header bar */}
      <rect x="45" y="40" width="110" height="18" rx="5" fill="url(#ag1)" opacity="0.8"/>
      <rect x="45" y="52" width="110" height="6" fill="url(#ag1)" opacity="0.8"/>
      {/* Two column layout */}
      <line x1="100" y1="64" x2="100" y2="165" stroke="rgba(168,85,247,0.2)" strokeWidth="1"/>
      {/* Left column lines */}
      {[0,1,2,3,4,5,6].map(i=>(
        <rect key={i} x="52" y={69+i*13} width={i%3===0?38:i%2===0?32:36} height="4" rx="2" fill="rgba(168,85,247,0.4)">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${2+i*0.2}s`} begin={`${i*0.15}s`} repeatCount="indefinite"/>
        </rect>
      ))}
      {/* Right column image box */}
      <rect x="106" y="68" width="42" height="38" rx="3" fill="rgba(168,85,247,0.1)" stroke="rgba(168,85,247,0.3)" strokeWidth="1"/>
      <circle cx="127" cy="80" r="8" fill="rgba(168,85,247,0.2)" stroke="rgba(168,85,247,0.4)" strokeWidth="1">
        <animate attributeName="r" values="8;10;8" dur="3s" repeatCount="indefinite"/>
      </circle>
      <polyline points="106,100 117,90 124,95 133,83 148,106" fill="none" stroke="rgba(168,85,247,0.6)" strokeWidth="1.5"/>
      {[0,1,2,3].map(i=>(
        <rect key={i} x="106" y={112+i*11} width={i%2===0?40:34} height="4" rx="2" fill="rgba(168,85,247,0.4)">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${2+i*0.2}s`} begin={`${0.8+i*0.15}s`} repeatCount="indefinite"/>
        </rect>
      ))}
      {/* Sparkle decoration */}
      {[{x:40,y:38},{x:162,y:42},{x:160,y:168},{x:38,y:165}].map((s,i)=>(
        <g key={i} transform={`translate(${s.x},${s.y})`} filter="url(#aglow)">
          <circle r="2.5" fill="#A855F7" opacity="0.7">
            <animate attributeName="opacity" values="0.2;0.9;0.2" dur={`${1.8+i*0.4}s`} repeatCount="indefinite"/>
          </circle>
        </g>
      ))}
    </svg>
  );
  
  export const BiographyAnimation = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0EA5E9"/><stop offset="100%" stopColor="#6366F1"/>
        </linearGradient>
        <clipPath id="bclip"><circle cx="100" cy="75" r="32"/></clipPath>
        <filter id="bglow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* Profile card */}
      <rect x="50" y="45" width="100" height="120" rx="10" fill="rgba(15,10,40,0.95)" stroke="rgba(14,165,233,0.4)" strokeWidth="1.5"/>
      {/* Avatar circle */}
      <circle cx="100" cy="75" r="32" fill="rgba(14,165,233,0.1)" stroke="rgba(14,165,233,0.5)" strokeWidth="2"/>
      <circle cx="100" cy="68" r="14" fill="rgba(14,165,233,0.3)" stroke="rgba(14,165,233,0.6)" strokeWidth="1.5"/>
      <ellipse cx="100" cy="94" rx="20" ry="12" fill="rgba(14,165,233,0.2)" stroke="rgba(14,165,233,0.4)" strokeWidth="1"/>
      {/* Pulse rings */}
      {[38,46].map((r,i)=>(
        <circle key={i} cx="100" cy="75" r={r} fill="none" stroke="rgba(14,165,233,0.3)" strokeWidth="1">
          <animate attributeName="r" values={`${r};${r+6};${r}`} dur={`${2.5+i*0.5}s`} repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.4;0;0.4" dur={`${2.5+i*0.5}s`} repeatCount="indefinite"/>
        </circle>
      ))}
      {/* Name + bio lines */}
      <rect x="70" y="115" width="60" height="6" rx="3" fill="url(#bg1)" opacity="0.9">
        <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite"/>
      </rect>
      {[0,1,2].map(i=>(
        <rect key={i} x="60" y={128+i*10} width={i===1?60:50} height="3.5" rx="1.75" fill="rgba(14,165,233,0.45)">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur={`${2+i*0.3}s`} begin={`${i*0.2}s`} repeatCount="indefinite"/>
        </rect>
      ))}
      {/* Stars */}
      {[{x:62,y:160},{x:100,y:163},{x:138,y:160}].map((s,i)=>(
        <polygon key={i} points={`${s.x},${s.y-5} ${s.x+2},${s.y-1} ${s.x+5},${s.y-1} ${s.x+3},${s.y+2} ${s.x+4},${s.y+5} ${s.x},${s.y+3} ${s.x-4},${s.y+5} ${s.x-3},${s.y+2} ${s.x-5},${s.y-1} ${s.x-2},${s.y-1}`}
          fill="rgba(14,165,233,0.7)" filter="url(#bglow)">
          <animate attributeName="opacity" values="0.4;1;0.4" dur={`${1.5+i*0.3}s`} begin={`${i*0.4}s`} repeatCount="indefinite"/>
        </polygon>
      ))}
    </svg>
  );
  
  export const BusinessAnimation = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bng1" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22D3EE"/><stop offset="100%" stopColor="#14B8A6"/>
        </linearGradient>
        <filter id="bnglow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* Upward arrow of success */}
      <polyline points="50,150 80,110 110,125 150,60" fill="none" stroke="rgba(34,211,238,0.3)" strokeWidth="1.5" strokeDasharray="4 3"/>
      <polyline points="50,150 80,110 110,125 150,60" fill="none" stroke="url(#bng1)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="250" strokeDashoffset="250" filter="url(#bnglow)">
        <animate attributeName="stroke-dashoffset" values="250;0;0" dur="2s" repeatCount="indefinite"/>
      </polyline>
      {/* Data points */}
      {[{cx:50,cy:150},{cx:80,cy:110},{cx:110,cy:125},{cx:150,cy:60}].map((p,i)=>(
        <circle key={i} cx={p.cx} cy={p.cy} r="6" fill="rgba(34,211,238,0.2)" stroke="rgba(34,211,238,0.8)" strokeWidth="2" filter="url(#bnglow)">
          <animate attributeName="r" values="4;7;4" dur="2.5s" begin={`${i*0.3}s`} repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" begin={`${i*0.3}s`} repeatCount="indefinite"/>
        </circle>
      ))}
      {/* Briefcase icon */}
      <rect x="82" y="50" width="36" height="28" rx="4" fill="rgba(34,211,238,0.1)" stroke="rgba(34,211,238,0.5)" strokeWidth="1.5"/>
      <path d="M90 50 v-6 a4 4 0 0 1 4-4 h12 a4 4 0 0 1 4 4 v6" fill="none" stroke="rgba(34,211,238,0.6)" strokeWidth="1.5"/>
      <line x1="82" y1="64" x2="118" y2="64" stroke="rgba(34,211,238,0.4)" strokeWidth="1.5"/>
      <circle cx="100" cy="64" r="3" fill="rgba(34,211,238,0.8)" filter="url(#bnglow)">
        <animate attributeName="r" values="3;4.5;3" dur="2s" repeatCount="indefinite"/>
      </circle>
      {/* % badge */}
      <circle cx="155" cy="145" r="18" fill="rgba(34,211,238,0.1)" stroke="rgba(34,211,238,0.4)" strokeWidth="1.5"/>
      <text x="155" y="151" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#22D3EE" fontFamily="monospace">98%</text>
      <circle cx="155" cy="145" r="22" fill="none" stroke="rgba(34,211,238,0.2)" strokeWidth="1">
        <animate attributeName="r" values="18;24;18" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite"/>
      </circle>
    </svg>
  );
  
 export const CaseStudyAnimation = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="csg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14B8A6"/><stop offset="100%" stopColor="#34D399"/>
        </linearGradient>
        <filter id="csglow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* Radar / investigation */}
      {[50,38,26].map((r,i)=>(
        <circle key={i} cx="100" cy="105" r={r} fill="none" stroke={`rgba(20,184,166,${0.15+i*0.1})`} strokeWidth="1.5">
          <animate attributeName="r" values={`${r};${r+4};${r}`} dur={`${3+i*0.5}s`} repeatCount="indefinite"/>
        </circle>
      ))}
      {/* Spinning radar sweep */}
      <line x1="100" y1="105" x2="100" y2="55" stroke="rgba(20,184,166,0.5)" strokeWidth="2" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" values="0,100,105;360,100,105" dur="4s" repeatCount="indefinite"/>
      </line>
      <path d="M100,105 L100,55 A50,50 0 0,1 135,128 Z" fill="rgba(20,184,166,0.06)">
        <animateTransform attributeName="transform" type="rotate" values="0,100,105;360,100,105" dur="4s" repeatCount="indefinite"/>
      </path>
      {/* Crosshair */}
      <line x1="72" y1="105" x2="128" y2="105" stroke="rgba(20,184,166,0.3)" strokeWidth="1"/>
      <line x1="100" y1="77" x2="100" y2="133" stroke="rgba(20,184,166,0.3)" strokeWidth="1"/>
      {/* Detection blips */}
      {[{cx:118,cy:80,d:"1s"},{cx:82,cy:118,d:"2.5s"}].map((b,i)=>(
        <g key={i}>
          <circle cx={b.cx} cy={b.cy} r="4" fill="rgba(20,184,166,0.8)" filter="url(#csglow)">
            <animate attributeName="opacity" values="0;1;0" dur="3s" begin={b.d} repeatCount="indefinite"/>
          </circle>
          <circle cx={b.cx} cy={b.cy} r="8" fill="none" stroke="rgba(52,211,153,0.5)" strokeWidth="1">
            <animate attributeName="r" values="4;14;4" dur="3s" begin={b.d} repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.8;0;0.8" dur="3s" begin={b.d} repeatCount="indefinite"/>
          </circle>
        </g>
      ))}
      {/* Magnifier top-right */}
      <circle cx="148" cy="52" r="16" fill="none" stroke="rgba(20,184,166,0.5)" strokeWidth="2"/>
      <circle cx="148" cy="52" r="10" fill="rgba(20,184,166,0.07)"/>
      <line x1="158" y1="62" x2="167" y2="71" stroke="rgba(20,184,166,0.7)" strokeWidth="3" strokeLinecap="round"/>
      {/* Scan line in magnifier */}
      <line x1="138" y1="52" x2="158" y2="52" stroke="rgba(52,211,153,0.5)" strokeWidth="1">
        <animate attributeName="y1" values="42;62;42" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="y2" values="42;62;42" dur="2s" repeatCount="indefinite"/>
      </line>
    </svg>
  );
  
  export const BookAnimation = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bkg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6"/><stop offset="100%" stopColor="#6366F1"/>
        </linearGradient>
        <filter id="bkglow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* Open book */}
      <path d="M100,155 Q70,145 48,155 L48,65 Q70,52 100,65 Z" fill="rgba(59,130,246,0.1)" stroke="rgba(59,130,246,0.5)" strokeWidth="1.5"/>
      <path d="M100,155 Q130,145 152,155 L152,65 Q130,52 100,65 Z" fill="rgba(99,102,241,0.1)" stroke="rgba(99,102,241,0.5)" strokeWidth="1.5"/>
      {/* Spine */}
      <line x1="100" y1="65" x2="100" y2="155" stroke="url(#bkg1)" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Left page lines */}
      {[0,1,2,3,4].map(i=>(
        <line key={i} x1="60" y1={82+i*13} x2="93" y2={79+i*13} stroke="rgba(59,130,246,0.45)" strokeWidth="1.5" strokeLinecap="round">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${2+i*0.2}s`} begin={`${i*0.1}s`} repeatCount="indefinite"/>
        </line>
      ))}
      {/* Right page lines */}
      {[0,1,2,3,4].map(i=>(
        <line key={i} x1="107" y1={79+i*13} x2="140" y2={82+i*13} stroke="rgba(99,102,241,0.45)" strokeWidth="1.5" strokeLinecap="round">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${2+i*0.2}s`} begin={`${0.5+i*0.1}s`} repeatCount="indefinite"/>
        </line>
      ))}
      {/* Glowing bookmark */}
      <polygon points="128,52 134,52 134,68 131,65 128,68" fill="url(#bkg1)" filter="url(#bkglow)" opacity="0.9">
        <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite"/>
      </polygon>
      {/* Stars floating off */}
      {[{x:48,y:58,s:0},{x:155,y:62,s:1},{x:44,y:158,s:2},{x:158,y:155,s:3}].map((s,i)=>(
        <circle key={i} cx={s.x} cy={s.y} r="2.5" fill="#6366F1" filter="url(#bkglow)">
          <animate attributeName="opacity" values="0.2;0.9;0.2" dur={`${1.8+i*0.35}s`} begin={`${s.s*0.4}s`} repeatCount="indefinite"/>
          <animate attributeName="cy" values={`${s.y};${s.y-8};${s.y}`} dur={`${2.5+i*0.3}s`} repeatCount="indefinite"/>
        </circle>
      ))}
    </svg>
  );
  
  export const JournalAnimation = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="jg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1"/><stop offset="100%" stopColor="#8B5CF6"/>
        </linearGradient>
        <filter id="jglow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* Globe */}
      <circle cx="100" cy="95" r="52" fill="rgba(99,102,241,0.06)" stroke="rgba(99,102,241,0.35)" strokeWidth="1.5"/>
      <circle cx="100" cy="95" r="52" fill="none" stroke="rgba(99,102,241,0.5)" strokeWidth="1.5" strokeDasharray="8 6">
        <animateTransform attributeName="transform" type="rotate" values="0,100,95;360,100,95" dur="20s" repeatCount="indefinite"/>
      </circle>
      {/* Latitude lines */}
      {[-28,0,28].map((dy,i)=>(
        <ellipse key={i} cx="100" cy={95+dy} rx={Math.sqrt(52*52-dy*dy)} ry={10-Math.abs(dy)*0.1}
          fill="none" stroke="rgba(99,102,241,0.2)" strokeWidth="1"/>
      ))}
      {/* Longitude lines */}
      {[0,60,120].map((angle,i)=>(
        <ellipse key={i} cx="100" cy="95" rx="18" ry="52" fill="none" stroke="rgba(99,102,241,0.2)" strokeWidth="1"
          transform={`rotate(${angle},100,95)`}/>
      ))}
      {/* Orbiting paper */}
      <g filter="url(#jglow)">
        <rect x="96" y="40" width="12" height="16" rx="2" fill="rgba(99,102,241,0.3)" stroke="rgba(139,92,246,0.8)" strokeWidth="1.5">
          <animateTransform attributeName="transform" type="rotate" values="0,100,95;360,100,95" dur="5s" repeatCount="indefinite"/>
        </rect>
      </g>
      {/* Q1 badge */}
      <circle cx="100" cy="95" r="20" fill="rgba(99,102,241,0.15)" stroke="rgba(99,102,241,0.6)" strokeWidth="1.5" filter="url(#jglow)">
        <animate attributeName="r" values="20;22;20" dur="2.5s" repeatCount="indefinite"/>
      </circle>
      <text x="100" y="92" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#818CF8" fontFamily="monospace">Q1</text>
      <text x="100" y="102" textAnchor="middle" fontSize="7" fill="rgba(129,140,248,0.7)" fontFamily="monospace">INDEXED</text>
      {/* Signal pulses */}
      {[64,76,88].map((r,i)=>(
        <circle key={i} cx="100" cy="95" r={r} fill="none" stroke="rgba(99,102,241,0.15)" strokeWidth="0.8">
          <animate attributeName="r" values={`${r};${r+8};${r}`} dur={`${3+i*0.6}s`} begin={`${i*0.8}s`} repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.4;0;0.4" dur={`${3+i*0.6}s`} begin={`${i*0.8}s`} repeatCount="indefinite"/>
        </circle>
      ))}
    </svg>
  );
  