import { 
  ScannedProduct, 
  SpectralPoint, 
  FoodProfile, 
  HardwareSensorTelemetry, 
  AnomalyClass, 
  AnomalyType, 
  RejectionStatus,
  RedTeamStressVector 
} from '../types/spectraguard';
import { FOOD_PROFILES } from './foodProfiles';

// Generate 256 NIR hyperspectral wavelengths from 900nm to 1700nm
export function generateSpectralBands(
  foodProfile: FoodProfile, 
  anomalyType: AnomalyType = 'NONE',
  stressNoiseDb: number = 0,
  windowContaminationPct: number = 0
): SpectralPoint[] {
  const points: SpectralPoint[] = [];
  const totalBands = 64; // Sampled for smooth responsive chart performance
  const startNm = 900;
  const endNm = 1700;
  const step = (endNm - startNm) / (totalBands - 1);

  for (let i = 0; i < totalBands; i++) {
    const wavelength = Math.round(startNm + i * step);
    
    // Baseline Gaussian reflectance peaks
    let baseline = 0.45;
    
    // Water peak (1450nm)
    baseline += 0.35 * Math.exp(-Math.pow(wavelength - 1450, 2) / (2 * 45 * 45));
    // Lipid peak (1210nm)
    baseline += 0.22 * Math.exp(-Math.pow(wavelength - 1210, 2) / (2 * 35 * 35));
    // Protein/Amide peak (1510nm)
    baseline += 0.18 * Math.exp(-Math.pow(wavelength - 1510, 2) / (2 * 30 * 30));
    // CH overtone peak (980nm)
    baseline += 0.15 * Math.exp(-Math.pow(wavelength - 980, 2) / (2 * 25 * 25));

    // Clamp baseline
    baseline = Math.max(0.1, Math.min(0.95, baseline));

    let reflectance = baseline;
    let importance = 0.05;

    // Apply Anomaly Disturbances
    if (anomalyType === 'AFLATOXIN_MOLD') {
      // Mold alters 1450nm and adds UV/Vis degradation
      if (wavelength >= 1350 && wavelength <= 1550) {
        reflectance -= 0.28;
        importance = 0.94;
      }
    } else if (anomalyType === 'PLASTIC_POLYMER') {
      // Polymer absorption spikes near 1660nm (C-H stretch)
      if (wavelength >= 1620 && wavelength <= 1700) {
        reflectance += 0.38;
        importance = 0.98;
      }
    } else if (anomalyType === 'METALLIC_SHARD') {
      // Specular reflectance flat shift across NIR
      reflectance = 0.88;
      importance = 0.99;
    } else if (anomalyType === 'STONE_CALCITE') {
      // Calcite absorption near 1100nm and 1500nm
      if (wavelength >= 1050 && wavelength <= 1180) {
        reflectance -= 0.32;
        importance = 0.91;
      }
    } else if (anomalyType === 'UNIDENTIFIED_SPECTRAL_SHIFT') {
      // Random irregular open-set spectral shift
      reflectance += 0.25 * Math.sin(wavelength / 40);
      importance = 0.89;
    }

    // Window contamination attenuation effect
    if (windowContaminationPct > 0) {
      reflectance *= (1 - (windowContaminationPct / 100) * 0.4);
    }

    // Thermal & Noise fluctuations
    if (stressNoiseDb > 0) {
      const noise = (Math.random() - 0.5) * (stressNoiseDb / 100);
      reflectance += noise;
    }

    reflectance = Math.max(0.02, Math.min(0.99, Number(reflectance.toFixed(4))));

    points.push({
      wavelength,
      reflectance,
      baselineReflectance: Number(baseline.toFixed(4)),
      importance: Number(importance.toFixed(2))
    });
  }

  return points;
}

