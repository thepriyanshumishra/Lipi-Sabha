'use client';

import React, { useRef, useState, useEffect } from 'react';
import { RotateCcw, CheckCircle2 } from 'lucide-react';
import { TactileButton } from '@/components/ui/tactile-button';

export interface CanvasTraceProps {
  guideGlyph: string;
  guideSubtext?: string;
  onTraceComplete?: () => void;
  className?: string;
}

export function CanvasTrace({
  guideGlyph,
  guideSubtext,
  onTraceComplete,
}: CanvasTraceProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High-DPI canvas setup
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#000437'; // Night Ink
  }, []);

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setHasDrawn(true);
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto">
      <div className="relative w-full aspect-square bg-[#fafafa] border-2 border-[#e5e5e5] rounded-3xl overflow-hidden shadow-inner touch-none">
        {/* Subtle Watermark Guide Character */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-20">
          <span className="text-8xl md:text-9xl font-black text-[#afafaf]">{guideGlyph}</span>
        </div>

        {/* Drawing Surface */}
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="absolute inset-0 w-full h-full cursor-crosshair"
        />

        {/* Clear Button */}
        {hasDrawn && (
          <button
            type="button"
            onClick={clearCanvas}
            className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-[#777777] border border-[#e5e5e5] rounded-full shadow-sm transition-all"
            title="Clear stroke"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>

      {guideSubtext && (
        <p className="text-xs font-semibold text-[#777777] mt-2 text-center">
          {guideSubtext}
        </p>
      )}

      {hasDrawn && onTraceComplete && (
        <div className="mt-4 w-full">
          <TactileButton variant="primary" size="md" fullWidth onClick={onTraceComplete}>
            <CheckCircle2 className="w-4 h-4 mr-1.5" />
            <span>Confirm Stroke</span>
          </TactileButton>
        </div>
      )}
    </div>
  );
}
