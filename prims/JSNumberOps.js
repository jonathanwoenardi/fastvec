function broadcastJSVec(value,n) {
    var arr = [];
    for (var i = 0; i < n; i++) {
        arr.push(value);
    }
    return arr;
}

// ----------------- VectorMath ----------------------------------------------//

function eyeJSMat(n) {
    var mat = Array.apply(null, Array(n*n)).map(Number.prototype.valueOf,0);
    for(var i = 0; i < n*n; i += n + 1){mat[i]=1;}
    return mat;
}

function diagJSMat(v, n) {
    var mat = Array.apply(null, Array(n*n)).map(Number.prototype.valueOf,0);
    for(var i = 0; i < n*n; i += n + 1){mat[i]=v;}
    return mat;
}

function transposeJSMat(mat, n) {
    var nmat = new Array(n*n);
    for(var i = 0; i < n; i++) {
        for(var j = 0; j < n; j++) {
            nmat[i*n+j] = mat[j*n+i];
        }
    }
    return nmat;
}


function detJSMat(mat, n) {
    switch (n) {
    case 1:
        return mat[0];
    case 2:
        return detJSMat2(mat);
    case 3:
        return detJSMat3(mat);
    case 4:
        return detJSMat4(mat);
    default:
        throw "Determinant for n = " + n + " is not implemented or does not make sense.";
    }
}

function detJSMat2(mat) {
    return (mat[0]*mat[3] - mat[1]*mat[2]);
}

function detJSMat3(mat) {
    return (
          mat[0]*(mat[4]*mat[8]-mat[5]*mat[7])
        - mat[1]*(mat[3]*mat[8]-mat[5]*mat[6])
        + mat[2]*(mat[3]*mat[7]-mat[4]*mat[6])
    );
}

function detJSMat4(mat) {
    var n11 = mat[ 0 ], n12 = mat[ 4 ], n13 = mat[ 8 ], n14 = mat[ 12 ];
    var n21 = mat[ 1 ], n22 = mat[ 5 ], n23 = mat[ 9 ], n24 = mat[ 13 ];
    var n31 = mat[ 2 ], n32 = mat[ 6 ], n33 = mat[ 10 ], n34 = mat[ 14 ];
    var n41 = mat[ 3 ], n42 = mat[ 7 ], n43 = mat[ 11 ], n44 = mat[ 15 ];

    return (
        n41 * (
        + n14 * n23 * n32
         - n13 * n24 * n32
         - n14 * n22 * n33
         + n12 * n24 * n33
         + n13 * n22 * n34
         - n12 * n23 * n34
        ) +
        n42 * (
        + n11 * n23 * n34
         - n11 * n24 * n33
         + n14 * n21 * n33
         - n13 * n21 * n34
         + n13 * n24 * n31
         - n14 * n23 * n31
        ) +
        n43 * (
        + n11 * n24 * n32
         - n11 * n22 * n34
         - n14 * n21 * n32
         + n12 * n21 * n34
         + n14 * n22 * n31
         - n12 * n24 * n31
        ) +
        n44 * (
        - n13 * n22 * n31
         - n11 * n23 * n32
         + n11 * n22 * n33
         + n13 * n21 * n32
         - n12 * n21 * n33
         + n12 * n23 * n31
        )
    );
}


function traceJSMat(mat, n) {
    var r = 0;
    for(var i = 0; i < n*n; i += n + 1){r+=mat[i];}
    return r;
}

function fromDiagJSMat(mat, n) {
    var vec = new Array(n);
    for(var i = 0; i < n; i++){vec[i]=mat[i*(n+1)];}
    return vec;
}

function toDiagJSMat(vec) {
    var n = vec.length;
    var mat = Array.apply(null, Array(n*n)).map(Number.prototype.valueOf,0);
    for(var i = 0; i < n; i++){mat[i*(n+1)]=vec[i];}
    return mat;
}


