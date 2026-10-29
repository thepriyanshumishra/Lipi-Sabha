'use client';

import React, { useState } from 'react';
import { ASSET_MANIFEST, AssetMetadata } from '@/lib/assets/manifest';
import { Scroll, Image as ImageIcon, FileText } from 'lucide-react';

export interface ImagePlaceholderProps {
  assetId: string;
  className?: string;
  variant?: 'dark' | 'parchment' | 'hero' | 'specimen' | 'background';
  aspectRatio?: string;
  badgePosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  showDetails?: boolean;
  children?: React.ReactNode;
  overlayChildren?: React.ReactNode;
}

export function ImagePlaceholder({
  assetId,
  className = '',
  variant,
  aspectRatio,
  badgePosition = 'bottom-left',
  showDetails = true,
  children,
  overlayChildren,
}: ImagePlaceholderProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const asset: AssetMetadata | undefined = ASSET_MANIFEST[assetId];
  const isBackground = asset?.isBackground || variant === 'background';
  const effectiveRatio = aspectRatio !== undefined ? aspectRatio : isBackground ? 'none' : (asset?.aspectRatio || '16/9');
  const effectiveVariant = variant || (asset?.section === 'fieldwork' || asset?.section === 'projects' ? 'parchment' : 'dark');

  // Only attempt to load real image if it has been marked as available in the manifest
  const isAvailable = Boolean(asset?.isAvailable);
  const imageSrc = asset && isAvailable ? `/images/${asset.fileName}` : undefined;

  const isParchment = effectiveVariant === 'parchment';
  const isHero = effectiveVariant === 'hero';

  return (
    <div
      className={`relative overflow-hidden group select-none transition-all ${
        isBackground
          ? 'w-full h-full'
          : isParchment
          ? 'bg-[#EADECE] text-[#3D3024] border border-[#C5B49E]'
          : 'bg-[#0E1320] text-slate-300 border border-slate-800'
      } ${className}`}
      style={effectiveRatio !== 'none' ? { aspectRatio: effectiveRatio } : undefined}
      role="img"
      aria-label={asset ? `${asset.title}: ${asset.description}` : assetId}
    >
      {/* Real image if present in public/images/ */}
      {imageSrc && !imageError && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt={asset?.description || assetId}
          className={`absolute inset-0 w-full h-full object-${asset?.objectFit || 'cover'} transition-opacity duration-300 z-10 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
      )}

      {/* Styled Placeholder Fallback (shown when real image has not yet been placed in /images/) */}
      {(!imageLoaded || imageError) && (
        <div className={`absolute inset-0 flex flex-col items-center justify-center z-0 ${isBackground ? 'p-2' : 'p-4'}`}>
          {/* Subtle Archival Blueprint / Grain Grid */}
          <div
            className={`absolute inset-0 opacity-15 pointer-events-none ${
              isParchment
                ? 'bg-[radial-gradient(#8C7355_1px,transparent_1px)] [background-size:16px_16px]'
                : 'bg-[radial-gradient(#4F46E5_1px,transparent_1px)] [background-size:16px_16px]'
            }`}
          />

          {!isBackground && (
            <>
              {/* Archival Corner Ticks */}
              <div className={`absolute top-2 left-2 w-2.5 h-2.5 border-t border-l ${isParchment ? 'border-[#8C7355]' : 'border-amber-400/60'}`} />
              <div className={`absolute top-2 right-2 w-2.5 h-2.5 border-t border-r ${isParchment ? 'border-[#8C7355]' : 'border-amber-400/60'}`} />
              <div className={`absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l ${isParchment ? 'border-[#8C7355]' : 'border-amber-400/60'}`} />
              <div className={`absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r ${isParchment ? 'border-[#8C7355]' : 'border-amber-400/60'}`} />
            </>
          )}

          {/* Fallback Children when provided (e.g. avatar strip or SVG seal) */}
          {children ? (
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              {children}
            </div>
          ) : (
            /* Centered Graphic Icon & Label (Standard image placeholder) */
            !isBackground && (
              <div className="relative z-10 flex flex-col items-center text-center max-w-[85%]">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 shadow-inner ${
                    isParchment
                      ? 'bg-[#DDD1BF] border border-[#BFAFA0] text-[#6E543D]'
                      : 'bg-slate-900 border border-slate-700/80 text-amber-400/90'
                  }`}
                >
                  {isHero ? (
                    <Scroll className="w-5 h-5 animate-pulse" />
                  ) : isParchment ? (
                    <FileText className="w-5 h-5" />
                  ) : (
                    <ImageIcon className="w-5 h-5" />
                  )}
                </div>

                {asset?.title && (
                  <h4 className={`text-xs font-serif font-bold tracking-tight line-clamp-1 ${isParchment ? 'text-[#2D2116]' : 'text-slate-100'}`}>
                    {asset.title}
                  </h4>
                )}

                {showDetails && asset?.description && (
                  <p
                    className={`text-[10px] line-clamp-2 mt-0.5 leading-relaxed ${
                      isParchment ? 'text-[#615141]' : 'text-slate-400'
                    }`}
                  >
                    {asset.description}
                  </p>
                )}
              </div>
            )
          )}

          {/* Replaceable Asset Slot Tag Pill */}
          <div
            className={`absolute z-20 px-2 py-0.5 rounded text-[9px] font-mono tracking-wider uppercase border shadow-sm ${
              badgePosition === 'top-left' ? 'top-2.5 left-2.5' :
              badgePosition === 'top-right' ? 'top-2.5 right-2.5' :
              badgePosition === 'bottom-right' ? 'bottom-2.5 right-2.5' :
              badgePosition === 'center' ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' :
              'bottom-2.5 left-2.5'
            } ${
              isParchment
                ? 'bg-[#F2E8DC] border-[#B8A793] text-[#785E46]'
                : isBackground
                ? 'bg-slate-950/80 border-slate-800 text-slate-500 opacity-50 group-hover:opacity-100'
                : 'bg-slate-950/90 border-slate-700 text-amber-300'
            }`}
          >
            [{isBackground ? 'bg-slot' : 'slot'}: {assetId}]
            {asset && !isBackground && <span className="opacity-70 ml-1">({asset.width}&times;{asset.height})</span>}
          </div>
        </div>
      )}

      {/* Overlay Children: Rendered on top of BOTH loaded real image and placeholder */}
      {overlayChildren && (
        <div className="absolute inset-0 z-30 pointer-events-auto">
          {overlayChildren}
        </div>
      )}
    </div>
  );
}
