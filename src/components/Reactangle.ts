class Rectangle {
  width: number;
  height: number;
  step: number;
  size: number;
  path2D: Path2D;

  constructor(size: number, path2D: Path2D) {
    this.path2D = path2D;
    this.height = 0;
    this.width = 0;
    this.size = size
    this.step = size / 3
  }

  public createField(): Path2D {
    this.path2D.rect(0, 0, this.size, this.size)
    while(this.step < this.size) {
      //xline
      this.path2D.moveTo(this.step, this.width)
      this.path2D.lineTo(this.step, this.size)
      //yline
      this.path2D.moveTo(this.height, this.step)
      this.path2D.lineTo(this.size, this.step)
      //step
      this.step += this.step
    }
    return this.path2D
  }
}

export default Rectangle