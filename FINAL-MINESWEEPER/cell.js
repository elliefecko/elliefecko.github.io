
function Cell(i, j, w) {
    this.i = i;
    this.j = j;
    this.x = i * w;
    this.y = j * w;
    this.w = w;
    this.neighboorCount = 0;
    this.bee = false;
    this.revealed = false;
}

Cell.prototype.show = function(x, y) {
    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.w);
    if (this.revealed) {
        if (this.bee) {
            fill(104, 176, 171)
            ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.6)
        }
        else {
            if (this.neighboorCount > 0) {
                fill(143, 192, 169);
                stroke(0);
                rect(this.x, this.y, this.w, this.w);
                textAlign(CENTER);
                fill(0);
                textSize(25)
                text(this.neighboorCount, this.x + this.w * 0.5, this.y + this.w - 10);
            }
            else {
                fill(200, 213, 185);
                stroke(0);
                rect(this.x, this.y, this.w, this.w);
            }
        }
    }
}

Cell.prototype.countBees = function() {
    if (this.bee) {
        this.neighboorCount = -1;
        return;
    }
    var total = 0;

    for (var xoff = -1; xoff <= 1; xoff++) {
        for (var yoff = -1; yoff <= 1; yoff++) {
            var i = this.i + xoff;
            var j = this.j + yoff;
            if (i > -1 && i < cols && j > -1 && j < rows) {
                var neighboor = grid[i][j];
                if (neighboor.bee) {
                    total++;
                }
            }
        }
    }
    this.neighboorCount = total;
}

Cell.prototype.contains = function(x, y) {
    return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w)
}

Cell.prototype.reveal = function() {
    this.revealed = true
    if (this.neighboorCount == 0) {
        this.floodFill();
    }
}

Cell.prototype.floodFill = function() {
    for (var xoff = -1; xoff <= 1; xoff++) {
        for (var yoff = -1; yoff <= 1; yoff++) {
            var i = this.i + xoff;
            var j = this.j + yoff;
            if (i > -1 && i < cols && j > -1 && j < rows) {
                var neighboor = grid[i][j];
                if (!neighboor.bee && !neighboor.revealed) {
                    neighboor.reveal();
                }
            }
        }
    }
}