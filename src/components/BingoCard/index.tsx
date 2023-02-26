import { h, Fragment } from 'preact'
import { useEffect, useId, useState } from 'preact/hooks'
import { BingoCell } from '../BingoCell'
import { StyledAppWrapper, StyledBingoCard, StyledBingoCardWrapper, StyledBingoColumn, StyledBingoRow, StyledTextAreaSection } from './styles'

// Placeholder content to preview bingo card table
const placeholderBingoItems = [
  ['Service 1', 'Service 2', 'Service 3'],
  ['Service 4', 'Free', 'Service 5'],
  ['Service 6', 'Service 7', 'Service 8'],
]

const SAVED_SERVICES_KEY = 'services'

export const BingoCard = () => {
  // const cellARef = useRef<HTMLInputElement>()

  const [defaultTextAreaValue, setDefaultTextAreaValue] = useState('')
  const [services, setServices] = useState<string[]>([])
  const [bingoItems, setBingoItems] = useState<string[][]>(
    placeholderBingoItems
  )

  const textareaId = useId()

  // Check for saved selections from past sessions
  useEffect(() => {
    const savedServices = localStorage.getItem(SAVED_SERVICES_KEY)
    const parsedSavedServices = savedServices ? JSON.parse(savedServices) : []

    if (parsedSavedServices.length) {
      const servicesSeparatedByNewline = parsedSavedServices.reduce((acc: string, current: string) => `${acc}\n${current}`, '').trim()

      setServices(parsedSavedServices)
      setDefaultTextAreaValue(servicesSeparatedByNewline)
    }
  }, [])

  useEffect(() => {
    if (!services.length) {
      return
    }

    let selectableServices = [...services]
    const randomizedItems: string[] = []

    while (randomizedItems.length < 9) {
      // Add free space in the middle
      if (randomizedItems.length === 4) {
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
  }, [services])

  let servicesTimeout: NodeJS.Timeout

  // Debouncing services list updating
  const updateServicesList = (list: string) => {
    clearTimeout(servicesTimeout)
    servicesTimeout = setTimeout(() => {
      // Windows support?
      list.replaceAll("\r\n", "\n")

      const serviceList = list.split('\n').filter((item) => item.length)
      setServices(serviceList)

      localStorage.setItem(SAVED_SERVICES_KEY, JSON.stringify(serviceList))
    }, 500)
  }

  return (
    <StyledAppWrapper>
      <StyledTextAreaSection>
        <h2>Configuration:</h2>
        <label htmlFor={textareaId} style={{ display: 'block' }}>
          Enter each service on a new line:
        </label>
        <textarea
          name="servicesList"
          defaultValue={defaultTextAreaValue}
          id={textareaId}
          cols={60}
          rows={10}
          onChange={(e) => updateServicesList(e.target.value)}
        />
        <p>** Your services will be saved as you type for future browser sessions</p>
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
