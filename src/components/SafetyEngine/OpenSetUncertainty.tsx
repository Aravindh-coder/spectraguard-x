import React from 'react';
import { 
  AlertCircle, 
  HelpCircle, 
  ShieldAlert, 
  Activity, 
  CheckCircle,
  HelpCircle as QuestionIcon
} from 'lucide-react';
import { UncertaintyMetrics } from '../../types/spectraguard';

interface OpenSetUncertaintyProps {
  uncertainty: UncertaintyMetrics;
}

export const OpenSetUncertainty: React.FC<OpenSetUncertaintyProps> = ({ uncertainty }) => {
  return (
    <div className="space-y-5">
      {/* Open-Set Classification Matrix Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* State 1: NORMAL */}
        <div className="bg-slate-900/80 border border-emerald-900/40 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs font-mono text-emerald-400">NORMAL</span>
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-[11px] text-slate-400">
            Known standard food profile. Low Mahalanobis distance (&lt;1.5). High confidence.
          </p>
          <div className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded border border-emerald-800">
            Action: Direct Conveyor Pass
          </div>
        </div>

        {/* State 2: KNOWN ANOMALY */}
        <div className="bg-slate-900/80 border border-rose-900/40 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs font-mono text-rose-400">KNOWN ANOMALY</span>
            <AlertCircle className="w-4 h-4 text-rose-400" />
          </div>
          <p className="text-[11px] text-slate-400">
            Trained defect spectrum (e.g. polymer plastic, metallic shard, mold spores).
          </p>
          <div className="text-[10px] font-mono text-rose-400 bg-rose-950/60 px-2 py-1 rounded border border-rose-800">
            Action: Pneumatic Ejection
          </div>
        </div>

        {/* State 3: UNKNOWN ANOMALY */}
        <div className="bg-purple-950/30 border border-purple-500/50 rounded-xl p-4 space-y-2 shadow-lg shadow-purple-950/40">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs font-mono text-purple-300">UNKNOWN ANOMALY</span>
            <ShieldAlert className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-[11px] text-purple-200">
            Out-of-Distribution (OOD). Spectral signature significantly deviates from training manifold.
          </p>
          <div className="text-[10px] font-bold font-mono text-purple-300 bg-purple-900/60 px-2 py-1 rounded border border-purple-600">
            ⚠️ HUMAN / LAB VERIFY REQUIRED
          </div>
        </div>

        {/* State 4: UNCERTAIN */}
        <div className="bg-slate-900/80 border border-amber-900/40 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs font-mono text-amber-400">UNCERTAIN</span>
            <QuestionIcon className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-[11px] text-slate-400">
            High ensemble model disagreement or borderline confidence score (50-70%).
          </p>
          <div className="text-[10px] font-mono text-amber-400 bg-amber-950/60 px-2 py-1 rounded border border-amber-800">
            Action: HITL Active Learning Queue
          </div>
        </div>
      </div>

      {/* 7 Core Uncertainty Metrics Breakdown */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-bold font-mono text-slate-200 text-sm flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" /> 7-Metric Uncertainty-Aware Architecture Telemetry
          </h3>
          <span className="text-xs text-slate-400 font-mono">Real-Time Metric Evaluation</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {/* Metric 1 */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="text-[11px] text-slate-400 font-mono">1. Classification Confidence</div>
            <div className="text-lg font-bold font-mono text-cyan-400 mt-1">{uncertainty.classificationConfidence}%</div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${uncertainty.classificationConfidence}%` }}></div>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="text-[11px] text-slate-400 font-mono">2. Anomaly Score</div>
            <div className="text-lg font-bold font-mono text-rose-400 mt-1">{uncertainty.anomalyScore}</div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-rose-400 h-full rounded-full" style={{ width: `${uncertainty.anomalyScore * 100}%` }}></div>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="text-[11px] text-slate-400 font-mono">3. Ensemble Disagreement</div>
            <div className="text-lg font-bold font-mono text-purple-400 mt-1">{uncertainty.modelDisagreement}</div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-purple-400 h-full rounded-full" style={{ width: `${uncertainty.modelDisagreement * 100}%` }}></div>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="text-[11px] text-slate-400 font-mono">4. Spectral SNR Quality</div>
            <div className="text-lg font-bold font-mono text-emerald-400 mt-1">{uncertainty.spectralQualitySNR} dB</div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${(uncertainty.spectralQualitySNR / 50) * 100}%` }}></div>
            </div>
          </div>

          {/* Metric 5 */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="text-[11px] text-slate-400 font-mono">5. Calibration Validity</div>
            <div className="text-lg font-bold font-mono text-emerald-400 mt-1">{uncertainty.calibrationValidity}%</div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${uncertainty.calibrationValidity}%` }}></div>
            </div>
          </div>

          {/* Metric 6 */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="text-[11px] text-slate-400 font-mono">6. Hardware Sensor Health</div>
            <div className="text-lg font-bold font-mono text-cyan-400 mt-1">{uncertainty.sensorHealth}%</div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${uncertainty.sensorHealth}%` }}></div>
            </div>
          </div>

          {/* Metric 7 */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 col-span-1 sm:col-span-2">
            <div className="flex justify-between items-center text-[11px] text-slate-400 font-mono">
              <span>7. Mahalanobis Distribution Shift (OOD Index)</span>
              <span className="text-purple-300 font-bold">{uncertainty.distributionShiftIndex} (Threshold: 3.0)</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all ${
                  uncertainty.distributionShiftIndex > 3.0 ? 'bg-purple-500' : 'bg-emerald-400'
                }`} 
                style={{ width: `${Math.min(100, (uncertainty.distributionShiftIndex / 5.0) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
