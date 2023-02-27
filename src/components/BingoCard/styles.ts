import { cyan } from '../../style/base'
import styled from 'styled-components'

export const StyledAppWrapper = styled.section`
  display: flex;
  padding: 1rem 2rem;
  gap: 2rem;
  flex-wrap: wrap;

  @media screen and (min-width: 800px) {
    flex-wrap: nowrap;
  }
`

export const StyledTextAreaSection = styled.section`
  flex: 1 1 100%;
  color: ${cyan[700]};

  @media screen and (min-width: 800px) {
    flex: 1 1 0%;
    margin-bottom: 4rem;
    max-width: 40%;
  }

  label {
    font-size: 18px;
    font-weight: bold;
    display: block;
    margin-bottom: 1rem;
  }

  textarea {
    border-color: ${cyan[700]};
    width: 100%;
    border-radius: 6px;
    padding: 10px;
  }
`

export const StyledBingoColumn = styled.section`
  flex: 1 1 100%;
  margin-bottom: 6rem;

  @media screen and (min-width: 800px) {
    flex: 1 1 50%;
  }
`

export const StyledBingoCardWrapper = styled.div`
  border-radius: 12px;
  overflow: hidden;
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
