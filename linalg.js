//Linear Algebra Library by @keobkeig, 2023
//Matrix class (rows, cols, matrix)

//planned methods:
    // Trace finder  ✔️
    // Linear eqs into coefficient matrix 
    // augumented matrix into gaussian elimination ✔️
    // algebraic operations with matrixes (addition, subtraction, multiplication) ✔️
    // find inverse of matrixes if possible (return inverse matrix), uses formula for 2x2 to speed up ✔️ 
    // check if transpose ✔️
    // check if symmetric ✔️
    // triangle matrix area (1/2 * abs of determinant) ✔️
    // quadilateral matrix (abs of determinant) ✔️
    // cross product of vectors 
    // volume of parallelpiped (abs triple scalar product)
    // dot product of vectors
    // angle between vectors
    // projection of vector onto another
    // vector length
    // vector normalization
    // vector addition
    // vector subtraction
    // vector multiplication
    // vector division
    // vector scaling
    // vector negation
    // vector equality
    // vector inequality
    // vector parallelism
    // vector orthogonality
    // vector projection
    // vector rejection
    // vector unit vector
    // vector zero vector
    // vector cross product
    // vector dot product
    // vector magnitude
    // vector angle
    // vector distance
    // vector midpoint
    // vector direction
    // vector reflection
    // vector rotation
    // vector translation
    // vector scaling
  
