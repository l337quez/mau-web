import { MainLayout } from './layouts/MainLayout'
import { BoardView } from './features/board/BoardView'

function App() {
  return (
    <MainLayout>
      <BoardView />
    </MainLayout>
  )
}

export default App
