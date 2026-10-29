import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Volume2,
  Upload,
  Camera,
  Mic,
  Plus,
  Trash2,
  Send,
  Sparkles,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useLipi } from '@/contexts/LipiContext';
import { useAuth } from '@/contexts/AuthContext';
import { playPronunciation, playAcousticChime, playSuccessChime } from '@/utils/audio';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: (projectId: string) => void;
}

const PRESET_IMAGES = [
  { name: 'Stone Inscription', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80' },
  { name: 'Palm Leaf Codex', url: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80' },
  { name: 'Village Sign', url: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=600&q=80' }
];

export function CreateProjectModal({ isOpen, onClose, onCreated }: CreateProjectModalProps) {
  const { activeLipi, allLipis, createProject } = useLipi();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  // Minimal User Inputs
  const [wordOrQuestion, setWordOrQuestion] = useState('');
  const [targetLipiId, setTargetLipiId] = useState(activeLipi.id);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [audioFileName, setAudioFileName] = useState<string>('');

  // Optional spelling options (0 mandatory, user can add 0 or more if they wish)
  const [options, setOptions] = useState<string[]>([]);
  const [newOptionInput, setNewOptionInput] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Handle Photo File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setImageUrl(result);
      setImagePreview(result);
    };
    reader.readAsDataURL(file);
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAudioFileName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      setAudioUrl(reader.result as string);
      playSuccessChime();
    };
    reader.readAsDataURL(file);
  };

  const handleAddOption = () => {
    const trimmed = newOptionInput.trim();
    if (trimmed && !options.includes(trimmed)) {
      setOptions([...options, trimmed]);
      setNewOptionInput('');
      playAcousticChime(560, 0.15);
    }
  };

  const handleRemoveOption = (idx: number) => {
    setOptions(options.filter((_, i) => i !== idx));
  };

  const handleTestAudio = () => {
    if (!wordOrQuestion.trim()) return;
    playPronunciation(wordOrQuestion.trim(), 'hi-IN');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const content = wordOrQuestion.trim();
    if (!content && !imageUrl) return;

    setIsSubmitting(true);
    const targetLipi = allLipis.find((l) => l.id === targetLipiId) || activeLipi;

    // Convert optional user options to lightweight branches if any were provided
    const branches = options.map((opt, idx) => ({
      id: `opt-${Date.now()}-${idx}`,
      label: `Option ${idx + 1}: ${opt}`,
      representation: opt,
      scriptType: 'User Suggestion',
      phoneticAccuracy: 90,
      easeOfLearning: 'High' as const,
      communityVotes: 1,
      audioPronunciation: opt,
      rationale: 'Submitted by user for reviewer calibration.'
    }));

    const newProject = createProject({
      title: content || 'Unwritten Inscription Photo Doubt',
      spokenWord: content || 'Photo Specimen',
      dialectContext: 'User Question (Pending Review)',
      lipiId: targetLipi.id,
      lipiName: `${targetLipi.nameNative} (${targetLipi.nameEnglish})`,
      imageUrl: imageUrl.trim() || undefined,
      audioUrl: audioUrl.trim() || undefined,
      description: content ? `User inquiry: "${content}". Awaiting specialist verification.` : 'Photo of inscription submitted for orthographic decipherment.',
      author: user?.display_name || 'Aria (User)',
      options: options.length > 0 ? options : undefined,
      branches: branches.length > 0 ? branches : undefined
    });

    playSuccessChime();
    setSuccess(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(false);
      // Reset form
      setWordOrQuestion('');
      setImageUrl('');
      setImagePreview(null);
      setOptions([]);
      onClose();
      if (onCreated) {
        onCreated(newProject.id);
      }
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 8 }}
          className="bg-white dark:bg-slate-900 rounded-3xl border-[1.5px] border-border shadow-elevated w-full max-w-lg overflow-hidden"
          style={{ borderBottomWidth: '4px', borderBottomColor: '#78350F' }}
        >
          {/* Header */}
          <div className="p-5 border-b border-border bg-[#FFFDF9] dark:bg-slate-800/80 flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-[#78350F] dark:text-amber-300 text-[10px] font-mono font-bold uppercase">
                <Sparkles size={12} />
                <span>नया लिपि प्रश्न • Quick Doubt Post</span>
              </div>
              <h2 className="font-display text-lg font-black text-ink">
                Ask a Doubt or Post an Inscription
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-muted hover:text-ink hover:bg-neutral transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Minimal Form */}
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            {success ? (
              <div className="p-4 rounded-2xl bg-mint/30 border border-mint-dark/30 text-ink space-y-1 text-center">
                <CheckCircle2 size={24} className="text-mint-dark mx-auto" />
                <h4 className="font-display font-black text-sm">प्रश्न सफलतापूर्वक भेजा गया!</h4>
                <p className="text-xs font-serif text-muted">
                  आपका प्रश्न रिव्यूअर की कतार (Review Queue) में चला गया है। विशेषज्ञ द्वारा प्रमाणित होने के बाद यह सार्वजनिक पेज पर प्रकाशित होगा।
                </p>
              </div>
            ) : (
              <>
                {/* 1. Word / Doubt Input */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-display font-bold text-ink uppercase tracking-wide">
                      1. शब्द या प्रश्न (Word, Spoken Sound, or Question):
                    </label>
                    {wordOrQuestion.trim() && (
                      <button
                        type="button"
                        onClick={handleTestAudio}
                        className="text-[11px] font-mono font-bold text-[#78350F] dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                        title="Hear sound"
                      >
                        <Volume2 size={13} />
                        <span>Hear Sound</span>
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={wordOrQuestion}
                    onChange={(e) => setWordOrQuestion(e.target.value)}
                    placeholder="उदा. रीना, या कैसा लिखें: नमस्ते vs नमसते?..."
                    className="w-full px-3.5 py-2.5 rounded-xl border-[1.5px] border-border bg-[#FFFDF9] dark:bg-slate-800 text-ink text-sm font-serif font-bold focus:border-[#78350F] focus:outline-none"
                    autoFocus
                  />
                </div>

                {/* 2. Photo Upload (Optional) */}
                <div className="space-y-2 p-3 rounded-2xl bg-neutral/50 dark:bg-slate-800/50 border border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-display font-bold text-ink uppercase flex items-center gap-1.5">
                      <Camera size={14} className="text-[#B45309]" />
                      <span>2. तस्वीर / शिलालेख फोटो (Optional Picture):</span>
                    </span>
                    {imagePreview && (
                      <button
                        type="button"
                        onClick={() => {
                          setImageUrl('');
                          setImagePreview(null);
                        }}
                        className="text-[10px] font-mono text-danger hover:underline cursor-pointer"
                      >
                        हटाएं (Remove)
                      </button>
                    )}
                  </div>

                  {imagePreview ? (
                    <div className="flex items-center gap-3">
                      <img
                        src={imagePreview}
                        alt="Uploaded preview"
                        className="w-16 h-16 object-cover rounded-xl border border-border shadow-soft"
                      />
                      <span className="text-xs font-serif text-mint-dark font-bold">
                        ✓ Photo attached for reviewer inspection
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="minimal-image-upload"
                      />
                      <label
                        htmlFor="minimal-image-upload"
                        className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-border hover:border-[#78350F] text-xs font-display font-bold text-ink flex items-center gap-1.5 cursor-pointer shadow-soft"
                      >
                        <Upload size={13} />
                        <span>Upload Photo</span>
                      </label>

                      {PRESET_IMAGES.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setImageUrl(preset.url);
                            setImagePreview(preset.url);
                          }}
                          className="px-2 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-[#78350F]/20 text-[10px] font-mono text-[#78350F] dark:text-amber-300 hover:bg-amber-100 cursor-pointer"
                        >
                          {preset.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* 2b. Audio File Upload (Optional) */}
                <div className="space-y-2 p-3 rounded-2xl bg-neutral/50 dark:bg-slate-800/50 border border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-display font-bold text-ink uppercase flex items-center gap-1.5">
                      <Mic size={14} className="text-[#B45309]" />
                      <span>ऑडियो रिकॉर्डिंग / वॉइस क्लिप (Optional Audio File):</span>
                    </span>
                    {audioUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          setAudioUrl('');
                          setAudioFileName('');
                        }}
                        className="text-[10px] font-mono text-danger hover:underline cursor-pointer"
                      >
                        हटाएं (Remove)
                      </button>
                    )}
                  </div>

                  {audioUrl ? (
                    <div className="flex items-center gap-3">
                      <audio src={audioUrl} controls className="h-8 max-w-[220px]" />
                      <span className="text-[11px] font-mono text-mint-dark font-bold truncate">
                        ✓ {audioFileName || 'Audio attached'}
                      </span>
                    </div>
                  ) : (
                    <div>
                      <input
                        ref={audioInputRef}
                        type="file"
                        accept="audio/*"
                        onChange={handleAudioUpload}
                        className="hidden"
                        id="minimal-audio-upload"
                      />
                      <label
                        htmlFor="minimal-audio-upload"
                        className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-border hover:border-[#78350F] text-xs font-display font-bold text-ink inline-flex items-center gap-1.5 cursor-pointer shadow-soft"
                      >
                        <Upload size={13} />
                        <span>Upload Audio File</span>
                      </label>
                    </div>
                  )}
                </div>

                {/* 3. Target Lipi Selector */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono font-bold text-muted uppercase block">
                    3. Target Script (लिपि):
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {allLipis.map((lipi) => (
                      <button
                        key={lipi.id}
                        type="button"
                        onClick={() => setTargetLipiId(lipi.id)}
                        className={`p-1.5 rounded-xl border text-xs font-display font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                          targetLipiId === lipi.id
                            ? 'bg-[#78350F] text-white border-[#78350F] shadow-soft'
                            : 'bg-white dark:bg-slate-800 border-border text-ink hover:border-[#78350F]/40'
                        }`}
                      >
                        <span className="font-serif font-black text-xs">{lipi.symbol}</span>
                        <span className="truncate">{lipi.nameNative}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Optional Spelling Options (Optional Branches) */}
                <div className="space-y-2 pt-1 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-muted uppercase">
                      4. Possible Spelling Options (वैकल्पिक रूप - यदि हों):
                    </span>
                    <span className="text-[10px] font-mono text-muted">Optional</span>
                  </div>

                  {options.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {options.map((opt, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-slate-800 border border-[#78350F]/30 text-xs font-serif font-bold text-ink inline-flex items-center gap-1.5"
                        >
                          <span>{opt}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveOption(idx)}
                            className="text-muted hover:text-danger cursor-pointer"
                          >
                            <Trash2 size={11} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newOptionInput}
                      onChange={(e) => setNewOptionInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddOption();
                        }
                      }}
                      placeholder="e.g. R-I-N-A or रीना..."
                      className="flex-1 px-3 py-1.5 rounded-xl border border-border bg-[#FFFDF9] dark:bg-slate-800 text-xs font-serif text-ink"
                    />
                    <button
                      type="button"
                      onClick={handleAddOption}
                      className="px-3 py-1.5 rounded-xl bg-neutral dark:bg-slate-800 border border-border text-xs font-display font-bold text-ink hover:border-[#78350F] cursor-pointer"
                    >
                      <Plus size={13} className="inline mr-1" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>

                {/* Reviewer Notice */}
                <div className="p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-[#78350F]/20 text-[11px] font-serif text-[#78350F] dark:text-amber-300 flex items-start gap-2">
                  <Clock size={15} className="shrink-0 mt-0.5" />
                  <span>
                    <strong>Unverified Status:</strong> यह पोस्ट सीधे रिव्यूअर को जाएगी। जब रिव्यूअर इसे जांचकर स्वीकृत करेगा, तभी यह सार्वजनिक ज्ञान वृक्ष पर दिखेगी।
                  </span>
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl border border-border text-xs font-display font-bold text-muted hover:text-ink cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || (!wordOrQuestion.trim() && !imageUrl)}
                    className="btn-chunky-purple px-6 py-2 text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-soft disabled:opacity-50"
                  >
                    <Send size={13} />
                    <span>{isSubmitting ? 'Posting...' : 'Post to Reviewer (रिव्यूअर को भेजें)'}</span>
                  </button>
                </div>
              </>
            )}
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
