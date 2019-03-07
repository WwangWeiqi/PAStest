 pragma solidity ^0.4.21;
 pragma experimental ABIEncoderV2;
 
 contract PASData {
 	 struct log{
 	 	string id;
 	 	string content;
 	 	bool encodeStatus;
 	 }
     string[] public logIdArray;
     mapping (string => string) logs;
     
     address public founder;
     
     constructor(address _founder) public {
         founder = _founder;
     }
     
     function compressLog (string _content) public view returns (string){
         return _content;
     }
     
       
     function depressLog (string _content) public view returns (string){
         return _content;
     }
     
     function addLog(string _logId, string _logContent) public {
         require(msg.sender == founder);
         logs[_logId].id = _logId;
         logs[_logId].content = _logContent;
         logs[_logId].encodeStatus = false;
     }
     
     function addEncondedLog(string _logId, string _logContent) public {
          require(msg.sender == founder);
          logs[_logId].id = _logId;
          logs[_logId].content =  compressLog(_logContent);
          logs[_logId].encodeStatus = true;
     }
     
     function getLog(string _logId) public view returns(string,string,bool){
     	return (logs[_logId].id, logs[_logId].content, logs[_logId].encodeStatus);
     }

     function readLog(string _logId) public view returns(string){
         if(logStatus(_logId)){
         	 return depressLog(logs[_logId]);
         }
         else{
         	 return logs[_logId];
         }
     }
     
     // function readEncodedLog(string _logId) public view returns(string){
     //     require(msg.sender == founder);
     //     return depressLog(logs[_logId]);
     // }
 }