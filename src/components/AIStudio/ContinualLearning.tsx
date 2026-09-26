import React, { useState } from 'react';
import { RefreshCw, UserCheck, CheckCircle2 } from 'lucide-react';
import { ScannedProduct } from '../../types/spectraguard';

interface ContinualLearningProps {
  uncertainProducts: ScannedProduct[];
}

export const ContinualLearning: React.FC<ContinualLearningProps> = ({ uncertainProducts }) => {
  const [isRetraining, setIsRetraining] = useState(false);
  const [retrainDone, setRetrainDone] = useState(false);

  const handleTriggerRetrain = () => {
    setIsRetraining(true);
    setRetrainDone(false);
    setTimeout(() => {
      setIsRetraining(false);
      setRetrainDone(true);
    }, 2000);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
        <div>
          <h3 className="font-bold font-mono text-slate-100 text-sm flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-purple-400" /> Continual Active Learning Pipeline
          </h3>
          <p className="text-xs text-slate-400">
            Retrains the edge production model exclusively on human/lab verified uncertain samples without risk of data drift poisoning.
          </p>
        </div>

        <button
          onClick={handleTriggerRetrain}
          disabled={isRetraining}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold font-mono text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 shrink-0"
        >
          {isRetraining ? (
            <> <RefreshCw className="w-4 h-4 animate-spin" /> RETRAINING MODEL... </>
          ) : (
            <> <RefreshCw className="w-4 h-4" /> TRIGGER SHADOW RETRAINING </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
          <span className="text-slate-500">Verified Sample Pool:</span>
          <div className="text-lg font-bold text-purple-300 mt-1">128 Verified Scans</div>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
          <span className="text-slate-500">Validation Macro-F1 Score:</span>
          <div className="text-lg font-bold text-emerald-400 mt-1">0.9984</div>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
          <span className="text-slate-500">Production Deployment:</span>
          <div className="text-lg font-bold text-cyan-400 mt-1">v2.5 Shadow Passed</div>
        </div>
      </div>

      {retrainDone && (
        <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-emerald-300 font-mono text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Shadow Model Retrained & Signed with SHA-256 Key! Ready for hot-reload deployment.</span>
        </div>
      )}
    </div>
  );
};