function dotJSVec(lhs,rhs) {
    return lhs.reduce(function (r, e, i) {
        return r + e*rhs[i];
    }, 0);
}

function dotBJSVec(lhs,rhs) {
    var rez = lhs.reduce(function (r, e, i) {
        return r + e*rhs[i];
    }, 0);
    return lhs.map(function (){ return rez; });
}

// ----------------- MatrixProduct ----------------------------------------------//

function prodJSMM(lhs,rhs,n) {
    var rez = new Array(n);
    for(var i = 0; i < n; i++) {
        for(var j = 0; j < n; j++) {
            rez[i*n+j] = 0;
            for(var k = 0; k < n; k++) {
                rez[i*n+j] += lhs[i*n+k]*rhs[k*n+j];
            }
        }
    }
    return rez;
}

function prodJSMV(lhs,rhs) {
    var rez = rhs.length;
    for(var i = 0; i < n; i++) {
        rez[i] = 0;
        for(var j = 0; j < n; j++) {
            rez[i] += lhs[i*n+j]*rhs[j];
        }
    }
    return rez;
}



// ----------------- VectorFracMath ----------------------------------------------//

function inverseJSM4(mat) {
    var rez = new Array(16);
    rez[0]  = mat[13]*(mat[ 6]*mat[11]-mat[10]*mat[ 7])+mat[ 9]*(mat[14]*mat[ 7]-mat[ 6]*mat[15])+mat[ 5]*(mat[10]*mat[15]-mat[14]*mat[11]);
    rez[4]  = mat[12]*(mat[10]*mat[ 7]-mat[ 6]*mat[11])+mat[ 8]*(mat[ 6]*mat[15]-mat[14]*mat[ 7])+mat[ 4]*(mat[14]*mat[11]-mat[10]*mat[15]);
    rez[8]  = mat[12]*(mat[ 5]*mat[11]-mat[ 9]*mat[ 7])+mat[ 8]*(mat[13]*mat[ 7]-mat[ 5]*mat[15])+mat[ 4]*(mat[ 9]*mat[15]-mat[13]*mat[11]);
    rez[12] = mat[12]*(mat[ 9]*mat[ 6]-mat[ 5]*mat[10])+mat[ 8]*(mat[ 5]*mat[14]-mat[13]*mat[ 6])+mat[ 4]*(mat[13]*mat[10]-mat[ 9]*mat[14]);
    rez[1]  = mat[13]*(mat[10]*mat[ 3]-mat[ 2]*mat[11])+mat[ 9]*(mat[ 2]*mat[15]-mat[14]*mat[ 3])+mat[ 1]*(mat[14]*mat[11]-mat[10]*mat[15]);
    rez[5]  = mat[12]*(mat[ 2]*mat[11]-mat[10]*mat[ 3])+mat[ 8]*(mat[14]*mat[ 3]-mat[ 2]*mat[15])+mat[ 0]*(mat[10]*mat[15]-mat[14]*mat[11]);
    rez[9]  = mat[12]*(mat[ 9]*mat[ 3]-mat[ 1]*mat[11])+mat[ 8]*(mat[ 1]*mat[15]-mat[13]*mat[ 3])+mat[ 0]*(mat[13]*mat[11]-mat[ 9]*mat[15]);
    rez[13] = mat[12]*(mat[ 1]*mat[10]-mat[ 9]*mat[ 2])+mat[ 8]*(mat[13]*mat[ 2]-mat[ 1]*mat[14])+mat[ 0]*(mat[ 9]*mat[14]-mat[13]*mat[10]);
    rez[2]  = mat[13]*(mat[ 2]*mat[ 7]-mat[ 6]*mat[ 3])+mat[ 5]*(mat[14]*mat[ 3]-mat[ 2]*mat[15])+mat[ 1]*(mat[ 6]*mat[15]-mat[14]*mat[ 7]);
    rez[6]  = mat[12]*(mat[ 6]*mat[ 3]-mat[ 2]*mat[ 7])+mat[ 4]*(mat[ 2]*mat[15]-mat[14]*mat[ 3])+mat[ 0]*(mat[14]*mat[ 7]-mat[ 6]*mat[15]);
    rez[10] = mat[12]*(mat[ 1]*mat[ 7]-mat[ 5]*mat[ 3])+mat[ 4]*(mat[13]*mat[ 3]-mat[ 1]*mat[15])+mat[ 0]*(mat[ 5]*mat[15]-mat[13]*mat[ 7]);
    rez[14] = mat[12]*(mat[ 5]*mat[ 2]-mat[ 1]*mat[ 6])+mat[ 4]*(mat[ 1]*mat[14]-mat[13]*mat[ 2])+mat[ 0]*(mat[13]*mat[ 6]-mat[ 5]*mat[14]);
    rez[3]  = mat[ 9]*(mat[ 6]*mat[ 3]-mat[ 2]*mat[ 7])+mat[ 5]*(mat[ 2]*mat[11]-mat[10]*mat[ 3])+mat[ 1]*(mat[10]*mat[ 7]-mat[ 6]*mat[11]);
    rez[7]  = mat[ 8]*(mat[ 2]*mat[ 7]-mat[ 6]*mat[ 3])+mat[ 4]*(mat[10]*mat[ 3]-mat[ 2]*mat[11])+mat[ 0]*(mat[ 6]*mat[11]-mat[10]*mat[ 7]);
    rez[11] = mat[ 8]*(mat[ 5]*mat[ 3]-mat[ 1]*mat[ 7])+mat[ 4]*(mat[ 1]*mat[11]-mat[ 9]*mat[ 3])+mat[ 0]*(mat[ 9]*mat[ 7]-mat[ 5]*mat[11]);
    rez[15] = mat[ 8]*(mat[ 1]*mat[ 6]-mat[ 5]*mat[ 2])+mat[ 4]*(mat[ 9]*mat[ 2]-mat[ 1]*mat[10])+mat[ 0]*(mat[ 5]*mat[10]-mat[ 9]*mat[ 6]);
    var det = mat[ 0]*rez[ 0] + mat[ 4]*rez[ 4] + mat[ 8]*rez[ 8] + mat[12]*rez[12];
    if (det === 0) {
        return undefined;
    } else {
        for(var i = 0; i < 16; i++) {rez[i] /= det;}
        return rez;
    }
}

