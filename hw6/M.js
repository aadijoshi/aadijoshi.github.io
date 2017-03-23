
//////////////////////////////////////////////////////////////////////////////
// M is an object containing methods that let you manipulate 4x4 matrices.
//////////////////////////////////////////////////////////////////////////////

var M = {};

//////////////////////////////////////////////////////////////////////////////
// Your task is to implement the following methods of object M:
//////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////
// I have given you a head start by implementing some of the methods for you.
//
// Notice how I use M.matrixMultiply() to help implement other methods.
//////////////////////////////////////////////////////////////////////////////
var stack = [];

M.save = function(m) {
	var n;
	for(n = 0; n < 16; n++){
		stack.push(m[n]);
		//console.log("Save");
		//console.log(m[n]);
	}
} // Push the 16 values of m onto a stack.


M.restore = function(m) {
	var n;
	for(n = 15; n > -1; n--){
		m[n] = stack.pop();
		//console.log("Pop");
		//console.log(m[n]);
	}
} // Pop from a stack to set the 16 values of m.

M.identity = function(m) {           
	m = [ 1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1 ]; 	
	//return v;
}

M.rotateX = function(m, radians) {
	//console.log("Called");     
	v = [ 1,0,0,0, 0,Math.cos(radians),-Math.sin(radians),0, 0,Math.sin(radians),Math.cos(radians),0, 0,0,0,1 ]; 	
	M.matrixMultiply(m, v, m);
} // Modify m, rotating about the X axis.

M.rotateY = function(m, radians) {           
	v = [ Math.cos(radians),0,Math.sin(radians),0, 0,1,0,0, -Math.sin(radians),0,Math.cos(radians),1, 0,0,0,1];
	M.matrixMultiply(m, v, m);
} // Modify m, rotating about the Y axis.

M.rotateZ = function(m, radians) {           
	v = [ Math.cos(radians),-Math.sin(radians),0,0, Math.sin(radians), Math.cos(radians),0,0, 0,1,0,0, 0,0,0,1 ];
	M.matrixMultiply(m, v, m);
} // Modify m, rotating about the Z axis.

M.scale = function(m, v) {          
	s = [ v[0], v[1], v[2], 1];
    M.matrixMultiply(m, s, m);	
} // Modify m, scaling by v[0],v[1],v[2].

M.translate = function(m, v) {
   M.matrixMultiply(m, M.translationMatrix(v), m);
}

M.translationMatrix = function(v) {
   return [ 1,0,0,0, 0,1,0,0, 0,0,1,0, v[0],v[1],v[2],1 ];
}

M.matrixMultiply = function(a, b, dst) {
   var n, tmp = []; 

   // PUT THE RESULT OF a x b INTO TEMPORARY MATRIX tmp.

   for (n = 0 ; n < 16 ; n++)
      tmp.push( a[n&3     ] * b[    n&12] +
                a[n&3 |  4] * b[1 | n&12] +
                a[n&3 |  8] * b[2 | n&12] +
                a[n&3 | 12] * b[3 | n&12] );

   // COPY tmp VALUES INTO DESTINATION MATRIX dst.

   for (n = 0 ; n < 16 ; n++)
      dst[n] = tmp[n];
}

M.transform = function(m, v)  {

    // IF v[3] IS UNDEFINED, SET IT TO 1 (THAT IS, ASSUME v IS A POINT).

    var x = v[0], y = v[1], z = v[2], w = v[3] === undefined ? 1 : v[3];

    // RETURN RESULT OF TRANSFORMING v BY MATRIX m.

    return [ x * m[0] + y * m[4] + z * m[ 8] + w * m[12],
             x * m[1] + y * m[5] + z * m[ 9] + w * m[13],
             x * m[2] + y * m[6] + z * m[10] + w * m[14],
             x * m[3] + y * m[7] + z * m[11] + w * m[15] ];
}

