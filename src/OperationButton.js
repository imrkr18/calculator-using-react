import { ACTION } from "./App"

export default function OperationButton({ dispatch, opr }) {
    return <button onClick={() => { dispatch({ type: ACTION.CHOOSE_OPR, payload: { opr } }) }}>{opr}</button>
}