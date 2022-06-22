import { Subscription } from 'rxjs'
import { Chip } from './Chip'
import { DropContainer } from './DropContainer'
import { MeasuresService } from './measures.service'

export class Board {
  private changeBoardSubscription!: Subscription
  chips: Array<Array<Chip>>
  dropsContainers: DropContainer[]
  chipsDeck: Chip[]

  constructor(
    private context: CanvasRenderingContext2D,
    private measures: MeasuresService
  ) {
    this.chips = new Array<Array<Chip>>()
    this.dropsContainers = []
    this.chipsDeck = []
    this.reset()
    this.changeBoardSubscription = measures.subjectChangeBoard
      .asObservable()
      .subscribe(() => {
        this.reset()
      })
    // When the last chip is load, draw all the chipsDeck (bug if it is in chip constructor)
    this.chipsDeck[measures.boardWidth * measures.boardHeigth - 1].img.onload =
      () => {
        this.chipsDeck.forEach((chip) => {
          chip.draw()
        })
      }
  }

  /** Restart and clean the board */
  reset(): void {
    this.setCanvasHeight()
    this.setCanvasWidth()
    this.context.strokeStyle = '#fff'
    this.chips = new Array<Array<Chip>>()
    this.dropsContainers = []
    this.chipsDeck = []
    this.initializeDropsContainers()
    this.initializeBoardChips()
    this.initializeDecksChips()

    this.repaint()
  }

  /** Repaint the board */
  repaint(): void {
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    )
    this.drawRectangleBoard()
    this.chips.forEach((column) => {
      column.forEach((chip) => {
        chip.draw()
      })
    })
    this.chipsDeck.forEach((chip) => {
      chip.draw()
    })
    this.dropsContainers.forEach((container) => {
      container.draw()
    })
  }

  /** Initialize drops containers */
  initializeDropsContainers(): void {
    for (let i = 0; i < this.measures.boardWidth; i++) {
      const container = new DropContainer(
        this.context,
        this.measures.columnDeck +
          2 * this.measures.gapBorder +
          this.measures.radius * 2 * i +
          this.measures.gap * i,
        this.measures.gapBorder,
        this.measures.radius * 2,
        this.measures.radius,
        this.measures.radius
      )
      this.dropsContainers.push(container)
    }
  }

  /** Initialize board color blue */
  drawRectangleBoard(): void {
    this.context.fillStyle = '#2d4671'
    const container = new Path2D()

    container.rect(
      this.measures.gapBorder + this.measures.gap + this.measures.columnDeck,
      0,
      2 * this.measures.radius * this.measures.boardWidth +
        this.measures.gapBorder +
        this.measures.gap +
        this.measures.gap * (this.measures.boardWidth - 1),
      2 * this.measures.radius * this.measures.boardHeigth +
        3 * this.measures.gapBorder +
        this.measures.gap +
        this.measures.gap * (this.measures.boardHeigth - 1)
    )
    this.context.shadowColor = 'black'
    this.context.shadowBlur = 15
    this.context.shadowOffsetX = -5
    this.context.shadowOffsetY = 3
    this.context.fill(container)
    this.context.stroke(container)
  }

  /** Initialize board lockers*/
  initializeBoardChips(): void {
    let idCounter = 0
    for (let i = 0; i < this.measures.boardWidth; i++) {
      for (let j = 0; j < this.measures.boardHeigth; j++) {
        const chip: Chip = new Chip(
          this.context,
          this.measures.columnDeck +
            2 * this.measures.radius * i +
            2 * this.measures.radius +
            this.measures.gapBorder +
            this.measures.gap * (i - 1),
          2 * this.measures.radius * j +
            this.measures.radius +
            this.measures.gapBorder +
            this.measures.gap * j +
            this.measures.gap +
            this.measures.radius,
          this.measures.radius,
          idCounter,
          0
        )
        if (this.chips[i] == undefined) this.chips[i] = new Array<Chip>()
        this.chips[i].push(chip)
        idCounter++
      }
    }
  }

  /** Initialize chips for each player deck*/
  initializeDecksChips() {
    let idCounter = 200
    for (let i = 0; i < this.measures.chipsPerPlayer; i++) {
      const chip = this.generateRandomChipLeft(idCounter)
      idCounter++
      this.chipsDeck.push(chip)

      const chip2 = this.generateRandomChipRight(idCounter)
      idCounter++
      this.chipsDeck.push(chip2)
    }
  }

  /** Initialize border for each player deck */
  drawBorderDeck() {
    const container = new Path2D()
    container.rect(
      this.measures.gapBorder,
      this.measures.gapBorder,
      this.measures.columnDeck,
      this.context.canvas.height - 2 * this.measures.gapBorder
    )
    const containerRight = new Path2D()
    containerRight.rect(
      this.measures.columnDeck +
        2 * this.measures.radius * this.measures.boardWidth +
        3 * this.measures.gapBorder +
        this.measures.gap * (this.measures.boardWidth - 1),
      this.measures.gapBorder,
      this.measures.columnDeck,
      this.context.canvas.height - 2 * this.measures.gapBorder
    )
    this.context.stroke(container)
    this.context.stroke(containerRight)
  }

  /** Generate random chip for player 2 deck */
  generateRandomChipRight(id: number): Chip {
    return new Chip(
      this.context,
      this.generateIntRandom(
        this.measures.columnDeck +
          2 * this.measures.radius * this.measures.boardWidth +
          3 * this.measures.gapBorder +
          this.measures.gap * (this.measures.boardWidth - 1) +
          this.measures.radius,
        2 * this.measures.columnDeck +
          2 * this.measures.radius * this.measures.boardWidth +
          this.measures.gapBorder +
          this.measures.gap * this.measures.boardWidth
      ),
      this.generateIntRandom(
        this.measures.gapBorder + 2 * this.measures.radius + this.measures.gap,
        this.context.canvas.height -
          this.measures.radius -
          this.measures.gapBorder
      ),
      this.measures.radius,
      id,
      2
    )
  }

  /** Generate random chip for player 1 deck */
  generateRandomChipLeft(id: number): Chip {
    return new Chip(
      this.context,
      this.generateIntRandom(
        this.measures.gapBorder + this.measures.radius,
        this.measures.columnDeck -
          this.measures.radius +
          this.measures.gapBorder
      ),
      this.generateIntRandom(
        this.measures.gapBorder + 2 * this.measures.radius + this.measures.gap,
        this.context.canvas.height -
          this.measures.radius -
          this.measures.gapBorder
      ),
      this.measures.radius,
      id,
      1
    )
  }

  /** Generante random int between min and max */
  generateIntRandom(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min)
  }

  /** Set the canvas width based on his content */
  setCanvasWidth(): void {
    this.context.canvas.width =
      2 * this.measures.columnDeck +
      2 * this.measures.radius * this.measures.boardWidth +
      4 * this.measures.gapBorder +
      this.measures.gap * (this.measures.boardWidth - 1)
  }

  /** Set the canvas height based on his content */
  setCanvasHeight(): void {
    this.context.canvas.height =
      2 * this.measures.gapBorder +
      this.measures.radius +
      2 * this.measures.radius * this.measures.boardHeigth +
      this.measures.gap * (this.measures.boardHeigth - 1)
  }
}
