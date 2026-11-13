"use client";

import { useState } from "react";

export function LodgingSearch({ value, options, onChange, className, placeholder = "输入城市或酒店关键词" }: {
  value: string;
  options: (string | undefined)[];
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}) {
  const [searching, setSearching] = useState(false);
  const [active, setActive] = useState(-1);
  const matches = searching && value.trim()
    ? [...new Set(options)].filter((option): option is string => typeof option === "string" && option.toLowerCase().includes(value.trim().toLowerCase())).slice(0, 8)
    : [];
  const select = (option: string) => { onChange(option); setSearching(false); setActive(-1); };
  return <div style={{ position: "relative", flex: 1, minWidth: 0 }}>
    <input className={className} value={value} placeholder={placeholder} autoComplete="off" aria-label="住宿城市或酒店关键词"
      onChange={event => { onChange(event.target.value); setSearching(true); setActive(-1); }}
      onBlur={() => setSearching(false)}
      onKeyDown={event => {
        if (event.key === "Escape") setSearching(false);
        if (matches.length && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
          event.preventDefault(); setActive(index => (index + (event.key === "ArrowDown" ? 1 : -1) + matches.length) % matches.length);
        }
        if (event.key === "Enter" && active >= 0 && matches[active]) { event.preventDefault(); select(matches[active]); }
      }} />
    {matches.length > 0 && <div style={{ position: "absolute", top: "100%", left: 0, right: 0, zIndex: 30, background: "#fffdf9", border: "1px solid #ded4c9", borderRadius: 8, padding: 4, boxShadow: "0 8px 20px #0002" }}>
      {matches.map((option, index) => <button key={option} type="button" onMouseDown={event => event.preventDefault()} onClick={() => select(option)} style={{ display: "block", width: "100%", textAlign: "left", padding: "8px 10px", border: 0, color: "#403831", background: index === active ? "#f4eee6" : "transparent" }}>{option}</button>)}
    </div>}
  </div>;
}
