import React from 'react';
import { 
  ArrowRight, 
  Radio, 
  BrainCircuit, 
  Wind, 
  CheckCircle2, 
  AlertOctagon 
} from 'lucide-react';
import { ScannedProduct } from '../../types/spectraguard';

interface ZoneTelemetryProps {
  products: ScannedProduct[];
  rejectFailures: number;
}

export const ZoneTelemetry: React.FC<ZoneTelemetryProps> = ({ products, rejectFailures }) => {
  const infeedCount = products.filter(p => p.xPos < 20).length;
  const sensingCount = products.filter(p => p.xPos >= 20 && p.xPos < 45).length;
  const fusionAiCount = products.filter(p => p.xPos >= 45 && p.xPos < 65).length;
  const rejectorCount = products.filter(p => p.xPos >= 65 && p.xPos < 85).length;
  const confirmCount = products.filter(p => p.xPos >= 85).length;

  const totalPassed = products.filter(p => p.xPos >= 85 && p.finalSafetyDecision === 'PASS').length;
  const totalIsolated = products.filter(p => p.finalSafetyDecision === 'ISOLATE').length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-2.5 my-3">
      {/* Zone 1: Infeed */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
          <span>INFEED</span>
          <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-xl font-bold font-mono text-slate-100">{infeedCount}</span>
          <span className="text-[10px] text-slate-500 font-mono">Queue</span>
        </div>
      </div>

      {/* Zone 2: HSI Sensing */}
      <div className="bg-slate-900/80 border border-cyan-900/40 rounded-xl p-3 flex flex-col justify-between">
        <div className="flex items-center justify-between text-cyan-400 text-xs font-mono">
          <span>SPECTRAL TUNNEL</span>
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-xl font-bold font-mono text-cyan-300">{sensingCount}</span>
          <span className="text-[10px] text-cyan-500 font-mono">NIR+UV+RGB</span>
        </div>
      </div>

      {/* Zone 3: Fusion AI */}
      <div className="bg-slate-900/80 border border-indigo-900/40 rounded-xl p-3 flex flex-col justify-between">
        <div className="flex items-center justify-between text-indigo-400 text-xs font-mono">
          <span>FUSION AI</span>
          <BrainCircuit className="w-3.5 h-3.5 text-indigo-400" />
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-xl font-bold font-mono text-indigo-300">{fusionAiCount}</span>
          <span className="text-[10px] text-indigo-500 font-mono">OOD / Risk</span>
        </div>
      </div>

      {/* Zone 4: Rejector */}
      <div className="bg-slate-900/80 border border-rose-900/40 rounded-xl p-3 flex flex-col justify-between">
        <div className="flex items-center justify-between text-rose-400 text-xs font-mono">
          <span>REJECTOR</span>
          <Wind className="w-3.5 h-3.5 text-rose-400" />
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-xl font-bold font-mono text-rose-400">{totalIsolated}</span>
          <span className="text-[10px] text-rose-500 font-mono">Air Jet</span>
        </div>
      </div>

      {/* Zone 5: Confirmation */}
      <div className="bg-slate-900/80 border border-emerald-900/40 rounded-xl p-3 flex flex-col justify-between">
        <div className="flex items-center justify-between text-emerald-400 text-xs font-mono">
          <span>VERIFIED PASS</span>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-xl font-bold font-mono text-emerald-300">{totalPassed}</span>
          <span className="text-[10px] text-emerald-500 font-mono">100% Valid</span>
        </div>
      </div>

      {/* Zone 6: Reject Failures Alarm */}
      <div className={`border rounded-xl p-3 flex flex-col justify-between transition-colors ${
        rejectFailures > 0 
          ? 'bg-rose-950/60 border-rose-600/80 text-rose-300 animate-pulse' 
          : 'bg-slate-900/80 border-slate-800 text-slate-400'
      }`}>
        <div className="flex items-center justify-between text-xs font-mono">
          <span>REJECT CONFIRM</span>
          <AlertOctagon className={`w-3.5 h-3.5 ${rejectFailures > 0 ? 'text-rose-400 animate-bounce' : 'text-slate-500'}`} />
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className={`text-xl font-bold font-mono ${rejectFailures > 0 ? 'text-rose-300' : 'text-slate-300'}`}>
            {rejectFailures}
          </span>
          <span className="text-[10px] font-mono opacity-80">
            {rejectFailures > 0 ? '🚨 ALARM' : 'Normal'}
          </span>
        </div>
      </div>
    </div>
  );
};
