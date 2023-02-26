import { cyan } from '../../style/base'
import styled from 'styled-components'

export const StyledBingoCell = styled.td`
  border-right: 1px solid rgb(0 0 0 / 0.1);
  font-size: 18px;
  text-align: center;
  color: ${cyan[900]};
  font-weight: 500;
  height: 150px;

  &:last-child {
    border-right: 0;
  }

  &.checked {
    background-color: ${cyan[700]};
    color: ${cyan[50]};
  }

  label {
    height: 100%;
    display: flex;
    cursor: pointer;
    padding: 1rem;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 1rem;
  }

  input[type="checkbox"] {
    cursor: pointer;
  }
`
