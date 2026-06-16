import { Link, Routes, Route } from 'react-router-dom'
import './App.css'
import Users from './components/Users.jsx'
import Teams from './components/Teams.jsx'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Workouts from './components/Workouts.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const API_BASE = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : `http://localhost:8000/api`

function Home() {
  return (
    <section id="center">
      <h1>OctoFit Tracker</h1>
      <p>Use the navigation to view API-backed pages.</p>
    </section>
  )
}

function App() {
  return (
    <div>
      <nav className="nav">
        <Link to="/">Home</Link> |
        <Link to="/users"> Users</Link> |
        <Link to="/teams"> Teams</Link> |
        <Link to="/activities"> Activities</Link> |
        <Link to="/workouts"> Workouts</Link> |
        <Link to="/leaderboard"> Leaderboard</Link>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users apiBase={API_BASE} />} />
          <Route path="/teams" element={<Teams apiBase={API_BASE} />} />
          <Route path="/activities" element={<Activities apiBase={API_BASE} />} />
          <Route path="/workouts" element={<Workouts apiBase={API_BASE} />} />
          <Route path="/leaderboard" element={<Leaderboard apiBase={API_BASE} />} />
        </Routes>
      </main>

      <footer>
        <small>
          API base: {API_BASE} (codespace: {codespaceName ?? 'none'})
        </small>
      </footer>
    </div>
  )
}

export default App
