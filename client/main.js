import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import MoacConnect from './MoacConnect'
import './main.html';
 MoacConnect.InitChain3();

Template.hello.onCreated(function helloOnCreated() {
 
});

Template.hello.helpers({
  
});

Template.hello.events({
  'click button'(event, instance) {
  	let template = Template.instance();
  	let address = $("input").val();
  	console.log(address);
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
