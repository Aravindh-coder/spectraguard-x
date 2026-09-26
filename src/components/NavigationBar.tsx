import React from 'react';
import { 
  ShieldCheck, 
  Activity, 
  AlertTriangle, 
  Power, 
  Sliders, 
  FileText, 
  Cpu, 
  QrCode,
  Layers,
  Wrench
} from 'lucide-react';
import { OperatingState, FoodProfile } from '../types/spectraguard';
import { FOOD_PROFILES } from '../mock/foodProfiles';

interface NavigationBarProps {
  operatingState: OperatingState;
  setOperatingState: (s: OperatingState) => void;
  selectedFoodProfile: FoodProfile;
  setSelectedFoodProfile: (p: FoodProfile) => void;
  activeTab: string;
  setActiveTab: (t: string) => void;
  onOpenReport: () => void;
  onOpenQR: () => void;
  overallHealthPct: number;
  totalScanned: number;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  operatingState,
  setOperatingState,
  selectedFoodProfile,
  setSelectedFoodProfile,
  activeTab,
  setActiveTab,
  onOpenReport,
  onOpenQR,
  overallHealthPct,
  totalScanned
}) => {
  const getStateColor = (state: OperatingState) => {
    switch (state) {
      case 'NORMAL': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
      case 'WARNING': return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      case 'DEGRADED': return 'bg-orange-500/20 text-orange-400 border-orange-500/40';
      case 'INVALID_INSPECTION': return 'bg-rose-500/20 text-rose-400 border-rose-500/40';
      case 'EMERGENCY_STOP': return 'bg-red-600 text-white animate-pulse border-red-400';
      case 'MAINTENANCE': return 'bg-blue-500/20 text-blue-400 border-blue-500/40';
    }
  };

  return (
    <header className="bg-slate-900/90 border-b border-slate-800 backdrop-blur-md sticky top-0 z-40 px-4 py-2.5">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Brand & State Selector */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-0.5 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                SpectraGuard X
              </h1>
              <span className="text-[10px] font-mono uppercase bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-500/30">
                v2.5 Industrial
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Multi-Modal Hyperspectral & Open-Set AI Safety System
            </p>
          </div>
        </div>

        {/* Operating State Machine Switcher */}
        <div className="flex items-center space-x-2 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
          <span className="text-xs text-slate-400 px-2 font-mono flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-cyan-400" /> STATE:
          </span>
          <select
            value={operatingState}
            onChange={(e) => setOperatingState(e.target.value as OperatingState)}
            className={`text-xs font-semibold px-2.5 py-1 rounded border transition-all ${getStateColor(operatingState)}`}
          >
            <option value="NORMAL">✅ NORMAL OPERATING</option>
            <option value="WARNING">⚠️ WARNING DRIFT</option>
            <option value="DEGRADED">⚡ DEGRADED SENSING</option>
            <option value="INVALID_INSPECTION">❌ INVALID INSPECTION</option>
            <option value="EMERGENCY_STOP">🚨 EMERGENCY STOP</option>
            <option value="MAINTENANCE">🔧 MAINTENANCE</option>
          </select>

          {/* E-STOP Button */}
          <button
            onClick={() => setOperatingState(operatingState === 'EMERGENCY_STOP' ? 'NORMAL' : 'EMERGENCY_STOP')}
            className={`px-2.5 py-1 text-xs font-bold rounded flex items-center gap-1 transition-all ${
              operatingState === 'EMERGENCY_STOP' 
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white' 
                : 'bg-rose-600/30 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/40'
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            {operatingState === 'EMERGENCY_STOP' ? 'RESET E-STOP' : 'E-STOP'}
          </button>
        </div>

        {/* Food Profile & Quick Controls */}
        <div className="flex items-center space-x-2">
          {/* Food Profile Selector */}
          <div className="flex items-center space-x-1.5 bg-slate-950/80 px-2 py-1 rounded-lg border border-slate-800">
            <Layers className="w-4 h-4 text-purple-400" />
            <select
              value={selectedFoodProfile.id}
              onChange={(e) => {
                const p = FOOD_PROFILES.find(fp => fp.id === e.target.value);
                if (p) setSelectedFoodProfile(p);
              }}
              className="bg-transparent text-xs font-medium text-slate-200 focus:outline-none cursor-pointer"
            >
              {FOOD_PROFILES.map(p => (
                <option key={p.id} value={p.id} className="bg-slate-900 text-slate-200">
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Stats Pill */}
          <div className="hidden sm:flex items-center space-x-3 bg-slate-950/80 px-3 py-1 rounded-lg border border-slate-800 text-xs">
            <div>
              <span className="text-slate-500">HEALTH: </span>
              <span className="font-mono font-bold text-emerald-400">{overallHealthPct}%</span>
            </div>
            <div className="h-3 w-px bg-slate-800" />
            <div>
              <span className="text-slate-500">SCANNED: </span>
              <span className="font-mono font-bold text-cyan-400">{totalScanned.toLocaleString()}</span>
            </div>
          </div>

          {/* Action Modals */}
          <button
            onClick={onOpenQR}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 rounded-lg border border-slate-700 transition-colors"
            title="Generate Traceability QR Passport"
          >
            <QrCode className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenReport}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-sm shadow-indigo-600/30 transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Audit Report</span>
          </button>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <nav className="flex space-x-1 mt-3 overflow-x-auto no-scrollbar border-t border-slate-800/80 pt-2 text-xs font-medium">
        {[
          { id: 'twin', label: '🎮 Live Digital Twin', icon: Cpu },
          { id: 'safety', label: '🛡️ AI + Physics Safety', icon: ShieldCheck },
          { id: 'sensing', label: '📡 Multi-Modal Sensing', icon: Activity },
          { id: 'redteam', label: '🧪 AI Red-Team & Robustness', icon: Sliders },
          { id: 'analytics', label: '📊 Process & Risk Analytics', icon: Layers },
          { id: 'protocols', label: '🔌 Industrial Communications', icon: Wrench },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-cyan-500/15 text-cyan-300 font-semibold border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </header>
  );
};
