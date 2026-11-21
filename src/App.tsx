import { useState } from 'react';
import { ArtistHeroBanner } from './components/ArtistHeroBanner';
import { ArtistIdentityCard } from './components/ArtistIdentityCard';
import { LinkDirectory } from './components/LinkDirectory';
import { ShareModal } from './components/ShareModal';
import {
  ARTIST_LINKS,
  ARTIST_PROFILE,
  type LinkCategory,
} from './utils/links';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<LinkCategory>('all');
  const [isShareOpen, setIsShareOpen] = useState(false);

  const spotifyLink =
    ARTIST_LINKS.find((link) => link.id === 'spotify')?.url ??
    'https://open.spotify.com/intl-tr/artist/7oHRNXu9Bvaw0uHMSvdaex';

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#F2F5F8] text-[#111820]">
      <ArtistHeroBanner
        profile={ARTIST_PROFILE}
        onOpenShare={() => setIsShareOpen(true)}
      />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 items-start">
          <div className="lg:col-span-5">
            <ArtistIdentityCard
              profile={ARTIST_PROFILE}
              links={ARTIST_LINKS}
              spotifyUrl={spotifyLink}
            />
          </div>

          <div className="lg:col-span-7 lg:pt-6">
            <LinkDirectory
              links={ARTIST_LINKS}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
        </div>
      </main>

      <footer className="mx-auto w-full max-w-5xl border-t border-[#DCE4EC] px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#556779]">
          <p>
            © {new Date().getFullYear()} {ARTIST_PROFILE.name}
            <span className="mx-2 text-[#98A8B8]" aria-hidden="true">
              ·
            </span>
            Yapay Zeka ile Özgün Müzik
          </p>
          <button
            type="button"
            onClick={() => setIsShareOpen(true)}
            className="min-h-[36px] px-2 font-medium text-[#2A4258] underline-offset-4 hover:text-[#111820] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A5F] cursor-pointer"
          >
            Sayfa bağlantısını paylaş
          </button>
        </div>
      </footer>

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        profile={ARTIST_PROFILE}
      />
    </div>
  );
}
