var jsonpack = require('jsonpack/main');



export const compressLog = function(_log){
	var packed = jsonpack.pack(_log);
    return packed;
}


export const dempressLog = function(_log){
	
}