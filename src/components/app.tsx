import { h } from 'preact'
import { BingoCard } from './BingoCard'
import 'modern-normalize/modern-normalize.css'

const App = () => (
  <div id='app'>
    <main>
      <h1>Bug Hunting Bingo</h1>
      <BingoCard />
    </main>
  </div>
)

export default App
