const grid = {
  size: 32,
  color: "rgba(0, 0, 0, 0.15)",
  
  init(board) {
    this.board = board;
    const { x, y, right, bottom } = board.elem.getBoundingClientRect();
    const [ width, height ] = [ right - x, bottom - y ];
    this.margin = (width % this.size) / 2;

    this.elem = document.createElement('div');
    this.elem.style.width = `${width}px`;
    this.elem.style.height = `${height}px`;
    this.elem.style.top = 0;
    this.elem.style.left = 0;
    this.elem.classList.add('board-grid');
    this.cols = [...Array(parseInt(width / this.size) + 1)]
      .map((_, i) => this.getLine(i, true))
      .forEach(line => this.elem.appendChild(line));
    this.rows = [...Array(parseInt(height / this.size) + 1)]
      .map((_, i) => this.getLine(i))
      .forEach(line => this.elem.appendChild(line));
    this.board.elem.appendChild(this.elem);
  },

  getLine(index, isColumn = false) {
    const line = document.createElement('div');
    line.style.borderColor = this.color;
    
    if (isColumn) {
      line.classList.add('line-column');
      line.style.width = 1;
      line.style.height = "100%";
      line.style.top = 0;
      line.style.left = `${index * this.size + this.margin}px`;
    } else {
      line.classList.add('line-row');
      line.style.width = "100%";
      line.style.height = 1;
      line.style.top = `${index * this.size + this.margin}px`;
      line.style.left = 0;
    }
    return line;
  },

  setPos(x = 0, y = 0) {
    this.x = x ?? this.x;
    this.y = y ?? this.y;
    this.elem.style.left = `${this.x}px`;
    this.elem.style.top = `${this.y}px`;
  }
};