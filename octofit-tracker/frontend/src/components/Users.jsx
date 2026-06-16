import { useEffect, useState } from 'react'

// Codespaces URL example: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users

function parseListResponse(json, keyFallbacks = ['users', 'data', 'items', 'results']) {
  if (Array.isArray(json)) return json
  for (const key of keyFallbacks) {
    if (Array.isArray(json[key])) return json[key]
  }
  // If object contains a single array value, return it
  const arrVal = Object.values(json).find((v) => Array.isArray(v))
  return arrVal || []
}

export default function Users({ apiBase }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`${apiBase}/users`)
      .then((r) => r.json())
      .then((j) => setUsers(parseListResponse(j, ['users'])))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false))
  }, [apiBase])

  if (loading) return <div>Loading users…</div>
  return (
    <section>
      <h2>Users</h2>
      <ul>
        {users.map((u) => (
          <li key={u._id ?? u.id ?? u.email}>{u.name || u.email}</li>
        ))}
      </ul>
    </section>
  )
}
