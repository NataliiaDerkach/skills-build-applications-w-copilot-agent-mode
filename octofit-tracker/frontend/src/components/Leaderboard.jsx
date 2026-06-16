import { useEffect, useState } from 'react'

function parseListResponse(json, keyFallbacks = ['leaderboard', 'data', 'items', 'results']) {
  if (Array.isArray(json)) return json
  for (const key of keyFallbacks) {
    if (Array.isArray(json[key])) return json[key]
  }
  const arrVal = Object.values(json).find((v) => Array.isArray(v))
  return arrVal || []
}

export default function Leaderboard({ apiBase }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`${apiBase}/leaderboard`)
      .then((r) => r.json())
      .then((j) => setItems(parseListResponse(j, ['leaderboard'])))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [apiBase])

  if (loading) return <div>Loading leaderboard…</div>
  return (
    <section>
      <h2>Leaderboard</h2>
      <ol>
        {items.map((e) => (
          <li key={e._id ?? e.userId}>{e.userName || e.user || e.userId} — {e.totalPoints ?? e.points}</li>
        ))}
      </ol>
    </section>
  )
}
