export const findWinner = (board) => {
  const winningMove = findWinningMove(board)
  if (!winningMove) return null

  return {
    winningMove,
    player: board[winningMove[0][0]][winningMove[0][1]],
    hasWinningMoveAt: (row, col) => {
      return moveHasPosition(winningMove, row, col)
    },
  }
}

export const countMovesLeft = (board) => {
  return board.flat().filter((value) => value === null).length
}

const moveHasPosition = (move, row, col) => {
  return move.some((position) => position[0] === row && position[1] === col)
}

const findWinningMove = (board) => {
  return possibleWinningMoves.find((move) => {
    const values = move.map((position) => board[position[0]][position[1]])
    return values.every((value) => value && value === values[0])
  })
}

const possibleWinningMoves = [
  // rows
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  // columns
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  // diagonals
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  [
    [2, 0],
    [1, 1],
    [0, 2],
  ],
]
