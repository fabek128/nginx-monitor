	limite = 40;

	var itemsActConnections = [];
	var itemsReaConnections = [];
	var itemsWriConnections = [];
	var itemsWaiConnections = [];

	var activeArray = itemsActConnections;

	var defaultChartTitle = "Active Connections"

	var plot = null;

	//client faye
	var client = new Faye.Client('http://localhost:1337/');
	
	client.subscribe('/act', function(act) {
		loadArray(itemsActConnections, act.text);
		render();
		plot.replot();
	});	
	
	client.subscribe('/rea', function(rea) {
		loadArray(itemsReaConnections, rea.text);
		render();
		plot.replot();		
	});
	
	client.subscribe('/wri', function(wri) {
		loadArray(itemsWriConnections, wri.text);
		render();
		plot.replot();		
	});
	
	client.subscribe('/wai', function(wai) {
		loadArray(itemsWaiConnections, wai.text);
		render();
		plot.replot();		
	});					
		
	//

	function loadArray(array, item){
		if(array.length == limite){
			removeByIndex(array, 0);					
		}
		array.push(item);					
	}	
	
	function setShowInfo (info){
		if(info == "act")
		{
			defaultChartTitle = "Active Connections"
			activeArray = itemsActConnections;
			render();
			plot.replot();	
		}

		if(info == "rea")
		{
			defaultChartTitle = "Readings"
			activeArray = itemsReaConnections;
			render();
			plot.replot();	
		}
		
		if(info == "wri")
		{
			defaultChartTitle = "Writing"
			activeArray = itemsWriConnections;
			render();			
			plot.replot();
		}
		
		if(info == "wai")
		{
			defaultChartTitle = "Waiting"
			activeArray = itemsWaiConnections;
			render();			
			plot.replot();
		}						
	}
			
	function removeByIndex(arr, index) {			
		arr.splice(index, 1);
	}		
	
	function render() 
	{
	  	plot = $.jqplot('chart', [activeArray], {
		  title: defaultChartTitle, 
		  seriesDefaults: {
			pointLabels: {
			  show: true,
			  edgeTolerance: 5,
			}},
		  axes:{
				xaxis: {
					tickOptions: {		
						show: true,         
						showLabel: false,    
					}
				},
				yaxis: {
					min:0,
					max: 100,
					tickOptions: {		
						show: true,         
						showLabel: false,    
					}
				}
		  }
	  });
	}