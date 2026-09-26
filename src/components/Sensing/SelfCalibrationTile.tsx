import React from 'react';
import { 
  RefreshCw, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Activity,
  Layers
} from 'lucide-react';
import { HardwareSensorTelemetry } from '../../types/spectraguard';

interface SelfCalibrationTileProps {
  telemetry: HardwareSensorTelemetry;
  onTriggerCalibration: () => void;
  onToggleWindowResidue: () => void;
}

export const SelfCalibrationTile: React.FC<SelfCalibrationTileProps> = ({
  telemetry,
  onTriggerCalibration,
  onToggleWindowResidue
}) => {
  const isClean = telemetry.windowTransmissivityPct >= 85 && !telemetry.windowContaminated;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Box 1: Automatic Self-Calibration Tunnel Reference */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="font-bold font-mono text-slate-200 text-sm flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-cyan-400" /> Automatic Self-Calibration Protocol
          </span>
          <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">
            99% Spectralon White Tile
          </span>
        </div>

        <p className="text-xs text-slate-400">
          Internal motorized reference target swings into optical path periodically. Automatically compensates for halogen/LED aging and NIR sensor thermal drift.
        </p>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-500 font-mono text-[11px]">Spectral Baseline Drift</span>
            <div className="text-lg font-bold font-mono text-emerald-400 mt-1">
              {telemetry.calibrationDriftPct}%
            </div>
            <span className="text-[10px] text-slate-500">Max Allowed: 5.0%</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-500 font-mono text-[11px]">Last Calibration Timestamp</span>
            <div className="text-sm font-bold font-mono text-slate-200 mt-1">
              {telemetry.calibratedAt}
            </div>
            <span className="text-[10px] text-emerald-400">Auto-Pass Verified</span>
          </div>
        </div>

        <button
          onClick={onTriggerCalibration}
          className="w-full py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold font-mono text-xs rounded-xl shadow-lg shadow-cyan-600/20 transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> RE-EXECUTE SELF-CALIBRATION SEQUENCE
        </button>
      </div>

      {/* Box 2: Optical Window Residue & Dust Detection */}
      <div className={`border rounded-2xl p-5 space-y-4 transition-all ${
        isClean ? 'bg-slate-900/80 border-slate-800' : 'bg-rose-950/40 border-rose-500/60 shadow-xl'
      }`}>
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="font-bold font-mono text-slate-200 text-sm flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-400" /> Optical Window Contamination Sensor
          </span>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
            isClean ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-rose-950 text-rose-300 border-rose-800'
          }`}>
            {isClean ? 'WINDOW CLEAN' : '⚠️ RESIDUE DETECTED'}
          </span>
        </div>

        <p className="text-xs text-slate-400">
          Monitors transmissive degradation on the quartz inspection window caused by dust or food oil accumulation.
        </p>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-mono">Transmissivity Index:</span>
            <span className={`font-mono font-bold ${isClean ? 'text-emerald-400' : 'text-rose-400'}`}>
              {telemetry.windowTransmissivityPct}%
            </span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all ${isClean ? 'bg-emerald-400' : 'bg-rose-500'}`}
              style={{ width: `${telemetry.windowTransmissivityPct}%` }}
            ></div>
          </div>
        </div>

        {/* Warning Prompt */}
        {!isClean && (
          <div className="p-3 bg-rose-950/60 border border-rose-500/50 rounded-xl text-rose-200 text-xs font-mono flex items-center gap-2 animate-pulse">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
            <span>⚠️ CLEAN OPTICAL WINDOW — Transmissive signal degradation exceeds 15% threshold!</span>
          </div>
        )}

        <button
          onClick={onToggleWindowResidue}
          className={`w-full py-2.5 font-bold font-mono text-xs rounded-xl border transition-all flex items-center justify-center gap-2 ${
            isClean 
              ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border-amber-500/40' 
              : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          {isClean ? 'SIMULATE DUST / DIRT ACCUMULATION' : 'WIPE & CLEAN OPTICAL WINDOW'}
        </button>
      </div>
    </div>
  );
};
