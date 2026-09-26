import React from 'react';
import { 
  X, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle, 
  Activity, 
  BrainCircuit, 
  FileText,
  UserCheck
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ScannedProduct, AnomalyClass } from '../../types/spectraguard';

interface InspectorDrawerProps {
  product: ScannedProduct | null;
  onClose: () => void;
  onVerifyLabel: (productId: string, label: AnomalyClass) => void;
}

export const InspectorDrawer: React.FC<InspectorDrawerProps> = ({
  product,
  onClose,
  onVerifyLabel
}) => {
  if (!product) return null;

  const isPass = product.finalSafetyDecision === 'PASS';

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[540px] bg-slate-900/95 border-l border-slate-800 backdrop-blur-xl z-50 shadow-2xl flex flex-col transition-all overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
        <div className="flex items-center space-x-3">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center border font-mono font-bold text-xs ${
            isPass 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
              : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
          }`}>
            {product.finalSafetyDecision}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold font-mono text-slate-100 text-sm">{product.id}</h3>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                {product.scanId}
              </span>
            </div>
            <p className="text-xs text-slate-400">{product.productName} • {product.timestamp}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-slate-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs">
        {/* Safety Outcome Alert Banner */}
        <div className={`p-3.5 rounded-xl border flex items-start space-x-3 ${
          isPass 
            ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200' 
            : product.anomalyClass === 'UNKNOWN_ANOMALY'
            ? 'bg-purple-950/40 border-purple-500/50 text-purple-200'
            : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
        }`}>
          {isPass ? (
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          )}
          <div>
            <div className="font-bold flex items-center gap-2 text-sm">
              <span>{product.finalSafetyDecision === 'PASS' ? 'INSPECTION PASSED' : 'REJECT & ISOLATE'}</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-black/40 border border-white/10">
                {product.anomalyClass}
              </span>
            </div>
            <p className="mt-1 text-slate-300">
              {product.anomalyClass === 'UNKNOWN_ANOMALY'
                ? '⚠️ UNKNOWN ANOMALY DETECTED — Out-of-distribution spectral signature requires lab verification.'
                : product.anomalyClass === 'KNOWN_ANOMALY'
                ? `Detected anomaly: ${product.anomalyType.replace(/_/g, ' ')}. Pneumatic ejector position ${product.rejectionPositionMm}mm.`
                : 'Multi-modal spectral & spatial signature fully matches nominal safety envelope.'}
            </p>
          </div>
        </div>

        {/* 1. Multi-Modal NIR Hyperspectral Curve Chart */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-slate-200 flex items-center gap-1.5 text-xs font-mono">
              <Activity className="w-4 h-4 text-cyan-400" /> NIR Hyperspectral Cube (900nm - 1700nm)
            </span>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
              SNR: {product.uncertainty.spectralQualitySNR} dB
            </span>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={product.spectrum}>
                <defs>
                  <linearGradient id="reflectanceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="baselineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="wavelength" stroke="#64748b" tick={{ fontSize: 10 }} unit="nm" />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} domain={[0, 1]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                  labelStyle={{ color: '#38bdf8', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="baselineReflectance" stroke="#a855f7" fillOpacity={1} fill="url(#baselineGrad)" strokeDasharray="3 3" name="Nominal Baseline" />
                <Area type="monotone" dataKey="reflectance" stroke="#38bdf8" fillOpacity={1} fill="url(#reflectanceGrad)" strokeWidth={2} name="Sample Spectrum" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Dual Decision Path Matrix Breakdown */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
          <span className="font-bold text-slate-200 flex items-center gap-1.5 text-xs font-mono">
            <BrainCircuit className="w-4 h-4 text-purple-400" /> Dual AI + Physics Safety Decision Matrix
          </span>

          <div className="grid grid-cols-2 gap-3">
            {/* AI Path */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3">
              <div className="flex items-center justify-between text-[11px] font-mono mb-1 text-slate-400">
                <span>AI PATH</span>
                <span className={`font-bold ${product.aiPredictionPass ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {product.aiPredictionPass ? 'PASS' : 'REJECT'}
                </span>
              </div>
              <div className="space-y-1 text-[10px] text-slate-300 font-mono">
                <div className="flex justify-between">
                  <span>Confidence:</span>
                  <span className="text-cyan-400">{product.uncertainty.classificationConfidence}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Anomaly Score:</span>
                  <span className="text-rose-400">{product.uncertainty.anomalyScore}</span>
                </div>
                <div className="flex justify-between">
                  <span>Mahalanobis (OOD):</span>
                  <span className="text-purple-400">{product.uncertainty.distributionShiftIndex}</span>
                </div>
              </div>
            </div>

            {/* Physics Path */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3">
              <div className="flex items-center justify-between text-[11px] font-mono mb-1 text-slate-400">
                <span>PHYSICS PATH</span>
                <span className={`font-bold ${product.physicsValidityPass ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {product.physicsValidityPass ? 'VALID' : 'INVALID'}
                </span>
              </div>
              <div className="space-y-1 text-[10px] text-slate-300 font-mono">
                <div className="flex justify-between">
                  <span>Calibration:</span>
                  <span className="text-emerald-400">{product.uncertainty.calibrationValidity}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Illumination:</span>
                  <span className="text-cyan-400">96,400 Lux</span>
                </div>
                <div className="flex justify-between">
                  <span>Encoder Latency:</span>
                  <span className="text-slate-400">{product.rejectLatencyMs} ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Explainable AI Feature Attribution */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
          <span className="font-bold text-slate-200 flex items-center gap-1.5 text-xs font-mono mb-2">
            <FileText className="w-4 h-4 text-indigo-400" /> Explainable AI Attribution Features
          </span>
          <div className="space-y-1.5">
            {product.topAttributes.map((attr, idx) => (
              <div key={idx} className="flex items-center justify-between bg-slate-900/90 px-3 py-1.5 rounded border border-slate-800 text-[11px]">
                <span className="text-slate-300">{attr}</span>
                <span className="font-mono text-cyan-400 text-[10px]">Attribution High</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Closed-Loop Rejection & Confirmation Status */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="font-bold text-slate-200 font-mono text-xs">Closed-Loop Rejection Status</div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Confirm Sensor: {product.confirmationSensorVerified ? '✅ Optical Verified' : '🚨 EJECTION FAILURE'}
            </div>
          </div>
          <div className="text-right font-mono text-xs">
            <span className={`px-2.5 py-1 rounded font-bold border ${
              product.rejectionStatus === 'REJECTED_CONFIRMED' || product.rejectionStatus === 'PENDING_REJECT'
                ? 'bg-rose-950 text-rose-300 border-rose-800'
                : 'bg-emerald-950 text-emerald-300 border-emerald-800'
            }`}>
              {product.rejectionStatus}
            </span>
          </div>
        </div>

        {/* 5. Human-in-the-Loop Review Controls */}
        <div className="bg-slate-950/80 border border-purple-900/40 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-purple-300 flex items-center gap-1.5 text-xs font-mono">
              <UserCheck className="w-4 h-4 text-purple-400" /> Human-in-the-Loop Verification
            </span>
            {product.humanVerifiedLabel && (
              <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                Verified: {product.humanVerifiedLabel}
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              onClick={() => onVerifyLabel(product.id, 'NORMAL')}
              className="py-1.5 px-2 bg-emerald-950/50 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 rounded text-[11px] font-semibold transition-colors"
            >
              Confirm Normal
            </button>
            <button
              onClick={() => onVerifyLabel(product.id, 'KNOWN_ANOMALY')}
              className="py-1.5 px-2 bg-rose-950/50 hover:bg-rose-900 text-rose-300 border border-rose-800/60 rounded text-[11px] font-semibold transition-colors"
            >
              Confirm Anomaly
            </button>
            <button
              onClick={() => onVerifyLabel(product.id, 'UNKNOWN_ANOMALY')}
              className="py-1.5 px-2 bg-purple-950/50 hover:bg-purple-900 text-purple-300 border border-purple-800/60 rounded text-[11px] font-semibold transition-colors"
            >
              Dispatch Lab Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
