import React from 'react';
import { Activity, Fingerprint, TrendingUp } from 'lucide-react';
import { FoodProfile } from '../../types/spectraguard';

interface ProcessDriftProps {
  foodProfile: FoodProfile;
}

export const ProcessDrift: React.FC<ProcessDriftProps> = ({ foodProfile }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Box 1: Process Drift & Predictive Maintenance */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-bold font-mono text-slate-100 text-sm flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" /> Process Drift & Predictive Maintenance
          </h3>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
            NOMINAL
          </span>
        </div>

        <p className="text-xs text-slate-400">
          Tracks gradual population-level spectral shifts over time to alert plant engineers before raw material supplies or baking ovens drift out of specification.
        </p>

        <div className="space-y-2 text-xs font-mono">
          <div className="flex justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-400">Moisture Peak Shift (1450nm):</span>
            <span className="text-emerald-400 font-bold">+0.2nm (Within ±2nm Bound)</span>
          </div>
          <div className="flex justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-400">Lipid Absorbance Mean (1210nm):</span>
            <span className="text-cyan-400 font-bold">0.421 AU (Stable)</span>
          </div>
          <div className="flex justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-400">Batch Variance Population Sigma:</span>
            <span className="text-purple-400 font-bold">σ = 0.014</span>
          </div>
        </div>
      </div>

      {/* Box 2: Batch Fingerprinting */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-bold font-mono text-slate-100 text-sm flex items-center gap-2">
            <Fingerprint className="w-4 h-4 text-purple-400" /> Batch Fingerprinting Profile
          </h3>
          <span className="text-[10px] font-mono text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">
            Batch VX-2026-0926-001
          </span>
        </div>

        <p className="text-xs text-slate-400">
          Unique spectral passport generated for current raw material batch: <strong className="text-slate-200">{foodProfile.name}</strong>.
        </p>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
          <div className="flex justify-between">
            <span className="text-slate-400">Nominal Moisture Content:</span>
            <span className="text-cyan-400 font-bold">{foodProfile.nominalMoisturePct}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Nominal Lipid Concentration:</span>
            <span className="text-purple-400 font-bold">{foodProfile.nominalLipidPct}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Nominal Protein Content:</span>
            <span className="text-emerald-400 font-bold">{foodProfile.nominalProteinPct}%</span>
          </div>
          <div className="flex justify-between pt-1 border-t border-slate-800 text-[11px]">
            <span className="text-slate-500">Spectral Band Envelopes:</span>
            <span className="text-slate-300">{foodProfile.peakWavelengthsNm.join('nm, ')}nm</span>
          </div>
        </div>
      </div>
    </div>
  );
};
