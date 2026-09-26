export type OperatingState = 
  | 'NORMAL' 
  | 'WARNING' 
  | 'DEGRADED' 
  | 'INVALID_INSPECTION' 
  | 'EMERGENCY_STOP' 
  | 'MAINTENANCE';

export type AnomalyClass = 
  | 'NORMAL' 
  | 'KNOWN_ANOMALY' 
  | 'UNKNOWN_ANOMALY' 
  | 'UNCERTAIN';

export type AnomalyType = 
  | 'NONE'
  | 'AFLATOXIN_MOLD'
  | 'PLASTIC_POLYMER'
  | 'METALLIC_SHARD'
  | 'STONE_CALCITE'
  | 'MOISTURE_DEVIATION'
  | 'FOREIGN_ORGANIC'
  | 'UNIDENTIFIED_SPECTRAL_SHIFT';

export type RejectionStatus = 
  | 'NOT_REQUIRED'
  | 'PENDING_REJECT'
  | 'REJECTED_CONFIRMED'
  | 'REJECT_FAILURE'
  | 'MANUAL_ISOLATE';

export interface FoodProfile {
  id: string;
  name: string;
  category: string;
  description: string;
  peakWavelengthsNm: number[];
  spectralTolerancePct: number;
  expectedSnrDb: number;
  nominalMoisturePct: number;
  nominalLipidPct: number;
  nominalProteinPct: number;
}

export interface SpectralPoint {
  wavelength: number; // 900 to 1700 nm
  reflectance: number; // 0.0 to 1.0
  baselineReflectance: number;
  importance: number; // 0.0 to 1.0 (XAI)
}

export interface UncertaintyMetrics {
  classificationConfidence: number; // 0 to 100%
  anomalyScore: number;             // 0.0 to 1.0
  modelDisagreement: number;         // 0.0 to 1.0 (Ensemble variance)
  spectralQualitySNR: number;       // dB
  calibrationValidity: number;      // 0 to 100%
  sensorHealth: number;             // 0 to 100%
  distributionShiftIndex: number;   // Mahalanobis distance
}

export interface ScannedProduct {
  id: string;
  scanId: string;
  batchId: string;
  timestamp: string;
  xPos: number; // 0 to 100 (conveyor position percentage)
  yLane: number; // 1 to 4
  speedMmSec: number;
  
  // Food profile
  foodProfileId: string;
  productName: string;
  
  // AI & Physics Outcomes
  anomalyClass: AnomalyClass;
  anomalyType: AnomalyType;
  aiPredictionPass: boolean;
  physicsValidityPass: boolean;
  finalSafetyDecision: 'PASS' | 'ISOLATE';
  
  // Detailed Metrics
  uncertainty: UncertaintyMetrics;
  spectrum: SpectralPoint[];
  
  // Rejection & Coverage
  rejectionStatus: RejectionStatus;
  rejectionPositionMm: number;
  rejectLatencyMs: number;
  confirmationSensorVerified: boolean;
  coverageValid: boolean;
  
  // XAI Attribution
  affectedZone: 'Zone A' | 'Zone B' | 'Zone C' | 'Zone D';
  spatialHeatmapUrl?: string;
  topAttributes: string[];
  
  // User review state for HITL
  humanVerifiedLabel?: AnomalyClass;
  labTestDispatched?: boolean;
}

export interface HardwareSensorTelemetry {
  nirSensorStatus: 'HEALTHY' | 'DEGRADED' | 'FAULT';
  nirSnrDb: number;
  uvVisStatus: 'HEALTHY' | 'DEGRADED' | 'FAULT';
  rgbCameraFps: number;
  uvFluorescenceLux: number;
  illuminationLux: number;
  toF3DStatus: 'HEALTHY' | 'FAULT';
  windowTransmissivityPct: number; // Optical window cleanliness
  windowContaminated: boolean;
  calibrationDriftPct: number;
  calibratedAt: string;
  ambientTempC: number;
  ambientHumidityPct: number;
  opticalChassisTempC: number;
  conveyorVelocityMmSec: number;
  encoderPulseFreqHz: number;
  pneumaticPressureBar: number;
  rejectActuatorLatencyMs: number;
  confirmationSensorHealthy: boolean;
}

export interface RedTeamStressVector {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  severity: number; // 1 to 5
}

export interface BatchPassport {
  batchId: string;
  foodProfileId: string;
  productName: string;
  startedAt: string;
  totalInspected: number;
  normalCount: number;
  knownAnomalyCount: number;
  unknownAnomalyCount: number;
  uncertainCount: number;
  isolatedCount: number;
  rejectFailures: number;
  coverageGuaranteePct: number;
  overallSensorHealthPct: number;
  calibrationEvents: number;
  sha256ModelSignature: string;
  modelVersion: string;
}
