import React from 'react';
import { 
  Radio, 
  Sun, 
  Camera, 
  Sparkles, 
  Thermometer, 
  Droplets, 
  Gauge, 
  Layers 
} from 'lucide-react';
import { HardwareSensorTelemetry } from '../../types/spectraguard';

interface MultiModalSensorsProps {
  telemetry: HardwareSensorTelemetry;
}

export const MultiModalSensors: React.FC<MultiModalSensorsProps> = ({ telemetry }) => {
  return (
    <div className="space-y-5">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
        <h2 className="text-base font-bold text-slate-100 font-mono flex items-center gap-2">
          <Radio className="w-5 h-5 text-cyan-400" /> Multi-Modal Physical Sensing Suite (8 Sensor Channels)
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          SpectraGuard X merges 8 physical observation modalities rather than forcing a single RGB camera to predict complex organic contaminants.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-4">
          {/* Sensor 1: NIR Hyperspectral */}
          <div className="bg-slate-950 p-4 rounded-xl border border-cyan-900/40 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
              <span className="flex items-center gap-1.5"><Radio className="w-4 h-4" /> NIR Hyperspectral</span>
              <span className="text-[10px] bg-cyan-950 text-cyan-300 px-1.5 py-0.5 rounded">900-1700nm</span>
            </div>
            <div className="text-lg font-bold font-mono text-slate-100">{telemetry.nirSnrDb} dB SNR</div>
            <div className="text-[11px] text-slate-400">256-band continuous push-broom spectral cube sensor.</div>
          </div>

          {/* Sensor 2: UV / Visible */}
          <div className="bg-slate-950 p-4 rounded-xl border border-purple-900/40 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-purple-400">
              <span className="flex items-center gap-1.5"><Sun className="w-4 h-4" /> UV/Vis Spectral</span>
              <span className="text-[10px] bg-purple-950 text-purple-300 px-1.5 py-0.5 rounded">350-750nm</span>
            </div>
            <div className="text-lg font-bold font-mono text-slate-100">Surface Pigments</div>
            <div className="text-[11px] text-slate-400">Colorimetry & oxidative browning reflectance curves.</div>
          </div>

          {/* Sensor 3: High-Res RGB Camera */}
          <div className="bg-slate-950 p-4 rounded-xl border border-indigo-900/40 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-indigo-400">
              <span className="flex items-center gap-1.5"><Camera className="w-4 h-4" /> High-Res RGB</span>
              <span className="text-[10px] bg-indigo-950 text-indigo-300 px-1.5 py-0.5 rounded">4K 120FPS</span>
            </div>
            <div className="text-lg font-bold font-mono text-slate-100">{telemetry.rgbCameraFps} FPS Sync</div>
            <div className="text-[11px] text-slate-400">Spatial texture & precise 2D product boundary mapping.</div>
          </div>

          {/* Sensor 4: UV Fluorescence */}
          <div className="bg-slate-950 p-4 rounded-xl border border-amber-900/40 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-amber-400">
              <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4" /> UV Fluorescence</span>
              <span className="text-[10px] bg-amber-950 text-amber-300 px-1.5 py-0.5 rounded">365nm UV-A</span>
            </div>
            <div className="text-lg font-bold font-mono text-slate-100">{telemetry.uvFluorescenceLux} Lux</div>
            <div className="text-[11px] text-slate-400">Excitation emission for organic toxins (Aflatoxin mold).</div>
          </div>

          {/* Sensor 5: Polarization & Multi-Angle */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-300">
              <span className="flex items-center gap-1.5"><Layers className="w-4 h-4 text-emerald-400" /> Polarization</span>
              <span className="text-[10px] bg-slate-900 text-slate-400 px-1.5 py-0.5 rounded">Stokes Vector</span>
            </div>
            <div className="text-lg font-bold font-mono text-slate-100">Diffuse vs Specular</div>
            <div className="text-[11px] text-slate-400">Differentiates surface glare from subsurface structures.</div>
          </div>

          {/* Sensor 6: Depth / ToF 3D */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-300">
              <span className="flex items-center gap-1.5"><Gauge className="w-4 h-4 text-cyan-400" /> Depth / ToF 3D</span>
              <span className="text-[10px] bg-slate-900 text-slate-400 px-1.5 py-0.5 rounded">±0.2mm</span>
            </div>
            <div className="text-lg font-bold font-mono text-slate-100">3D Height Topo</div>
            <div className="text-[11px] text-slate-400">Volume measurement & foreign object thickness.</div>
          </div>

          {/* Sensor 7: Environmental Telemetry */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-300">
              <span className="flex items-center gap-1.5"><Thermometer className="w-4 h-4 text-rose-400" /> Temp & Humidity</span>
              <span className="text-[10px] bg-slate-900 text-slate-400 px-1.5 py-0.5 rounded">Chassis Telemetry</span>
            </div>
            <div className="text-lg font-bold font-mono text-slate-100">{telemetry.ambientTempC}°C | {telemetry.ambientHumidityPct}%</div>
            <div className="text-[11px] text-slate-400">Automatic spectral baseline drift compensation.</div>
          </div>

          {/* Sensor 8: Conveyor Encoder */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-300">
              <span className="flex items-center gap-1.5"><Droplets className="w-4 h-4 text-indigo-400" /> Quadrature Encoder</span>
              <span className="text-[10px] bg-slate-900 text-slate-400 px-1.5 py-0.5 rounded">{telemetry.encoderPulseFreqHz} Hz</span>
            </div>
            <div className="text-lg font-bold font-mono text-slate-100">{telemetry.conveyorVelocityMmSec} mm/s</div>
            <div className="text-[11px] text-slate-400">Microsecond-synchronized pneumatic reject position.</div>
          </div>
        </div>
      </div>
    </div>
  );
};
