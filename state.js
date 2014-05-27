module.exports = {
	general : {
		apiName : "huey-moods",
		logging : {
			level : "DEBUG",
			file : "log/logs"
		}
	},
	hue : {
		portalUrl : "http://www.meethue.com/api/nupnp",
		baseIp : ""
	},
	weather : {
		lights : [
			"2"
		],
		cycleTime : 4000, // in milliseconds
		cycleLimit : 10,
		precipThresholds : [
			{
				threshold : 0.002,
				cycleTime : 20000
			},
			{
				threshold : 0.017,
				cycleTime : 10000
			},
			{
				threshold : 0.1,
				cycleTime : 6000
			},
			{
				threshold : 0.4,
				cycleTime : 1000
			}
		],
		profiles: [
			{
				type : "rain",
				color : {
					hue : 45000,
					sat : 250
				}
			},
			{
				type : "snow",
				color : {
					hue : 37000,
					sat : 200
				}
			},
			{
				type : "cloudy",
				color : {
					hue : 42000,
					sat : 150,
					bri : 150
				}
			},
			{
				type : "wind",
				color : {
					hue : 25500,
					sat : 250
				}
			},
			{
				type : "clear-day",
				color : {
					hue : 18000,
					sat : 250
				}
			},
			{
				type : "clear-night",
				color : {
					hue : 48000,
					sat : 250
				}
			},
			{
				type : "partly-cloudy-day",
				color : [
					{
						hue : 42000,	// cloudy
						sat : 150,
						bri : 150
					},
					{
						hue : 18000,	// day
						sat : 250,
						bri : 225
					}
				]
			},
			{
				type : "partly-cloudy-night",
				color : [
					{
						hue : 42000,	// cloudy
						sat : 150,
						bri : 150
					},
					{
						hue : 48000,	// night
						sat : 250,
						bri : 225
					}
				]
			}
		]
	},
	accents : {
		enabled : false,
		timer : 1800000 ,	// 30 mins
		transitionTime:300000,	// 5 mins
		profiles : [
			{	
				name : "heavy green",
				hue : 25500,
				sat : 255,
				group:"accent a"
			},
			{	
				name : "heavy blue",
				hue : 46920,
				sat : 255,
				group:"accent b"
			}
		]
	},
	groups : [
		{
			name : "accent a",
			lights : [
				2,
				4
			]
		},
		{
			name : "accent b",
			lights : [
				3,
				4
			]
		}
	],
	server : {
		port : 8080,
		ip_addr : "192.168.1.7"
	},
	bedtime : {
		end : 10,
		watcherInterval : 30
	},
	rooms : {
		lights : [
			1,
			3
		],
		home : {
			hue : 12000,
			sat : 50,
			bri : 230
		}
	},
	state : {
		current : {
			mode : "none",
			profile : "none",
			rolloverTime : undefined
		}
	}
};