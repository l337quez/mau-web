import { Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { AuthLayout } from './layouts/AuthLayout'
import { AuthView } from './features/auth/AuthView'
import { BoardView } from './features/board/BoardView'
import { ProjectsView } from './features/projects/ProjectsView'
import { InformationView } from './features/information/InformationView'
import { NotesView } from './features/notes/NotesView'

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={
        <AuthLayout>
          <AuthView />
        </AuthLayout>
      } />

      {/* Main App Routes (Private) */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/board" element={<MainLayout><BoardView /></MainLayout>} />
      <Route path="/projects" element={<MainLayout><ProjectsView /></MainLayout>} />
      <Route path="/info" element={<MainLayout><InformationView /></MainLayout>} />
      <Route path="/notes" element={<MainLayout><NotesView /></MainLayout>} />
    </Routes>
  )
}

export default App
