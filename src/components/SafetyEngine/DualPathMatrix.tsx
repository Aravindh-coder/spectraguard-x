import React from 'react';
import { 
  ShieldCheck, 
  BrainCircuit, 
  CheckCircle2, 
  XCircle, 
  Sliders, 
  AlertTriangle,
  Zap
} from 'lucide-react';
import { HardwareSensorTelemetry } from '../../types/spectraguard';

interface DualPathMatrixProps {
  telemetry: HardwareSensorTelemetry;
  onSimulatePhysicsFailure: (fail: boolean) => void;
  physicsSimulatedFail: boolean;
}

export const DualPathMatrix: React.FC<DualPathMatrixProps> = ({
  telemetry,
  onSimulatePhysicsFailure,
  physicsSimulatedFail
}) => {
  const isPhysicsValid = !physicsSimulatedFail && 
    telemetry.calibrationDriftPct < 5.0 && 
    telemetry.windowTransmissivityPct >= 80 && 
    !telemetry.windowContaminated;

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-6 h-6 text-cyan-400" />
              <h2 className="text-lg font-bold text-slate-100 font-mono">
                AI + Physics Safety Layer (Dual Decision Vector)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Even if the AI model predicts NORMAL, the system will NEVER pass an item unless the physical sensing conditions (illumination lux, reference tile calibration, optical window transmissivity) are 100% verified.
            </p>
          </div>

          <button
            onClick={() => onSimulatePhysicsFailure(!physicsSimulatedFail)}
            className={`px-4 py-2 text-xs font-bold font-mono rounded-xl border shadow-lg transition-all flex items-center gap-2 ${
              physicsSimulatedFail
                ? 'bg-rose-600 hover:bg-rose-500 text-white border-rose-400 shadow-rose-600/30'
                : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border-amber-500/40'
            }`}
          >
            <Zap className="w-4 h-4" />
            {physicsSimulatedFail ? 'RESTORE PHYSICS VALIDITY' : 'SIMULATE SENSOR DRIFT FAILURE'}
          </button>
        </div>
      </div>

      {/* Decision Flowchart Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left Vector: AI Path */}
        <div className="bg-slate-950/80 border border-indigo-900/40 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-indigo-900/30 pb-3">
            <span className="font-bold text-indigo-300 font-mono flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-indigo-400" /> AI DECISION PATH
            </span>
            <span className="text-[10px] font-mono bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800">
              Multimodal Deep Learning
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
              <span className="text-slate-400">NIR Hyperspectral Spatial Classification</span>
              <span className="font-mono font-bold text-emerald-400">96.4% Confidence</span>
            </div>
            <div className="flex justify-between p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
              <span className="text-slate-400">Open-Set Anomaly Classifier</span>
              <span className="font-mono font-bold text-cyan-400">0.04 (Low Risk)</span>
            </div>
            <div className="flex justify-between p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
              <span className="text-slate-400">Monte Carlo Ensemble Disagreement</span>
              <span className="font-mono font-bold text-purple-400">0.02 (Consensus)</span>
            </div>
          </div>

          <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl flex items-center justify-between text-xs">
            <span className="font-mono font-semibold text-emerald-300">AI PREDICTION:</span>
            <span className="font-mono font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> NORMAL
            </span>
          </div>
        </div>

        {/* Right Vector: Physics Safety Path */}
        <div className={`border rounded-2xl p-5 space-y-4 transition-all ${
          isPhysicsValid ? 'bg-slate-950/80 border-cyan-900/40' : 'bg-rose-950/30 border-rose-600/60'
        }`}>
          <div className="flex items-center justify-between border-b border-cyan-900/30 pb-3">
            <span className="font-bold font-mono flex items-center gap-2 text-cyan-300">
              <Sliders className="w-5 h-5 text-cyan-400" /> PHYSICS DECISION PATH
            </span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
              isPhysicsValid 
                ? 'bg-cyan-950 text-cyan-300 border-cyan-800' 
                : 'bg-rose-950 text-rose-300 border-rose-800'
            }`}>
              Hardware Hardware Telemetry
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
              <span className="text-slate-400">Reference Tile Spectral Drift</span>
              <span className={`font-mono font-bold ${
                telemetry.calibrationDriftPct < 5.0 && !physicsSimulatedFail ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {physicsSimulatedFail ? '8.4% (EXCEEDED)' : `${telemetry.calibrationDriftPct}% (Calibrated)`}
              </span>
            </div>

            <div className="flex justify-between p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
              <span className="text-slate-400">Optical Window Transmissivity</span>
              <span className={`font-mono font-bold ${
                telemetry.windowTransmissivityPct >= 80 && !physicsSimulatedFail ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {physicsSimulatedFail ? '71.2% (Residue Contaminated)' : `${telemetry.windowTransmissivityPct}% Clean`}
              </span>
            </div>

            <div className="flex justify-between p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
              <span className="text-slate-400">Illumination Intensity & Shutter</span>
              <span className="font-mono font-bold text-cyan-400">96,400 Lux (Nominal)</span>
            </div>
          </div>

          <div className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
            isPhysicsValid 
              ? 'bg-emerald-950/40 border-emerald-500/30' 
              : 'bg-rose-950/60 border-rose-500/50'
          }`}>
            <span className="font-mono font-semibold text-slate-200">PHYSICS STATUS:</span>
            <span className={`font-mono font-bold flex items-center gap-1 ${
              isPhysicsValid ? 'text-emerald-400' : 'text-rose-400'
            }`}>
              {isPhysicsValid ? (
                <> <CheckCircle2 className="w-4 h-4" /> CONDITIONS VALID </>
              ) : (
                <> <XCircle className="w-4 h-4" /> CONDITIONS INVALID </>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Final Safety Decision Combined Box */}
      <div className={`p-5 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4 transition-all shadow-xl ${
        isPhysicsValid 
          ? 'bg-slate-900/90 border-emerald-500/40 text-emerald-100' 
          : 'bg-rose-950/70 border-rose-500/80 text-rose-100 animate-pulse'
      }`}>
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
            isPhysicsValid ? 'bg-emerald-500/20 border-emerald-500/40' : 'bg-rose-500/30 border-rose-400'
          }`}>
            {isPhysicsValid ? (
              <ShieldCheck className="w-7 h-7 text-emerald-400" />
            ) : (
              <AlertTriangle className="w-7 h-7 text-rose-400" />
            )}
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
              COMBINED SAFETY DECISION ENGINE
            </div>
            <div className="text-xl font-bold font-mono">
              {isPhysicsValid ? 'PASS PERMITTED' : 'OVERRIDE TO ISOLATE / REJECT'}
            </div>
            <p className="text-xs opacity-90 mt-0.5">
              {isPhysicsValid 
                ? 'Both AI inference and physical sensor conditions pass all safety constraints.' 
                : '⚠️ SAFETY OVERRIDE ACTIVE: Physics safety path detected uncalibrated drift or window contamination. Product is forced to ISOLATE despite AI score.'}
            </p>
          </div>
        </div>

        <div className="text-right font-mono shrink-0">
          <span className={`px-4 py-2 rounded-xl text-sm font-bold border ${
            isPhysicsValid 
              ? 'bg-emerald-950 text-emerald-300 border-emerald-700' 
              : 'bg-rose-900 text-white border-rose-500'
          }`}>
            {isPhysicsValid ? 'DECISION: PASS' : 'DECISION: ISOLATE'}
          </span>
        </div>
      </div>
    </div>
  );
};
