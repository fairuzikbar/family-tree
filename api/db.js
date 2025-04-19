import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const databaseId = process.env.NOTION_DB_ID

export default async function handler(req, res) {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    })

    // Log the raw response to inspect its structure
    console.log('Raw Notion API Response:', JSON.stringify(response, null, 2))

    const items = response.results.map((item) => {
      const props = item.properties
      return {
        idloop: item.id,
        id: props.id?.number ?? null,
        // pids: [props.pids?.number] ?? null,
        pids:
          props.pids?.rich_text[0]?.text?.content
            ?.split(',')
            .map((s) => parseInt(s.trim()))
            .filter((n) => !isNaN(n)) ?? [],
        divorced: [props.divorced?.number] ?? [],
        mid: props.mid?.number ?? null,
        fid: props.fid?.number ?? null,
        name: props.name?.rich_text[0]?.text?.content ?? '',
        nickname: props.nickname?.rich_text[0]?.text?.content ?? '',
        gender: props.gender?.select?.name ?? '',
        img: props.img?.url ?? '',
        fams: props.fams?.title[0]?.text?.content ?? '',
        fams_spec: props.fams_spec?.rich_text[0]?.text?.content ?? '',
        place: props.place?.rich_text[0]?.text?.content ?? '',
        year:
          (props.death_year?.rich_text[0]?.text?.content ?? '')
            ? `${props.birth_year?.rich_text[0]?.text?.content ?? 'unknown'} - ${props.death_year?.rich_text[0]?.text?.content ?? 'unknown'}`
            : `${props.birth_year?.rich_text[0]?.text?.content ?? 'unknown'}`,
        // age: props.Age?.number ?? null,
        // role: props.Role?.select?.name ?? ""
      }
    })
    items.sort((a, b) => a.id - b.id)
    res.status(200).json(items)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
