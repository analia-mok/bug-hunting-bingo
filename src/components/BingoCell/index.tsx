import { h } from 'preact'
import { forwardRef } from 'preact/compat'
import { useId, useState } from 'preact/hooks'
import style from './style.css'

type BingoCellProps = {
  label: string
}

export const BingoCell = forwardRef<HTMLInputElement, BingoCellProps>(
  ({ label }, ref) => {
    const [checked, setChecked] = useState(false)
    const id = useId()

    return (
      <td class={style.bingoCell}>
        <label htmlFor={id}>{label}</label>
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          id={id}
          onClick={() => {
            setChecked(!checked)
          }}
        />
      </td>
    )
  }
)
