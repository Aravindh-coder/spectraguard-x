import React from 'react';
import { Layers, AlertTriangle } from 'lucide-react';
import { ScannedProduct } from '../../types/spectraguard';

interface ContaminationHeatmapProps {
  products: ScannedProduct[];
}

export const ContaminationHeatmap: React.FC<ContaminationHeatmapProps> = ({ products }) => {
  const zoneCounts = {
    'Zone A': products.filter(p => p.affectedZone === 'Zone A' && p.finalSafetyDecision === 'ISOLATE').length,
    'Zone B': products.filter(p => p.affectedZone === 'Zone B' && p.finalSafetyDecision === 'ISOLATE').length,
    'Zone C': products.filter(p => p.affectedZone === 'Zone C' && p.finalSafetyDecision === 'ISOLATE').length,
    'Zone D': products.filter(p => p.affectedZone === 'Zone D' && p.finalSafetyDecision === 'ISOLATE').length,
  };

  const totalAnomalies = Object.values(zoneCounts).reduce((a, b) => a + b, 0) || 1;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 className="font-bold font-mono text-slate-100 text-sm flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" /> Spatial Contamination-Risk Heatmap Across Conveyor Lanes
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Identifies upstream mechanical component failures (e.g. Zone B belt roller wear or specific sorting chute contamination).
          </p>
        </div>
        <span className="text-xs font-mono text-rose-400 bg-rose-950 px-2.5 py-1 rounded border border-rose-800">
          Total Anomalies: {totalAnomalies}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {(['Zone A', 'Zone B', 'Zone C', 'Zone D'] as const).map((zone) => {
          const count = zoneCounts[zone];
          const pct = Math.round((count / totalAnomalies) * 100);

          return (
            <div key={zone} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center font-mono text-xs text-slate-300">
                <span>{zone}</span>
                <span className="text-rose-400 font-bold">{count} Defects</span>
              </div>

              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${
                    pct > 40 ? 'bg-rose-500' : pct > 20 ? 'bg-amber-500' : 'bg-cyan-500'
                  }`}
                  style={{ width: `${Math.max(5, pct)}%` }}
                ></div>
              </div>

              <div className="text-[10px] text-slate-400 font-mono text-right">
                {pct}% of Total Risk
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
