import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ARTIST_LINKS,
  ARTIST_PROFILE,
  buildShareSummary,
  filterArtistLinks,
  isValidExternalUrl,
  normalizeHandle,
} from './links';

test('ARTIST_PROFILE uses the exact uploaded local image paths', () => {
  assert.equal(ARTIST_PROFILE.name, 'Dila Naz');
  assert.equal(ARTIST_PROFILE.avatarUrl, '/assets/aistudio/dilanazpp_fa67c63d.jpg');
  assert.equal(
    ARTIST_PROFILE.bannerUrl,
    '/assets/aistudio/Woman_gazing_directly_into_camera_b96b37e4_2K_66c941a5.jpg'
  );
});

test('ARTIST_LINKS contains all five required channels with exact URLs', () => {
  const byId = new Map(ARTIST_LINKS.map((item) => [item.id, item]));
  assert.equal(ARTIST_LINKS.length, 5);
  assert.equal(
    byId.get('youtube')?.url,
    'https://www.youtube.com/@dilanazmusic'
  );
  assert.equal(
    byId.get('spotify')?.url,
    'https://open.spotify.com/intl-tr/artist/7oHRNXu9Bvaw0uHMSvdaex'
  );
  assert.equal(byId.get('tiktok')?.url, 'https://www.tiktok.com/@dilanazmusic');
  assert.equal(byId.get('x')?.url, 'https://x.com/dilanazmusic');
  assert.equal(
    byId.get('instagram')?.url,
    'https://www.instagram.com/dilanazmusic'
  );

  for (const link of ARTIST_LINKS) {
    assert.equal(isValidExternalUrl(link.url), true, `Expected valid URL for ${link.id}`);
  }
});

test('filterArtistLinks filters by category accurately', () => {
  const allLinks = filterArtistLinks(ARTIST_LINKS, 'all');
  assert.equal(allLinks.length, 5);

  const listenLinks = filterArtistLinks(ARTIST_LINKS, 'listen');
  assert.deepEqual(
    listenLinks.map((l) => l.id),
    ['spotify', 'youtube']
  );

  const socialLinks = filterArtistLinks(ARTIST_LINKS, 'social');
  assert.deepEqual(
    socialLinks.map((l) => l.id),
    ['instagram', 'tiktok', 'x']
  );
});

test('normalizeHandle formats handles consistently', () => {
  assert.equal(normalizeHandle('dilanazmusic'), '@dilanazmusic');
  assert.equal(normalizeHandle('@dilanazmusic'), '@dilanazmusic');
  assert.equal(normalizeHandle('  dilanazmusic  '), '@dilanazmusic');
  assert.equal(normalizeHandle('   '), '');
});

test('isValidExternalUrl rejects unsafe or malformed URLs', () => {
  assert.equal(isValidExternalUrl('https://open.spotify.com/artist/123'), true);
  assert.equal(isValidExternalUrl('javascript:alert(1)'), false);
  assert.equal(isValidExternalUrl('not-a-url'), false);
});

test('buildShareSummary includes artist name, handle, and bio', () => {
  const summary = buildShareSummary(ARTIST_PROFILE);
  assert.match(summary, /Dila Naz/);
  assert.match(summary, /@dilanazmusic/);
  assert.match(summary, /Yapay zeka/);
});
