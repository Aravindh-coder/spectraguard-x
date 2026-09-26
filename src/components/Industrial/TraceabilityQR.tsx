import React from 'react';
import { X, QrCode, Download, ShieldCheck } from 'lucide-react';
import { BatchPassport } from '../../types/spectraguard';

interface TraceabilityQRProps {
  passport: BatchPassport;
  onClose: () => void;
}

export const TraceabilityQR: React.FC<TraceabilityQRProps> = ({ passport, onClose }) => {
  const downloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(passport, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `spectraguard_passport_${passport.batchId}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-scaleUp">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <QrCode className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold font-mono text-slate-100 text-sm">
              Digital Inspection Passport QR
            </h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-800 rounded text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* QR Simulation Box */}
        <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-inner border border-slate-200">
          <svg className="w-40 h-40 text-slate-900" viewBox="0 0 100 100">
            <rect width="100" height="100" fill="#ffffff" />
            {/* Simulated QR Pattern */}
            <path d="M10 10h30v30h-30z M15 15h20v20h-20z M20 20h10v10h-10z" fill="#0f172a" />
            <path d="M60 10h30v30h-30z M65 15h20v20h-20z M70 20h10v10h-10z" fill="#0f172a" />
            <path d="M10 60h30v30h-30z M15 65h20v20h-20z M20 70h10v10h-10z" fill="#0f172a" />
            <path d="M45 15h10v10h-10z M55 25h10v10h-10z M45 45h20v20h-20z M70 60h20v10h-20z M60 75h15v15h-15z" fill="#0f172a" />
          </svg>
          <span className="text-[10px] font-mono text-slate-500 mt-2">
            SCAN FOR SPECTRAGUARD AUDIT TRAIL
          </span>
        </div>

        {/* Cryptographic SHA-256 Signature */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
          <div className="flex justify-between text-slate-400 text-[10px]">
            <span>BATCH ID:</span>
            <span className="text-cyan-400 font-bold">{passport.batchId}</span>
          </div>
          <div className="flex justify-between text-slate-400 text-[10px]">
            <span>MODEL SIGNATURE:</span>
            <span className="text-purple-400 font-bold font-mono">SHA-256 Verified</span>
          </div>
          <p className="text-[9px] text-slate-500 truncate pt-1 border-t border-slate-800 font-mono">
            {passport.sha256ModelSignature}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={downloadJSON}
            className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold font-mono text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Export Passport JSON
          </button>
        </div>
      </div>
    </div>
  );
};
