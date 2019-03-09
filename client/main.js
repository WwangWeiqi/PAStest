import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import MoacConnect from './MoacConnect';
import {compressLog, depressLog} from './utils'; 
import { EJSON } from 'meteor/ejson'
import './main.html';
 MoacConnect.InitChain3();

 var filter = chain3.mc.filter("latest");

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
    TemplateVar.set("afterCompress",compressLog(jsonLog));
    
  },
  'click #addlog'(){
  	 var compressed = $("#addCompress")[0].checked;
  	 if(compressed){

  	 }
  	 else{

  	 }
  },
  'keyup #afterCompress'(){
  	 TemplateVar.set("afterCompress",$("#afterCompress").val());
  }
})