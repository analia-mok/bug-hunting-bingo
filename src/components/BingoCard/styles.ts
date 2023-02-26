import styled from "styled-components"

export const StyledBingoCardWrapper = styled.div`
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 4rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`

export const StyledBingoCard = styled.table`
  background-color: white;
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed;
`

export const StyledBingoRow = styled.tr`
  border-bottom: 1px solid rgb(0 0 0 / 0.1);

  &:last-child {
    border-bottom: 0;
  }
`
