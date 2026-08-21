# Pinterest Board Images via RSS Feed

This project doesn't use the official Pinterest API (which requires app review/OAuth).
Instead it pulls images from **public Pinterest boards using their RSS feed**, which
requires no API key or authentication.

## How it works

Every public Pinterest board exposes an RSS feed at:

```
https://www.pinterest.com/<username>/<board-slug>.rss
```

Each feed item's `content` field contains an `<img src="...">` tag with a thumbnail
URL (e.g. `.../236x/...`). Replacing the size segment with `originals` gives the
full-resolution image.

## Dependencies

```bash
pnpm add rss-parser
```

## Implementation

```ts
import Parser from 'rss-parser';

const parser = new Parser();

const PINTEREST_USERNAME = 'your-username';
const BOARD_NAMES = ['board-slug-1', 'board-slug-2'];

async function fetchPinterestImages() {
  const allImages: { src: string; title: string; category: string }[] = [];

  for (const board of BOARD_NAMES) {
    const rssUrl = `https://www.pinterest.com/${PINTEREST_USERNAME}/${board}.rss`;
    try {
      const feed = await parser.parseURL(rssUrl);

      if (!feed?.items?.length) {
        console.warn(`[${board}] Feed parsed, but no items were found.`);
        continue;
      }

      feed.items.forEach(item => {
        if (item.content) {
          const imgSrcMatch = item.content.match(/<img src="(.*?)"/);
          if (imgSrcMatch) {
            let src = imgSrcMatch[1];
            src = src.replace(/\/\d+x\//, '/originals/');

            allImages.push({
              src,
              title: item.title ?? '',
              category: board,
            });
          }
        }
      });
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error(`[${board}] Failed to fetch or parse feed. Error: ${errorMsg}`);
    }
  }
  return allImages;
}
```

## Usage

```ts
const images = await fetchPinterestImages();
// images: { src: string; title: string; category: string }[]
```

## Notes / limitations

- Only works for **public** boards.
- No authentication, rate limits, or API keys involved — but also unofficial and
  subject to change if Pinterest alters their RSS/markup format.
- Board slug is the URL-friendly board name as it appears in the board's URL
  (`pinterest.com/<username>/<board-slug>/`).
- Thumbnail sizes seen in feeds are typically like `236x`; swapping to `originals`
  yields the full-size image URL.
