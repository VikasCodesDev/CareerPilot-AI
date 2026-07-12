"use client";

import { cn } from "@/lib/utils";

type ChartPoint = {
  label: string;
  value: number;
};

type WorkspaceAreaChartProps = {
  data: ChartPoint[];
  height?: number;
  className?: string;
  showGrid?: boolean;
};

export function WorkspaceAreaChart({
  data,
  height = 160,
  className,
  showGrid = true,
}: WorkspaceAreaChartProps) {
  const max = Math.max(...data.map((point) => point.value), 1);
  const width = 100;
  const padding = 4;
  const chartHeight = height - padding * 2;
  const step = data.length > 1 ? width / (data.length - 1) : width;

  const points = data.map((point, index) => {
    const x = index * step;
    const y = chartHeight - (point.value / max) * chartHeight + padding;
    return { x, y, ...point };
  });

  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1]?.x ?? 0} ${height} L 0 ${height} Z`;

  return (
    <div className={cn("workspace-chart", className)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-full w-full"
        preserveAspectRatio="none"
        role="img"
        aria-label="Area chart"
      >
        <defs>
          <linearGradient id="workspace-area-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.35)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
          </linearGradient>
          <linearGradient id="workspace-line-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#d946ef" />
          </linearGradient>
        </defs>
        {showGrid
          ? [0.25, 0.5, 0.75].map((ratio) => (
              <line
                key={ratio}
                x1="0"
                y1={padding + chartHeight * ratio}
                x2={width}
                y2={padding + chartHeight * ratio}
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="0.15"
              />
            ))
          : null}
        <path d={areaPath} fill="url(#workspace-area-fill)" />
        <path
          d={linePath}
          fill="none"
          stroke="url(#workspace-line-stroke)"
          strokeWidth="0.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((point) => (
          <circle
            key={point.label}
            cx={point.x}
            cy={point.y}
            r="0.8"
            fill="#d946ef"
            className="opacity-0 transition-opacity hover:opacity-100"
          />
        ))}
      </svg>
      <div className="mt-3 flex justify-between gap-2">
        {data.map((point) => (
          <span key={point.label} className="text-[0.65rem] text-muted-foreground">
            {point.label}
          </span>
        ))}
      </div>
    </div>
  );
}

type WorkspaceBarChartProps = {
  data: ChartPoint[];
  className?: string;
};

export function WorkspaceBarChart({ data, className }: WorkspaceBarChartProps) {
  const max = Math.max(...data.map((point) => point.value), 1);

  return (
    <div className={cn("workspace-chart", className)}>
      <div className="flex h-40 items-end justify-between gap-2">
        {data.map((point, index) => (
          <div key={point.label} className="group flex flex-1 flex-col items-center gap-2">
            <div className="relative flex h-full w-full items-end">
              <div
                className="workspace-bar w-full rounded-t-lg transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.35)]"
                style={{
                  height: `${(point.value / max) * 100}%`,
                  animationDelay: `${index * 80}ms`,
                }}
                role="presentation"
              />
            </div>
            <span className="text-[0.65rem] text-muted-foreground">{point.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

type WorkspaceDonutChartProps = {
  segments: { label: string; value: number; color: string }[];
  size?: number;
  centerLabel?: string;
  centerValue?: string;
  className?: string;
};

export function WorkspaceDonutChart({
  segments,
  size = 140,
  centerLabel,
  centerValue,
  className,
}: WorkspaceDonutChartProps) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0) || 1;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        {segments.map((segment) => {
          const dash = (segment.value / total) * circumference;
          const currentOffset = offset;
          offset += dash;
          return (
            <circle
              key={segment.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-currentOffset}
              strokeLinecap="round"
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {centerValue ? (
          <span className="text-2xl font-bold tabular-nums">{centerValue}</span>
        ) : null}
        {centerLabel ? (
          <span className="text-[0.65rem] text-muted-foreground">{centerLabel}</span>
        ) : null}
      </div>
    </div>
  );
}
