import { LinearProgress } from '@mui/material';
import { createContext, ReactElement, useCallback, useReducer } from 'react';

type StateType = {
  loading: boolean
}

const initState: StateType = {
  loading: false
}

const enum REDUCER_ACTION_TYPE {
  enableLoading,
  disableLoading
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE
}

const reducer = (state: StateType, action: ReducerAction): StateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.enableLoading:
      return { ...state, loading: true }
    case REDUCER_ACTION_TYPE.disableLoading:
      return { ...state, loading: false }
    default:
      throw new Error('Unidentified reducer action type')
  }
}

const useLoadingContext = (initState: StateType) => {
  const [state, dispatch] = useReducer(reducer, initState)

  const enableLoading = useCallback(() => dispatch({ type: REDUCER_ACTION_TYPE.enableLoading }), [])
  const disableLoading = useCallback(() => dispatch({ type: REDUCER_ACTION_TYPE.disableLoading }), [])

  return { state, enableLoading, disableLoading }
}

type UseLoadingContextType = ReturnType<typeof useLoadingContext>

const initContextState: UseLoadingContextType = {
  state: initState,
  enableLoading: () => { },
  disableLoading: () => { }
}

export const LoadingContext = createContext<UseLoadingContextType>(initContextState)

type ChildrenType = {
  children?: ReactElement | ReactElement[] | undefined
}

export const LoadingProvider = ({ children }: ChildrenType): ReactElement => {

  const value = useLoadingContext(initState)

  return (
    <LoadingContext.Provider value={value}>
      {value.state.loading && <LinearProgress id='loader' sx={{ position: 'fixed', zIndex: 1000000000, top: 0, width: '100%' }} />}
      {children}
    </LoadingContext.Provider>
  )
}