function inverseJSM3(mat) {
    var rez = new Array(9);
    rez[0] = mat[4]*mat[8] - mat[7]*mat[5];
    rez[3] = mat[6]*mat[5] - mat[3]*mat[8];
    rez[6] = mat[3]*mat[7] - mat[6]*mat[4];
    rez[1] = mat[7]*mat[2] - mat[1]*mat[8];
    rez[4] = mat[0]*mat[8] - mat[6]*mat[2];
    rez[7] = mat[6]*mat[1] - mat[0]*mat[7];
    rez[2] = mat[1]*mat[5] - mat[4]*mat[2];
    rez[5] = mat[3]*mat[2] - mat[0]*mat[5];
    rez[8] = mat[0]*mat[4] - mat[3]*mat[1];
    var det = mat[0]*rez[0] + mat[3]*rez[3] + mat[6]*rez[6];
    if (det === 0) {
        return undefined;
    } else {
        for(var i = 0; i < 9; i++) {rez[i] /= det;}
        return rez;
    }
}


function inverseJSM2(mat) {
    var det = mat[0]*mat[3] - mat[1]*mat[2];
    if (det === 0) {
        return undefined;
    }
    var rez = new Array(4);
    rez[0] = mat[3]/det;
    rez[2] = -mat[1]/det;
    rez[1] = -mat[2]/det;
    rez[3] = mat[0]/det;
    return rez;
}

// ----------------- Eq ----------------------------------------------//

