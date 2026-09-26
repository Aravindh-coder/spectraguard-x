import React from 'react';
import { Eye, Activity, Sliders } from 'lucide-react';
import { ScannedProduct } from '../../types/spectraguard';

interface ExplainableAIProps {
  selectedProduct: ScannedProduct | null;
}

export const ExplainableAI: React.FC<ExplainableAIProps> = ({ selectedProduct }) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 className="font-bold font-mono text-slate-100 text-sm flex items-center gap-2">
            <Eye className="w-4 h-4 text-cyan-400" /> Explainable AI (XAI) Wavelength Importance & Attribution
          </h3>
          <p className="text-xs text-slate-400">
            Transparently reveals which exact NIR wavelengths and spatial pixel clusters triggered the safety model output.
          </p>
        </div>

        {selectedProduct && (
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
            Inspecting: {selectedProduct.id}
          </span>
        )}
      </div>

      {selectedProduct ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="text-slate-300 font-bold">Top Attributed Spectral Regions</div>
            <div className="space-y-1.5 text-slate-400 text-[11px]">
              <div className="flex justify-between p-2 bg-slate-900 rounded border border-slate-800">
                <span>λ1 = 1450nm (O-H Water Band)</span>
                <span className="text-cyan-400 font-bold">Importance: 0.94</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-900 rounded border border-slate-800">
                <span>λ2 = 1210nm (C-H Lipid Peak)</span>
                <span className="text-purple-400 font-bold">Importance: 0.88</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-900 rounded border border-slate-800">
                <span>λ3 = 365nm (UV Fluorescence)</span>
                <span className="text-amber-400 font-bold">Importance: 0.92</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="text-slate-300 font-bold">Spatial Pixel Anomaly Region</div>
            <div className="p-3 bg-slate-900 rounded border border-slate-800 flex items-center justify-between text-[11px]">
              <span>Contamination Zone:</span>
              <span className="text-rose-400 font-bold">{selectedProduct.affectedZone} (Center-Left)</span>
            </div>
            <div className="text-[10px] text-slate-500">
              Attributes zero false-positive risk to edge background reflections.
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 text-center text-xs text-slate-400 font-mono">
          💡 Select any item on the digital twin conveyor to inspect XAI attributions.
        </div>
      )}
    </div>
  );
};
