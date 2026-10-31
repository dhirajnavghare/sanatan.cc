'use client';

interface MoonVisualizerProps {
  phaseAngleDeg: number;
  illuminationFraction: number;
  phaseName: string;
  size?: number;
}

export default function MoonVisualizer({
  phaseAngleDeg,
  illuminationFraction,
  phaseName,
  size = 88,
}: MoonVisualizerProps) {
  const normAngle = ((phaseAngleDeg % 360) + 360) % 360;
  const isWaning = normAngle > 180;
  const angleFromNew = isWaning ? 360 - normAngle : normAngle;
  const k = Math.cos((angleFromNew * Math.PI) / 180);
  const rx = Math.max(0.1, Math.abs(k) * 30);
  const sweep = k > 0 ? 0 : 1;
  const percent = Math.round(illuminationFraction * 100);

  return (
    <div className="flex flex-col items-center justify-center gap-1.5" title={`${phaseName} (${percent}% illuminated)`}>
      <div className="relative">
        <svg
          viewBox="0 0 64 64"
          width={size}
          height={size}
          role="img"
          aria-label={`Moon phase: ${phaseName}, ${percent}% illuminated`}
          className="drop-shadow-[0_0_12px_rgba(245,208,135,0.25)]"
        >
          <defs>
            <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff3db" />
              <stop offset="70%" stopColor="#f5ddaa" />
              <stop offset="100%" stopColor="#e2be7e" />
            </radialGradient>
            <radialGradient id="darkSide" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#141638" />
              <stop offset="100%" stopColor="#08091a" />
            </radialGradient>
          </defs>

          {/* Dark circle base */}
          <circle
            cx="32"
            cy="32"
            r="30"
            fill="url(#darkSide)"
            stroke="#d4a34b"
            strokeOpacity="0.4"
            strokeWidth="1.2"
          />

          {/* Lit crescent/gibbous path */}
          {percent > 0 && (
            <path
              transform={isWaning ? 'translate(64 0) scale(-1 1)' : undefined}
              d={`M 32 2 A 30 30 0 0 1 32 62 A ${rx.toFixed(2)} 30 0 0 ${sweep} 32 2 Z`}
              fill="url(#moonGlow)"
            />
          )}
        </svg>
      </div>

      <div className="text-center">
        <span className="block text-xs font-semibold text-amber-200">
          {percent}%
        </span>
        <span className="block text-[11px] text-zinc-300">
          {phaseName}
        </span>
      </div>
    </div>
  );
}