function eqJSVec(lhs,rhs) {
    return lhs.every(function (e, i) {
        return e == rhs[i];
    });
}

function neqJSVec(lhs,rhs) {
    return lhs.some(function (e, i) {
        return e /= rhs[i];
    });
}

// ----------------- Ord ----------------------------------------------//

function gtJSVec(lhs,rhs) {
    return lhs.every(function (e, i) {
        return e > rhs[i];
    });
}
function ltJSVec(lhs,rhs) {
    return lhs.every(function (e, i) {
        return e < rhs[i];
    });
}
function geJSVec(lhs,rhs) {
    return lhs.every(function (e, i) {
        return e >= rhs[i];
    });
}
function leJSVec(lhs,rhs) {
    return lhs.every(function (e, i) {
        return e <= rhs[i];
    });
}
function maxJSVec(lhs,rhs) {
    return lhs.map(function (e, i) {
        return Math.max(e,rhs[i]);
    });
}
function minJSVec(lhs,rhs) {
    return lhs.map(function (e, i) {
        return Math.min(e,rhs[i]);
    });
}
function cmpJSVec(lhs,rhs) {
    return lhs.reduce(function (r, e, i) {
        return r !== 0 ? r : (e > rhs[i] ? 1 : (e < rhs[i] ? -1 : 0));
    }, 0);
}

// ----------------- Show ----------------------------------------------//

function showJSVec(vec) {
    return "Vec " + vec.join(" ");
}


function showJSMat(mat,n) {
    var r = "Mat\n";
    for(var i = 0; i < n; i++ ) {
        for(var j = 0; j < n; j++ ) {
            r += " " + mat[j*n+i];
        }
        r += "\n";
    }
    return r;
}




// ----------------- Num ----------------------------------------------//


function plusJSVec(lhs,rhs) {
    return lhs.map(function (e, i) {
        return e + rhs[i];
    });
}


function minusJSVec(lhs,rhs) {
    return lhs.map(function (e, i) {
        return e - rhs[i];
    });
}


function timesJSVec(lhs,rhs) {
    return lhs.map(function (e, i) {
        return e * rhs[i];
    });
}

function negateJSVec(vec) {
    return vec.map(function (e) {
        return -e;
    });
}

function absJSVec(vec) {
    return vec.map(function (e) {
        return Math.abs(e);
    });
}

function signumJSVec(vec) {
    return vec.map(function (e) {
        return Math.sign(e);
    });
}




// ----------------- Fractioinal ----------------------------------------------//


function divideJSVec(lhs,rhs) {
    return lhs.map(function (e, i) {
        return e/rhs[i];
    });
}

function recipJSVec(lhs) {
    return lhs.map(function (e) {
        return 1/e;
    });
}

// ----------------- Floating ----------------------------------------------//

function piJSVec(n) {
    var arr = [];
    for (var i = 0; i < n; i++) {
        arr.push(Math.PI);
    }
    return arr;
}

function expJSVec(vec) {
    return vec.map(function (e) {
        return Math.exp(e);
    });
}

function logJSVec(vec) {
    return vec.map(function (e) {
        return Math.log(e);
    });
}

function sqrtJSVec(vec) {
    return vec.map(function (e) {
        return Math.sqrt(e);
    });
}

function powerJSVec(lhs,rhs) {
    return lhs.map(function (e, i) {
        return Math.pow(e,rhs[i]);
    });
}

function sinJSVec(vec) {
    return vec.map(function (e) {
        return Math.sin(e);
    });
}

function cosJSVec(vec) {
    return vec.map(function (e) {
        return Math.cos(e);
    });
}

function tanJSVec(vec) {
    return vec.map(function (e) {
        return Math.tan(e);
    });
}

function asinJSVec(vec) {
    return vec.map(function (e) {
        return Math.asin(e);
    });
}

function acosJSVec(vec) {
    return vec.map(function (e) {
        return Math.acos(e);
    });
}

