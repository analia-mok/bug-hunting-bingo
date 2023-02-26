import { h } from 'preact'
import { forwardRef } from 'preact/compat'
import { useId, useState } from 'preact/hooks'
import { StyledBingoCell } from './styles'

type BingoCellProps = {
  label: string
}

export const BingoCell = forwardRef<HTMLInputElement, BingoCellProps>(
  ({ label }, ref) => {
    const [checked, setChecked] = useState(false)
    const id = useId()

    return (
      <StyledBingoCell className={checked ? 'checked' : ''}>
        <label htmlFor={id}>
          <span>{label}</span>
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            id={id}
            onClick={() => {
              setChecked(!checked)
            }}
            />
        </label>
      </StyledBingoCell>
    )
  }
)
