const svg = d3.select('svg.chart');
const width = 1100;
const height = 600;
var everything = first_secp_Graph(data_yrArray);
var player_name = everything[0];
var avg_pw_table = everything[1];
var p_fpw = everything[2];
var p_spw = everything[3];
var top_p = everything[4];
var top_p_details = everything[5];
var avg_top_p_details = everything[6];
var top_radar = undefined;
const legend_d = d3.scaleOrdinal()
				.domain(['First Point won','Second point won'])
				.range(['#FF2400','#7EF9FF'])


function scatter_graph(table, players){
	const margin = {top:50,right:20,left:200,bottom:20};
	var fp_min = math.min(table.map(row => row.avg_fpw));
	var sp_min = math.min(table.map(row => row.avg_spw));
	var fp_max = math.max(table.map(row => row.avg_fpw));
	var sp_max = math.max(table.map(row => row.avg_spw));

	const xScale = d3.scaleLinear()
	  .domain([math.min([fp_min,sp_min])-5, math.max([fp_max,sp_max])+5]) 
	  .range([0, width - margin.left - margin.right])
	  .nice();

	const xAxis = d3.axisBottom(xScale)
					.tickSize(-(height - 2*margin.top - 2*margin.bottom +15));

	const yScale = d3.scalePoint()
	  .domain(players.map(row => row))   			// unique name for players (already unique though)
	  .range([0, height - margin.top - margin.bottom])
	  .padding(2);
	
	const yAxis = d3.axisLeft(yScale)
					.tickSize(-(width - margin.left - margin.right));



	const g1 = svg.append('g')
	  .attr('transform',`translate(${margin.left},${margin.top})`);

	g1.append('g')
	  .call(yAxis)
	  .selectAll('.domain')
	    .remove();

	g1.append('g').call(xAxis)
	  .attr('transform',`translate(0,${height - margin.top - margin.bottom -20})`)
	  .append('text')
	  .attr('class', 'xlabel')
	  .attr('y', margin.bottom+15)
	  .attr('x', (width - margin.left - margin.right)/2)
	  .attr('fill', 'black')
	  .text('Points for this year(in %)');

	var fpw_circles = g1.selectAll('circle.firstPW').data(table)
						.enter().append('circle')
						.attr('class', 'firstPW')
						.attr('cy', row => yScale(row.player))
						.attr('cx', row => xScale(row.avg_fpw))
						.attr('r', 5)
						.style("fill", function(row){
					    	if (!(top_p.indexOf(row.player)===-1)) {
						    	return "#C21807";
						    }						    
					    })
						.style("opacity", function(row){
					    	if (!(top_p.indexOf(row.player)===-1)) {
						    	return "0.6";
						    }						    
					    })
						.style("stroke-width", function(row){
					    	if (!(top_p.indexOf(row.player)===-1)) {
						    	return "3px";
						    }						    
					    })
					    ;



	var spw_circles = g1.selectAll('circle.secondPW').data(table)
						.enter().append('circle')
						.attr('class', 'secondPW')
						.attr('cy', row => yScale(row.player))
						.attr('cx', row => xScale(row.avg_spw))
						.attr('r', 5)
						.style("fill", function(row){
					    	if (!(top_p.indexOf(row.player)===-1)) {
						    	return "#0080FF";
						    }						    
					    })
						.style("opacity", function(row){
					    	if (!(top_p.indexOf(row.player)===-1)) {
						    	return "0.6";
						    }						    
					    })
						.style("stroke-width", function(row){
					    	if (!(top_p.indexOf(row.player)===-1)) {
						    	return "3px";
						    }						    
					    })
						;	

};


