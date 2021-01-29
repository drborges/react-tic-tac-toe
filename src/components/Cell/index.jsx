import { useContext } from "react"
import classnames from "classnames"
import { GameContext } from "../Game"

import "./cell.css"

export function Cell({ row, col, takenBy, onTake }) {
  const { winner, isGameOver } = useContext(GameContext)
  const highlighted = winner?.hasWinningMoveAt(row, col)
  const css = classnames("Cell", {
    [takenBy]: takenBy,
    highlighted,
  })

  return (
    <button
      className={css}
      disabled={takenBy || highlighted || isGameOver}
      onClick={() => onTake(row, col)}
    />
  )
}
