import { createContext, memo, useCallback, useMemo } from "react"

import { Text } from "../Text"
import { Card } from "../Card"
import { Cell } from "../Cell"
import { Board } from "../Board"
import { Button } from "../Button"

import { useBoard } from "../../hooks/useBoard"
import { useJudge } from "../../hooks/useJudge"
import { useTimer } from "../../hooks/useTimer"

export const GameContext = createContext()

/**
 * Components wrapped with `React.memo` are only re-rendered upon
 * state updates, if any of its props have changed since the last
 * render.
 */
const GameBoard = memo(({ rows = [], onMakeMove }) => {
  return (
    <Board>
      {rows.map((cols, row) =>
        cols.map((takenBy, col) => (
          <Cell
            key={`${row}-${col}`}
            row={row}
            col={col}
            takenBy={takenBy}
            onTake={onMakeMove}
          />
        )),
      )}
    </Board>
  )
})

export function Game() {
  const { count, reset: resetTimer, stop: stopTimer } = useTimer()
  const { board: rows, take, reset: resetBoard } = useBoard([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ])

  const { currentPlayer, nextPlayer, winner, isGameOver, movesLeft } = useJudge(
    rows,
  )

  const makeMove = useCallback(
    (row, col) => {
      take(row, col, currentPlayer)
      nextPlayer()
    },
    [take, currentPlayer, nextPlayer],
  )

  const resetGame = useCallback(() => {
    resetBoard()
    resetTimer()
  }, [resetBoard, resetTimer])

  if (isGameOver) stopTimer()

  /**
   * Context data needs to be memoized else,
   * every second any Component calling `useContext(GameContext)`
   * would re-render itself (in this case our Cell component).
   */
  const context = useMemo(
    () => ({
      winner,
      isGameOver,
    }),
    [winner, isGameOver],
  )

  return (
    <GameContext.Provider value={context}>
      <Card scaled={isGameOver}>
        <Text value="Tic Tac Toe" variant="title" />
        <Text
          value={`Curenlty Playing: ${
            isGameOver ? "N/A" : currentPlayer
          } (${count}s)`}
        />
        <GameBoard rows={rows} onMakeMove={makeMove} />
        <Text
          value={`Winner: ${
            winner ? winner.player : "N/A"
          }. Moves Left: ${movesLeft}`}
        />
        <Button onClick={resetGame}>Reset Game</Button>
      </Card>
    </GameContext.Provider>
  )
}
