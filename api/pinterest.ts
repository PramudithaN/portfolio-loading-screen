import Parser from 'rss-parser'

const parser = new Parser()

const PINTEREST_USERNAME = 'ad0bep'
const BOARD_NAMES = ['allpins']

interface PinterestImage {
  src: string
  title: string
  category: string
}

async function fetchPinterestImages(): Promise<PinterestImage[]> {
  const allImages: PinterestImage[] = []

  for (const board of BOARD_NAMES) {
    const rssUrl = `https://www.pinterest.com/${PINTEREST_USERNAME}/${board}.rss`
    try {
      const feed = await parser.parseURL(rssUrl)

      if (!feed?.items?.length) {
        console.warn(`[${board}] Feed parsed, but no items were found.`)
        continue
      }

      feed.items.forEach((item) => {
        if (item.content) {
          const imgSrcMatch = item.content.match(/<img src="(.*?)"/)
          if (imgSrcMatch) {
            let src = imgSrcMatch[1]
            src = src.replace(/\/\d+x\//, '/originals/')

            allImages.push({
              src,
              title: item.title ?? '',
              category: board,
            })
          }
        }
      })
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error)
      console.error(`[${board}] Failed to fetch or parse feed. Error: ${errorMsg}`)
    }
  }

  return allImages
}

export default async function handler(_req: unknown, res: {
  setHeader: (name: string, value: string) => void
  status: (code: number) => { json: (body: unknown) => void }
}) {
  try {
    const images = await fetchPinterestImages()
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
    res.status(200).json({ images })
  } catch {
    res.status(500).json({ images: [], error: 'Failed to fetch Pinterest feed' })
  }
}
