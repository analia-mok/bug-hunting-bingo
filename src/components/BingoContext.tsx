// Did I really need to create a context?
// No not really...
// But the BingoCard was getting pretty long and I wanted to separate out the
// chunks of functionality
/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, FunctionComponent, h } from 'preact'
import { Reducer, useContext, useMemo, useReducer } from 'preact/hooks'

type BingoContext = {
  includeFreeSpace: boolean
  services: string[]

  toggleFreeSpace: () => void
  setServices: (items: string[]) => void
}

enum BingoContextAction {
  TOGGLE_FREE_SPACE,
  SET_SERVICES,
}

type BingoContextReducerAction = {
  type: BingoContextAction
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
}

const defaultBingoContextValue: BingoContext = {
  includeFreeSpace: true,
  services: [],

  toggleFreeSpace: () => {},
  setServices: () => {},
}

const BingoContext = createContext(defaultBingoContextValue)

const reducer: Reducer<BingoContext, BingoContextReducerAction> = (
  state,
  { type, data }
) => {
  switch (type) {
    case BingoContextAction.TOGGLE_FREE_SPACE:
      return {
        ...state,
        includeFreeSpace: !state.includeFreeSpace,
      }

    case BingoContextAction.SET_SERVICES:
      return {
        ...state,
        services: data,
      }

    default:
      // Typescript should technically prevent this from happening
      throw new Error('Unexpected action')
  }
}

export const BingoContextProvider: FunctionComponent = ({ children }) => {
  const [value, dispatch] = useReducer(reducer, defaultBingoContextValue)

  const bingoContextValue = useMemo(
    () => ({
      ...value,
      toggleFreeSpace: () => {
        dispatch({ type: BingoContextAction.TOGGLE_FREE_SPACE })
      },
      setServices: (items: string[]) => {
        dispatch({ type: BingoContextAction.SET_SERVICES, data: items })
      },
    }),
    [value]
  )

  return (
    <BingoContext.Provider value={bingoContextValue}>
      {children}
    </BingoContext.Provider>
  )
}

export const useBingoContext = () => {
  const value = useContext(BingoContext)

  if (!value) {
    throw new Error(
      'useBingoContext must be called within a BingoContextProvider'
    )
  }

  return value
}
