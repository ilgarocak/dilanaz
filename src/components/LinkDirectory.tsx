import { ArrowUpRight } from 'lucide-react';
import {
  FILTER_OPTIONS,
  filterArtistLinks,
  type ArtistLink,
  type LinkCategory,
} from '../utils/links';
import { PlatformIcon, getPlatformTone } from './PlatformIcon';

interface LinkDirectoryProps {
  links: ArtistLink[];
  activeCategory: LinkCategory;
  onCategoryChange: (category: LinkCategory) => void;
}

export function LinkDirectory({
  links,
  activeCategory,
  onCategoryChange,
}: LinkDirectoryProps) {
  const visibleLinks = filterArtistLinks(links, activeCategory);

  return (
    <section aria-labelledby="links-heading" className="w-full">
      {/* Section Header & Interactive Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#DCE4EC]">
        <div>
          <h2
            id="links-heading"
            className="font-display text-2xl font-semibold tracking-tight text-[#111820]"
          >
            Resmi Bağlantılar
          </h2>
          <p className="mt-1 text-sm text-[#506273]">
            <span>{visibleLinks.length} platform</span>
            <span className="mx-1.5 text-[#98A8B8]" aria-hidden="true">
              ·
            </span>
            <span>Doğrudan erişim</span>
          </p>
        </div>

        <div
          role="group"
          aria-label="Bağlantı kategorileri"
          className="inline-flex items-center gap-1 rounded-xl border border-[#D4DFE8] bg-[#E8EFF5] p-1"
        >
          {FILTER_OPTIONS.map((option) => {
            const isActive = activeCategory === option.id;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => onCategoryChange(option.id)}
                className={`min-h-[36px] rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A5F] whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#111820] shadow-xs'
                    : 'text-[#4B5E6F] hover:text-[#111820]'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Link Cards Stack */}
      <ul className="mt-5 flex flex-col gap-3">
        {visibleLinks.map((link) => (
          <li key={link.id}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-[76px] items-center justify-between gap-4 rounded-2xl border border-[#DCE4EC] bg-white px-4 py-3.5 sm:px-5 transition-all duration-150 hover:-translate-y-0.5 hover:border-[#9EB2C4] hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A5F]"
            >
              <div className="flex min-w-0 items-center gap-4">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${getPlatformTone(
                    link.id
                  )}`}
                >
                  <PlatformIcon platform={link.id} className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold text-[#111820] truncate">
                      {link.name}
                    </span>
                    <span className="text-xs font-medium text-[#5C6F82] hidden sm:inline whitespace-nowrap">
                      · {link.handle}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-[#4F6172] truncate">
                    {link.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-[#1E3A5F] group-hover:text-[#111820] whitespace-nowrap">
                <span>{link.actionLabel}</span>
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
