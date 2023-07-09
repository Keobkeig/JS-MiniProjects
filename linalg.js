//Linear Algebra Library by @keobkeig
//
//Matrix class


//methods:
    // Trace finder 
    // Linear eqs into coefficient matrix
    // augumented matrix into gaussian elimination 
    // algebraic operations with matrixes (addition, subtraction, multiplication)
    // find inverse of matrixes if possible (return inverse matrix), uses formula for 2x2 to speed up 
    // check if transpose
    // check if antisymmetric
    // triangle matrix area (1/2 * abs of determinant)
    // quadilateral matrix (abs of determinant)
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

    //toString method
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
}

//test matrixs
let m = new Matrix(3, 3);

const matrix1 = new Matrix(1);

const vectorMatrix = new Matrix(new Array([2, 3, 1]));

const square = new Matrix(new Array([1, 2], 
                                    [3, 4]));

const zero = new Matrix(0, 0);

const triangle = new Matrix(new Array([1, 2, 3],
                                      [4, 5, 6]));








    