//Matrix class
function Matrix(...args) {
    this.matrix = [];

    let populate = (...args) => {
        if(args.length === 0) {
            for(let i = 0; i < this.rows; i++) {
                this.matrix.push([]);
                for(let j = 0; j < this.cols; j++) {
                    this.matrix[i].push(0);
                }
            }
        }
        else if(args.length === 1 && typeof args[0] === 'object') {
            for(let i = 0; i < this.rows; i++) {
                this.matrix.push([]);
                for(let j = 0; j < this.cols; j++) {
                    this.matrix[i].push(args[0][i][j]);
                }
            }
        }
    };

    //empty matrix
    if(args.length === 0) {
        this.rows = 0;
        this.cols = 0;
    }
    else if(args.length === 1) {
        //empty square matrix
        if(typeof args[0] === 'number') {
            this.rows = args[0];
            this.cols = args[0];
            populate();
        }
        //n * m matrix from n * m array
        else if(typeof args[0] === 'object') {
            this.rows = args[0].length;
            this.cols = args[0][0].length;
            populate(args[0]);
        }
    }
    else if(args.length === 2 && typeof args[0] === 'number') {
        //empty rectangular matrix 
        if(typeof args[1] === 'number') {
            this.rows = args[0];
            this.cols = args[1];
            populate();
        }
        //square matrix with values
        else if(typeof args[1] === 'object' && args[0].length === args[0][0].length) {
            this.rows = args[0].length;
            this.cols = args[0].length;
            populate(args[1]);
        }
    }
    else if(args.length === 3 && typeof args[0] === 'number' && typeof args[1] === 'number') {
        //rectangular matrix with values
        if(typeof args[2] === 'object' && args[0].length === args[2].length) {
            this.rows = args[0];
            this.cols = args[1];
            populate(args[2]);
        }
    }

    this.toString = function() {
        for(let i = 0; i < this.rows; i++) {
            let row = '[';
            for(let j = 0; j < this.cols; j++) {
                row += this.matrix[i][j] + ' ';
            }
            row += ']';
            console.log(row);
        }
    }

    this.transpose = function() {
        let newMatrix = new Matrix(this.cols, this.rows);
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                newMatrix.matrix[j][i] = this.matrix[i][j];
            }
        }
        return newMatrix;
    }

    this.guassElim = function() {
        let newMatrix = new Matrix(this.rows, this.cols);
        newMatrix.populate(this.matrix);
        //find first non-zero element in row 
        for(let i = 0; i < newMatrix.rows; i++) {
            for(let j = 0; j < newMatrix.cols; j++) {
                if(newMatrix.matrix[i][j] !== 0) {
                    //try to get 1 in first non-zero element
                    let temp = newMatrix.matrix[i][j];
                    for(let k = 0; k < newMatrix.cols; k++) {
                        newMatrix.matrix[i][k] /= temp;
                    }
                    break;
                }
            }
        
            for(let j = 0; j < newMatrix.rows; j++) {
                //subtract from all other rows to get 0s
                if(j !== i) {
                    let temp = newMatrix.matrix[j][i];
                    for(let k = 0; k < newMatrix.cols; k++) {
                        newMatrix.matrix[j][k] -= temp * newMatrix.matrix[i][k];
                    }
                }
            }
        }
        return newMatrix;
    }
    
    this.determinant = function() {
        //formula of ad - bc for 2x2 matrix of [a b],[c d]
        if(this.rows === 2 && this.cols === 2) {
            return this.matrix[0][0] * this.matrix[1][1] - this.matrix[0][1] * this.matrix[1][0];
        }
        //cofactor expansion for larger matrixes, recurses until 2x2 matrix
        else {
            let determinant = 0;
            for(let i = 0; i < this.cols; i++) {
                let subMatrix = new Matrix(this.rows - 1, this.cols - 1);
                for(let j = 1; j < this.rows; j++) {
                    for(let k = 0; k < this.cols; k++) {
                        if(k < i) {
                            subMatrix.matrix[j - 1][k] = this.matrix[j][k];
                        }
                        else if(k > i) {
                            subMatrix.matrix[j - 1][k - 1] = this.matrix[j][k];
                        }
                    }
                }
                determinant += Math.pow(-1, i) * this.matrix[0][i] * subMatrix.determinant();
            }
            return determinant;
        }
    }

    this.trace = function() {
        //finds the sum of THE diagonal elements of square matrix
        if(this.rows === this.cols) {
            let trace = 0;
            for(let i = 0; i < this.rows; i++) {
                trace += this.matrix[i][i];
            }
            return trace;
        }
    }

    this.add = function(matrix) {
        let newMatrix = new Matrix(this.rows, this.cols);
        if(this.rows === matrix.rows && this.cols === matrix.cols) {
            for(let i = 0; i < this.rows; i++) {
                for(let j = 0; j < this.cols; j++) {
                    newMatrix.matrix[i][j] = this.matrix[i][j] + matrix.matrix[i][j];
                }
            }
            return newMatrix;
        }
        else return new Error('Matrix dimensions must match');
    }

    this.subtract = function(matrix) {
        let newMatrix = new Matrix(this.rows, this.cols);
        if(this.rows === matrix.rows && this.cols === matrix.cols) {
            for(let i = 0; i < this.rows; i++) {
                for(let j = 0; j < this.cols; j++) {
                    newMatrix.matrix[i][j] = this.matrix[i][j] - matrix.matrix[i][j];
                }
            }
            return newMatrix;
        }
        else return new Error('Matrix dimensions must match');
    }

    this.multiply = function(matrix) {
        let newMatrix = new Matrix(this.rows, matrix.cols);
        //cols of this matrix must equal rows of matrix for multiplication to be possible
        if(this.cols === matrix.rows) {
            for(let i = 0; i < this.rows; i++) {
                for(let j = 0; j < matrix.cols; j++) {
                    let sum = 0;
                    for(let k = 0; k < this.cols; k++) {
                        //dot product of row i of this matrix and column j of matrix
                        sum += this.matrix[i][k] * matrix.matrix[k][j];
                    }
                    newMatrix.matrix[i][j] = sum;
                }
            }
            return newMatrix;
        }
        else return new Error('Matrix dimensions must match');
    }

    this.inverse = function() {
        let newMatrix = new Matrix(this.rows, this.cols + this.cols);
        newMatrix.populate(this.matrix);
        //make right side of matrix the identity matrix 
        for(let i = 0; i < this.rows; i++) {
            for(let j = this.cols; j < newMatrix.cols; j++) {
                if(j - this.cols === i) {
                    newMatrix.matrix[i][j] = 1;
                }
                else newMatrix.matrix[i][j] = 0;
            }
        }
        newMatrix = newMatrix.guassElim();
        //return right side of matrix
        let inverse = new Matrix(this.rows, this.cols);
        for(let i = 0; i < this.rows; i++) {
            for(let j = this.cols; j < newMatrix.cols; j++) {
                inverse.matrix[i][j - this.cols] = newMatrix.matrix[i][j];
            }
        }
        return inverse;
    }

    this.isSymmetric = function() {
        //transpose of matrix is equal to matrix
        if(this.equals(this.transpose())) {
            return true;
        }
        else return false;
    }

    this.triangleArea = function() {
        //check if matrix represents 3 points in 2d space
        if(this.rows === 3 && this.cols === 2) {
            let matrix = new Matrix(3, 3);
            matrix.populate(this.matrix);
            matrix.matrix[0][2] = 1;
            matrix.matrix[1][2] = 1;
            matrix.matrix[2][2] = 1;
            matrix.print();
            return 0.5 * matrix.determinant();
        }
        else if (this.rows === 2 && this.cols === 3) {
            let matrix = new Matrix(3, 3);
            matrix.populate(this.matrix);
            matrix.matrix[0][2] = matrix.matrix[1][2] = matrix.matrix[2][2] = 1;
            matrix.print();
            return 0.5 * matrix.determinant();
        }
        else return new Error('Matrix representing triangle must be 3x2');
    }

    this.quadArea = function() {
        //check if matrix represents 4 points in 2d space
        if(this.rows === 4 && this.cols === 2) {
            let matrix = new Matrix(4, 4);
            matrix.populate(this.matrix);
            matrix.matrix[0][2] = matrix.matrix[1][2] = matrix.matrix[2][2] = matrix.matrix[3][2] = 1;
            matrix.matrix[0][3] = matrix.matrix[1][3] = matrix.matrix[2][3] = matrix.matrix[3][3] = 1;
            matrix.print();
            return 0.5 * matrix.determinant();
        }
        else if (this.rows === 2 && this.cols === 4) {
            let matrix = new Matrix(4, 4);
            matrix.populate(this.matrix);
            matrix.matrix[0][2] = matrix.matrix[1][2] = matrix.matrix[2][2] = matrix.matrix[3][2] = 1;
            matrix.matrix[0][3] = matrix.matrix[1][3] = matrix.matrix[2][3] = matrix.matrix[3][3] = 1;
            matrix.print();
            return 0.5 * matrix.determinant();
        }
        else return new Error('Matrix representing quadrilateral must be 4x2');
    }

}

//test matrixs
let m = new Matrix(3, 3);

const matrix1 = new Matrix(1);

const vectorMatrix = new Matrix(new Array([2, 3, 1]));

const square1 = new Matrix(new Array([1, 2], 
                                    [3, 4]));
const square2 = new Matrix(new Array([1, 2], 
    [3, 4]));
console.log(square1.add(square2).toString());

const zero = new Matrix(0, 0);

const triangle = new Matrix(new Array([1, 2, 3],
                                      [4, 5, 6]));








    