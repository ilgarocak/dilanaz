export type LinkCategory = 'all' | 'listen' | 'social';

export type PlatformId = 'spotify' | 'youtube' | 'instagram' | 'tiktok' | 'x';

export interface ArtistLink {
  id: PlatformId;
  name: string;
  subtitle: string;
  handle: string;
  url: string;
  category: Exclude<LinkCategory, 'all'>;
  actionLabel: string;
  featured?: boolean;
}

export interface ArtistProfile {
  name: string;
  role: string;
  bio: string;
  handle: string;
  avatarUrl: string;
  bannerUrl: string;
}

export const ARTIST_PROFILE: ArtistProfile = {
  name: 'Dila Naz',
  role: 'Yapay Zeka Müzik Sanatçısı',
  bio: 'Yapay zeka ile özgün müzikler yapıyorum. Ses tasarımı, melodik deneyler ve dijital kompozisyonlarımı tüm platformlarda dinleyebilirsiniz.',
  handle: '@dilanazmusic',
  avatarUrl: '/assets/aistudio/dilanazpp_fa67c63d.jpg',
  bannerUrl: '/assets/aistudio/Woman_gazing_directly_into_camera_b96b37e4_2K_66c941a5.jpg',
};

export const ARTIST_LINKS: ArtistLink[] = [
  {
    id: 'spotify',
    name: 'Spotify',
    subtitle: 'Tüm tekliler ve çalma listeleri',
    handle: 'Dila Naz',
    url: 'https://open.spotify.com/intl-tr/artist/7oHRNXu9Bvaw0uHMSvdaex',
    category: 'listen',
    actionLabel: 'Dinle',
    featured: true,
  },
  {
    id: 'youtube',
    name: 'YouTube',
    subtitle: 'Resmi müzik videoları ve yeni yayınlar',
    handle: '@dilanazmusic',
    url: 'https://www.youtube.com/@dilanazmusic',
    category: 'listen',
    actionLabel: 'İzle',
    featured: true,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    subtitle: 'Stüdyo kesitleri, görsel dünya ve duyurular',
    handle: '@dilanazmusic',
    url: 'https://www.instagram.com/dilanazmusic',
    category: 'social',
    actionLabel: 'Takip Et',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    subtitle: 'Kısa performanslar ve üretim süreci',
    handle: '@dilanazmusic',
    url: 'https://www.tiktok.com/@dilanazmusic',
    category: 'social',
    actionLabel: 'Keşfet',
  },
  {
    id: 'x',
    name: 'X',
    subtitle: 'Güncel paylaşımlar ve yapay zeka müzik notları',
    handle: '@dilanazmusic',
    url: 'https://x.com/dilanazmusic',
    category: 'social',
    actionLabel: 'Gör',
  },
];

export const FILTER_OPTIONS: { id: LinkCategory; label: string }[] = [
  { id: 'all', label: 'Tümü' },
  { id: 'listen', label: 'Dinle' },
  { id: 'social', label: 'Sosyal' },
];

export function filterArtistLinks(
  links: readonly ArtistLink[],
  category: LinkCategory
): ArtistLink[] {
  if (category === 'all') {
    return [...links];
  }
  return links.filter((link) => link.category === category);
}

export function normalizeHandle(rawHandle: string): string {
  const trimmed = rawHandle.trim();
  if (!trimmed) {
    return '';
  }
  return trimmed.startsWith('@') ? trimmed : `@${trimmed}`;
}

export function isValidExternalUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

export function buildShareSummary(profile: ArtistProfile): string {
  return `${profile.name} (${profile.handle}) — ${profile.bio}`;
}
