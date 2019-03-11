var jsonpack = require('jsonpack/main');



export const compressLog = function(_log){
	var packed = jsonpack.pack(_log);
    return packed;
}


export const depressLog = function(_log){
	var unpacked = jsonpack.unpack(_log);
	return unpacked;
}