import React, { useState, useEffect } from 'react';
import { 
  OperatingState, 
  FoodProfile, 
  ScannedProduct, 
  HardwareSensorTelemetry, 
  RedTeamStressVector, 
  BatchPassport,
  AnomalyClass
} from './types/spectraguard';
import { FOOD_PROFILES } from './mock/foodProfiles';
import { createMockScannedProduct } from './mock/spectralEngine';

// Components
import { NavigationBar } from './components/NavigationBar';
import { ConveyorCanvas } from './components/DigitalTwin/ConveyorCanvas';
import { ZoneTelemetry } from './components/DigitalTwin/ZoneTelemetry';
import { InspectorDrawer } from './components/DigitalTwin/InspectorDrawer';
import { DualPathMatrix } from './components/SafetyEngine/DualPathMatrix';
import { OpenSetUncertainty } from './components/SafetyEngine/OpenSetUncertainty';
import { MultiModalSensors } from './components/Sensing/MultiModalSensors';
import { SelfCalibrationTile } from './components/Sensing/SelfCalibrationTile';
import { RedTeamTester } from './components/AIStudio/RedTeamTester';
import { ExplainableAI } from './components/AIStudio/ExplainableAI';
import { ContinualLearning } from './components/AIStudio/ContinualLearning';
import { ContaminationHeatmap } from './components/Analytics/ContaminationHeatmap';
import { ProcessDrift } from './components/Analytics/ProcessDrift';
import { SensorHealth } from './components/Analytics/SensorHealth';
import { TraceabilityQR } from './components/Industrial/TraceabilityQR';
import { AuditReportModal } from './components/Industrial/AuditReportModal';
import { ProtocolsViewer } from './components/Industrial/ProtocolsViewer';

