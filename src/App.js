import React, { useState, useEffect, useRef } from 'react';
import { Download, Menu, Link as LinkIcon, User, Plus, Disc, ChevronRight, Mail, ArrowDown, Layers, Scissors, Palette, ShoppingBag, Check, Lock, Send, MapPin, Globe } from 'lucide-react';

// --- Components ---
const Navbar = ({ onNavigate }) => (
  <nav className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 max-w-[1920px] mx-auto w-full z-50 relative h-auto min-h-[60px] shrink-0">
    {/* Left Logo / Link Icon */}
    <div className="hidden lg:flex flex-col items-center justify-center border-2 border-black rounded-full w-10 py-4 absolute left-6 top-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-white">
      <LinkIcon size={16} className="text-black mb-2" />
      <span className="writing-vertical text-[8px] font-bold tracking-widest uppercase py-2">Loop/Chan</span>
    </div>

    {/* Center Nav */}
    <div className="flex-1 flex justify-start lg:justify-start lg:pl-24 items-center">
      <div className="hidden md:flex items-center bg-white border-2 border-black rounded-full p-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] scale-90 md:scale-100 origin-left">
        {['HOME', 'ABOUT', 'SERVICES', 'PRICING', 'CONTACT'].map((item, idx) => (
          <button
            key={item}
            onClick={() => onNavigate(item)}
            className={`px-3 md:px-5 py-1.5 rounded-full text-[10px] md:text-xs font-bold transition-all tracking-wider ${idx === 0 ? 'bg-[#4A0404] text-white' : 'hover:bg-gray-100 text-black'
              }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Mobile Logo Fallback */}
      <div className="md:hidden font-black text-xl tracking-tighter">AI.STYLIST</div>

      <div className="hidden sm:flex items-center gap-2 font-bold text-[9px] md:text-[10px] text-[#D90429] uppercase tracking-wider ml-4 md:ml-6 bg-red-50 px-3 py-1 rounded-full border border-red-100 whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-[#D90429] animate-pulse"></span>
        COMING SOON
      </div>
    </div>

    {/* Right User Icon */}
    <div className="hidden lg:flex items-center justify-center border-2 border-black rounded-full w-10 h-10 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-white absolute right-6 top-6">
      <User size={16} />
    </div>

    <button className="lg:hidden p-2 border-2 border-black rounded-lg ml-auto">
      <Menu size={20} />
    </button>
  </nav>
);

const ProductTag = ({ x, y, title, price, isOpen, onClick, delay }) => (
  <div
    className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-40 cursor-pointer group animate-pop-in`}
    style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${delay}ms`, opacity: 0, animationFillMode: 'forwards' }}
    onClick={onClick}
  >
    <div className="relative flex items-center">
      {/* Pulse Effect */}
      <div className="absolute w-4 h-4 md:w-5 md:h-5 bg-white rounded-full animate-ping opacity-50"></div>

      {/* Trigger Button */}
      <div className={`w-5 h-5 md:w-6 md:h-6 bg-white rounded-full flex items-center justify-center shadow-xl border-2 border-white transition-transform duration-300 ${isOpen ? 'scale-110' : 'group-hover:scale-110'
        }`}>
        <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-[#8B0000] rounded-full"></div>
      </div>

      {/* Content Card */}
      <div className={`absolute left-6 md:left-8 top-1/2 -translate-y-1/2 bg-[#4A0404]/95 backdrop-blur-sm text-white rounded-full pl-3 md:pl-4 pr-1 py-1 flex items-center gap-3 border-2 border-[#5e0a0a] shadow-2xl transition-all duration-300 origin-left overflow-hidden whitespace-nowrap ${isOpen ? 'w-auto opacity-100 scale-100' : 'w-0 opacity-0 scale-95 p-0 border-0'
        }`}>
        <div className="flex flex-col">
          <span className="text-[8px] font-bold uppercase tracking-wider text-red-100 leading-tight">{title}</span>
          {price && <span className="text-[9px] font-mono text-red-300">{price}</span>}
        </div>
        <div className="bg-[#8B0000] w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center shrink-0">
          <ChevronRight size={10} />
        </div>
      </div>
    </div>
  </div>
);

const TypingHeadline = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    let timeoutId;

    const typeChar = () => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        let delay = Math.random() * 15 + 5;
        const currentChar = text[index];
        if (currentChar === '\n') {
          delay += 80;
        } else if (currentChar === ' ') {
          delay += 10;
        }
        index++;
        timeoutId = setTimeout(typeChar, delay);
      } else {
        setIsTyping(false);
      }
    };

    timeoutId = setTimeout(typeChar, 100);
    return () => clearTimeout(timeoutId);
  }, [text]);

  return (
    <div className="flex flex-col items-start font-black uppercase text-[#4A0404] font-['Oswald'] drop-shadow-sm select-none leading-[0.9] tracking-tighter">
      <div className="text-[clamp(2.5rem,9vw,6rem)] xl:text-[7rem] whitespace-pre-wrap min-h-[3.6em]">
        {displayedText}
        <span className={`inline-block w-2 md:w-4 h-[0.7em] bg-[#D90429] align-baseline ml-1 md:ml-2 ${isTyping ? 'animate-pulse' : 'hidden'
          }`}></span>
      </div>
    </div>
  );
};

// --- SYS.NODES Section Components ---
const SystemNodeCard = ({ number, title, subtitle, desc, features, delay, targetUsers, connections, imageSrc, imageLabel, cta, imageSlides }) => {
  const isExpanded = number === "01" || number === "02" || number === "03" || number === "04";
  const isLight = number === "01" || number === "03";
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (imageSlides && imageSlides.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % imageSlides.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [imageSlides]);

  return (
    <div
      className={`group relative border border-white/10 ${isLight ? 'bg-white hover:bg-white' : 'bg-white/5 hover:bg-white/10'} p-8 md:p-10 transition-all duration-500 overflow-hidden flex flex-col h-full animate-fade-in ${isExpanded ? 'lg:col-span-2' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Scanning Line Effect */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D90429] to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan transition-opacity z-10"></div>
      {/* Remove dark overlay for white card */}
      {!isLight && (
        <div className="absolute inset-0 bg-[#D90429]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
      )}

      {/* Header */}
      <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-6 relative z-10">
        <div className="flex flex-col">
          <span className={`font-mono text-[#D90429] text-xs tracking-[0.3em] mb-2 flex items-center gap-2`}>
            <span className="w-2 h-2 bg-[#D90429] rounded-sm animate-pulse"></span>
            SYS.NODE_{number}
          </span>
          <h3 className={`text-3xl md:text-5xl font-black font-['Oswald'] uppercase leading-none ${isLight ? 'text-black' : 'text-white'} tracking-tight group-hover:translate-x-2 transition-transform duration-500`}>
            {title}
          </h3>

          {/* Target Users Tags */}
          {targetUsers && (
            <div className="flex flex-wrap gap-2 mt-4">
              {targetUsers.map((user, idx) => (
                <span key={idx} className="bg-[#D90429] text-white text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                  For {user}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center group-hover:border-[#D90429] group-hover:scale-110 transition-all duration-500">
          <ArrowDown size={14} className="text-gray-500 group-hover:text-[#D90429] -rotate-45 group-hover:rotate-0 transition-all duration-500" />
        </div>
      </div>

      {/* Enhanced Section - Full Width (Jarvis & Friday) */}
      {isExpanded && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Left/Right Logic: VS code / Image with 3D Effect */}
          <div className={`relative ${number === '02' || number === '04' ? 'lg:order-2' : ''}`}>
            <div className={`bg-gradient-to-br ${isLight ? 'from-gray-50 to-gray-100 border-gray-200' : 'from-black/40 to-black/60 border-white/10'} rounded-2xl p-6 border-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] group-hover:shadow-[12px_12px_0px_0px_rgba(217,4,41,0.2)] transition-all duration-500 h-full flex flex-col`}>
              <div className="text-sm font-mono text-[#D90429] uppercase tracking-widest mb-4 flex items-center gap-2">
                <User size={12} className="animate-pulse" /> {imageLabel || "System Visualization"}
              </div>
              <div className={`relative rounded-xl overflow-hidden border-2 border-[#D90429]/30 group-hover:border-[#D90429] transition-colors ${isLight ? 'bg-white' : 'bg-black/50'} shadow-inner flex-1 flex items-center justify-center min-h-0 max-h-[600px]`}>
                <img
                  src={imageSlides ? imageSlides[currentSlide] : (imageSrc || `${process.env.PUBLIC_URL}/jarvis_demo_v2.gif`)}
                  alt="System Visualization"
                  className={`max-w-full max-h-full object-contain transition-all duration-700 ${imageSlides ? 'animate-fade-in' : 'transform group-hover:scale-105'}`}
                  key={currentSlide}
                  style={{
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                    imageRendering: 'crisp-edges'
                  }}
                />

              </div>
            </div>
          </div>

          {/* Right: Detailed Description */}
          <div className="space-y-6">
            <div>
              <h4 className={`text-lg font-black font-['Oswald'] uppercase mb-3 ${isLight ? 'text-black' : 'text-white'} border-l-4 border-[#D90429] pl-4`}>
                {subtitle}
              </h4>
              <p className={`text-sm ${isLight ? 'text-gray-700' : 'text-gray-300'} leading-relaxed mb-4`}>
                {desc}
              </p>
            </div>

            {/* Connections Grid */}
            {connections && (
              <div className="space-y-4">
                <h5 className="text-xs font-mono text-[#D90429] uppercase tracking-widest flex items-center gap-2">
                  <Globe size={10} /> Connected Systems:
                </h5>
                <div className="grid grid-cols-1 gap-3">
                  {connections.map((connection, idx) => (
                    <div key={idx} className={`${isLight ? 'bg-gray-50 border-gray-200 hover:bg-gray-100' : 'bg-white/5 border-white/10 hover:bg-white/10'} border rounded-lg p-3 transition-colors`}>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[#D90429] rounded-full mt-2 shrink-0"></div>
                        <div>
                          <h6 className={`font-bold text-xs ${isLight ? 'text-black' : 'text-white'} uppercase tracking-wide mb-1`}>{connection.system}</h6>
                          <p className={`text-xs ${isLight ? 'text-gray-600' : 'text-gray-400'} leading-relaxed`}>{connection.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Call to Action */}
            <div className="bg-[#D90429] text-white p-4 rounded-lg transform -skew-x-1 hover:skew-x-0 transition-transform duration-300 cursor-pointer group/cta">
              <div className="transform skew-x-1 group-hover/cta:skew-x-0 transition-transform">
                <div className="text-xs font-mono uppercase tracking-widest mb-1 opacity-80">Ready to Begin?</div>
                <div className="font-black text-lg font-['Oswald'] uppercase tracking-tight flex items-center gap-2">
                  "{cta || "Initialize System"}" <ChevronRight size={16} className="group-hover/cta:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Regular Body for Other Nodes (Short) */}
      {!isExpanded && (
        <div className="flex-1 relative z-10">
          <div className="mb-8">
            <h4 className="text-sm md:text-base font-bold text-white/90 uppercase tracking-widest mb-3 border-l-4 border-[#D90429] pl-4 font-mono">
              {subtitle}
            </h4>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-[95%]">
              {desc}
            </p>
          </div>
        </div>
      )}

      {/* Capabilities List - Hidden for Expanded Nodes (01 & 02) since they show Connections */}
      {!isExpanded && (
        <div className="space-y-4 pt-6 border-t border-dashed border-white/10 relative z-10">
          <div className={`text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2`}>
            <Layers size={10} /> Capabilities_Module:
          </div>
          <div className="grid grid-cols-1 gap-3">
            {features.map((feat, i) => (
              <div key={i} className={`flex items-center gap-3 text-xs md:text-sm text-gray-300 group-hover:text-white transition-colors`}>
                <div className="w-1.5 h-1.5 bg-[#D90429] rotate-45"></div>
                <span className="tracking-wide">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Decor */}
      <div className={`mt-10 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-mono ${isLight ? 'text-gray-500' : 'text-gray-600'} relative z-10`}>
        <span className="group-hover:text-[#D90429] transition-colors">STATUS: OPERATIONAL</span>
        <span className={`${isLight ? 'group-hover:text-black' : 'group-hover:text-white'} transition-colors flex items-center gap-1`}>
          INITIATE SEQUENCE <ChevronRight size={10} />
        </span>
      </div>
    </div>
  );
};

const SystemNodesSection = () => (
  <section className="bg-[#050101] text-white py-24 px-4 md:px-8 lg:px-24 relative overflow-hidden">
    {/* Dynamic Grid Background */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none opacity-50"></div>

    <div className="max-w-[1920px] mx-auto relative z-10">
      {/* Simplified Header */}
      <div className="text-center mb-16">
        <div className="inline-block text-[#D90429] font-mono text-xs tracking-[0.4em] mb-6 animate-pulse">
          INTELLIGENT ECOSYSTEM // SYSTEM NODES
        </div>
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black font-['Oswald'] uppercase leading-[0.85] tracking-tighter mb-8">
          Our AI<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-800">Applications.</span>
        </h2>
      </div>

      {/* The Ecosystem Grid - System Nodes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 bg-white/5 border border-white/10">
        <SystemNodeCard
          number="01"
          title="The Intelligent Stylist"
          subtitle="Just A Rather Very Intelligent Stylist"
          desc="JARVIS creates your personalized fashion avatar using 8-directional images and poses, providing state-of-the-art try-on experiences without uploading images repeatedly. Connected to web, fabrics, designers, and local vendors for complete fashion ecosystem access."
          targetUsers={["End Users"]}
          connections={[
            {
              system: "Web Products + Agentic Shopping",
              description: "Connected to online retailers with AI shopping assistant for personalized product discovery and seamless purchasing experience."
            },
            {
              system: "Fabric Library + TADASHI Integration",
              description: "Try fabrics on basic designs and get custom stitching through TADASHI with full design control, mix-and-match capabilities."
            },
            {
              system: "Designer Collections + EDITH",
              description: "Access curated designer collections with customization options within designer scope and selected fabric ranges."
            },
            {
              system: "Local Vendors + FRIDAY Network",
              description: "Discover readymade products from local vendors on map, explore different markets and buy directly from local businesses."
            }
          ]}
          features={[
            "8-Direction Fashion Avatar System",
            "Secure Avatar Generation Technology",
            "Cross-Platform Try-On Experience",
            "Agentic Shopping Assistant Integration",
            "Real-time Fabric & Design Visualization",
            "Local Vendor Discovery & Direct Purchase"
          ]}
          imageSrc={`${process.env.PUBLIC_URL}/jarvis_demo_v2.gif`}
          imageLabel="Personal Design Studio"
          cta="Suit Me Up!"
          delay={0}
        />
        <SystemNodeCard
          number="02"
          title="The Retail Intelligence"
          subtitle="Fabrics & Readymade Intelligence Digital Assistant (Youth)"
          desc="The nervous system of supply. F.R.I.D.A.Y turns amateur photos into professional listings in minutes—automating social/web listing, tax, and billing. A centralized network connecting vendors for smarter selling and sourcing."
          targetUsers={["Vendors", "Wholesalers"]}
          connections={[
            {
              system: "Agentic Listing Engine",
              description: "Converts raw photos to pro shots. Auto-lists on Google Shopping, social & e-com. Magical setup."
            },
            {
              system: "Live Bargain Core",
              description: "Replaces discount logic with live negotiation. Calculates immediate P&L & clearance recs."
            },
            {
              system: "B2B Intelligence",
              description: "Wholesale buying metrics & trend analysis for smart stock acquisition from internal network."
            }
          ]}
          imageSrc={`${process.env.PUBLIC_URL}/IMG_004.jpeg`}
          imageLabel="Supply Chain Network"
          cta="Initiate Scan"
          delay={200}
        />
        <SystemNodeCard
          number="03"
          title="The Architect"
          subtitle="Tailoring Assistant Designed for Accurate Stitching & Handloom Intelligence"
          desc="Precision intelligence for the hands that create. T.A.D.A.S.H.I translates abstract design logic into precise, mathematical stitching realities with zero loss in translation."
          targetUsers={["Tailors", "Manufacturers"]}
          connections={[
            {
              system: "Pattern Logic Core",
              description: "Converts 2D sketches into production-ready CAD patterns automatically."
            },
            {
              system: "Fabric Physics Engine",
              description: "Simulates drape and tension for different material types before cutting."
            },
            {
              system: "Automated QC Protocol",
              description: "Computer vision verification of stitching standards against digital twins."
            }
          ]}
          imageSlides={[
            `${process.env.PUBLIC_URL}/tadashi_v91.jpeg`,
            `${process.env.PUBLIC_URL}/tadashi_v92.jpeg`,
            `${process.env.PUBLIC_URL}/tadashi_v95.jpeg`,
            `${process.env.PUBLIC_URL}/tadashi_v94.jpeg`,
          ]}
          imageLabel="Production Intelligence"
          cta="Initiate Fabrication"
          delay={400}
        />
        <SystemNodeCard
          number="04"
          title="The Hero"
          subtitle="Every Design Is The Hero"
          desc="An IP-first ecosystem where designers are the source code. E.D.I.T.H protects creative intellectual property while instantly converting sketches into production-ready assets."
          targetUsers={["Designers", "Creators"]}
          connections={[
            {
              system: "IP Defense System",
              description: "Digital rights management for creative assets using blockchain verification and smart contracts."
            },
            {
              system: "Asset Conversion Core",
              description: "Real-time transformation of 2D sketches into production-ready 3D assets and technical packets."
            },
            {
              system: "Secure Handoff Protocol",
              description: "Encrypted transmission channel connecting designers directly to manufacturing units."
            }
          ]}
          imageSlides={[
            `${process.env.PUBLIC_URL}/edith_s1.jpeg`,
            `${process.env.PUBLIC_URL}/edith_s2.jpeg`,
            `${process.env.PUBLIC_URL}/edith_s3.jpeg`,
            `${process.env.PUBLIC_URL}/edith_s4.jpeg`
          ]}
          imageLabel="Design Protection Matrix"
          cta="Secure IP"
          delay={600}
        />
      </div>
    </div>
  </section>
);

// --- Services Section Components ---
const ServiceCard = ({ icon: Icon, title, desc }) => (
  <div className="bg-white p-6 border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-default">
    <div className="w-10 h-10 bg-[#4A0404] text-white rounded-lg flex items-center justify-center mb-4">
      <Icon size={20} />
    </div>
    <h4 className="text-lg font-black font-['Oswald'] uppercase mb-2 leading-tight">{title}</h4>
    <p className="text-xs text-gray-600 font-medium leading-relaxed">{desc}</p>
  </div>
);

const ServicesSection = React.forwardRef((props, ref) => {
  // Default to 'END USERS' as per request
  const [activeTab, setActiveTab] = useState('END USERS');

  const services = {
    'END USERS': [
      { icon: User, title: 'AI Fashion Studio', desc: 'Virtual try-on and personalized styling intelligence that adapts to your unique body type and preferences.' },
      { icon: Palette, title: 'Smart Wardrobe', desc: 'Get occasion-based recommendations that understand your cultural context and budget logic.' },
      { icon: ShoppingBag, title: 'Unified Commerce', desc: 'Access custom tailoring, fabric vendors, and readymade collections in one intelligent interface.' }
    ],
    'VENDORS': [
      { icon: Layers, title: 'Product Catalog Generation', desc: 'Convert basic product photos into professional e-commerce images with multiple angles and lifestyle contexts.' },
      { icon: Palette, title: 'Fabric Visualization', desc: 'Simulate how fabrics behave on different garments with realistic texture and drape physics.' },
      { icon: ShoppingBag, title: 'Bulk Production Planning', desc: 'Generate seasonal collections from base designs, including size matrices and color variations.' }
    ],
    'STYLISTS': [
      { icon: Palette, title: 'Design Development', desc: 'Convert rough sketches into realistic product visualizations and generate technical specifications.' },
      { icon: User, title: 'Client Consultation', desc: 'Create personalized mood boards and style recommendations tailored to individual client profiles.' },
      { icon: Layers, title: 'Trend Integration', desc: 'Generate seasonal adaptations and trend-based designs automatically.' }
    ],
    'TAILORS': [
      { icon: Scissors, title: 'Pattern Creation', desc: 'Generate precise cutting patterns and grading directly from garment images.' },
      { icon: User, title: 'Fit Optimization', desc: 'Visualize garments on different body types to create alteration guides and made-to-measure recommendations.' },
      { icon: Layers, title: 'Quality Control', desc: 'Generate reference images for construction standards and defect correction guides.' }
    ]
  };

  return (
    <section ref={ref} className="bg-[#FDFBF7] py-24 px-4 md:px-8 lg:px-24 border-t-2 border-black">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar / Tabs */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="mb-8">
              <h2 className="text-4xl font-black font-['Oswald'] uppercase leading-none mb-2 text-[#4A0404]">
                Operational<br />Capabilities
              </h2>
              <div className="h-1 w-20 bg-black"></div>
            </div>
            <div className="flex flex-col gap-2">
              {['END USERS', 'VENDORS', 'STYLISTS', 'TAILORS'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-left px-6 py-4 font-bold text-sm tracking-wider uppercase border-2 transition-all duration-300 flex justify-between items-center ${activeTab === tab
                    ? 'bg-black text-white border-black shadow-[4px_4px_0px_0px_#D90429]'
                    : 'bg-white text-gray-400 border-gray-200 hover:border-black hover:text-black'
                    }`}
                >
                  {tab}
                  {activeTab === tab && <ChevronRight size={16} />}
                </button>
              ))}
            </div>
          </div>

          {/* Content Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center gap-2">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Selected Protocol //</span>
              <span className="text-xs font-bold text-[#D90429] uppercase tracking-widest">{activeTab}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {services[activeTab].map((service, idx) => (
                <ServiceCard key={idx} {...service} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

// --- Pricing Section ---
const PricingCard = ({ title, subtitle, price, features, isAvailable, delay }) => (
  <div
    className={`relative flex flex-col p-8 border border-white/10 bg-white/5 backdrop-blur-sm rounded-none group animate-fade-in hover:bg-white/10 transition-all duration-500`}
    style={{ animationDelay: `${delay}ms` }}
  >
    {isAvailable && (
      <div className="absolute top-0 right-0 bg-[#D90429] text-white text-[9px] font-bold px-3 py-1 uppercase tracking-widest">
        Waitlist Open
      </div>
    )}

    <div className="mb-8">
      <div className="font-mono text-gray-500 text-xs mb-2 tracking-widest uppercase">{subtitle}</div>
      <h3 className="text-3xl font-black font-['Oswald'] uppercase text-white mb-4">{title}</h3>
      <div className="text-4xl font-bold text-white mb-1 font-mono">{price}</div>
      {!isAvailable && <div className="text-[10px] text-[#D90429] font-bold uppercase tracking-wider">Coming Q2 2025</div>}
    </div>

    <ul className="flex-1 flex flex-col gap-4 mb-8">
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-start gap-3 text-sm text-gray-400">
          <Check size={16} className={`shrink-0 ${isAvailable ? 'text-[#D90429]' : 'text-gray-600'}`} />
          <span className="leading-tight">{feature}</span>
        </li>
      ))}
    </ul>

    <button
      disabled={!isAvailable}
      className={`w-full py-4 text-xs font-bold uppercase tracking-[0.2em] border transition-all duration-300 flex items-center justify-center gap-2
        ${isAvailable
          ? 'bg-white text-black border-white hover:bg-[#D90429] hover:text-white hover:border-[#D90429]'
          : 'bg-transparent text-gray-600 border-gray-800 cursor-not-allowed'
        }`}
    >
      {isAvailable ? (
        <>Join Waitlist <Mail size={14} /></>
      ) : (
        <>Locked <Lock size={14} /></>
      )}
    </button>
  </div>
);

const PricingSection = React.forwardRef((props, ref) => (
  <section ref={ref} className="bg-[#0f0505] text-white py-24 px-4 md:px-8 lg:px-24 relative overflow-hidden border-t border-white/10">
    <div className="max-w-[1920px] mx-auto relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <div className="text-[#D90429] font-mono text-xs tracking-[0.3em] mb-4">ACCESS TIERS</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-['Oswald'] uppercase leading-none">
            Select Your<br />Protocol.
          </h2>
        </div>
        <p className="text-gray-500 text-xs md:text-sm max-w-md text-right leading-relaxed">
          Join the infrastructure revolution. Secure your position in the alpha cohort or reserve your spot for full-scale commercial deployment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PricingCard
          title="Alpha Access"
          subtitle="The Initiate"
          price="Free"
          features={[
            "Early access to J.A.R.V.I.S styling engine",
            "Basic wardrobe digitization (50 items)",
            "Community access via Discord",
            "Priority onboarding for V2"
          ]}
          isAvailable={true}
          delay={0}
        />
        <PricingCard
          title="Professional"
          subtitle="The Architect"
          price="$29/mo"
          features={[
            "Full F.R.I.D.A.Y vendor suite",
            "Unlimited SKU digitization",
            "Pattern generation with T.A.D.A.S.H.I",
            "Commercial license for AI assets",
            "Priority support channel"
          ]}
          isAvailable={false}
          delay={200}
        />
        <PricingCard
          title="Enterprise"
          subtitle="The Industrialist"
          price="Custom"
          features={[
            "Dedicated infrastructure node",
            "White-label API access",
            "Custom model fine-tuning",
            "Multi-seat admin dashboard",
            "SLA & 24/7 dedicated support"
          ]}
          isAvailable={false}
          delay={400}
        />
      </div>
    </div>
  </section>
));

// --- Contact Section ---
const ContactSection = React.forwardRef((props, ref) => (
  <section ref={ref} className="bg-[#FDFBF7] text-black py-24 px-4 md:px-8 lg:px-24 border-t-2 border-black relative">
    <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-32">
      {/* Left Info Column */}
      <div className="w-full lg:w-1/3">
        <div className="mb-10">
          <h2 className="text-4xl font-black font-['Oswald'] uppercase leading-none mb-2 text-[#4A0404]">
            Signal<br />Transmission
          </h2>
          <div className="h-1 w-20 bg-black mb-6"></div>
          <p className="text-sm font-bold text-gray-700 leading-relaxed uppercase tracking-wide">
            Ready to upgrade your infrastructure? We are listening. Send a transmission to the S.T.A.R.K. network.
          </p>
        </div>
      </div>

      {/* Right Form Column */}
      <div className="flex-1">
        <form className="space-y-6 max-w-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Identity // Name</label>
              <input
                type="text"
                className="bg-transparent border-2 border-black p-4 font-mono text-sm focus:outline-none focus:bg-white transition-colors"
                placeholder="ENTER NAME"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Contact // Email</label>
              <input
                type="email"
                className="bg-transparent border-2 border-black p-4 font-mono text-sm focus:outline-none focus:bg-white transition-colors"
                placeholder="ENTER EMAIL"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Sector // Interest</label>
            <select className="bg-transparent border-2 border-black p-4 font-mono text-sm focus:outline-none focus:bg-white transition-colors appearance-none rounded-none">
              <option>SELECT PROTOCOL</option>
              <option>Vendor Partnership</option>
              <option>Stylist Access</option>
              <option>Tailoring Unit</option>
              <option>Investor Relations</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Transmission // Message</label>
            <textarea
              rows="4"
              className="bg-transparent border-2 border-black p-4 font-mono text-sm focus:outline-none focus:bg-white transition-colors resize-none"
              placeholder="ENTER MESSAGE TYPE..."
            ></textarea>
          </div>

          <button className="group bg-[#4A0404] text-white w-full py-4 font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-black transition-colors duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
            Transmit Data <Send size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>

    {/* Company Information Section */}
    <div className="max-w-[1920px] mx-auto mt-24 pt-16 border-t-2 border-black">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
        {/* Left: Company Info */}
        <div>
          <div className="inline-block text-[#D90429] font-mono text-xs tracking-[0.4em] mb-6 animate-pulse">
            S.T.A.R.K. INDUSTRIES // CORE INFRASTRUCTURE
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-['Oswald'] uppercase leading-[0.85] tracking-tighter mb-8">
            Smart Tailoring And <br />
            <span className="text-[#D90429]">Retail Kouture.</span>
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl leading-relaxed border-l-4 border-[#D90429] pl-6 mb-8">
            We are not just digitizing fashion. We are teaching intelligence to fashion. Building the world's first end-to-end, intelligence-driven operating system.
          </p>
          <div className="flex items-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-black font-['Oswald'] text-black">EST. 2024</div>
              <div className="text-xs text-[#D90429] uppercase tracking-widest mt-1">Intelligence Division</div>
            </div>
            <div className="h-12 w-[1px] bg-black/20"></div>
            <div className="text-center">
              <div className="text-3xl font-black font-['Oswald'] text-black">AI-FIRST</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Fashion Platform</div>
            </div>
          </div>
        </div>

        {/* Right: Philosophy */}
        <div className="flex flex-col justify-center">
          <div className="bg-black text-white p-8 transform -skew-x-3 hover:skew-x-0 transition-transform duration-300">
            <span className="text-lg md:text-xl font-bold uppercase tracking-[0.1em] transform skew-x-3 hover:skew-x-0 inline-block">
              "If you get it, you belong here."
            </span>
          </div>
          <div className="mt-8 text-sm text-gray-600 leading-relaxed">
            <p className="mb-4">
              <strong>Our Mission:</strong> To revolutionize the fashion industry through intelligent automation,
              personalized styling, and seamless integration of design, manufacturing, and retail.
            </p>
            <p>
              <strong>Our Vision:</strong> A world where every individual has access to perfectly fitted,
              culturally relevant, and sustainably produced fashion through AI-driven innovation.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="max-w-[1920px] mx-auto pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono uppercase tracking-widest text-gray-400 gap-4">
      <span>© 2025 S.T.A.R.K. INDUSTRIES. All Systems Nominal.</span>
      <div className="flex gap-6">
        <span className="cursor-pointer hover:text-black">Privacy Protocol</span>
        <span className="cursor-pointer hover:text-black">Terms of Operation</span>
      </div>
    </div>
  </section>
));

// --- Main Page ---
export default function FashionLandingPage() {
  const [activeProducts, setActiveProducts] = useState([]);
  const [modelLoaded, setModelLoaded] = useState(false);
  const servicesRef = useRef(null);
  const pricingRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    setModelLoaded(true);
    const timer = setTimeout(() => {
      setActiveProducts([1, 2]);
    }, 1400);
    return () => clearTimeout(timer);
  }, []);

  // Carousel Logic
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-open markers for Slide 1 (Image 5)
  useEffect(() => {
    if (currentSlide === 1) {
      const timer = setTimeout(() => {
        setActiveProducts(prev => {
          // Add m-3, m-4, m-5 if not present
          const newIds = ['m-3', 'm-4', 'm-5'];
          const unique = new Set([...prev, ...newIds]);
          return Array.from(unique);
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentSlide]);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % 2);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + 2) % 2);

  const slideData = [
    { left: `${process.env.PUBLIC_URL}/IMG_003.png`, center: `${process.env.PUBLIC_URL}/IMG_001.png`, right: `${process.env.PUBLIC_URL}/IMG_002.png`, showHotspots: true, scale: 1, markers: [], sideStyle: {} },
    {
      left: `${process.env.PUBLIC_URL}/4.png`, center: `${process.env.PUBLIC_URL}/5.png`, right: `${process.env.PUBLIC_URL}/6.png`, showHotspots: false, scale: 1.08, sideStyle: { top: '-64px' },
      markers: [
        // Image 4 (Left) - Short Sleeves / Oversized
        { x: 8, y: 40, label: "Short Sleeves" },
        { x: 16, y: 45, label: "Oversized Design" },
        { x: 14, y: 58, label: "Oversized Trouser" },

        // Image 5 (Center) - Floral / Short Pants
        { x: 48, y: 35, label: "Floral Signature" },
        { x: 52, y: 45, label: "Relaxed Fit" },
        { x: 50, y: 65, label: "Short Pants" },

        // Image 6 (Right) - Full Sleeves / Slim
        { x: 92, y: 42, label: "Full Sleeves" },
        { x: 84, y: 45, label: "Slim Cut Structure" },
        { x: 86, y: 58, label: "Tapered Pant" }
      ]
    }
  ];
  const { left, center, right, showHotspots, scale, markers, sideStyle } = slideData[currentSlide];

  const toggleProduct = (id) => {
    setActiveProducts(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleNavigate = (item) => {
    if (item === 'SERVICES' && servicesRef.current) {
      servicesRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (item === 'PRICING' && pricingRef.current) {
      pricingRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (item === 'CONTACT' && contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FDFBF7] text-black font-sans selection:bg-[#D90429] selection:text-white overflow-x-hidden flex flex-col relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Oswald:wght@500;700&display=swap');
        .writing-vertical { writing-mode: vertical-rl; text-orientation: mixed; }
        .mask-image-bottom { mask-image: linear-gradient(to bottom, black 80%, transparent 100%); }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-model-entry {
          animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        @keyframes popIn {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
          70% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        .animate-pop-in {
          animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0; /* Start hidden */
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(100%); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in-up {
          animation: slideInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes scanline {
          0% { top: 0%; opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scanline 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>

      {/* Sidebars - Hidden on mobile/small docked screens */}
      <div className="hidden 2xl:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col items-center gap-6 h-[50vh] z-40 animate-fade-in delay-500">
        <div className="w-10 flex-1 border-2 border-black rounded-full flex flex-col items-center py-4 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] justify-between">
          <div className="h-2 w-2 rounded-full bg-black mb-4"></div>
          <span className="writing-vertical text-[9px] font-bold tracking-widest text-black rotate-180 uppercase">AI Fashion Stylist</span>
          <div className="flex flex-col gap-2 mt-4">
            <div className="w-full h-[1px] bg-black"></div>
            <div className="w-full h-[1px] bg-black"></div>
          </div>
        </div>
        <div className="w-10 h-10 border-2 border-black rounded-full bg-[#4A0404] flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-white">
          <span className="text-[10px] font-bold">V2</span>
        </div>
      </div>

      <div className="hidden 2xl:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col items-center gap-6 h-[50vh] z-40 animate-fade-in delay-700">
        <div className="w-10 flex-1 border-2 border-black rounded-full flex flex-col items-center py-4 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] justify-between">
          <div className="w-2 h-2 rounded-full border border-black"></div>
          <div className="flex flex-col gap-8 items-center py-8">
            <span className="writing-vertical text-[9px] font-bold tracking-widest text-black uppercase hover:text-[#D90429] cursor-pointer">Discord</span>
            <span className="writing-vertical text-[9px] font-bold tracking-widest text-black uppercase hover:text-[#D90429] cursor-pointer">Youtube</span>
            <span className="writing-vertical text-[9px] font-bold tracking-widest text-black uppercase hover:text-[#D90429] cursor-pointer">Instagram</span>
          </div>
          <div className="h-2 w-2 rounded-full bg-black mt-4"></div>
        </div>
        <div className="w-10 h-10 border-2 border-black rounded-full bg-white flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:translate-y-1 transition-transform">
          <Download size={14} />
        </div>
      </div>

      <Navbar onNavigate={handleNavigate} />

      {/* Main Content Area - Layout allows growing/scrolling */}
      <main className="flex-1 w-full max-w-[1920px] mx-auto relative px-4 md:px-8 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Column: Text & Widget */}
        {/* Added padding bottom to prevent text hitting the banner on small screens */}
        <div className="z-20 flex flex-col justify-center lg:justify-start pt-8 lg:pt-12 pb-12 pointer-events-none lg:pointer-events-auto order-2 lg:order-1">
          <div className="relative pointer-events-auto">
            <div className="inline-block bg-[#D90429] text-white text-[9px] md:text-[10px] font-bold px-2 py-0.5 md:px-3 md:py-1 rounded-full mb-2 md:mb-4 animate-fade-in tracking-widest shadow-lg">
              LAUNCHING SOON
            </div>
            <TypingHeadline text={`JUST A\nRATHER VERY\nINTELLIGENT\nSTYLIST.`} />
          </div>

          <div className="pointer-events-auto max-w-[280px] md:max-w-md mt-4 relative pl-4 border-l-4 border-[#4A0404] animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <p className="text-[10px] md:text-xs font-bold text-gray-800 leading-relaxed uppercase tracking-wide">
              Create unique digital looks. Personalize the trends, and transform your wardrobe.
            </p>
          </div>

          {/* Widget - Avatar System */}
          <div className="pointer-events-auto mt-6 bg-white border-2 border-black rounded-[1.2rem] md:rounded-[2rem] p-2 pr-4 flex items-center gap-3 w-fit shadow-[4px_4px_0px_0px_rgba(74,4,4,1)] transform hover:-translate-y-1 transition-transform cursor-pointer group animate-fade-in" style={{ animationDelay: '1.2s' }}>
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl overflow-hidden bg-gradient-to-br from-[#4A0404] to-[#D90429] relative shrink-0 flex items-center justify-center">
              <div className="relative">
                <User size={16} className="text-white" />
                {/* 8-direction dots around the user icon */}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-0.5">
                <span className="bg-blue-100 border border-blue-300 text-[6px] md:text-[8px] px-2 py-0.5 rounded-full text-blue-700 font-bold tracking-wider uppercase">
                  Avatar
                </span>
              </div>
              <div className="text-xl md:text-2xl font-black font-['Oswald'] text-[#4A0404] leading-none">8D</div>
              <div className="text-[6px] md:text-[8px] font-bold leading-tight text-gray-400 uppercase mt-0.5">Capture System</div>
            </div>
          </div>
        </div>

        {/* Right Column: Model */}
        <div className={`absolute lg:relative inset-0 lg:inset-auto z-0 lg:z-10 flex items-center justify-center lg:justify-end transition-opacity duration-1000 order-1 lg:order-2 ${modelLoaded ? 'opacity-100' : 'opacity-0'
          }`}>
          <div className={`relative w-full h-[clamp(25rem,60vw,45rem)] xl:h-[50rem] lg:h-auto flex items-end justify-center lg:justify-end overflow-visible ${modelLoaded ? 'animate-model-entry' : ''
            }`}>
            {/* Left Side Image */}
            <img
              key={`left-${currentSlide}`}
              src={left}
              alt="AI Model Left"
              className="absolute left-0 h-full w-auto object-cover object-bottom opacity-40 lg:opacity-100 mix-blend-multiply lg:mix-blend-normal grayscale-[20%] lg:grayscale-0 mask-image-bottom transition-all duration-700 z-0 animate-fade-in"
              style={{
                filter: 'contrast(1.1) saturate(0.9)',
                transform: 'translateX(-5%)',
                ...sideStyle
              }}
            />

            {/* Right Side Image */}
            <img
              key={`right-${currentSlide}`}
              src={right}
              alt="AI Model Right"
              className="absolute right-0 h-full w-auto object-cover object-bottom opacity-40 lg:opacity-100 mix-blend-multiply lg:mix-blend-normal grayscale-[20%] lg:grayscale-0 mask-image-bottom transition-all duration-700 z-0 animate-fade-in"
              style={{
                filter: 'contrast(1.1) saturate(0.9)',
                transform: 'translateX(5%)',
                ...sideStyle
              }}
            />

            {/* Main Model Image (Center) */}
            <div className="relative z-10 flex items-end justify-center h-full">
              <img
                key={`center-${currentSlide}`}
                src={center}
                alt="AI Model Center"
                className="w-auto object-contain object-bottom mask-image-bottom drop-shadow-2xl opacity-40 lg:opacity-100 mix-blend-multiply lg:mix-blend-normal grayscale-[20%] lg:grayscale-0 transition-all duration-700 animate-fade-in"
                style={{
                  filter: 'contrast(1.1) saturate(0.9)',
                  height: '100%',
                  maxWidth: '100%',
                  transform: `scale(${scale || 1})`,
                  transformOrigin: 'bottom'
                }}
              />

              {/* Hotspots - Only for Slide 0 */}
              {showHotspots && (
                <div className="absolute inset-0 pointer-events-auto">
                  <ProductTag
                    x={55} y={35}
                    title="Structured Blazer"
                    price="$450"
                    isOpen={activeProducts.includes(1)}
                    onClick={() => toggleProduct(1)}
                    delay={800}
                  />
                  <ProductTag
                    x={75} y={70}
                    title="Pleated Trousers"
                    price="$220"
                    isOpen={activeProducts.includes(2)}
                    onClick={() => toggleProduct(2)}
                    delay={1000}
                  />
                </div>
              )}

              {/* Dynamic Markers for Slide 1+ */}
              {markers && markers.length > 0 && (
                <div className="absolute inset-0 pointer-events-auto hidden lg:block">
                  {markers.map((marker, idx) => (
                    <ProductTag
                      key={idx}
                      x={marker.x}
                      y={marker.y}
                      title={marker.label}
                      price={marker.price}
                      isOpen={activeProducts.includes(`m-${idx}`)}
                      onClick={() => toggleProduct(`m-${idx}`)}
                      delay={800 + (idx * 200)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Manual Navigation Controls */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-4 z-20">
              <button
                onClick={prevSlide}
                className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 group"
              >
                <ChevronRight size={20} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
              </button>
              <button
                onClick={nextSlide}
                className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 group"
              >
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* --- Bottom Banner --- */}
      <div className="relative w-full px-4 md:px-6 lg:px-24 pb-6 z-30 shrink-0">
        <div className="w-full mx-auto bg-[#4A0404] text-white rounded-[1.5rem] lg:rounded-[3rem] px-5 py-4 lg:px-12 lg:py-8 relative overflow-hidden shadow-[0_10px_30px_rgba(74,4,4,0.4)] animate-slide-in-up">
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"></div>
          <div className="relative z-10 flex items-center justify-between">
            {/* Left Text Group */}
            <div className="flex flex-col">
              <div className="w-fit flex items-center gap-2 border border-white/20 bg-white/5 rounded-full px-2 py-0.5 mb-1 lg:mb-3 text-[8px] lg:text-[9px] uppercase tracking-[0.2em] backdrop-blur-sm">
                <div className="w-1.5 h-1.5 bg-[#D90429] rounded-full animate-pulse"></div>
                Motion V.2
              </div>
              <h2 className="text-xl md:text-3xl lg:text-5xl font-black font-['Oswald'] leading-[0.9] uppercase tracking-tighter">
                Style in seconds.<br />
                <span className="text-white/50">Powered by AI.</span>
              </h2>
            </div>

            {/* Right Content Group */}
            <div className="flex flex-col items-end gap-2 lg:gap-4">
              <p className="hidden lg:block text-white/70 text-[10px] font-bold uppercase tracking-widest max-w-xs text-right">
                Transform the way you dress without limits.
              </p>
              <div className="flex items-center gap-2 md:gap-4">
                <button className="group bg-white text-[#4A0404] pl-4 pr-1.5 py-1.5 lg:pl-6 lg:pr-2 lg:py-2 rounded-full font-bold flex items-center gap-2 lg:gap-4 hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-lg">
                  <span className="tracking-wider text-[10px] md:text-xs whitespace-nowrap">JOIN WAITLIST</span>
                  <div className="w-6 h-6 lg:w-8 lg:h-8 bg-[#4A0404] rounded-full flex items-center justify-center text-white group-hover:rotate-90 transition-transform duration-300">
                    <Mail size={12} className="lg:w-4 lg:h-4" />
                  </div>
                </button>
              </div>
            </div>

            {/* Decor Icon */}
            <div className="absolute -right-4 -bottom-8 opacity-10 rotate-12 pointer-events-none">
              <Disc size={80} className="lg:w-[150px] lg:h-[150px]" />
            </div>
          </div>
        </div>
      </div>

      {/* --- SYS.NODES Section --- */}
      <SystemNodesSection />

      {/* --- Services Section (New) --- */}
      <ServicesSection ref={servicesRef} />

      {/* --- Pricing Section (New) --- */}
      <PricingSection ref={pricingRef} />

      {/* --- Contact Section (New) --- */}
      <ContactSection ref={contactRef} />
    </div>
  );
}