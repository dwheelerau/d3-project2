async function drawScatter() {
  // your code goes here
  const dataset = await d3.json('../../my_weather_data.json')
  console.table(dataset[0])

  // create our data accessor functions  
  const xAccessor = d => d.dewPoint
  const yAccessor = d => d.humidity
  // make a square chart, make it as large as possible but
  // keep it on the screen by getting either the height or 
  // width (which ever is the smaller one) and setting that
  // to 90% that way can ensure it will not go off the screen
  // We use the d3.min function to get this value it takes
  // an array of data points and an accessor funct
  // The default return function does the job here
  const width = d3.min([
    window.innerWidth * 0.9,
    window.innerHeight * 0.9,
  ])
  // square chart
  // set the wrapper and the bounds
  // larger bottom and left to create room for our axis
  let dimensions = {
    width: width,
    height: width,
    margin: {
      top: 10,
      right: 10,
      bottom: 50,
      left: 50,
    },
  }
  // create the bounds in the space left after allowing for
  // margins
  dimensions.boundedWidth = dimensions.width
     - dimensions.margin.left
     - dimensions.margin.right
  dimensions.boundedHeight = dimensions.height
     - dimensions.margin.top
     - dimensions.margin.bottom

  const wrapper = d3.select("#wrapper")
    .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
  // left margin moves box to the right and the top
  // margin pushes it down so it sits inside the wrapper
  // within the margins
  const bounds = wrapper.append("g")
      .style("transform", `translate(${
        dimensions.margin.left
      }px, ${
        dimensions.margin.top
      }px)`)

  //console.log(xScale.domain())
  // [-7.22, 73.83]
  // xScale.nice()
  // console.log(xScale.domain())
  // [-10, 80]

  const xScale = d3.scaleLinear()
      .domain(d3.extent(dataset, xAccessor))
      .range([0, dimensions.boundedWidth])      
      .nice()
  // dim.boundedHeight so axis runs bottom to top
  const yScale = d3.scaleLinear()
      .domain(d3.extent(dataset, yAccessor))
      .range([dimensions.boundedHeight, 0])      
      .nice()
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
  const colorAccessor = d => d.cloudCover
  const colorScale = d3.scaleLinear()
     .domain(d3.extent(dataset, colorAccessor))
     .range(["skyblue","darkslategrey"])

  const dots = bounds.selectAll("circle")
      .data(dataset)
    .enter()
    .append("circle")
      .attr("cx", d => xScale(xAccessor(d)))
      .attr("cy", d => yScale(yAccessor(d)))
      .attr("r", 5)
      .attr("fill", d => colorScale(colorAccessor(d)))
  // xscale
  const xAxisGenerator = d3.axisBottom()
    .scale(xScale)

  const xAxis = bounds.append("g")
    .call(xAxisGenerator)
      .style("transform", `translateY(
        ${dimensions.boundedHeight}px`)
  const xAxisLabel = xAxis.append("text")
      .attr("x", dimensions.boundedWidth / 2)
      .attr("y", dimensions.margin.bottom - 10)
      .attr("fill", "black")
      .style("font-size", "1.4em")
      .html("Dew point (&deg;F)")
  const yAxisGenerator = d3.axisLeft()
    .scale(yScale)
    .ticks(4)
  const yAxis = bounds.append("g")
      .call(yAxisGenerator)
  const yAxisLabel = yAxis.append("text")
      .attr("x", -dimensions.boundedHeight / 2) 
      .attr("y", -dimensions.margin.left + 10) 
      .attr("fill", "black")
      .style("font-size", "1.4em")
      .text("Relative humidity")
      .style("transform", "rotate(-90deg)")
      .style("text-anchor", "middle")
    }
drawScatter()
