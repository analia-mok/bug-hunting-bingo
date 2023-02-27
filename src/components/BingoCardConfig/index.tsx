import { Fragment, FunctionComponent, h } from 'preact'
import { useEffect, useId, useState } from 'preact/hooks'
import { useBingoContext } from '../BingoContext'
import { StyledCheckboxLabel, StyledTotalServicesByLine } from './styles'

export const SAVED_SERVICES_KEY = 'services'

const ServicesTextArea: FunctionComponent = () => {
  const textareaId = useId()
  const [defaultTextAreaValue, setDefaultTextAreaValue] = useState('')
  const { setServices } = useBingoContext()

  // Check for saved selections from past sessions
  useEffect(() => {
    const savedServices = localStorage.getItem(SAVED_SERVICES_KEY)
    const parsedSavedServices = savedServices ? JSON.parse(savedServices) : []

    if (parsedSavedServices.length) {
      const servicesSeparatedByNewline = parsedSavedServices
        .reduce((acc: string, current: string) => `${acc}\n${current}`, '')
        .trim()

      // TODO: Move into context?
      setServices(parsedSavedServices)
      setDefaultTextAreaValue(servicesSeparatedByNewline)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let servicesTimeout: NodeJS.Timeout

  // Debouncing services list updating
  const updateServicesList = (list: string) => {
    clearTimeout(servicesTimeout)
    servicesTimeout = setTimeout(() => {
      // Windows support?
      list.replaceAll('\r\n', '\n')

      const serviceList = list.split('\n').filter((item) => item.length)
      setServices(serviceList)

      localStorage.setItem(SAVED_SERVICES_KEY, JSON.stringify(serviceList))
    }, 500)
  }

  return (
    <Fragment>
      <label htmlFor={textareaId}>Enter each service on a new line:</label>
      <textarea
        name="servicesList"
        defaultValue={defaultTextAreaValue}
        id={textareaId}
        cols={60}
        rows={10}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onChange={(e) => updateServicesList(e.target.value)}
      />
    </Fragment>
  )
}

const FreespaceToggle: FunctionComponent = () => {
  const { includeFreeSpace, toggleFreeSpace } = useBingoContext()

  const freespaceCheckboxId = useId()

  return (
    <Fragment>
      <StyledCheckboxLabel htmlFor={freespaceCheckboxId}>
        <input
          type="checkbox"
          name="freeSpace"
          id={freespaceCheckboxId}
          checked={includeFreeSpace}
          onChange={() => toggleFreeSpace()}
        />
        Include Free space
      </StyledCheckboxLabel>
    </Fragment>
  )
}

export const BingoCardConfig: FunctionComponent = () => {
  const { includeFreeSpace, services } = useBingoContext()

  return (
    <Fragment>
      <h2>Configuration:</h2>
      <div>
        <ServicesTextArea />
        <StyledTotalServicesByLine>
          {services.length} / {includeFreeSpace ? '8' : '9'} tiles will be
          unique
        </StyledTotalServicesByLine>
        <p>
          ** Your services will be saved as you type for future browser sessions
        </p>
      </div>
      <div>
        <FreespaceToggle />
      </div>
    </Fragment>
  )
}
