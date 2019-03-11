import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import MoacConnect from './MoacConnect';
import {compressLog, depressLog} from './utils'; 
import { EJSON } from 'meteor/ejson';
import { Random } from 'meteor/random';
import './main.html';
 MoacConnect.InitChain3();
//install lz-string, install jsonpack
 var filter = chain3.mc.filter("latest");


 Template.body.events({
  'click #switch'(){
    $(".table").toggle();
    $(".form").toggle();
  }
 })

Template.checkBalance.events({
  'click button'(event, instance) {
  	let template = Template.instance();
  	let address = $("input").val();
    MoacConnect.getBalance(address,function(e,r){
    	if(!e){
    		console.log("run",r.toNumber());
    		TemplateVar.set(template,"Balance",r.toNumber());
    	}
    	else{
    		console.log(e);
    	}
    })
  },
});

Template.TransferPAS.events({
  'click button'(event,instance){
    let dist = $("#distAddr").val();
    let value = $("#amount").val();
    
    MoacConnect.transferPAS(dist,value,function(e,r){
      if(!e){
      	$(".ui.active.inverted.dimmer").css("display","block");
      	var watchTransfer = gERC20Instance.Transfer(function(e,r){
      		if(!e){
      			$(".ui.active.inverted.dimmer").css("display","none");
      		}
      	})
        console.log("TX HASH", r);
      }
    })
  }
})

Template.CoDeLog.events({
  'click #compress'(event,instance){
    let log = $("#beforeCompress").val();
    let jsonLog = EJSON.parse(log);
    let cmpJSON = compressLog(jsonLog);
    // let cmpLog = LZString.compress(cmpJSON)
    // var bufJSON = Buffer.from(EJSON.stringify(jsonLog), 'utf8');
    // var bufLog = Buffer.from(cmpJSON, 'utf8');
    // console.log(EJSON.stringify(jsonLog),cmpJSON);
    // console.log(EJSON.stringify(jsonLog).length,cmpJSON.length);
    // console.log(bufJSON,bufLog);
    TemplateVar.set("afterCompress",cmpJSON);
    
  },
  'click #addlog'(){
    var rad_id = Random.id(17);
    console.log(rad_id);
  	 // var compressed = $("#addCompress")[0].checked;
     let log = $("#beforeCompress").val();
     let jsonLog = EJSON.parse(log);
     let cmpJSON = compressLog(jsonLog);
  	 MoacConnect.addLog(rad_id,cmpJSON,function(e,r){
      if(!e){
        console.log(r);
      }
     })
  },
   'click #readLog'(){
     let logId = $("#beforeCompress").val();
    let template = Template.instance();
     MoacConnect.readLog(logId,function(e,r){
      if(!e){
         let logString = EJSON.stringify(depressLog(r));
         TemplateVar.set(template,"afterCompress",logString);
      }
     })
  },
  'keyup #afterCompress'(){
  	 TemplateVar.set("afterCompress",$("#afterCompress").val());
  }
})