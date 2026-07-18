import { memo } from "react";

const tickerItems = [
  { type: "live", text: "LIVE" },
  { type: "goal", text: "⚽ Goal! Saka 34'" },
  { type: "info", text: "🅿️ Parking Lot C: 82% Full" },
  { type: "info", text: "🌡️ 22°C Clear Skies" },
  { type: "info", text: "⏱️ Food Court Queue: ~4 min" },
  { type: "info", text: "🍕 Italian Kitchen Now Open" },
  { type: "info", text: "🔒 Gate D Security: Low Wait" },
  { type: "alert", text: "📢 Turnstiles Open — Gates A–F" },
  { type: "info", text: "🚶 Crowd Density: Moderate" },
  { type: "info", text: "🎫 Block 214 Filling Fast" },
];

function LiveTicker() {
  /* Duplicate the items so the CSS scroll loops seamlessly. */
  const doubledItems = [...tickerItems, ...tickerItems];

  return (
    <div className="live-ticker relative z-30" aria-label="Live updates ticker">
      <div className="live-ticker-track py-2.5">
        {doubledItems.map((item, i) => (
          <span key={i} className="live-ticker-item">
            {item.type === "live" ? (
              <span className="live-ticker-live">{item.text}</span>
            ) : (
              <>
                <span className="ticker-dot" />
                <span
                  className={
                    item.type === "goal"
                      ? "text-yellow-300 font-semibold"
                      : item.type === "alert"
                        ? "text-yellow-200/90"
                        : ""
                  }
                >
                  {item.text}
                </span>
              </>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

export default memo(LiveTicker);
