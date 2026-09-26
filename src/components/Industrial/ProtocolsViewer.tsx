import React, { useState } from 'react';
import { Wrench, Radio, Cpu, Network, CheckCircle } from 'lucide-react';

export const ProtocolsViewer: React.FC = () => {
  const [activeProtocol, setActiveProtocol] = useState<'MQTT' | 'OPCUA' | 'MODBUS' | 'PLC'>('MQTT');

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
        <div>
          <h3 className="font-bold font-mono text-slate-100 text-sm flex items-center gap-2">
            <Wrench className="w-4 h-4 text-cyan-400" /> Industrial Communication Protocol Gateway
          </h3>
          <p className="text-xs text-slate-400">
            Seamless integration with industrial factory automation (PLC, SCADA, Cloud Fleet Analytics).
          </p>
        </div>

        <div className="flex space-x-1 font-mono text-xs">
          {(['MQTT', 'OPCUA', 'MODBUS', 'PLC'] as const).map(proto => (
            <button
              key={proto}
              onClick={() => setActiveProtocol(proto)}
              className={`px-3 py-1 rounded-lg border transition-all ${
                activeProtocol === proto
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {proto}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
        {activeProtocol === 'MQTT' && (
          <div className="space-y-1 text-[11px]">
            <div className="text-cyan-400 font-bold">Topic: spectraguard/line1/telemetry/json</div>
            <pre className="p-3 bg-slate-900 rounded border border-slate-800 text-emerald-400 overflow-x-auto text-[10px]">
{`{
  "product_id": "PROD-#1042",
  "safety_decision": "PASS",
  "anomaly_score": 0.04,
  "spectrum_snr_db": 46.2,
  "conveyor_speed_mm_sec": 1200,
  "timestamp": "${new Date().toISOString()}"
}`}
            </pre>
          </div>
        )}

        {activeProtocol === 'OPCUA' && (
          <div className="space-y-2 text-[11px]">
            <div className="text-purple-400 font-bold">OPC-UA Node Tree: ns=2;s=SpectraGuard.Sensors</div>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-slate-400">Node: SafetyState</span> ➔ <span className="text-emerald-400 font-bold">1 (NORMAL)</span>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-slate-400">Node: RejectActuatorTrigger</span> ➔ <span className="text-cyan-400 font-bold">BOOL True</span>
              </div>
            </div>
          </div>
        )}

        {activeProtocol === 'MODBUS' && (
          <div className="space-y-2 text-[11px]">
            <div className="text-amber-400 font-bold">Modbus TCP Holding Registers (Port 502)</div>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-slate-400">Reg 40001: Conveyor Encoder</span> ➔ <span className="text-amber-300 font-bold">1200 Pulses/s</span>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-slate-400">Reg 40002: Chassis Temp</span> ➔ <span className="text-amber-300 font-bold">342 (34.2°C)</span>
              </div>
            </div>
          </div>
        )}

        {activeProtocol === 'PLC' && (
          <div className="space-y-2 text-[11px]">
            <div className="text-emerald-400 font-bold">Siemens S7-1500 PLC Digital I/O Bus</div>
            <div className="flex gap-3 text-[10px]">
              <span className="px-2 py-1 bg-emerald-950 text-emerald-400 rounded border border-emerald-800">I0.0 Sensor Sync: HIGH</span>
              <span className="px-2 py-1 bg-rose-950 text-rose-300 rounded border border-rose-800">Q0.1 Reject Solenoid: LOW</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
