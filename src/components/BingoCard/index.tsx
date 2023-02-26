import { h, Fragment } from 'preact'

import style from './style.css'

export const BingoCard = () => {
  return (
    <Fragment>
      <table class={style.bingoCard}>
        <tbody>
          <tr>
            <td>A</td>
            <td>B</td>
            <td>C</td>
          </tr>
          <tr>
            <td>D</td>
            <td>Free</td>
            <td>E</td>
          </tr>
          <tr>
            <td>F</td>
            <td>G</td>
            <td>H</td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  )
}
