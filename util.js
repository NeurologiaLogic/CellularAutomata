class Vector {
  static Magnitude({
    x,
    y
  }) {
    return Math.sqrt(x * x + y * y)
  }
  static Magnitude4p({
    x0,
    y0,
    x1,
    y1
  }) {
    let vec = this.vectorDir(x0, y0, x1, y1)
    return Math.sqrt(vec.x * vec.x + vec.y * vec.y)
  }
  static vectorDir(x0, y0, x1, y1) {
    return {
      x: x1 - x0,
      y: y1 - y0
    }
  }
  static unit(x0, y0, x1, y1) {
    let vector = this.vectorDir(x0, y0, x1, y1)
    if (this.Magnitude(this.vectorDir(x0, y0, x1, y1) == 0)) {
      return {
        x: 0,
        y: 0
      };
    }
    return {
      x: vector.x / this.Magnitude(this.vectorDir(x0, y0, x1, y1)),
      y: vector.y / this.Magnitude(this.vectorDir(x0, y0, x1, y1))
    }
  }
}

class Check
{
  static isOutOfBounds = (x,y,length) =>
  {
    return x < 0 || x >= length || y < 0 || y >= length;
  }
  static checkNeighbours = (x,y) =>
  {
    console.log("check neighbors");
    //do something here
    //check for 8 neightbours


  }
}


export {
  Check
}
/*
  Magnitude belom bener
  Selesain:
  Dapetin unit vector dari x datang y datang - x target y target * length
  x dan y di assign ke backward
  lakuin yang sama ke forward
*/