function radar_graph(avg_top_p_details,top_p){
	var r_canvas = document.getElementById("r_chart");

	var top_data = {
	  labels: ["First Serve(%)", "First Point Won(%)", "Second Point Won(%)", "Break(%)", "Return(%)", "Net(%)"],
	  datasets: [
	  {
	    label: top_p[0],
	    backgroundColor: "rgba(200,0,0,0.2)",
	    borderColor: "rgba(200,0,0,0.4)",
	    fill: true,
	    pointRadius: 6,
	    pointBorderWidth: 3,
	    pointBackgroundColor: "red",
	    pointBorderColor: "rgba(0,0,0,0.6)",
	    pointHoverRadius: 15,
	    data: [avg_top_p_details[top_p[0]]["firstServe1%"], avg_top_p_details[top_p[0]]["firstPointWon1%"], avg_top_p_details[top_p[0]]["secPointWon1%"], avg_top_p_details[top_p[0]]["break1%"], avg_top_p_details[top_p[0]]["return1%"], avg_top_p_details[top_p[0]]["net1%"]]
	  },
	  {
	    label: top_p[1],
	    backgroundColor: "rgba(0,200,0,0.2)",
	    borderColor: "rgba(0,200,0,0.4)",
	    fill: true,
	    pointRadius: 6,
	    pointBorderWidth: 3,
	    pointBackgroundColor: "green",
	    pointBorderColor: "rgba(0,0,0,0.6)",
	    pointHoverRadius: 15,
	    data: [avg_top_p_details[top_p[1]]["firstServe1%"], avg_top_p_details[top_p[1]]["firstPointWon1%"], avg_top_p_details[top_p[1]]["secPointWon1%"], avg_top_p_details[top_p[1]]["break1%"], avg_top_p_details[top_p[1]]["return1%"], avg_top_p_details[top_p[1]]["net1%"]]
	  },
	  {
	    label: top_p[2],
	    backgroundColor: "rgba(0,0,200,0.2)",
	    borderColor: "rgba(0,0,200,0.4)",
	    fill: true,
	    pointRadius: 6,
	    pointBorderWidth: 3,
	    pointBackgroundColor: "blue",
	    pointBorderColor: "rgba(0,0,0,0.6)",
	    pointHoverRadius: 15,
	    data: [avg_top_p_details[top_p[2]]["firstServe1%"], avg_top_p_details[top_p[2]]["firstPointWon1%"], avg_top_p_details[top_p[2]]["secPointWon1%"], avg_top_p_details[top_p[2]]["break1%"], avg_top_p_details[top_p[2]]["return1%"], avg_top_p_details[top_p[2]]["net1%"]]
	  },
	  {
	    label: top_p[3],
	    backgroundColor: "rgba(0,0,0,0.2)",
	    borderColor: "rgba(0,0,0,0.4)",
	    fill: true,
	    pointRadius: 6,
	    pointBorderWidth: 3,
	    pointBackgroundColor: "white",
	    pointBorderColor: "rgba(0,0,0,0.6)",
	    pointHoverRadius: 15,
	    data: [avg_top_p_details[top_p[3]]["firstServe1%"], avg_top_p_details[top_p[3]]["firstPointWon1%"], avg_top_p_details[top_p[3]]["secPointWon1%"], avg_top_p_details[top_p[3]]["break1%"], avg_top_p_details[top_p[3]]["return1%"], avg_top_p_details[top_p[3]]["net1%"]]
	  }
	  ]
	};

	var r_options = {
	    legend: {
	    position: 'bottom'
	  }
	};

	  top_radar = new Chart(r_canvas, {
	  type: 'radar',
	  data: top_data,
	  options: r_options
	});

}

function display_player(top_p){
	document.querySelector('#player1').style.backgroundImage ="url('./players/" + top_p[0]+".png')"
	document.querySelector('#player2').style.backgroundImage ="url('./players/" + top_p[1]+".png')"
	document.querySelector('#player3').style.backgroundImage ="url('./players/" + top_p[2]+".png')"
	document.querySelector('#player4').style.backgroundImage ="url('./players/" + top_p[3]+".png')"

	document.querySelector('#p1_name').innerHTML = top_p[0];
	document.querySelector('#p2_name').innerHTML = top_p[1];
	document.querySelector('#p3_name').innerHTML = top_p[2];
	document.querySelector('#p4_name').innerHTML = top_p[3];
}

scatter_graph(avg_pw_table, player_name);
radar_graph(avg_top_p_details,top_p);
display_player(top_p);