export function App() {
  // Navigation & Operating State
  const [operatingState, setOperatingState] = useState<OperatingState>('NORMAL');
  const [activeTab, setActiveTab] = useState('twin');
  const [selectedFoodProfile, setSelectedFoodProfile] = useState<FoodProfile>(FOOD_PROFILES[0]);

  // Modals
  const [showReport, setShowReport] = useState(false);
  const [showQR, setShowQR] = useState(false);

  // Selected Product for Inspector Drawer
  const [selectedProduct, setSelectedProduct] = useState<ScannedProduct | null>(null);

  // Hardware Telemetry
  const [telemetry, setTelemetry] = useState<HardwareSensorTelemetry>({
    nirSensorStatus: 'HEALTHY',
    nirSnrDb: 46.2,
    uvVisStatus: 'HEALTHY',
    rgbCameraFps: 120,
    uvFluorescenceLux: 450,
    illuminationLux: 96400,
    toF3DStatus: 'HEALTHY',
    windowTransmissivityPct: 98.5,
    windowContaminated: false,
    calibrationDriftPct: 0.8,
    calibratedAt: '19:45:00',
    ambientTempC: 24.5,
    ambientHumidityPct: 48,
    opticalChassisTempC: 32.1,
    conveyorVelocityMmSec: 1200,
    encoderPulseFreqHz: 2400,
    pneumaticPressureBar: 6.2,
    rejectActuatorLatencyMs: 15,
    confirmationSensorHealthy: true
  });

  // Simulated Physics Fail state override
  const [physicsSimulatedFail, setPhysicsSimulatedFail] = useState(false);

  // AI Red-Team Stress Vectors
  const [stressVectors, setStressVectors] = useState<RedTeamStressVector[]>([
    { id: 'lighting', name: 'Illumination Fluctuations (±30%)', description: 'Simulates factory overhead LED glare or voltage drops.', enabled: false, severity: 3 },
    { id: 'speed', name: 'Conveyor Speed Surges (0.5 - 3.0 m/s)', description: 'Simulates belt mechanical jitter and encoder frequency shifts.', enabled: false, severity: 4 },
    { id: 'temp', name: 'Thermal Ambient Spikes (+15°C)', description: 'Simulates summer afternoon factory floor temperature shifts.', enabled: false, severity: 2 },
    { id: 'noise', name: 'NIR Sensor Noise (+20dB)', description: 'Simulates dark noise buildup on uncooled InGaAs detectors.', enabled: false, severity: 4 },
    { id: 'tilt', name: 'Product Tilt & Rotation (0° - 180°)', description: 'Simulates irregular tumbling orientation on conveyor belt.', enabled: false, severity: 3 },
    { id: 'window_haze', name: 'Optical Window Haze (20% Dust)', description: 'Simulates food oil spray and flour residue buildup on optics.', enabled: false, severity: 5 }
  ]);

  // Product Stream Loop
  const [products, setProducts] = useState<ScannedProduct[]>([]);
  const [nextId, setNextId] = useState(1);
  const [rejectFailures, setRejectFailures] = useState(0);

  // Spawn Products Periodically
  useEffect(() => {
    if (operatingState === 'EMERGENCY_STOP' || operatingState === 'MAINTENANCE') return;

    const interval = setInterval(() => {
      setNextId(prevId => {
        const newProduct = createMockScannedProduct(
          prevId, 
          selectedFoodProfile.id, 
          telemetry, 
          undefined, 
          stressVectors
        );

        setProducts(prevProducts => {
          // Keep max 15 products on conveyor
          const updated = [...prevProducts, newProduct].filter(p => p.xPos < 100);
          return updated;
        });

        return prevId + 1;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [operatingState, selectedFoodProfile, telemetry, stressVectors]);

  // Animate Product Positions along conveyor (0 to 100%)
  useEffect(() => {
    if (operatingState === 'EMERGENCY_STOP' || operatingState === 'MAINTENANCE') return;

    const animInterval = setInterval(() => {
      setProducts(prev => 
        prev.map(p => {
          const newX = p.xPos + (telemetry.conveyorVelocityMmSec / 600);
          
          // Check for reject failure alarm trigger at confirmation sensor (85%)
          if (Math.abs(newX - 85) < 1.5 && !p.confirmationSensorVerified && p.finalSafetyDecision === 'ISOLATE') {
            setRejectFailures(rf => rf + 1);
          }

          return { ...p, xPos: newX };
        }).filter(p => p.xPos < 105)
      );
    }, 50);

    return () => clearInterval(animInterval);
  }, [operatingState, telemetry]);

  // Verification Handler for HITL
  const handleVerifyLabel = (productId: string, label: AnomalyClass) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return { ...p, humanVerifiedLabel: label };
      }
      return p;
    }));
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct(prev => prev ? { ...prev, humanVerifiedLabel: label } : null);
    }
  };

  // Stress Vector Toggles
  const handleToggleStressVector = (id: string) => {
    setStressVectors(prev => prev.map(v => v.id === id ? { ...v, enabled: !v.enabled } : v));
  };

  const handleResetStressVectors = () => {
    setStressVectors(prev => prev.map(v => ({ ...v, enabled: false })));
  };

  // Self-Calibration Action
  const handleTriggerCalibration = () => {
    setTelemetry(prev => ({
      ...prev,
      calibrationDriftPct: 0.1,
      calibratedAt: new Date().toISOString().split('T')[1].slice(0, 8),
      windowTransmissivityPct: 99.2,
      windowContaminated: false
    }));
    setPhysicsSimulatedFail(false);
  };

  const handleToggleWindowResidue = () => {
    setTelemetry(prev => ({
      ...prev,
      windowTransmissivityPct: prev.windowTransmissivityPct < 85 ? 98.8 : 72.4,
      windowContaminated: prev.windowTransmissivityPct >= 85
    }));
  };

  // Batch Passport Summary Statistics
  const totalScanned = nextId - 1;
  const normalCount = Math.round(totalScanned * 0.86);
  const knownAnomalyCount = Math.round(totalScanned * 0.09);
  const unknownAnomalyCount = Math.round(totalScanned * 0.03);
  const uncertainCount = Math.round(totalScanned * 0.02);
  const isolatedCount = knownAnomalyCount + unknownAnomalyCount;

  const overallHealthPct = Math.round((telemetry.nirSnrDb / 50) * 100);

  const batchPassport: BatchPassport = {
    batchId: 'VX-2026-0926-001',
    foodProfileId: selectedFoodProfile.id,
    productName: selectedFoodProfile.name,
    startedAt: '2026-09-26 08:00:00 UTC',
    totalInspected: Math.max(1, totalScanned),
    normalCount,
    knownAnomalyCount,
    unknownAnomalyCount,
    uncertainCount,
    isolatedCount,
    rejectFailures,
    coverageGuaranteePct: 99.98,
    overallSensorHealthPct: overallHealthPct,
    calibrationEvents: 4,
    sha256ModelSignature: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    modelVersion: 'SpectraGuard-X v2.5.0-Prod'
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-cyan-500 selection:text-white">
      {/* Top Header & Tab Navigation */}
      <NavigationBar
        operatingState={operatingState}
        setOperatingState={setOperatingState}
        selectedFoodProfile={selectedFoodProfile}
        setSelectedFoodProfile={setSelectedFoodProfile}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenReport={() => setShowReport(true)}
        onOpenQR={() => setShowQR(true)}
        overallHealthPct={overallHealthPct}
        totalScanned={totalScanned}
      />

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 space-y-5">
        {/* Tab 1: Live Digital Twin Conveyor */}
        {activeTab === 'twin' && (
          <div className="space-y-4 animate-fadeIn">
            {/* Real-time Canvas */}
            <ConveyorCanvas
              products={products}
              selectedProduct={selectedProduct}
              onSelectProduct={(p) => setSelectedProduct(p)}
              conveyorSpeedMmSec={telemetry.conveyorVelocityMmSec}
              isPaused={operatingState === 'EMERGENCY_STOP' || operatingState === 'MAINTENANCE'}
            />

            {/* Zone Telemetry Counters */}
            <ZoneTelemetry products={products} rejectFailures={rejectFailures} />

            {/* Dual Safety Path Quick Card */}
            <DualPathMatrix
              telemetry={telemetry}
              onSimulatePhysicsFailure={setPhysicsSimulatedFail}
              physicsSimulatedFail={physicsSimulatedFail}
            />
          </div>
        )}

        {/* Tab 2: AI + Physics Safety Layer */}
        {activeTab === 'safety' && (
          <div className="space-y-5 animate-fadeIn">
            <DualPathMatrix
              telemetry={telemetry}
              onSimulatePhysicsFailure={setPhysicsSimulatedFail}
              physicsSimulatedFail={physicsSimulatedFail}
            />

            <OpenSetUncertainty
              uncertainty={
                selectedProduct?.uncertainty || {
                  classificationConfidence: 96,
                  anomalyScore: 0.04,
                  modelDisagreement: 0.02,
                  spectralQualitySNR: telemetry.nirSnrDb,
                  calibrationValidity: Math.round(100 - telemetry.calibrationDriftPct * 10),
                  sensorHealth: overallHealthPct,
                  distributionShiftIndex: 0.8
                }
              }
            />
          </div>
        )}

        {/* Tab 3: Multi-Modal Sensing */}
        {activeTab === 'sensing' && (
          <div className="space-y-5 animate-fadeIn">
            <MultiModalSensors telemetry={telemetry} />
            <SelfCalibrationTile
              telemetry={telemetry}
              onTriggerCalibration={handleTriggerCalibration}
              onToggleWindowResidue={handleToggleWindowResidue}
            />
          </div>
        )}

        {/* Tab 4: AI Red-Team & Robustness */}
        {activeTab === 'redteam' && (
          <div className="space-y-5 animate-fadeIn">
            <RedTeamTester
              stressVectors={stressVectors}
              onToggleVector={handleToggleStressVector}
              onResetVectors={handleResetStressVectors}
            />

            <ExplainableAI selectedProduct={selectedProduct} />
            <ContinualLearning uncertainProducts={products.filter(p => p.anomalyClass === 'UNCERTAIN')} />
          </div>
        )}

        {/* Tab 5: Process & Risk Analytics */}
        {activeTab === 'analytics' && (
          <div className="space-y-5 animate-fadeIn">
            <ContaminationHeatmap products={products} />
            <ProcessDrift foodProfile={selectedFoodProfile} />
            <SensorHealth telemetry={telemetry} overallHealthPct={overallHealthPct} />
          </div>
        )}

        {/* Tab 6: Industrial Communications */}
        {activeTab === 'protocols' && (
          <div className="space-y-5 animate-fadeIn">
            <ProtocolsViewer />
          </div>
        )}
      </main>

      {/* Slide-over Inspector Drawer for Selected Product */}
      <InspectorDrawer
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onVerifyLabel={handleVerifyLabel}
      />

      {/* Modals */}
      {showQR && (
        <TraceabilityQR passport={batchPassport} onClose={() => setShowQR(false)} />
      )}

      {showReport && (
        <AuditReportModal passport={batchPassport} onClose={() => setShowReport(false)} />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 py-3 text-center text-xs text-slate-500 font-mono">
        SpectraGuard X • Advanced Multi-Modal Hyperspectral & Open-Set AI Safety System • Siemens S7 / OPC-UA / MQTT Compliant
      </footer>
    </div>
  );
}

export default App;
