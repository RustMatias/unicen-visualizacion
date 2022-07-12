import { Subscription } from 'rxjs'
import { Board } from './Board'
import { Chip } from './Chip'
import { MeasuresService } from './measures.service'
import { TimerService } from './timer.service'
import { WinnerService } from './winner.service'

export class Game {
  context: CanvasRenderingContext2D
  board: Board

  playing: boolean
  turnOfPlayer1: boolean

  mouseDown: boolean
  chipSelected: Chip | undefined

  private winnerSubscription!: Subscription

  constructor(
    context: CanvasRenderingContext2D,
    private measures: MeasuresService,
    private timer: TimerService,
    private winner: WinnerService
  ) {
    this.context = context
    this.context.strokeStyle = '#fff'
    this.board = new Board(this.context, measures)
    this.playing = false
    this.turnOfPlayer1 = true
    this.mouseDown = false
    this.chipSelected = undefined
    this.winnerSubscription = timer.subjectWinner
      .asObservable()
      .subscribe((player) => {
        this.turnOfPlayer1 = !this.turnOfPlayer1
        this.winner.setWinnerTime(player)
      })
  }

  /** Calculate the x and y, subtracting mouse position - canvas */
  getMouseEventCoordinates(event: MouseEvent): { x: number; y: number } {
    const canvasX = this.context.canvas.getBoundingClientRect().x
    const canvasY = this.context.canvas.getBoundingClientRect().y
    return { x: event.clientX - canvasX, y: event.clientY - canvasY }
  }

  /** Assign event listener to canvas on mousedown  */
  canvasMouseDown(event: MouseEvent): void {
    if (!this.playing) return
    const { x, y } = this.getMouseEventCoordinates(event)
    for (let i = this.board.chipsDeck.length - 1; i >= 0; i--) {
      if (
        ((this.turnOfPlayer1 && this.board.chipsDeck[i].getState() == 1) ||
          (!this.turnOfPlayer1 && this.board.chipsDeck[i].getState() == 2)) &&
        this.board.chipsDeck[i].isClicked(x, y)
      ) {
        this.chipSelected = this.board.chipsDeck[i]
        this.mouseDown = true
        break
      }
    }
  }

  /** Assign event listener to canvas on mouseup  */
  canvasMouseUp(event: MouseEvent): void {
    if (this.chipSelected != undefined) {
      const { x, y } = this.getMouseEventCoordinates(event)
      const inserted = this.insertInColumn(x, y)
      if (inserted) {
        this.board.chipsDeck.splice(
          this.board.chipsDeck.indexOf(this.chipSelected),
          1
        )
        if (this.checkWinner(inserted.column, inserted.row)) {
          this.timer.stop()
          this.turnOfPlayer1 = !this.turnOfPlayer1
          const movements = Math.ceil(
            (this.measures.boardWidth * this.measures.boardHeigth -
              this.board.chipsDeck.length) /
              2
          )
          this.winner.setWinner(this.turnOfPlayer1 ? 1 : 2, movements)
        } else {
          this.timer.changeTimers()
        }
      }
      this.board.repaint()
    }
    this.mouseDown = false
    this.chipSelected = undefined
  }

  /** Assign event listener to canvas on mousemove  */
  canvasMouseMove(event: MouseEvent): void {
    const { x, y } = this.getMouseEventCoordinates(event)
    if (this.mouseDown == true) {
      this.chipSelected?.setPosition(x, y)
      this.board.repaint()
    }
  }

  /** Insert chip in a column, calculate the number of column
   * and set the board position based on player turn */
  insertInColumn(
    x: number,
    y: number
  ): { column: number; row: number } | undefined {
    let column = -1
    for (let i = 0; i < this.board.dropsContainers.length; i++) {
      if (this.board.dropsContainers[i].isPointInPath(x, y)) {
        column = i
        break //break the for is the best practice :D ToDo:improve this
      }
    }
    if (column <= -1) return undefined

    let position = this.measures.boardHeigth - 1
    let positionEmpty = false

    while (!positionEmpty && position >= 0) {
      if (this.board.chips[column][position].getState() != 0) position--
      else positionEmpty = true
    }
    if (position < 0) return undefined

    if (this.turnOfPlayer1) {
      this.board.chips[column][position].setState(1)
    } else {
      this.board.chips[column][position].setState(2)
    }
    this.board.chips[column][position].draw()
    this.turnOfPlayer1 = !this.turnOfPlayer1
    return { column: column, row: position }
  }

  /** Check if any player win the game based on the size of board */
  checkWinner(column: number, row: number): boolean {
    const numberToWin = this.measures.boardWidth - 3
    const state = this.board.chips[column][row].getState()
    let chipsSum = 0

    //count to left
    chipsSum += this.countLeft(column, row, state)
    if (chipsSum >= numberToWin) {
      return true
    }
    //count to right
    chipsSum += this.countRight(column, row, state)
    chipsSum-- //remainder 1 because the chip played was added in count left and right
    if (chipsSum >= numberToWin) {
      return true
    }
    //there is no winner horizontally
    chipsSum = 0

    //count to down
    chipsSum += this.countDown(column, row, state)
    if (chipsSum >= numberToWin) {
      return true
    }
    //there is no winner vertically
    chipsSum = 0

    //count down right diagonal
    chipsSum += this.countDownRight(column, row, state)
    if (chipsSum >= numberToWin) {
      return true
    }
    //there is no winner down right diagonal
    chipsSum = 0

    //count down left diagonal
    chipsSum += this.countDownLeft(column, row, state)
    if (chipsSum >= numberToWin) {
      return true
    }

    return false
  }

  /** Counts the number of consecutive chips of the same player */
  countRight(column: number, row: number, state: number): number {
    let equalsQuantity = 0
    while (
      column < this.measures.boardWidth &&
      this.board.chips[column][row].getState() == state
    ) {
      equalsQuantity++
      column++
    }
    return equalsQuantity
  }

  /** Counts the number of consecutive chips of the same player */
  countLeft(column: number, row: number, state: number): number {
    let equalsQuantity = 0
    while (column >= 0 && this.board.chips[column][row].getState() == state) {
      equalsQuantity++
      column--
    }
    return equalsQuantity
  }

  /** Counts the number of consecutive chips of the same player */
  countDown(column: number, row: number, state: number): number {
    let equalsQuantity = 0
    while (
      row < this.measures.boardHeigth &&
      this.board.chips[column][row].getState() == state
    ) {
      equalsQuantity++
      row++
    }
    return equalsQuantity
  }

  /** Counts the number of consecutive chips of the same player */
  countDownLeft(column: number, row: number, state: number): number {
    let equalsQuantity = 0
    while (
      row < this.measures.boardHeigth &&
      column >= 0 &&
      this.board.chips[column][row].getState() == state
    ) {
      equalsQuantity++
      row++
      column--
    }
    return equalsQuantity
  }

  /** Counts the number of consecutive chips of the same player */
  countDownRight(column: number, row: number, state: number): number {
    let equalsQuantity = 0
    while (
      row < this.measures.boardHeigth &&
      column < this.measures.boardWidth &&
      this.board.chips[column][row].getState() == state
    ) {
      equalsQuantity++
      row++
      column++
    }
    return equalsQuantity
  }

  /** Start game, initializing the timer */
  play(): void {
    this.playing = true
    this.timer.start()
  }

  /** Reset game, cleaning the board and timers */
  reset(): void {
    this.playing = false
    this.timer.reset()
    this.turnOfPlayer1 = true
    this.winner.reset()
    this.board.reset()
  }
}
