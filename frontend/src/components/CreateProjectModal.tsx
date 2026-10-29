import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Plus,
  Trash2,
  Volume2,
  Upload,
  Image as ImageIcon,
  Sparkles,
  Scale,
  ShieldCheck,
  CheckCircle2,
  Info
} from 'lucide-react';
import { useLipi } from '@/contexts/LipiContext';
import { useAuth } from '@/contexts/AuthContext';
import { playPronunciation, playAcousticChime, playSuccessChime } from '@/utils/audio';
import type { ScriptProjectBranch } from '@/data/lipiData';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: (projectId: string) => void;
}

const PRESET_IMAGES = [
  {
    name: 'Stone Epigraph',
    url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    description: 'Ancient temple stone inscription'
  },
  {
    name: 'Palm Leaf Codex',
    url: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80',
    description: 'Classical historical manuscript fragment'
  },
  {
    name: 'Village Signboard',
    url: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=600&q=80',
    description: 'Living spoken vernacular signage'
  }
];

export function CreateProjectModal({ isOpen, onClose, onCreated }: CreateProjectModalProps) {
  const { activeLipi, allLipis, createProject } = useLipi();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [targetLipiId, setTargetLipiId] = useState(activeLipi.id);
  const [spokenWord, setSpokenWord] = useState('रीना / Reena');
  const [title, setTitle] = useState('How should the spoken name "Reena" (रीना) be written?');
  const [dialectContext, setDialectContext] = useState('Bhasha & Bol Bharat — Living Oral & Written Variety');
  const [description, setDescription] = useState(
    'Community speakers pronounce the name with a sustained long "ee" sound. We are deciding between ASCII feature-phone typing (R-I-N-A), English digraphs (R-E-E-N-A), and native Devanagari (रीना). Community speakers decide.'
  );
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Branches State (Default: Reena options as requested by user)
  const [branches, setBranches] = useState<ScriptProjectBranch[]>([
    {
      id: 'branch-1',
      label: 'Option A: R-I-N-A',
      representation: 'Rina',
      scriptType: 'ASCII Latin',
      phoneticAccuracy: 75,
      easeOfLearning: 'High',
      communityVotes: 1,
      audioPronunciation: 'Rina',
      rationale: 'Maximum keyboard ease on basic mobile devices, but ambiguous vowel length.'
    },
    {
      id: 'branch-2',
      label: 'Option B: R-E-E-N-A',
      representation: 'Reena',
      scriptType: 'English Digraph Latin',
      phoneticAccuracy: 88,
      easeOfLearning: 'High',
      communityVotes: 1,
      audioPronunciation: 'Reena',
      rationale: 'Popular among young mobile texters. Clarifies long vowel without special fonts.'
    },
    {
      id: 'branch-3',
      label: 'Option C: रीना',
      representation: 'रीना',
      scriptType: 'Devanagari Script',
      phoneticAccuracy: 100,
      easeOfLearning: 'Medium',
      communityVotes: 2,
      audioPronunciation: 'रीना',
      rationale: '100% lossless acoustic and scribal accuracy with native Dirgha Ee Matra.'
    }
  ]);

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

  const handleSelectPresetImage = (url: string) => {
    setImageUrl(url);
    setImagePreview(url);
  };

  const handleRemoveImage = () => {
    setImageUrl('');
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Branch operations
  const handleUpdateBranch = (idx: number, patch: Partial<ScriptProjectBranch>) => {
    setBranches((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], ...patch };
      return copy;
    });
  };

  const handleAddBranch = () => {
    const newIdx = branches.length + 1;
    const newBranch: ScriptProjectBranch = {
      id: `branch-${Date.now()}-${newIdx}`,
      label: `Option ${String.fromCharCode(64 + newIdx)}: Custom Branch`,
      representation: '',
      scriptType: 'Vernacular Variant',
      phoneticAccuracy: 90,
      easeOfLearning: 'Medium',
      communityVotes: 1,
      audioPronunciation: spokenWord.split('/')[0].trim() || 'Word',
      rationale: 'Proposed alternative orthography for community consensus.'
    };
    setBranches((prev) => [...prev, newBranch]);
  };

  const handleRemoveBranch = (idx: number) => {
    if (branches.length <= 2) return;
    setBranches((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleTestAudio = (text: string) => {
    playAcousticChime(560, 0.2);
    playPronunciation(text.split('/')[0].trim(), 'hi-IN');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!spokenWord.trim() || !title.trim() || branches.length < 2) return;

    setIsSubmitting(true);
    const targetLipi = allLipis.find((l) => l.id === targetLipiId) || activeLipi;

    const newProject = createProject({
      title: title.trim(),
      spokenWord: spokenWord.trim(),
      dialectContext: dialectContext.trim() || 'Living Spoken Dialect Tradition',
      lipiId: targetLipi.id,
      lipiName: `${targetLipi.nameNative} (${targetLipi.nameEnglish})`,
      imageUrl: imageUrl.trim() || undefined,
      description: description.trim(),
      author: user?.display_name || 'Aria (User)',
      branches: branches.map((b) => ({
        ...b,
        audioPronunciation: b.audioPronunciation.trim() || b.representation.trim() || spokenWord.trim()
      }))
    });

    playSuccessChime();
    setSuccess(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(false);
      onClose();
      if (onCreated) {
        onCreated(newProject.id);
      }
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white dark:bg-slate-900 rounded-3xl border-[1.5px] border-border shadow-elevated w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden my-auto"
          style={{ borderBottomWidth: '4px', borderBottomColor: '#78350F' }}
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b-[1.5px] border-border bg-[#FFFDF9] dark:bg-slate-800/80 flex items-center justify-between gap-4 shrink-0">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-[#78350F] dark:text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                <Sparkles size={12} />
                <span>PS 5.4 • Community Script Project & Dilemma</span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-black text-ink">
                नया लिपि अन्वेषण एवं ज्ञान वृक्ष प्रोजेक्ट
              </h2>
              <p className="text-xs font-serif text-muted">
                Create a knowledge tree for a spoken word or inscription photo. Let the community vote and compare keypad ease vs phonetics.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-muted hover:text-ink hover:bg-neutral transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-6 overflow-y-auto flex-1">
            {success && (
              <div className="p-4 rounded-2xl bg-mint/30 border border-mint-dark/30 text-ink flex items-center gap-2.5 text-xs font-display font-bold">
                <CheckCircle2 size={18} className="text-mint-dark shrink-0" />
                <span>Project published! Submitted to the Reviewer's queue and live on the Knowledge Tree.</span>
              </div>
            )}

            {/* Target Script Selector */}
            <div className="space-y-2">
              <label className="text-xs font-display font-bold text-ink uppercase tracking-wider block">
                Target Writing System / Lipi Domain:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {allLipis.map((lipi) => (
                  <button
                    key={lipi.id}
                    type="button"
                    onClick={() => setTargetLipiId(lipi.id)}
                    className={`p-2.5 rounded-xl border-[1.5px] text-left transition-all cursor-pointer flex items-center gap-2 ${
                      targetLipiId === lipi.id
                        ? 'bg-amber-100/70 border-[#78350F] text-[#78350F] dark:bg-amber-950/60 dark:text-amber-300 font-bold'
                        : 'border-border bg-white dark:bg-slate-800 text-ink hover:border-[#78350F]/40'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-[#78350F] text-white flex items-center justify-center font-serif font-black text-xs shrink-0">
                      {lipi.symbol}
                    </span>
                    <span className="text-xs font-display font-bold truncate">
                      {lipi.nameNative}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Spoken Word & Audio Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
              <div className="sm:col-span-8 space-y-1.5">
                <label className="text-xs font-display font-bold text-ink uppercase tracking-wider block">
                  1. Spoken Word or Dialect Sound (बोला जाने वाला शब्द):
                </label>
                <input
                  type="text"
                  value={spokenWord}
                  onChange={(e) => setSpokenWord(e.target.value)}
                  placeholder="e.g. रीना / Reena, or a regional utterance"
                  className="w-full px-4 py-2.5 rounded-xl border-[1.5px] border-border bg-[#FFFDF9] dark:bg-slate-800 text-ink text-sm font-serif font-bold focus:border-[#78350F] focus:outline-none"
                  required
                />
              </div>

              <div className="sm:col-span-4">
                <button
                  type="button"
                  onClick={() => handleTestAudio(spokenWord)}
                  className="w-full px-3 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border-[1.5px] border-[#78350F]/30 hover:border-[#78350F] text-[#78350F] dark:text-amber-300 text-xs font-display font-bold flex items-center justify-center gap-2 cursor-pointer shadow-soft transition-all"
                >
                  <Volume2 size={16} />
                  <span>Test Audio Sound</span>
                </button>
              </div>
            </div>

            {/* Optional Photo / Inscription Upload */}
            <div className="space-y-3 p-4 rounded-2xl bg-neutral/50 dark:bg-slate-800/60 border-[1.5px] border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ImageIcon size={16} className="text-[#B45309]" />
                  <label className="text-xs font-display font-bold text-ink uppercase tracking-wider">
                    2. Inscription / Written Photo (Optional):
                  </label>
                </div>
                {imagePreview && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="text-[11px] font-mono text-danger hover:underline cursor-pointer"
                  >
                    Remove Photo
                  </button>
                )}
              </div>
              <p className="text-[11px] font-serif text-muted">
                Found a stone carving, palm-leaf codex, or handwritten board? Upload a photo for community decipherment.
              </p>

              {imagePreview ? (
                <div className="flex items-center gap-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-xl border-[1.5px] border-border shadow-soft"
                  />
                  <div className="text-xs font-serif text-ink">
                    <span className="font-bold text-mint-dark block">✓ Photo attached</span>
                    <span className="text-muted text-[11px]">Will be displayed to community voters and reviewers.</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="project-image-upload"
                    />
                    <label
                      htmlFor="project-image-upload"
                      className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border-[1.5px] border-border hover:border-[#78350F] text-xs font-display font-bold text-ink flex items-center gap-2 cursor-pointer shadow-soft"
                    >
                      <Upload size={14} />
                      <span>Upload Photo from Device</span>
                    </label>

                    <span className="text-[11px] font-mono text-muted">or pick a sample:</span>

                    {PRESET_IMAGES.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectPresetImage(preset.url)}
                        className="px-2.5 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-[#78350F]/20 text-[10px] font-mono font-bold text-[#78350F] dark:text-amber-300 hover:bg-amber-100 cursor-pointer"
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Dilemma Title & Description */}
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-display font-bold text-ink uppercase tracking-wider block">
                  3. Dilemma Title & Community Question:
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. How should the spoken name 'Reena' (रीना) be written?"
                  className="w-full px-4 py-2.5 rounded-xl border-[1.5px] border-border bg-[#FFFDF9] dark:bg-slate-800 text-ink text-sm font-serif font-bold focus:border-[#78350F] focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-display font-bold text-ink uppercase tracking-wider block">
                  Community Dialect / Region Context:
                </label>
                <input
                  type="text"
                  value={dialectContext}
                  onChange={(e) => setDialectContext(e.target.value)}
                  placeholder="e.g. Bhasha & Bol Bharat — Living Oral & Written Variety"
                  className="w-full px-4 py-2 rounded-xl border-[1.5px] border-border bg-[#FFFDF9] dark:bg-slate-800 text-ink text-xs font-serif focus:border-[#78350F] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-display font-bold text-ink uppercase tracking-wider block">
                  Explanation & Context:
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border-[1.5px] border-border bg-[#FFFDF9] dark:bg-slate-800 text-ink text-xs font-serif focus:border-[#78350F] focus:outline-none"
                />
              </div>
            </div>

            {/* Competing Branches Builder */}
            <div className="space-y-3 pt-2 border-t-[1.5px] border-border">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-xs font-display font-black text-ink uppercase tracking-wider block">
                    4. Competing Knowledge Tree Branches ({branches.length} Options):
                  </label>
                  <p className="text-[11px] font-serif text-muted">
                    Each branch becomes an interactive leaf on the 3D Decision Tree for community voting and reviewer calibration.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddBranch}
                  className="px-3 py-1.5 rounded-xl bg-purple-light border border-purple/30 text-purple text-xs font-display font-bold flex items-center gap-1.5 hover:bg-purple hover:text-white cursor-pointer transition-all"
                >
                  <Plus size={14} />
                  <span>Add Branch</span>
                </button>
              </div>

              <div className="space-y-3">
                {branches.map((branch, idx) => (
                  <div
                    key={branch.id || idx}
                    className="p-4 rounded-2xl bg-[#FFFDF9] dark:bg-slate-800/90 border-[1.5px] border-border space-y-3 relative shadow-soft"
                  >
                    <div className="flex items-center justify-between border-b border-border pb-2">
                      <span className="font-display font-black text-xs text-[#78350F] dark:text-amber-400">
                        Branch #{idx + 1}: {branch.label}
                      </span>
                      {branches.length > 2 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveBranch(idx)}
                          className="text-danger hover:text-danger-light p-1 cursor-pointer"
                          title="Remove branch"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-muted block mb-1">
                          Option Label:
                        </span>
                        <input
                          type="text"
                          value={branch.label}
                          onChange={(e) => handleUpdateBranch(idx, { label: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border border-border bg-white dark:bg-slate-700 text-xs font-display font-bold text-ink"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] font-mono uppercase text-muted block mb-1">
                          Written Representation:
                        </span>
                        <input
                          type="text"
                          value={branch.representation}
                          onChange={(e) => handleUpdateBranch(idx, { representation: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border border-border bg-white dark:bg-slate-700 text-xs font-serif font-black text-ink"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] font-mono uppercase text-muted block mb-1">
                          Keypad Ease of Learning:
                        </span>
                        <select
                          value={branch.easeOfLearning}
                          onChange={(e) =>
                            handleUpdateBranch(idx, {
                              easeOfLearning: e.target.value as 'High' | 'Medium' | 'Complex'
                            })
                          }
                          className="w-full px-3 py-1.5 rounded-lg border border-border bg-white dark:bg-slate-700 text-xs font-mono font-bold text-ink"
                        >
                          <option value="High">High (Standard Keypad)</option>
                          <option value="Medium">Medium (Special Ligatures)</option>
                          <option value="Complex">Complex (Ancient SMP Unicode)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono uppercase text-muted block mb-1">
                        Linguistic Rationale & Learning Trade-off:
                      </span>
                      <input
                        type="text"
                        value={branch.rationale}
                        onChange={(e) => handleUpdateBranch(idx, { rationale: e.target.value })}
                        placeholder="Why should or shouldn't speakers choose this convention?"
                        className="w-full px-3 py-1.5 rounded-lg border border-border bg-white dark:bg-slate-700 text-xs font-serif text-ink"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sovereign Principle Notice */}
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-[#78350F]/20 text-xs font-serif text-[#78350F] dark:text-amber-300 flex items-start gap-2.5">
              <Info size={16} className="shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Sovereign Community Principle (PS 5.4):</span>
                <span>The community is the decision-maker, not just the dataset. Submitting sends this to authorized reviewers while keeping voting open to all speakers.</span>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t-[1.5px] border-border shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-border text-xs font-display font-bold text-muted hover:text-ink cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-chunky-purple px-7 py-2.5 text-xs inline-flex items-center gap-2 cursor-pointer shadow-soft"
              >
                <ShieldCheck size={16} />
                <span>{isSubmitting ? 'Publishing Tree...' : 'Publish Knowledge Tree & Submit to Reviewer'}</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
