import { h } from 'preact'
import { BingoCard } from './BingoCard'
import 'modern-normalize/modern-normalize.css'
import styled from 'styled-components'
import { cyan } from '../style/base'

const StyleAppContent = styled.main`
  max-width: 768px;
  margin: 0 auto;
  padding: 1rem;

  h1 {
    color: ${cyan[900]};
    text-align: center;
    margin-bottom: 2rem;
    margin-top: 2rem;
  }

  p {
    color: ${cyan[700]};
    font-size: 18px;
    margin-bottom: 2rem;
    max-width: 80ch;
    line-height: 24px;
  }
`

const App = () => (
  <div id="app">
    <StyleAppContent>
      <h1>Debugging Bingo</h1>
      <p>
        Trying to solve a bug in a system with multiple moving parts?
        Need a checklist to keep track of what system you already checked?
        Why not keep things fun with a bingo card instead?
      </p>
      <BingoCard />
    </StyleAppContent>
  </div>
)

export default App
