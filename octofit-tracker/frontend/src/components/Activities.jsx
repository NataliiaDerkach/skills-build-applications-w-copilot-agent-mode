import { useEffect, useState } from 'react'

function parseListResponse(json, keyFallbacks = ['activities', 'data', 'items', 'results']) {
  if (Array.isArray(json)) return json
  for (const key of keyFallbacks) {
    if (Array.isArray(json[key])) return json[key]
  }
  const arrVal = Object.values(json).find((v) => Array.isArray(v))
  return arrVal || []
}

export default function Activities({ apiBase }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`${apiBase}/activities`)
      .then((r) => r.json())
      .then((j) => setItems(parseListResponse(j, ['activities'])))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [apiBase])

  if (loading) return <div>Loading activities…</div>
  return (
    <section>
      <h2>Activities</h2>
      <ul>
        {items.map((a) => (
          <li key={a._id ?? a.id}>{a.type} — {a.duration}min {a.distance ? `(${a.distance} km)` : ''}</li>
        ))}
      </ul>
    </section>
  )
}
