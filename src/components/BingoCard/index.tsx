import { h, Fragment } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { BingoCardConfig } from '../BingoCardConfig'
import { BingoCell } from '../BingoCell'
import { useBingoContext } from '../BingoContext'
import {
  StyledAppWrapper,
  StyledBingoCard,
  StyledBingoCardWrapper,
  StyledBingoColumn,
  StyledBingoRow,
  StyledTextAreaSection,
} from './styles'

// Placeholder content to preview bingo card table
const placeholderBingoItems = [
  ['Service 1', 'Service 2', 'Service 3'],
  ['Service 4', 'Free', 'Service 5'],
  ['Service 6', 'Service 7', 'Service 8'],
]

export const BingoCard = () => {
  const [bingoItems, setBingoItems] = useState<string[][]>(
    placeholderBingoItems
  )
  const { includeFreeSpace, services } = useBingoContext()

  useEffect(() => {
    if (!services.length) {
      return
    }

    let selectableServices = [...services]
    const randomizedItems: string[] = []

    while (randomizedItems.length < 9) {
      // Add free space in the middle
      if (includeFreeSpace && randomizedItems.length === 4) {
        randomizedItems.push('Free')
        continue
      }

      const randomIndex = Math.floor(Math.random() * selectableServices.length)

      randomizedItems.push(selectableServices[randomIndex])

      // Remove used element to minimize duplicates
      selectableServices.splice(randomIndex, 1)

      // Cycle back through services to make sure we're filling up the card
      if (selectableServices.length === 0) {
        selectableServices = [...services]
      }
    }

    // TODO: Will be configurable later
    const rowSize = 3
    const chunkedRandomizedItems: string[][] = []
    for (let i = 0; i < randomizedItems.length; i += rowSize) {
      chunkedRandomizedItems.push(randomizedItems.slice(i, i + rowSize))
    }

    setBingoItems(chunkedRandomizedItems)
  }, [services, includeFreeSpace])

  return (
    <StyledAppWrapper>
      <StyledTextAreaSection>
        <BingoCardConfig />
      </StyledTextAreaSection>
      <StyledBingoColumn>
        <h2>Your Card:</h2>
        <StyledBingoCardWrapper>
          <StyledBingoCard>
            <tbody>
              {bingoItems.map((row, rowIndex) => (
                <StyledBingoRow key={`bingo-row-${rowIndex}`}>
                  {row.map((item, index) => (
                    <Fragment key={`bingo-item-${index}`}>
                      <BingoCell label={item} />
                    </Fragment>
                  ))}
                </StyledBingoRow>
              ))}
            </tbody>
          </StyledBingoCard>
        </StyledBingoCardWrapper>
      </StyledBingoColumn>
    </StyledAppWrapper>
  )
}
