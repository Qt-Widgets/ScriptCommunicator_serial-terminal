﻿/*************************************************************************
This worker script (worker scripts can be added in the script window) demonstrates the usage of the script plot window class.
***************************************************************************/
//The plot window is closed.
function plotWindowClosedSlot()
{
	scriptThread.stopScript()
}

var x = 0;
var y = 0;
var i = 0;
function timeout() 
{
	//add points to the graphs

	x++;
	y++;
	plotWindow.addDataToGraph(plotWindowGraph1Index,  x,  y);
	plotWindow.addDataToGraph(plotWindowGraph2Index,  x + 10,  y);
	
	plotWindow2.addDataToGraph(plotWindow2Graph1Index,  x,  y);
	plotWindow2.addDataToGraph(plotWindow2Graph2Index,  x + 10,  y);
	
	if(y > 20)
	{
		y = 0;
	}
	
}

//Is called if the user clicks the button.
function clearButtonPressed()
{
	//Clear all data with removeDataRangeFromGraph.
	plotWindow.removeDataRangeFromGraph(plotWindowGraph1Index, 0, x);
	plotWindow.removeDataRangeFromGraph(plotWindowGraph2Index, 0, x + 10);

	//Clear all data with clearGraphs.
	plotWindow2.clearGraphs();
	
	x = 0;
	y = 0;
}
function plotWindowMousePress(xValue, yValue, button)
{
	scriptThread.appendTextToConsole('plotWindowMousePress: ' + xValue + ", " + yValue + ", " + button);
}
function plotWindow2MousePress(xValue, yValue, button)
{
	scriptThread.appendTextToConsole('plotWindow2MousePress: ' + xValue + ", " + yValue + ", " + button);
}

scriptThread.appendTextToConsole('script plot window started ');


//create and configure plot window 1
var plotWindow = scriptThread.createPlotWindow();
plotWindow.setWindowTitle("plot window created/used by script");
plotWindow.setAxisLabels("x axis plot 1", "y axis plot 1");
plotWindow.showLegend(true);
plotWindow.setInitialAxisRanges(50, 0, 30);
var plotWindowGraph1Index = plotWindow.addGraph("blue", "solid", "graph 1");
plotWindow.setScatterStyle(plotWindowGraph1Index, "Cross", 5);
plotWindow.setLineStyle(plotWindowGraph1Index, "None");

var plotWindowGraph2Index = plotWindow.addGraph("red", "solid", "graph 2");
plotWindow.showHelperElements(true, true, true, true, true, true, true, 80, true);
plotWindow.show();
plotWindow.clearButtonPressedSignal.connect(clearButtonPressed)
plotWindow.closedSignal.connect(plotWindowClosedSlot)
plotWindow.setMaxDataPointsPerGraph(1000000);
plotWindow.setUpdateInterval(100);
plotWindow.plotMousePressSignal.connect(plotWindowMousePress)


//create and configure plot window 2
var plotWindow2 = scriptThread.createPlotWindow();
plotWindow2.setWindowTitle("plot window created/used by script");
plotWindow2.setAxisLabels("x axis plot 2", "y axis plot 2");
plotWindow2.showLegend(true);
plotWindow2.setInitialAxisRanges(50, 0, 30);
var plotWindow2Graph1Index = plotWindow2.addGraph("green", "solid", "graph 1");
plotWindow2.setScatterStyle(plotWindow2Graph1Index, "Circle", 5);
plotWindow2.setLineStyle(plotWindow2Graph1Index, "None");

var plotWindow2Graph2Index = plotWindow2.addGraph("black", "dot", "graph 2");
plotWindow2.showHelperElements(true, true, true, true, true, true, true, 80, true);
plotWindow2.show();
plotWindow2.closedSignal.connect(plotWindowClosedSlot)
plotWindow2.clearButtonPressedSignal.connect(clearButtonPressed)
plotWindow2.setMaxDataPointsPerGraph(1000000);
plotWindow2.setUpdateInterval(100);
plotWindow2.plotMousePressSignal.connect(plotWindow2MousePress)


//get the window positon and size of the two plot windows.
var plot1PositionAndSizelist = plotWindow.windowPositionAndSize().split(",");
var plot2PositionAndSizelist = plotWindow2.windowPositionAndSize().split(",");

//move plot window 2 to the left side of plot window 1
plot2PositionAndSizelist[0] = (plot1PositionAndSizelist[0] - plot1PositionAndSizelist[2] - 10).toString();
var string =  plot2PositionAndSizelist[0] + "," + plot2PositionAndSizelist[1] + "," + plot2PositionAndSizelist[2] + "," + plot2PositionAndSizelist[3];
plotWindow2.setWindowPositionAndSize(string);

//start the periodically timer which calls the function timeout
var timer = scriptThread.createTimer()
timer.timeoutSignal.connect(timeout);
timer.start(100);



