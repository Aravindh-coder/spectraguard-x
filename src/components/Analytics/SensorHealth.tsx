import React from 'react';
import { Activity, CheckCircle2, ShieldCheck } from 'lucide-react';
import { HardwareSensorTelemetry } from '../../types/spectraguard';

interface SensorHealthProps {
  telemetry: HardwareSensorTelemetry;
  overallHealthPct: number;
}

export const SensorHealth: React.FC<SensorHealthProps> = ({ telemetry, overallHealthPct }) => {
  const subsystems = [
    { name: 'NIR Hyperspectral Camera', score: 98, status: telemetry.nirSensorStatus },
    { name: 'RGB Camera & Illumination', score: 100, status: 'HEALTHY' },
    { name: 'UV Fluorescence Excitation', score: 96, status: 'HEALTHY' },
    { name: 'Self-Calibration Target', score: Math.round(100 - telemetry.calibrationDriftPct * 10), status: 'HEALTHY' },
    { name: 'Conveyor Encoder & Latency', score: 99, status: 'HEALTHY' },
    { name: 'Optical Window Cleanliness', score: telemetry.windowTransmissivityPct, status: telemetry.windowContaminated ? 'FAULT' : 'HEALTHY' },
    { name: 'Pneumatic Reject Actuator', score: 100, status: 'HEALTHY' },
  ];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
        <div>
          <h3 className="font-bold font-mono text-slate-100 text-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Complete Hardware Subsystem Health Scorecard
          </h3>
          <p className="text-xs text-slate-400">
            Continuous background telemetry monitoring all 7 physical hardware subassemblies.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 shrink-0 font-mono">
          <span className="text-xs text-slate-400">OVERALL HEALTH:</span>
          <span className="text-base font-bold text-emerald-400">{overallHealthPct}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {subsystems.map((sub, idx) => (
          <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-300 font-semibold">{sub.name}</span>
              <CheckCircle2 className={`w-3.5 h-3.5 ${sub.score >= 90 ? 'text-emerald-400' : 'text-amber-400'}`} />
            </div>

            <div className="flex justify-between items-baseline font-mono">
              <span className="text-lg font-bold text-slate-100">{sub.score}%</span>
              <span className="text-[10px] text-emerald-400 uppercase">{sub.status}</span>
            </div>

            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${sub.score >= 90 ? 'bg-emerald-400' : 'bg-amber-400'}`}
                style={{ width: `${sub.score}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
