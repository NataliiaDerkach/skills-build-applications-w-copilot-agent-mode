import { useEffect, useState } from 'react'

function parseListResponse(json, keyFallbacks = ['workouts', 'data', 'items', 'results']) {
  if (Array.isArray(json)) return json
  for (const key of keyFallbacks) {
    if (Array.isArray(json[key])) return json[key]
  }
  const arrVal = Object.values(json).find((v) => Array.isArray(v))
  return arrVal || []
}

export default function Workouts({ apiBase }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`${apiBase}/workouts`)
      .then((r) => r.json())
      .then((j) => setItems(parseListResponse(j, ['workouts'])))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [apiBase])

  if (loading) return <div>Loading workouts…</div>
  return (
    <section>
      <h2>Workouts</h2>
      <ul>
        {items.map((w) => (
          <li key={w._id ?? w.id}>{w.title} — {w.duration}min</li>
        ))}
      </ul>
    </section>
  )
}
