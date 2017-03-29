var S = {};

   S._quad = function(f, u0, v0, u1, v1) {
      return [
         f(u0, v0),
         f(u1, v0),
         f(u1, v1),
         f(u0, v1),
         f(u0, v0)
      ];
   }

   S.parametricMesh = function(f, nu, nv) {
      var i, j, u, v, C = [];
      for (j = 0 ; j < nv ; j++) {
         v = j / nv;
         for (i = 0 ; i < nu ; i++) {
            u = i / nu;
	    	C.push(S._quad(f, u, v, u + 1/nu, v + 1/nv));
         }
      }
      return C;
   }

   S.tube = function(u, v) {
      var theta = 2 * Math.PI * u;
      return [ Math.cos(theta),
               Math.sin(theta),
	       2 * v - 1 ];
   }

   S.spiral = function(u, v){
		var r2 = 2;
		var u2 = u*u;
		var v2 = v*v;
		z2 = r2-u2-v2;
		z = Math.sqrt(z2);

		return [ u, v, z];
   }
   S.sphere = function(u, v) {
	  var phi = 2 * Math.PI * u;
      var theta = 2 * Math.PI * v;
	  var p = 4;
      return [ p*Math.sin(phi)*Math.cos(theta), p*Math.sin(theta)*sin(phi),
               p*Math.cos(theta)];
   }

   S.pyramid = function(u, v) {
      var theta = 2 * Math.PI * v;
      return [ u, u*Math.cos(theta),
               u*Math.sin(theta)];
   }
