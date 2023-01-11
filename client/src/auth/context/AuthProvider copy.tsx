import { createContext, ReactElement, useCallback, useReducer } from 'react';

type StateType = {
  userProfile: IUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  persist: boolean;
}

const initState: StateType = {
  userProfile: null,
  accessToken: null,
  refreshToken: null,
  persist: false,
}

const enum REDUCER_ACTION_TYPE {
  setUserProfile,
  setAccessToken,
  setRefreshToken,
  setPersist,
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE
  payload?: IUser | string | boolean | null
}

const reducer = (state: StateType, action: ReducerAction): StateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.setUserProfile:
      return { ...state, userProfile: action.payload as IUser | null }
    case REDUCER_ACTION_TYPE.setAccessToken:
      return { ...state, accessToken: action.payload as string | null }
    case REDUCER_ACTION_TYPE.setRefreshToken:
      return { ...state, refreshToken: action.payload as string | null }
    case REDUCER_ACTION_TYPE.setPersist:
      return { ...state, persist: action.payload as boolean }
    default:
      throw new Error('Unidentified reducer action type')
  }
}

const useAuthContext = (initState: StateType) => {
  const [state, dispatch] = useReducer(reducer, initState)

  const setUserProfile = useCallback(
    (userProfile: IUser) =>
      dispatch({ type: REDUCER_ACTION_TYPE.setUserProfile, payload: userProfile })
    , []
  )

  const setAccessToken = useCallback(
    (accessToken: string) =>
      dispatch({ type: REDUCER_ACTION_TYPE.setAccessToken, payload: accessToken })
    , []
  )

  const setRefreshToken = useCallback(
    (refreshToken: string) =>
      dispatch({ type: REDUCER_ACTION_TYPE.setRefreshToken, payload: refreshToken })
    , []
  )

  const setPersist = useCallback(
    (persist: boolean) =>
      dispatch({ type: REDUCER_ACTION_TYPE.setPersist, payload: persist })
    , []
  )

  return { state, setUserProfile, setAccessToken, setRefreshToken, setPersist }
}

type UseAuthContextType = ReturnType<typeof useAuthContext>

const initContextState: UseAuthContextType = {
  state: initState,
  setUserProfile: (userProfile: IUser) => { },
  setAccessToken: (accessToken: string) => { },
  setRefreshToken: (refreshToken: string) => { },
  setPersist: (persist: boolean) => { }
}

export const AuthContext = createContext<UseAuthContextType>(initContextState)

type ChildrenType = {
  children?: ReactElement | ReactElement[]
}

export const AuthProvider = ({ children }: ChildrenType): ReactElement => {

  const value = useAuthContext(initState)

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}