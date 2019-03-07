import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import MoacConnect from './MoacConnect'
import './main.html';
 MoacConnect.InitChain3();

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
    console.log(dist);
    console.log(value);
    MoacConnect.transferPAS(dist,value,function(e,r){
      if(!e){
        console.log("TX HASH", r);
      }
    })
  }
})