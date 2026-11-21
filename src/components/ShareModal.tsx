import { useEffect, useState } from 'react';
import { Check, Copy, Share2, X } from 'lucide-react';
import { buildShareSummary, type ArtistProfile } from '../utils/links';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ArtistProfile;
}

export function ShareModal({ isOpen, onClose, profile }: ShareModalProps) {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);

  const pageUrl =
    typeof window !== 'undefined' ? window.location.href : 'https://dilanazmusic';

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  async function handleCopyUrl() {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopiedUrl(true);
      window.setTimeout(() => setCopiedUrl(false), 2000);
    } catch {
      setCopiedUrl(false);
    }
  }

  async function handleNativeShare() {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: `${profile.name} — Resmi Bio Link`,
          text: buildShareSummary(profile),
          url: pageUrl,
        });
      } catch {
        // User cancelled share sheet; ignore cleanly
      }
    } else {
      await handleCopyUrl();
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Arka plana tıklayarak kapat"
        onClick={onClose}
        className="fixed inset-0 bg-[#0D141C]/50 backdrop-blur-xs cursor-default"
      />

      {/* Modal Panel */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-[#DCE4EC] bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-[#DCE4EC] bg-[#E3ECF2]">
              {!avatarFailed ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  onError={() => setAvatarFailed(true)}
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-[#1E3A5F]">
                  DN
                </div>
              )}
            </div>
            <div>
              <h2
                id="share-dialog-title"
                className="font-display text-xl font-semibold text-[#111820]"
              >
                Sayfayı Paylaş
              </h2>
              <p className="text-sm text-[#4F6172]">
                {profile.name} · {profile.handle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Paylaşım penceresini kapat"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-[#4F6172] transition-colors hover:bg-[#EEF3F7] hover:text-[#111820] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A5F] cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-5">
          <label
            htmlFor="share-page-url"
            className="block text-xs font-semibold text-[#475868]"
          >
            Bio Link Adresi
          </label>
          <div className="mt-2 flex items-center gap-2">
            <input
              id="share-page-url"
              type="text"
              readOnly
              value={pageUrl}
              className="min-h-[44px] w-full rounded-xl border border-[#D4DFE8] bg-[#F6F9FB] px-3.5 text-sm text-[#1F2D3A] focus-visible:outline-2 focus-visible:outline-[#1E3A5F]"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row gap-2.5">
          <button
            type="button"
            onClick={handleCopyUrl}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#111820] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1E3A5F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A5F] whitespace-nowrap cursor-pointer"
          >
            {copiedUrl ? (
              <>
                <Check className="h-4 w-4 text-[#4ADE80]" aria-hidden="true" />
                <span>Bağlantı Kopyalandı</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" aria-hidden="true" />
                <span>Bağlantıyı Kopyala</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleNativeShare}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#CBD7E2] bg-white px-4 py-2.5 text-sm font-medium text-[#1F2D3A] transition-colors hover:bg-[#F6F9FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A5F] whitespace-nowrap cursor-pointer"
          >
            <Share2 className="h-4 w-4 text-[#3D5266]" aria-hidden="true" />
            <span>Diğer Uygulamalar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
