# d3-project2
Do a scatter plot to look at the relationship between temp and due point. The checklist we can use for all charts is:  

1. Access the data - look at data structures  
2. Create chart dims - pixes of space for chart  
3. Draw canvas - render the chart area and bounds element  
4. Create the scales  
5. Draw the data elements  
6. Draw peripherals - axis, labels, legend  
7. Setup interactions - event listeners (not done here)  


  // your code goes here
  // create our data accessor functions  
  // make a square chart, make it as large as possible but
  // keep it on the screen by getting either the height or 
  // width (which ever is the smaller one) and setting that
  // to 90% that way can ensure it will not go off the screen
  // We use the d3.min function to get this value it takes
  // an array of data points and an accessor funct
  // The default return function does the job here
  // square chart
  // set the wrapper and the bounds
  // larger bottom and left to create room for our axis
  // create the bounds in the space left after allowing for
  // margins
  // left margin moves box to the right and the top
  // margin pushes it down so it sits inside the wrapper
  // within the margins
  //console.log(xScale.domain())
  // [-7.22, 73.83]
  // xScale.nice()
  // console.log(xScale.domain())
  // [-10, 80]
  // dim.boundedHeight so axis runs bottom to top
  // create a variable to store our dots
  // if dots were already plotted this selection would 
  // also update those
  // When we call data we join our selection to the datapoints
  // The selection will have a list of existing points, new
  // elements that need to be added, and old ones that need
  // to be removed
  // Our selection gets a _entry key that lists upcoming data
  // _exit key lists any datapoints already drawn that are
  // not in the udpated data set
// color dots based on cloud cover
  // xscale
