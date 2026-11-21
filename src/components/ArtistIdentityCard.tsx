import { useState } from 'react';
import { ArrowUpRight, User } from 'lucide-react';
import type { ArtistLink, ArtistProfile } from '../utils/links';
import { PlatformIcon } from './PlatformIcon';

interface ArtistIdentityCardProps {
  profile: ArtistProfile;
  links: ArtistLink[];
  spotifyUrl: string;
}

export function ArtistIdentityCard({
  profile,
  links,
  spotifyUrl,
}: ArtistIdentityCardProps) {
  const [avatarFailed, setAvatarFailed] = useState(false);

  return (
    <section
      aria-label="Sanatçı profili"
      className="relative z-10 -mt-12 sm:-mt-20 lg:-mt-28 flex flex-col items-start"
    >
      {/* Profile Portrait */}
      <div className="mb-4 sm:mb-5 h-24 w-24 sm:h-36 sm:w-36 overflow-hidden rounded-2xl border border-[#D4DFE8] bg-[#E3ECF2] ring-4 ring-[#F2F5F8] shadow-sm">
        {!avatarFailed ? (
          <img
            src={profile.avatarUrl}
            alt={`${profile.name} profil fotoğrafı`}
            referrerPolicy="no-referrer"
            onError={() => setAvatarFailed(true)}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-gradient-to-b from-[#DCE7EE] to-[#C8D7E4] text-[#2B3E50]">
            <User className="h-8 w-8" aria-hidden="true" />
            <span className="text-xs font-medium">{profile.name}</span>
          </div>
        )}
      </div>

      {/* Artist Heading + Verified Badge */}
      <h1 className="flex items-center gap-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#111820] [text-wrap:balance]">
        <span>{profile.name}</span>
        <span
          title="Doğrulanmış Sanatçı"
          aria-label="Doğrulanmış Sanatçı"
          className="inline-flex shrink-0 items-center justify-center translate-y-[1px]"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 sm:h-6 sm:w-6 text-[#1D9BF0]"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z" />
          </svg>
        </span>
      </h1>

      {/* Unboxed Clean Metadata */}
      <p className="mt-2 text-sm font-medium text-[#475868]">
        <span>{profile.role}</span>
        <span className="mx-2 text-[#8FA1B2]" aria-hidden="true">
          ·
        </span>
        <span className="text-[#1E3A5F]">{profile.handle}</span>
      </p>

      {/* Artist Bio */}
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#2F3E4D]">
        {profile.bio}
      </p>

      {/* Primary Action */}
      <div className="mt-6 w-full sm:w-auto">
        <a
          href={spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl bg-[#111820] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#1E3A5F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A5F] whitespace-nowrap shrink-0"
        >
          <PlatformIcon platform="spotify" className="h-4 w-4 text-[#4ADE80]" />
          <span>Spotify&apos;da Dinle</span>
          <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden="true" />
        </a>
      </div>

      {/* Compact Quick Social Strip */}
      <nav
        aria-label="Hızlı platform bağlantıları"
        className="mt-7 flex items-center gap-2 border-t border-[#DCE4EC] pt-5 w-full"
      >
        {links.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${item.name} hesabını aç (${item.handle})`}
            title={`${item.name} · ${item.handle}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#DCE4EC] bg-white text-[#243442] transition-all duration-150 hover:-translate-y-0.5 hover:border-[#9EB2C4] hover:text-[#111820] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A5F]"
          >
            <PlatformIcon platform={item.id} className="h-[18px] w-[18px]" />
          </a>
        ))}
      </nav>
    </section>
  );
}
