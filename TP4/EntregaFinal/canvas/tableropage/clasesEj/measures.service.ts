import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MeasuresService {
  public subjectChangeBoard: Subject<void> = new Subject<void>()

  boardWidth = 7
  boardHeigth = 6
  gap = 10
  gapBorder = 30
  radius = 39
  columnDeck = 270
  chipsPerPlayer: number

  constructor() {
    this.chipsPerPlayer = (this.boardWidth * this.boardHeigth) / 2
  }

  /** Change the board width, calculate chips per player and emit observable */
  setBoardWidth(width: number): void {
    this.boardWidth = width
    this.chipsPerPlayer = (this.boardWidth * this.boardHeigth) / 2
    this.emitchangeBoard()
  }

  /** Change the board height, calculate chips per player and emit observable */
  setBoardHeight(height: number): void {
    this.boardHeigth = height
    this.chipsPerPlayer = (this.boardWidth * this.boardHeigth) / 2
    this.emitchangeBoard()
  }

  /** Emit observable event */
  emitchangeBoard(): void {
    this.subjectChangeBoard.next()
  }
}
