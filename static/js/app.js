console.log(message)
// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = d3.select("metadata");

    // Filter the metadata for the object with the desired sample number
    function checkNumber(number) {
      return number.id === sample;
    }
    let desiredObject = metadata.filter(checkNumber);

    // Use d3 to select the panel with id of `#sample-metadata`
    let sampleMetadata = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    sampleMetadata.html("")

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    for (let i in desiredObject) {
      sampleMetadata.html(i).append("p")
    }
    console.log(data);
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samplesList = d3.select("samples");

    // Filter the samples for the object with the desired sample number
    function checkNumber(number) {
      return number.id === sample;
    }
    let desiredObject = samplesList.filter(checkNumber);

    // Get the otu_ids, otu_labels, and sample_values
    let otuIDs = desiredObject.otu_ids;
    let otuLabels = desiredObject.otu_labels;
    let sampleValues = desiredObject.sample_values;

    // Build a Bubble Chart
    let bubbleChart = {
      x: otuIDs,
      y: sampleValues,
      mode: 'markers',
      marker: {
      size: sampleValues,
      color: otuIDs,
      text: otuLabels
      }
    };

    let layoutBubble = {
      title: `Bacteria Cultures Per Sample`
    };

    // Render the Bubble Chart
    Plotly.newPlot("bubbleChart", dataBubble, layoutBubble;

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let mapOTUIDs = otuIDs.map(function(item) {
      return item.toString();
    });

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let barChart = {
      x: sampleValues,
      y: mapOTUIDs,
      type: 'bar'
    };

    // Render the Bar Chart
    //let dataBar = [barChart];

    let layoutBar = {
      title: `Top 10 Bacteria Cultures Found`
    };

    Plotly.newPlot("barChart", dataBar, layoutBar);

    console.log(data);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = d3.select("names");

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdownMenu = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (let i in names) {
      dropdownMenu.html(i).append("p")
    }

    // Get the first sample from the list
    let first = names[0]

    // Build charts and metadata panel with the first sample
    buildMetadata(first)
    buildCharts(first)

    console.log(data);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildMetadata(newSample)
  buildCharts(newSample)
}

// Initialize the dashboard
init();
