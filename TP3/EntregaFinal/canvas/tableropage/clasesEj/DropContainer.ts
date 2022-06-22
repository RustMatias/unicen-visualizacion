export class DropContainer {
  container: Path2D
  context: CanvasRenderingContext2D

  constructor(
    context: CanvasRenderingContext2D,
    private x: number,
    private y: number,
    private w: number,
    private h: number,
    private radius: number
  ) {
    this.context = context
    this.container = new Path2D()
    this.container.rect(this.x, this.y, this.w, this.h)
  }

  /** Draw the object in the canvas */
  draw(): void {
    const arrowWidth = 5
    const fromx = this.x + this.radius
    const fromy = this.y
    const tox = this.x + this.radius
    const toy = this.y + this.radius - arrowWidth
    const color = this.context.strokeStyle
    this.context.strokeStyle = 'transparent'
    this.context.stroke(this.container)
    this.context.strokeStyle = '#fff'

    //constiables to be used when creating the arrow
    const headlen = 10
    const angle = Math.atan2(toy - fromy, tox - fromx)

    this.context.save()
    this.context.strokeStyle = color

    //starting path of the arrow from the start square to the end square
    //and drawing the stroke
    this.context.beginPath()
    this.context.moveTo(fromx, fromy)
    this.context.lineTo(tox, toy)
    this.context.lineWidth = arrowWidth
    this.context.stroke()

    //starting a new path from the head of the arrow to one of the sides of
    //the point
    this.context.beginPath()
    this.context.moveTo(tox, toy)
    this.context.lineTo(
      tox - headlen * Math.cos(angle - Math.PI / 7),
      toy - headlen * Math.sin(angle - Math.PI / 7)
    )

    //path from the side point of the arrow, to the other side point
    this.context.lineTo(
      tox - headlen * Math.cos(angle + Math.PI / 7),
      toy - headlen * Math.sin(angle + Math.PI / 7)
    )

    //path from the side point back to the tip of the arrow, and then
    //again to the opposite side point
    this.context.lineTo(tox, toy)
    this.context.lineTo(
      tox - headlen * Math.cos(angle - Math.PI / 7),
      toy - headlen * Math.sin(angle - Math.PI / 7)
    )

    //draws the paths created above
    this.context.stroke()
    this.context.restore()
  }

  /** Return if the point(x,y) is inside the transparent rectangle */
  isPointInPath(x: number, y: number): boolean {
    return this.context.isPointInPath(this.container, x, y)
  }
}
