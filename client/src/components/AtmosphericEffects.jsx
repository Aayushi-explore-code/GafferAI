import { memo, useMemo } from "react";

/*
 * Pure CSS atmospheric effects layered behind all content.
 * Fog drift, floodlight beams, floating particles, and a soft vignette.
 * Everything is pointer-events-none so it never blocks interaction.
 */

/* Deterministic particle positions — no random at render time to avoid hydration issues. */
const PARTICLE_CONFIGS = [
  { left: "12%", top: "18%", anim: "particle-float-1", dur: "9s", delay: "0s", size: 2 },
  { left: "28%", top: "42%", anim: "particle-float-2", dur: "11s", delay: "1.2s", size: 1.5 },
  { left: "45%", top: "65%", anim: "particle-float-3", dur: "13s", delay: "0.5s", size: 2.5 },
  { left: "62%", top: "22%", anim: "particle-float-1", dur: "10s", delay: "2s", size: 1.5 },
  { left: "78%", top: "55%", anim: "particle-float-2", dur: "12s", delay: "0.8s", size: 2 },
  { left: "88%", top: "35%", anim: "particle-float-3", dur: "14s", delay: "1.5s", size: 1.5 },
  { left: "8%",  top: "72%", anim: "particle-float-1", dur: "11s", delay: "3s", size: 2 },
  { left: "35%", top: "88%", anim: "particle-float-2", dur: "9s",  delay: "0.3s", size: 1.5 },
  { left: "55%", top: "12%", anim: "particle-float-3", dur: "12s", delay: "2.5s", size: 2 },
  { left: "72%", top: "78%", anim: "particle-float-1", dur: "10s", delay: "1s", size: 1.5 },
  { left: "92%", top: "62%", anim: "particle-float-2", dur: "13s", delay: "0.7s", size: 2 },
  { left: "18%", top: "48%", anim: "particle-float-3", dur: "11s", delay: "2.2s", size: 1.5 },
];

function AtmosphericEffects() {
  const particles = useMemo(() => PARTICLE_CONFIGS, []);

  return (
    <div className="atmo-layer" aria-hidden="true">
      {/* Floodlight beams */}
      <div className="atmo-floodlight atmo-floodlight--left" />
      <div className="atmo-floodlight atmo-floodlight--right" />

      {/* Fog layer */}
      <div className="atmo-fog" />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="atmo-particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animation: `${p.anim} ${p.dur} ease-in-out ${p.delay} infinite`,
          }}
        />
      ))}

      {/* Vignette */}
      <div className="atmo-vignette" />
    </div>
  );
}

export default memo(AtmosphericEffects);
