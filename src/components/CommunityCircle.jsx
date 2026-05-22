import { useState, useEffect, useRef } from "react";

const PROFILES = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&fit=crop&q=80",
  "https://images.unsplash.com/photo-1610652492500-ded49ceeb378?w=200&fit=crop&q=80",
  "https://images.unsplash.com/photo-1619365734050-cb5e64a42d43?w=200&fit=crop&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&fit=crop&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&fit=crop&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&fit=crop&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&fit=crop&q=80",
];


export default function CommunityCircle() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionTop = sectionRef.current.offsetTop;
      const p = Math.max(0, Math.min((window.scrollY - sectionTop) / 520, 1));
      setProgress(p);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const expandRadius = progress * 255;

  return (
    <section className="sec-light">

      {/* Circle animation — sticky scroll */}
      <div ref={sectionRef} style={{ minHeight: "200vh" }}>
        <div style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "sticky",
          top: 0,
          overflow: "hidden",
          background: "var(--bg, #f6f6fb)",
        }}>
          <div className="community-circle-wrap">
            {/* Outer ring */}
            <div style={{
              width: 560, height: 560,
              borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: `1.5px solid ${progress > 0.55 ? "rgba(124,58,237,0.18)" : "transparent"}`,
              transition: "border-color 0.6s ease",
              flexShrink: 0,
            }}>
              {/* Middle ring */}
              <div style={{
                width: 460, height: 460,
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: `1.5px solid ${progress > 0.18 ? "rgba(59,130,246,0.22)" : "transparent"}`,
                transition: "border-color 0.6s ease",
                flexShrink: 0,
              }}>
                {/* Brand gradient border ring */}
                <div style={{
                  width: 360, height: 360,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #3b82f6 0%, #7c3aed 50%, #db2777 100%)",
                  padding: 2.5,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {/* Inner circle */}
                  <div style={{
                    width: "100%", height: "100%",
                    borderRadius: "50%",
                    background: "var(--bg, #f6f6fb)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    position: "relative",
                  }}>
                    {/* Profile photos */}
                    {PROFILES.map((src, i) => {
                      const angle = (i / PROFILES.length) * 2 * Math.PI - Math.PI / 2;
                      return (
                        <div key={i} style={{
                          position: "absolute",
                          width: 72, height: 72,
                          borderRadius: 14,
                          overflow: "hidden",
                          border: "3px solid var(--bg, #f6f6fb)",
                          boxShadow: "0 4px 18px rgba(0,0,0,0.18)",
                          transform: `translate(${expandRadius * Math.cos(angle)}px, ${expandRadius * Math.sin(angle)}px)`,
                          transition: "transform 0.25s ease-out",
                          zIndex: 0,
                        }}>
                          <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                      );
                    })}

                    {/* Text inside the circle */}
                    <div style={{
                      position: "relative", zIndex: 20,
                      textAlign: "center", padding: "0 1.5rem",
                      opacity: progress > 0.42 ? 1 : 0,
                      transform: progress > 0.42 ? "scale(1)" : "scale(0.88)",
                      transition: "opacity 0.55s ease, transform 0.55s ease",
                    }}>
                      <h2 className="pbm-title-grad" style={{ fontSize: "clamp(20px,3vw,28px)", fontWeight: 700, lineHeight: 1.2, margin: "0 0 0.6rem" }}>
                        Build Faster.<br />Together.
                      </h2>
                      <p style={{ fontSize: "clamp(10px,1.2vw,12px)", color: "#555", lineHeight: 1.65, maxWidth: 210, margin: "0 auto" }}>
                        A community built around execution. Not endless motivation. Real support from people building alongside you.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .community-circle-wrap { display: flex; align-items: center; justify-content: center; }
        @media (max-width: 640px) {
          .community-circle-wrap { transform: scale(0.58); transform-origin: center center; }
        }
        @media (min-width: 641px) and (max-width: 900px) {
          .community-circle-wrap { transform: scale(0.78); transform-origin: center center; }
        }
      `}</style>
    </section>
  );
}
