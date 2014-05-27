var server = require("./rest");
var configs = require("./state");
var _ = require("underscore");

// local deps
var hue = require("./hue-api");

var methods = {
	bedtimeWatcher : function(startTime){
		console.log("Starting up bedtime monitor:", startTime);
		configs.state.timers.bedtimeWatcher = setInterval(function(){
			if(configs.state.current.mode == "bedtime"){
				// get now
				var now = new Date();
				
				// get the end time for the next day
				var endTime = new Date(startTime.getTime());
				endTime.setHours(configs.bedtime.end);
				endTime.setDate(startTime.getDate() + 1);
				
				if(now > endTime){
					console.log("Good Morning! Looks like bedtimes over");
					// remove mode control
					configs.state.current.mode = "none";
					// Clear timer
					clearInterval(configs.state.timers.bedtimeWatcher);
				}
			} else {
				console.log("Bedtime was canceled early? weak..");
				clearInterval(configs.state.timers.bedtimeWatcher);
			}
		},
		(configs.bedtime.watcherInterval * 60000) // setting is in minutes
		);
	}
};

// Server end points
server.put({path : '/bedtime/reading' , version : '1'} , function(req,resp,next){
	console.log("Received /bedtime request");
	try{
		var bedtimeGroup = _.find(configs.groups, function(v){
			if(v.name == "bedtime"){
				return v;
			}
		});
		
		if(bedtimeGroup){
			
			// Get all lights
			hue.lights.state.get("").then(function(rsp){
				_.each(rsp,function(v,i){
					if(bedtimeGroup.lights.indexOf(i)){
						hue.lights.turnOff(i);
					} else {
						hue.lights.turnOn(i);
					}
				});
				
				configs.state.current.mode = "bedtime";
				methods.bedtimeWatcher(new Date());
			});
			
		} else {
			console.error("no bedtime group set found. Add one to use this functionality!");
			console.log(configs);
		}
		
		resp.json(200);
	} catch (e){
		console.error("Error while attempting to go into bedtime mode: ", e);
		resp.json(500);
	}

	return next();
});

server.put({path : '/bedtime/sleep' , version : '1'} , function(req,resp,next){
	console.log("Received /bedtime request");
	try{
		var bedtimeGroup = _.find(configs.groups, function(v){
			if(v.name == "bedtime"){
				return v;
			}
		});
		
		if(bedtimeGroup){
			console.log("enter sleep mode.");
			_.each(bedtimeGroup.lights, function(id){
				hue.lights.turnOff(id);
			});
			
			configs.state.current.mode = "sleep";
		} else {
			console.error("no bedtime group set found. Add one to use this functionality!");
			console.log(configs);
		}
		
		resp.json(200);
	} catch (e){
		console.error("Error while attempting to go into bedtime mode: ", e);
		resp.json(500);
	}

	return next();
});