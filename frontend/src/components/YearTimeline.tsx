import { useEffect, useMemo, useRef } from "react";

interface YearTimelineProps {
  date: string;
  onChange: (date: string) => void;
  availableYears: number[];
}

export function YearTimeline({ date, onChange, availableYears }: YearTimelineProps) {
  const selectedYear = date ? Number(date.slice(0, 4)) : availableYears[0];
  const activeMarker = useRef<HTMLButtonElement>(null);
  const years = useMemo(
    () => {
      const first = Math.min(selectedYear - 5, ...availableYears);
      const last = Math.max(selectedYear + 5, ...availableYears);
      return Array.from({ length: last - first + 1 }, (_, index) => first + index);
    },
    [availableYears, selectedYear],
  );

  useEffect(() => {
    activeMarker.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [selectedYear]);

  return (
    <div className="timeline" aria-label="Select a year">
      <div className="timeline-track">
        {years.map((year) => {
          const selected = Boolean(date) && year === selectedYear;
          return (
            <button
              aria-label={`Select year ${year}`}
              aria-pressed={selected}
              className="year-marker"
              data-available={availableYears.includes(year)}
              key={year}
              onClick={() => onChange(dateInYear(date, year))}
              ref={year === selectedYear ? activeMarker : undefined}
              type="button"
            >
              <span className="year-dot" />
              <span>{year}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function dateInYear(date: string, year: number): string {
  if (!date) return `${year}-12-01`;
  const month = Number(date.slice(5, 7));
  const requestedDay = Number(date.slice(8, 10));
  const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  return `${year}-${String(month).padStart(2, "0")}-${String(Math.min(requestedDay, lastDay)).padStart(2, "0")}`;
}