function atanJSVec(vec) {
    return vec.map(function (e) {
        return Math.tan(e);
    });
}

function sinhJSVec(vec) {
    return vec.map(function (e) {
        return Math.sinh(e);
    });
}

function coshJSVec(vec) {
    return vec.map(function (e) {
        return Math.cosh(e);
    });
}

function tanhJSVec(vec) {
    return vec.map(function (e) {
        return Math.tanh(e);
    });
}

function asinhJSVec(vec) {
    return vec.map(function (e) {
        return Math.asinh(e);
    });
}

function acoshJSVec(vec) {
    return vec.map(function (e) {
        return Math.acosh(e);
    });
}

function atanhJSVec(vec) {
    return vec.map(function (e) {
        return Math.tanh(e);
    });
}

// ----------------- Storable ----------------------------------------------//

function writeByteOffJSVecFloat32(buf, idx, vec) {
    var tarr = buf.f3 || (buf.f3 = new Float32Array(buf.buf));
    tarr.set(vec, idx / 4);
}

function writeByteOffJSVecFloat64(buf, idx, vec) {
    var tarr = buf.f6 || (buf.f6 = new Float64Array(buf.buf));
    tarr.set(vec, idx / 8);
}

function writeByteOffJSVecInt8(buf, idx, vec) {
    var tarr = buf.i8 || (buf.i8 = new Int8Array(buf.buf));
    tarr.set(vec, idx);
}

function writeByteOffJSVecInt16(buf, idx, vec) {
    var tarr = buf.i1 || (buf.i1 = new Int16Array(buf.buf));
    tarr.set(vec, idx / 2);
}

function writeByteOffJSVecInt32(buf, idx, vec) {
    var tarr = buf.i3 || (buf.i3 = new Int32Array(buf.buf));
    tarr.set(vec, idx / 4);
}

function writeByteOffJSVecUint8(buf, i0, vec) {
    var tarr = buf.u8 || (buf.u8 = new Uint8Array(buf.buf));
    tarr.set(vec, idx);
}

function writeByteOffJSVecUint16(buf, idx, vec) {
    var tarr = buf.u1 || (buf.u1 = new Uint16Array(buf.buf));
    tarr.set(vec, idx / 2);
}

function writeByteOffJSVecUint32(buf, idx, vec) {
    var tarr = buf.u3 || (buf.u3 = new Uint32Array(buf.buf));
    tarr.set(vec, idx / 4);
}



function readByteOffJSVecFloat32(buf, idx, n) {
    var tarr = buf.f3 || (buf.f3 = new Float32Array(buf.buf));
    var i0 = idx / 4;
    return Array.prototype.slice.call(tarr, i0, i0+n);
}

function readByteOffJSVecFloat64(buf, idx, n) {
    var tarr = buf.f6 || (buf.f6 = new Float64Array(buf.buf));
    var i0 = idx / 8;
    return Array.prototype.slice.call(tarr, i0, i0+n);
}

function readByteOffJSVecInt8(buf, i0, n) {
    var tarr = buf.i8 || (buf.i8 = new Int8Array(buf.buf));
    return Array.prototype.slice.call(tarr, i0, i0+n);
}

function readByteOffJSVecInt16(buf, idx, n) {
    var tarr = buf.i1 || (buf.i1 = new Int16Array(buf.buf));
    var i0 = idx / 2;
    return Array.prototype.slice.call(tarr, i0, i0+n);
}

function readByteOffJSVecInt32(buf, idx, n) {
    var tarr = buf.i3 || (buf.i3 = new Int32Array(buf.buf));
    var i0 = idx / 4;
    return Array.prototype.slice.call(tarr, i0, i0+n);
}

function readByteOffJSVecUint8(buf, i0, n) {
    var tarr = buf.u8 || (buf.u8 = new Uint8Array(buf.buf));
    return Array.prototype.slice.call(tarr, i0, i0+n);
}

