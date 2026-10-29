import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { X, ZoomIn, ZoomOut, Download } from 'lucide-react';
import { useState } from 'react';

interface ImageLightboxModalProps {
  isOpen: boolean;
  imageUrl: string | null;
  title?: string;
  onClose: () => void;
}

export function ImageLightboxModal({ isOpen, imageUrl, title, onClose }: ImageLightboxModalProps) {
  const [scale, setScale] = useState(1);

  if (!isOpen || !imageUrl) return null;

  return createPortal(
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-[1.5px] border-border flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-4 border-b border-border bg-[#FFFDF9] dark:bg-slate-800 flex items-center justify-between gap-4">
            <span className="font-display font-black text-sm text-ink truncate">
              {title || 'Inscription / Manuscript Specimen'}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setScale((s) => Math.min(2.5, s + 0.25))}
                className="p-1.5 rounded-lg bg-neutral dark:bg-slate-700 text-ink hover:bg-border transition-colors cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn size={15} />
              </button>

              <button
                type="button"
                onClick={() => setScale((s) => Math.max(0.75, s - 0.25))}
                className="p-1.5 rounded-lg bg-neutral dark:bg-slate-700 text-ink hover:bg-border transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut size={15} />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-muted hover:text-ink hover:bg-neutral transition-colors cursor-pointer ml-1"
                title="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Body: Zoomable Image */}
          <div className="p-4 overflow-auto flex items-center justify-center bg-black/10 dark:bg-black/30 max-h-[75vh]">
            <motion.img
              src={imageUrl}
              alt={title || 'Specimen full view'}
              className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-lg transition-transform duration-200"
              style={{ transform: `scale(${scale})` }}
            />
          </div>

          {/* Footer note */}
          <div className="p-3 border-t border-border bg-[#FFFDF9] dark:bg-slate-800 text-center text-[11px] font-mono text-muted">
            Click outside or press ✕ to close • Use zoom controls to inspect stroke ductus
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
