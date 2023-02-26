import { h, Fragment } from 'preact'
import { useEffect, useId, useState } from 'preact/hooks'
import { BingoCell } from '../BingoCell'

import style from './style.css'

const placeholderBingoItems = [
  ['Service 1', 'Service 2', 'Service 3'],
  ['Service 4', 'Free', 'Service 5'],
  ['Service 6', 'Service 7', 'Service 8'],
]

export const BingoCard = () => {
  // const cellARef = useRef<HTMLInputElement>()

  // TODO: Check localstorage for default values.
  const [services, setServices] = useState<string[]>([])
  const [bingoItems, setBingoItems] = useState<string[][]>(
    placeholderBingoItems
  )

  const textareaId = useId()

  // useEffect(() => {
  //   // Testing: Set ref to checked on mount.
  //   // cellARef.current.setAttribute('checked', true)
  // }, [])
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
      console.log('Updating....', list.split('\n'))
      // TODO: Will this work on windows?
      setServices(list.split('\n').filter((item) => item.length))
    }, 500)
  }

  return (
    <Fragment>
      <table class={style.bingoCard}>
        <tbody>
          {bingoItems.map((row, rowIndex) => (
            <tr key={`bingo-row-${rowIndex}`}>
              {row.map((item, index) => (
                <Fragment key={`bingo-item-${index}`}>
                  <BingoCell label={item} />
                </Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <section>
        <label htmlFor={textareaId} style={{ display: 'block' }}>
          Enter each service on a new line:
        </label>
        <textarea
          name="servicesList"
          id={textareaId}
          cols={30}
          rows={10}
          onChange={(e) => updateServicesList(e.target.value)}
        />
      </section>
    </Fragment>
  )
}
