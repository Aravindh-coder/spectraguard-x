import React, { useRef, useEffect } from 'react';
import { ScannedProduct } from '../../types/spectraguard';

interface ConveyorCanvasProps {
  products: ScannedProduct[];
  selectedProduct: ScannedProduct | null;
  onSelectProduct: (p: ScannedProduct) => void;
  conveyorSpeedMmSec: number;
  isPaused: boolean;
}

export const ConveyorCanvas: React.FC<ConveyorCanvasProps> = ({
  products,
  selectedProduct,
  onSelectProduct,
  conveyorSpeedMmSec,
  isPaused
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Clear Canvas Background (Dark Industrial Track)
      ctx.fillStyle = '#0b0f19';
      ctx.fillRect(0, 0, width, height);

      // Conveyor Frame Grid Lines
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // 5 Physical Zones demarcations
      // 0 - 20%: Infeed
      // 20 - 45%: HSI Scan Tunnel
      // 45 - 65%: Multimodal Fusion AI
      // 65 - 85%: Pneumatic Air Jet Rejector
      // 85 - 100%: Confirmation Sensor & Outfeed
      const zoneBorders = [0.2, 0.45, 0.65, 0.85];

      zoneBorders.forEach((pct) => {
        const x = width * pct;
        ctx.strokeStyle = '#334155';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Zone Labels
      ctx.font = '10px monospace';
      ctx.fillStyle = '#64748b';
      ctx.fillText('INFEED', 10, 18);
      ctx.fillText('📡 SENSING TUNNEL', width * 0.22, 18);
      ctx.fillText('🧠 FUSION AI', width * 0.47, 18);
      ctx.fillText('💨 REJECTOR', width * 0.67, 18);
      ctx.fillText('✅ CONFIRM', width * 0.87, 18);

      // Conveyor Belt Tracks
      const beltTop = 40;
      const beltHeight = height - 60;
      ctx.fillStyle = '#111827';
      ctx.fillRect(0, beltTop, width, beltHeight);

      // Belt Motion Ribbed Lines
      const time = Date.now() * (isPaused ? 0 : (conveyorSpeedMmSec / 1000));
      ctx.strokeStyle = '#1f2937';
      ctx.lineWidth = 2;
      for (let x = (time % 20); x < width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, beltTop);
        ctx.lineTo(x, beltTop + beltHeight);
        ctx.stroke();
      }

      // Sensing Tunnel Glowing Enclosure (20% to 45%)
      const tunnelX = width * 0.2;
      const tunnelW = width * 0.25;
      const gradient = ctx.createLinearGradient(tunnelX, 0, tunnelX + tunnelW, 0);
      gradient.addColorStop(0, 'rgba(6, 182, 212, 0.05)');
      gradient.addColorStop(0.5, 'rgba(147, 51, 234, 0.15)');
      gradient.addColorStop(1, 'rgba(6, 182, 212, 0.05)');
      ctx.fillStyle = gradient;
      ctx.fillRect(tunnelX, beltTop, tunnelW, beltHeight);

      // UV Laser Line Scan (Vertical Animated Beam)
      const laserX = tunnelX + (tunnelW * 0.5);
      ctx.strokeStyle = '#38bdf8';
      ctx.shadowColor = '#0284c7';
      ctx.shadowBlur = 10;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(laserX, beltTop - 10);
      ctx.lineTo(laserX, beltTop + beltHeight + 10);
      ctx.stroke();
      ctx.shadowBlur = 0; // Reset shadow

      // Pneumatic Rejector Nozzle Line (65%)
      const rejectorX = width * 0.75;
      ctx.strokeStyle = '#f43f5e';
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(rejectorX, beltTop - 15);
      ctx.lineTo(rejectorX, beltTop + beltHeight + 15);
      ctx.stroke();
      ctx.setLineDash([]);

      // Confirmation Sensor Beam (85%)
      const confirmX = width * 0.88;
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(confirmX, beltTop);
      ctx.lineTo(confirmX, beltTop + beltHeight);
      ctx.stroke();

      // Draw Scanned Products moving along belt
      products.forEach((product) => {
        const itemX = (product.xPos / 100) * width;
        const laneOffset = ((product.yLane - 1) / 4) * beltHeight;
        const itemY = beltTop + laneOffset + 15;
        const itemW = 34;
        const itemH = 26;

        const isSelected = selectedProduct?.id === product.id;

        // Determine Item Color based on Safety Decision
        let strokeColor = '#38bdf8'; // Blue default
        let fillColor = '#0f172a';

        if (product.finalSafetyDecision === 'PASS') {
          strokeColor = '#10b981'; // Green
          fillColor = '#064e3b';
        } else {
          // Isolated / Reject
          if (product.anomalyClass === 'UNKNOWN_ANOMALY') {
            strokeColor = '#a855f7'; // Purple (Unknown)
            fillColor = '#581c87';
          } else if (product.anomalyClass === 'UNCERTAIN') {
            strokeColor = '#f59e0b'; // Amber (Uncertain)
            fillColor = '#78350f';
          } else {
            strokeColor = '#f43f5e'; // Red (Known Anomaly)
            fillColor = '#881337';
          }
        }

        // Draw Product Box
        ctx.save();
        ctx.translate(itemX, itemY);

        // Highlight selected
        if (isSelected) {
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 3;
          ctx.strokeRect(-itemW / 2 - 4, -itemH / 2 - 4, itemW + 8, itemH + 8);
        }

        ctx.fillStyle = fillColor;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(-itemW / 2, -itemH / 2, itemW, itemH, 4);
        ctx.fill();
        ctx.stroke();

        // Product Label inside
        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 9px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(product.id.replace('PROD-#', '#'), 0, -2);

        // Status badge
        ctx.font = '8px monospace';
        ctx.fillStyle = strokeColor;
        ctx.fillText(product.finalSafetyDecision, 0, 7);

        // Reject Pulse Air Blast Effect if currently at rejector position (75%)
        if (product.finalSafetyDecision === 'ISOLATE' && Math.abs(product.xPos - 75) < 3) {
          ctx.fillStyle = 'rgba(244, 63, 94, 0.4)';
          ctx.beginPath();
          ctx.arc(0, 0, 24, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [products, selectedProduct, conveyorSpeedMmSec, isPaused]);

  // Click Handler to select moving item
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const width = canvas.width;
    const height = canvas.height;
    const beltTop = 40;
    const beltHeight = height - 60;

    // Find closest item
    let clickedItem: ScannedProduct | null = null;
    let minDist = 30; // Pixel click threshold

    products.forEach((p) => {
      const itemX = (p.xPos / 100) * width;
      const laneOffset = ((p.yLane - 1) / 4) * beltHeight;
      const itemY = beltTop + laneOffset + 15;

      const dist = Math.hypot(clickX - itemX, clickY - itemY);
      if (dist < minDist) {
        minDist = dist;
        clickedItem = p;
      }
    });

    if (clickedItem) {
      onSelectProduct(clickedItem);
    }
  };

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-xl">
      <canvas
        ref={canvasRef}
        width={960}
        height={180}
        onClick={handleCanvasClick}
        className="w-full h-[180px] cursor-pointer block"
      />
      <div className="absolute bottom-2 left-3 flex items-center space-x-4 text-[11px] text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> PASS</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span> KNOWN ANOMALY</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block"></span> UNKNOWN ANOMALY</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span> UNCERTAIN</span>
      </div>
      <div className="absolute top-2 right-3 text-[10px] font-mono text-slate-400">
        💡 Click any item to inspect multi-modal spectrum
      </div>
    </div>
  );
};
