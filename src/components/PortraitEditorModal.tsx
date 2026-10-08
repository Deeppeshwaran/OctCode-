import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Sliders, Sparkles, Image as ImageIcon, RotateCcw, AlertCircle, Check } from 'lucide-react';

export interface PortraitSettings {
  mode: 'custom-cutout' | 'face-overlay' | '3d-jack' | 'original';
  customImageUrl: string;
  faceScale: number;
  faceX: number;
  faceY: number;
  faceRotate: number;
  faceMask: 'circle' | 'rounded' | 'none';
  faceBrightness: number;
  faceContrast: number;
}

export const DEFAULT_PORTRAIT_SETTINGS: PortraitSettings = {
  mode: '3d-jack',
  customImageUrl: '',
  faceScale: 100,
  faceX: 0,
  faceY: -35,
  faceRotate: 0,
  faceMask: 'none',
  faceBrightness: 100,
  faceContrast: 100,
};

interface PortraitEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: PortraitSettings;
  onSave: (newSettings: PortraitSettings) => void;
}

export const PortraitEditorModal: React.FC<PortraitEditorModalProps> = ({
  isOpen,
  onClose,
  settings: initialSettings,
  onSave,
}) => {
  const [current, setCurrent] = useState<PortraitSettings>(initialSettings);
  const [blobWarning, setBlobWarning] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState('');

  useEffect(() => {
    setCurrent(initialSettings);
  }, [initialSettings, isOpen]);

  // Handle global or local paste
  useEffect(() => {
    if (!isOpen) return;

    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            const reader = new FileReader();
            reader.onload = (loadEvent) => {
              const result = loadEvent.target?.result as string;
              if (result) {
                setCurrent((prev) => ({
                  ...prev,
                  customImageUrl: result,
                  mode: prev.mode === '3d-jack' ? 'custom-cutout' : prev.mode,
                }));
                setBlobWarning(null);
              }
            };
            reader.readAsDataURL(file);
          }
          break;
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [isOpen]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setCurrent((prev) => ({
            ...prev,
            customImageUrl: result,
            mode: prev.mode === '3d-jack' ? 'custom-cutout' : prev.mode,
          }));
          setBlobWarning(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;

    if (trimmed.startsWith('blob:')) {
      setBlobWarning(
        'Notice: Browser "blob:" links from remove.bg are temporary memory URLs specific to that tab. Please download the image and click "Upload Image" or paste it here with Ctrl+V.'
      );
      return;
    }

    setBlobWarning(null);
    setCurrent((prev) => ({
      ...prev,
      customImageUrl: trimmed,
      mode: prev.mode === '3d-jack' ? 'custom-cutout' : prev.mode,
    }));
    setUrlInput('');
  };

  const handleReset = () => {
    setCurrent(DEFAULT_PORTRAIT_SETTINGS);
    setBlobWarning(null);
  };

  const handleSaveAndClose = () => {
    onSave(current);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-2xl bg-[#111317] border border-[#2D333D] rounded-3xl p-6 sm:p-8 text-[#D7E2EA] z-10 max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#2D333D] mb-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-purple-400 mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Hero Customization</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                  Edit Face & 3D Portrait
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full text-[#8C9AA8] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mode selection tabs */}
            <div className="mb-6">
              <label className="block text-xs uppercase tracking-wider text-[#A2B2C2] mb-2 font-medium">
                Portrait Style Mode
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: '3d-jack', label: '3D Jack (New)', desc: 'Striking 3D artist' },
                  { id: 'custom-cutout', label: 'Custom Cutout', desc: 'Full image cutout' },
                  { id: 'face-overlay', label: 'Face Swap', desc: 'Fit face on 3D body' },
                  { id: 'original', label: 'Classic 3D', desc: 'Original figure' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setCurrent((prev) => ({
                        ...prev,
                        mode: item.id as PortraitSettings['mode'],
                      }))
                    }
                    className={`flex flex-col p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      current.mode === item.id
                        ? 'border-purple-500 bg-purple-500/15 text-white'
                        : 'border-[#2D333D] bg-[#161922] text-[#8C9AA8] hover:border-white/30'
                    }`}
                  >
                    <span className="text-xs font-bold uppercase">{item.label}</span>
                    <span className="text-[10px] text-[#A2B2C2] mt-0.5">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Upload & Cutout input section */}
            <div className="mb-6 p-4 rounded-2xl bg-[#161922] border border-[#2D333D]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-white flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5 text-purple-400" />
                  Your remove.bg Image / Cutout
                </span>
                <span className="text-[11px] text-purple-400 font-mono">
                  Press Ctrl+V to paste
                </span>
              </div>

              {/* Upload Drop area */}
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#3E4654] hover:border-purple-400 rounded-xl p-5 cursor-pointer transition-colors bg-[#0D0F14]/60 group">
                <ImageIcon className="w-8 h-8 text-[#8C9AA8] group-hover:text-purple-400 transition-colors mb-2" />
                <span className="text-xs font-medium text-white mb-1">
                  Click to choose file or drag remove.bg cutout here
                </span>
                <span className="text-[11px] text-[#8C9AA8]">
                  Supports transparent PNG, WebP, JPG
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {/* Paste URL Input */}
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="Or paste direct image URL (https://...)"
                  className="flex-1 bg-[#0D0F14] border border-[#2D333D] rounded-xl px-3 py-2 text-xs text-white placeholder-[#535D6D] focus:outline-none focus:border-purple-500"
                />
                <button
                  type="button"
                  onClick={handleApplyUrl}
                  className="px-4 py-2 bg-[#2D333D] hover:bg-purple-600 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Set
                </button>
              </div>

              {/* Blob URL Alert Warning */}
              {blobWarning && (
                <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-300">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p>{blobWarning}</p>
                </div>
              )}

              {/* Preview currently loaded custom image */}
              {current.customImageUrl && (
                <div className="mt-3 flex items-center justify-between p-2 rounded-xl bg-black/40 border border-white/10">
                  <div className="flex items-center gap-3">
                    <img
                      src={current.customImageUrl}
                      alt="Custom preview"
                      className="w-10 h-10 object-contain rounded-lg bg-black/60 border border-white/10"
                    />
                    <div className="text-xs">
                      <span className="text-emerald-400 font-semibold block">
                        Cutout loaded successfully
                      </span>
                      <span className="text-[#8C9AA8] text-[10px]">Ready for hero rendering</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrent((prev) => ({ ...prev, customImageUrl: '' }))}
                    className="text-xs text-rose-400 hover:text-rose-300 px-2 py-1"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Fine-Tuning Sliders (when in face-overlay or custom-cutout mode) */}
            {(current.mode === 'face-overlay' || current.mode === 'custom-cutout') && (
              <div className="mb-6 p-4 rounded-2xl bg-[#161922] border border-[#2D333D] space-y-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-white">
                  <Sliders className="w-3.5 h-3.5 text-purple-400" />
                  Face Positioning & Adjustments
                </div>

                {/* Scale */}
                <div>
                  <div className="flex justify-between text-xs text-[#A2B2C2] mb-1">
                    <span>Size / Scale</span>
                    <span className="font-mono text-purple-300">{current.faceScale}%</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="200"
                    value={current.faceScale}
                    onChange={(e) =>
                      setCurrent((prev) => ({ ...prev, faceScale: Number(e.target.value) }))
                    }
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                </div>

                {/* Offset Y (Vertical) */}
                <div>
                  <div className="flex justify-between text-xs text-[#A2B2C2] mb-1">
                    <span>Vertical Position (Y)</span>
                    <span className="font-mono text-purple-300">{current.faceY}px</span>
                  </div>
                  <input
                    type="range"
                    min="-150"
                    max="150"
                    value={current.faceY}
                    onChange={(e) =>
                      setCurrent((prev) => ({ ...prev, faceY: Number(e.target.value) }))
                    }
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                </div>

                {/* Offset X (Horizontal) */}
                <div>
                  <div className="flex justify-between text-xs text-[#A2B2C2] mb-1">
                    <span>Horizontal Position (X)</span>
                    <span className="font-mono text-purple-300">{current.faceX}px</span>
                  </div>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    value={current.faceX}
                    onChange={(e) =>
                      setCurrent((prev) => ({ ...prev, faceX: Number(e.target.value) }))
                    }
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                </div>

                {/* Rotation */}
                <div>
                  <div className="flex justify-between text-xs text-[#A2B2C2] mb-1">
                    <span>Rotation</span>
                    <span className="font-mono text-purple-300">{current.faceRotate}°</span>
                  </div>
                  <input
                    type="range"
                    min="-45"
                    max="45"
                    value={current.faceRotate}
                    onChange={(e) =>
                      setCurrent((prev) => ({ ...prev, faceRotate: Number(e.target.value) }))
                    }
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                </div>

                {/* Mask shape */}
                <div>
                  <label className="block text-xs text-[#A2B2C2] mb-1.5">
                    Cutout Mask Edge
                  </label>
                  <div className="flex gap-2">
                    {[
                      { id: 'none', label: 'Transparent / Natural' },
                      { id: 'circle', label: 'Circular Feather' },
                      { id: 'rounded', label: 'Soft Pill' },
                    ].map((mask) => (
                      <button
                        key={mask.id}
                        type="button"
                        onClick={() =>
                          setCurrent((prev) => ({
                            ...prev,
                            faceMask: mask.id as PortraitSettings['faceMask'],
                          }))
                        }
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                          current.faceMask === mask.id
                            ? 'border-purple-500 bg-purple-500/20 text-white'
                            : 'border-[#2D333D] text-[#8C9AA8]'
                        }`}
                      >
                        {mask.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Footer Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-[#2D333D]">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs text-[#8C9AA8] hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Defaults
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-full border border-[#3E4654] text-xs font-medium text-[#A2B2C2] hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveAndClose}
                  className="flex items-center gap-1.5 px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-lg cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  Apply Portrait
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