// Generate full multi-modal product scan object
export function createMockScannedProduct(
  idNum: number,
  foodProfileId: string = 'rice_basmati',
  telemetry: HardwareSensorTelemetry,
  forcedAnomaly?: AnomalyType,
  stressVectors: RedTeamStressVector[] = []
): ScannedProduct {
  const profile = FOOD_PROFILES.find(p => p.id === foodProfileId) || FOOD_PROFILES[0];
  const scanId = `SCN-2026-${String(idNum).padStart(6, '0')}`;
  const batchId = `VX-2026-0926-001`;
  const timestamp = new Date().toISOString().split('T')[1].slice(0, 8);
  const lane = (idNum % 4) + 1 as 1 | 2 | 3 | 4;
  const zoneName = `Zone ${['A', 'B', 'C', 'D'][lane - 1]}` as 'Zone A' | 'Zone B' | 'Zone C' | 'Zone D';

  // Determine stress multipliers
  let lightingStress = stressVectors.find(v => v.id === 'lighting')?.enabled ? 25 : 0;
  let tempStress = stressVectors.find(v => v.id === 'temp')?.enabled ? 18 : 0;
  let noiseStress = stressVectors.find(v => v.id === 'noise')?.enabled ? 30 : 0;
  let windowHazeStress = stressVectors.find(v => v.id === 'window_haze')?.enabled ? 22 : 0;

  // Decide anomaly
  let anomalyType: AnomalyType = forcedAnomaly || 'NONE';
  if (!forcedAnomaly) {
    const rnd = Math.random();
    if (rnd > 0.85) {
      const types: AnomalyType[] = [
        'AFLATOXIN_MOLD', 
        'PLASTIC_POLYMER', 
        'METALLIC_SHARD', 
        'STONE_CALCITE', 
        'UNIDENTIFIED_SPECTRAL_SHIFT'
      ];
      anomalyType = types[Math.floor(Math.random() * types.length)];
    }
  }

  // Generate spectral curve
  const spectrum = generateSpectralBands(
    profile, 
    anomalyType, 
    noiseStress, 
    telemetry.windowTransmissivityPct < 85 ? (100 - telemetry.windowTransmissivityPct) : windowHazeStress
  );

  // Compute AI metrics
  let anomalyClass: AnomalyClass = 'NORMAL';
  let confidence = 96 - Math.random() * 4;
  let anomalyScore = 0.04 + Math.random() * 0.08;
  let modelDisagreement = 0.02 + Math.random() * 0.05;
  let distributionShift = 0.4 + Math.random() * 0.8;

  if (anomalyType !== 'NONE') {
    if (anomalyType === 'UNIDENTIFIED_SPECTRAL_SHIFT') {
      anomalyClass = 'UNKNOWN_ANOMALY';
      anomalyScore = 0.89;
      confidence = 58; // Low confidence on unknown
      modelDisagreement = 0.42; // High ensemble disagreement
      distributionShift = 4.8; // High Mahalanobis distance > 3.0 threshold
    } else if (Math.random() < 0.15) {
      anomalyClass = 'UNCERTAIN';
      confidence = 64;
      anomalyScore = 0.48;
      modelDisagreement = 0.28;
      distributionShift = 2.4;
    } else {
      anomalyClass = 'KNOWN_ANOMALY';
      anomalyScore = 0.92;
      confidence = 94;
      modelDisagreement = 0.05;
      distributionShift = 1.9;
    }
  }

  // AI Decision Path
  const aiPredictionPass = anomalyClass === 'NORMAL';

  // Physics Safety Path
  const calibOk = telemetry.calibrationDriftPct < 5.0;
  const windowOk = telemetry.windowTransmissivityPct >= 80.0 && !telemetry.windowContaminated;
  const tempOk = telemetry.ambientTempC <= 42.0;
  const encoderOk = telemetry.conveyorVelocityMmSec > 200;
  const physicsValidityPass = calibOk && windowOk && tempOk && encoderOk;

  // Final Safety Decision Matrix
  let finalSafetyDecision: 'PASS' | 'ISOLATE' = 'PASS';
  if (aiPredictionPass && physicsValidityPass) {
    finalSafetyDecision = 'PASS';
  } else {
    finalSafetyDecision = 'ISOLATE'; // Physics OR AI failed
  }

  if (!physicsValidityPass && aiPredictionPass) {
    anomalyClass = 'UNCERTAIN';
  }

  // Rejection & Coverage tracking
  let rejectionStatus: RejectionStatus = 'NOT_REQUIRED';
  let confirmationVerified = true;

  if (finalSafetyDecision === 'ISOLATE') {
    rejectionStatus = 'PENDING_REJECT';
    // 98% confirmation success, 2% simulated actuator failure to test closed-loop alarm!
    if (Math.random() < 0.02) {
      confirmationVerified = false;
    }
  }

  // Calculate precise rejection positioning
  const totalLatencyMs = 2 + 3 + 8 + 1 + telemetry.rejectActuatorLatencyMs; // 29ms
  const rejectionPositionMm = Math.round(1800 + (telemetry.conveyorVelocityMmSec * (totalLatencyMs / 1000)));

  return {
    id: `PROD-#${1000 + idNum}`,
    scanId,
    batchId,
    timestamp,
    xPos: 0,
    yLane: lane,
    speedMmSec: telemetry.conveyorVelocityMmSec,
    foodProfileId: profile.id,
    productName: profile.name,
    anomalyClass,
    anomalyType,
    aiPredictionPass,
    physicsValidityPass,
    finalSafetyDecision,
    uncertainty: {
      classificationConfidence: Math.round(confidence),
      anomalyScore: Number(anomalyScore.toFixed(2)),
      modelDisagreement: Number(modelDisagreement.toFixed(2)),
      spectralQualitySNR: Number((telemetry.nirSnrDb - noiseStress * 0.3).toFixed(1)),
      calibrationValidity: Math.round(100 - telemetry.calibrationDriftPct * 10),
      sensorHealth: Math.round((telemetry.nirSnrDb / 50) * 100),
      distributionShiftIndex: Number(distributionShift.toFixed(2))
    },
    spectrum,
    rejectionStatus,
    rejectionPositionMm,
    rejectLatencyMs: totalLatencyMs,
    confirmationSensorVerified: confirmationVerified,
    coverageValid: true,
    affectedZone: zoneName,
    topAttributes: getTopAttributes(anomalyType, profile)
  };
}

function getTopAttributes(type: AnomalyType, profile: FoodProfile): string[] {
  switch (type) {
    case 'AFLATOXIN_MOLD':
      return ['UV 365nm Fluorescence Emission', '1450nm H2O Absorption Spike', 'Surface Mold Texture'];
    case 'PLASTIC_POLYMER':
      return ['1660nm C-H Polymer Overtone', 'Polarization Diffuse Reflection', 'Non-Organic RGB Hue'];
    case 'METALLIC_SHARD':
      return ['Specular High-Reflectance Shift', '360° Polarization Phase Shift', 'ToF Height Anomaly'];
    case 'STONE_CALCITE':
      return ['1100nm Carbonate Absorption', '3D Topography Volume Spike', 'Zero UV Fluorescence'];
    case 'UNIDENTIFIED_SPECTRAL_SHIFT':
      return ['Out-Of-Distribution Mahalanobis > 4.5', 'High Ensemble Disagreement', 'Unknown NIR Baseline Shift'];
    default:
      return ['Nominal NIR Moisture Signature', 'Standard RGB Texture', 'Calibrated Baseline SNR'];
  }
}
