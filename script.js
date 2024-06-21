document.getElementById('csvFile').addEventListener('change', function(e) {
  var file = e.target.files[0];
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(e) {
      var contents = e.target.result;
      processData(contents); // Process CSV data
  };
  reader.readAsText(file);
});

// Function to process CSV data
function processData(csvData) {
  var lines = csvData.split('\n');
  var data = [];
  var headers = lines[0].split(','); // Assuming headers are in the first line

  for (var i = 1; i < lines.length; i++) {
      var values = lines[i].split(',');
      if (values.length === headers.length) {
          var entry = {};
          for (var j = 0; j < headers.length; j++) {
              entry[headers[j].trim()] = values[j].trim();
          }
          data.push(entry);
      }
  }

  // Save data array to use for searching later
  window.csvData = data;
  window.csvHeaders = headers;
  console.log(window.csvData);  // Debugging: print the data to the console
}

// Function to handle search button click
function searchICSCode() {
  var searchInput = document.getElementById('searchInput').value.trim();
  var resultsList = document.getElementById('resultsList');
  var resultsList2 = document.getElementById('resultsList2');
  var resultsList3 = document.getElementById('resultsList3'); // Program Name select element
  var resultsList4 = document.getElementById('resultsList4');
  var resultsList5 = document.getElementById('resultsList5');
  var resultsList6 = document.getElementById('resultsList6');
  var resultsList7 = document.getElementById('resultsList7');
  var resultsList8 = document.getElementById('resultsList8');
  // Clear previous results
  resultsList.innerHTML = '';
  resultsList2.innerHTML = '';
  resultsList3.innerHTML = '';
  resultsList4.innerHTML = '';
  resultsList5.innerHTML = '';
  resultsList6.innerHTML = '';
  resultsList7.innerHTML = '';
  resultsList8.innerHTML = '';

  if (!window.csvData) {
    alert('No CSV data available.');
    return;
  }

  // Search for ICS Code
  var foundIndex = -1;
  for (var i = 0; i < window.csvData.length; i++) {
    if (window.csvData[i]['ICS Code'] === searchInput ||
        window.csvData[i]['Part Name'] === searchInput ||
        window.csvData[i]['Program Name'] === searchInput ||
        window.csvData[i]['Line No.'] === searchInput ||
        window.csvData[i]['Machine No.'] === searchInput ||
        window.csvData[i]['P.No'] === searchInput ||
        window.csvData[i]['No. Points'] === searchInput ||
        window.csvData[i]['Feeder Type'] === searchInput) {
        
      foundIndex = i;
      break;
    }
  }

  if (foundIndex !== -1) {
    // Display ICS Code in resultsList
    var option = document.createElement('option');
    option.text = window.csvData[foundIndex]['ICS Code'];
    resultsList.add(option);

    // Display Part Name in resultsList2
    var partName = window.csvData[foundIndex]['Part Name'];
    var option2 = document.createElement('option');
    option2.text = partName;
    resultsList2.add(option2);

    // Display Program Name in resultsList3
    var programName = window.csvData[foundIndex]['Program Name'];
    var option3 = document.createElement('option');
    option3.text = programName;
    resultsList3.add(option3);

    var programName = window.csvData[foundIndex]['Feeder Type'];
    var option4 = document.createElement('option');
    option4.text = programName;
    resultsList4.add(option4);

    var programName = window.csvData[foundIndex]['Line No.'];
    var option5 = document.createElement('option');
    option5.text = programName;
    resultsList5.add(option5);

    var programName = window.csvData[foundIndex]['Machine No.'];
    var option6 = document.createElement('option');
    option6.text = programName;
    resultsList6.add(option6);

    var programName = window.csvData[foundIndex]['P.No'];
    var option7 = document.createElement('option');
    option7.text = programName;
    resultsList7.add(option7);

    var programName = window.csvData[foundIndex]['No. Points'];
    var option8 = document.createElement('option');
    option8.text = programName;
    resultsList8.add(option8);


  } else {
    alert('ICS Code not found.');
  }
}