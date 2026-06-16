
// Codespaces URL example: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams
import { useEffect, useState } from 'react'

function parseListResponse(json, keyFallbacks = ['teams', 'data', 'items', 'results']) {
  if (Array.isArray(json)) return json
  for (const key of keyFallbacks) {
    if (Array.isArray(json[key])) return json[key]
  }
  const arrVal = Object.values(json).find((v) => Array.isArray(v))
  return arrVal || []
}

export default function Teams({ apiBase }) {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`${apiBase}/teams`)
      .then((r) => r.json())
      .then((j) => setTeams(parseListResponse(j, ['teams'])))
      .catch(() => setTeams([]))
      .finally(() => setLoading(false))
  }, [apiBase])

  if (loading) return <div>Loading teams…</div>
  return (
    <section>
      <h2>Teams</h2>
      <ul>
        {teams.map((t) => (
          <li key={t._id ?? t.id}>{t.name} — {t.members ?? t.memberCount}</li>
        ))}
      </ul>
    </section>
  )
}
