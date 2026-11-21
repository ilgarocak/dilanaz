import { useState } from 'react';
import { Share2, Music2 } from 'lucide-react';
import type { ArtistProfile } from '../utils/links';

interface ArtistHeroBannerProps {
  profile: ArtistProfile;
  onOpenShare: () => void;
}

export function ArtistHeroBanner({ profile, onOpenShare }: ArtistHeroBannerProps) {
  const [bannerFailed, setBannerFailed] = useState(false);

  return (
    <header className="relative w-full overflow-hidden bg-[#DCE6EE]">
      <div className="relative h-52 sm:h-72 lg:h-84 w-full">
        {!bannerFailed ? (
          <img
            src={profile.bannerUrl}
            alt={`${profile.name} banner görseli`}
            referrerPolicy="no-referrer"
            onError={() => setBannerFailed(true)}
            className="h-full w-full object-cover object-[50%_46%] select-none"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#D4E0E9] via-[#E5EDF2] to-[#C8D7E4]">
            <div className="flex items-center gap-2 text-[#334657]">
              <Music2 className="h-6 w-6" aria-hidden="true" />
              <span className="font-display text-lg font-medium">{profile.name}</span>
            </div>
          </div>
        )}

        {/* Top mist scrim for legible navigation controls */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#DCE6EE]/80 via-[#DCE6EE]/35 to-transparent"
        />

        {/* Bottom seamless blend into page canvas */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#F2F5F8] via-[#F2F5F8]/65 to-transparent"
        />

        {/* Clean Top Utility Bar */}
        <div className="absolute inset-x-0 top-0 z-10 mx-auto flex max-w-5xl items-center justify-between gap-8 px-4 py-4 sm:px-6 lg:px-8">
          <a
            href="#top"
            className="font-display text-lg font-semibold tracking-tight text-[#111820] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A5F] rounded-sm"
          >
            {profile.name}
          </a>

          <button
            type="button"
            onClick={onOpenShare}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[#C6D4E0] bg-white/85 px-4 py-2 text-sm font-medium text-[#111820] backdrop-blur-md transition-colors duration-150 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A5F] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Share2 className="h-4 w-4 text-[#2C465E]" aria-hidden="true" />
            <span>Paylaş</span>
          </button>
        </div>
      </div>
    </header>
  );
}
