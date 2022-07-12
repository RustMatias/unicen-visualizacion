export class Chip {
  private circle: Path2D
  public img: HTMLImageElement

  constructor(
    private context: CanvasRenderingContext2D,
    public posX: number,
    public posY: number,
    public radius: number,
    public id: number,
    private state: number
  ) {
    this.circle = new Path2D()
    this.img = 
    // this.img.onload = () => {
    //   console.log('load: ' + this.id)
    //   this.draw()
    // }
    this.setState(state)
  }

  /** return current chip state */
  getState(): number {
    return this.state
  }

  /** Set the img src based on the state  */
  setState(state: number): void {
    this.state = state
    if (this.state == 1) {
      this.img.src = 'assets/images/chip-red.webp'
    } else if (this.state == 2) {
      this.img.src = 'assets/images/chip-yellow.webp'
    }
  }

  /** Draw the object in the canvas */
  draw(): void {
    if (this.state == 0) {
      this.context.fillStyle = 'transparent'
      this.circle = new Path2D()
      this.circle.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI)
      this.context.fill(this.circle)
      this.context.stroke(this.circle)
      this.circle.closePath()
    } else {
      this.context.drawImage(
        this.img,
        this.posX,
        this.posY 
      )
    }
  }

  /** Change the chip position and re draw it */
  setPosition(x: number, y: number) {
    this.posX = x
    this.posY = y
    this.draw()
  }

  /** Return if the point(x,y) is inside the circle */
  isClicked(x: number, y: number): boolean {
    const _x = this.posX - x
    const _y = this.posY - y
    return Math.sqrt(_x * _x + _y * _y) < this.radius
  }
}