function readByteOffJSVecUint16(buf, idx, n) {
    var tarr = buf.u1 || (buf.u1 = new Uint16Array(buf.buf));
    var i0 = idx / 2;
    return Array.prototype.slice.call(tarr, i0, i0+n);
}

function readByteOffJSVecUint32(buf, idx, n) {
    var tarr = buf.u3 || (buf.u3 = new Uint32Array(buf.buf));
    var i0 = idx / 4;
    return Array.prototype.slice.call(tarr, i0, i0+n);
}




function  writeElemOffJSVecFloat32(buf, idx, vec) {
    var tarr = buf.f3 || (buf.f3 = new Float32Array(buf.buf));
    tarr.set(vec, idx);
}

function  writeElemOffJSVecFloat64(buf, idx, vec) {
    var tarr = buf.f6 || (buf.f6 = new Float64Array(buf.buf));
    tarr.set(vec, idx);
}

function  writeElemOffJSVecInt8(buf, idx, vec) {
    var tarr = buf.i8 || (buf.i8 = new Int8Array(buf.buf));
    tarr.set(vec, idx);
}

function  writeElemOffJSVecInt16(buf, idx, vec) {
    var tarr = buf.i1 || (buf.i1 = new Int16Array(buf.buf));
    tarr.set(vec, idx);
}

function  writeElemOffJSVecInt32(buf, idx, vec) {
    var tarr = buf.i3 || (buf.i3 = new Int32Array(buf.buf));
    tarr.set(vec, idx);
}

function  writeElemOffJSVecUint8(buf, i0, vec) {
    var tarr = buf.u8 || (buf.u8 = new Uint8Array(buf.buf));
    tarr.set(vec, idx);
}

function  writeElemOffJSVecUint16(buf, idx, vec) {
    var tarr = buf.u1 || (buf.u1 = new Uint16Array(buf.buf));
    tarr.set(vec, idx);
}

function writeElemOffJSVecUint32(buf, idx, vec) {
    var tarr = buf.u3 || (buf.u3 = new Uint32Array(buf.buf));
    tarr.set(vec, idx);
}



function readElemOffJSVecFloat32(buf, idx, n) {
    var tarr = buf.f3 || (buf.f3 = new Float32Array(buf.buf));
    return Array.prototype.slice.call(tarr, idx, idx+n);
}

function readElemOffJSVecFloat64(buf, idx, n) {
    var tarr = buf.f6 || (buf.f6 = new Float64Array(buf.buf));
    return Array.prototype.slice.call(tarr, idx, idx+n);
}

function readElemOffJSVecInt8(buf, idx, n) {
    var tarr = buf.i8 || (buf.i8 = new Int8Array(buf.buf));
    return Array.prototype.slice.call(tarr, idx, idx+n);
}

function readElemOffJSVecInt16(buf, idx, n) {
    var tarr = buf.i1 || (buf.i1 = new Int16Array(buf.buf));
    return Array.prototype.slice.call(tarr, idx, idx+n);
}

function readElemOffJSVecInt32(buf, idx, n) {
    var tarr = buf.i3 || (buf.i3 = new Int32Array(buf.buf));
    return Array.prototype.slice.call(tarr, idx, idx+n);
}

function readElemOffJSVecUint8(buf, idx, n) {
    var tarr = buf.u8 || (buf.u8 = new Uint8Array(buf.buf));
    return Array.prototype.slice.call(tarr, idx, idx+n);
}

function readElemOffJSVecUint16(buf, idx, n) {
    var tarr = buf.u1 || (buf.u1 = new Uint16Array(buf.buf));
    return Array.prototype.slice.call(tarr, idx, idx+n);
}

function readElemOffJSVecUint32(buf, idx, n) {
    var tarr = buf.u3 || (buf.u3 = new Uint32Array(buf.buf));
    return Array.prototype.slice.call(tarr, idx, idx+n);
}