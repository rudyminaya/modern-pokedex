import { Action } from "@/context/actionTypes"
import { State } from "@/types"
import { useState } from "react"

type ReducerType = (state: State, action: Action) => Promise<State>

const useAsyncReducer = (reducer: ReducerType, initialState: State) => {
  const [state, setState] = useState(initialState)

  const dispatch = async (action: Action) => {
    const result = reducer(state, action)
    try {
      const newState = await result
      setState(newState)
    } catch (err) {
      setState({ ...state, error: err as Error })
    }
  }

  return [state, dispatch] as const
}

export default useAsyncReducer
