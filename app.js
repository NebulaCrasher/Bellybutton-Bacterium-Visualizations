
const bellyButtons = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

function init(){
    // code that runs once (only on page load or refresh)

    let dropdown = document.getElementById('selDataset');
    // create dropdown/select
    d3.json(bellyButtons).then(function(data){
        console.log(data)
        for (let i = 0; i < data.names.length; i++) {
            option = document.createElement('option');
            option.text = data.names[i];
            dropdown.appendChild(option);
          }
    })

    // run functions to generate plots
    createScatter('940')
    createBar('940')
    createSummary('940')

}

// function that runs whenever the dropdown is changed
// this function is in the HTML and is called with an input called 'this.value'
// that comes from the select element (dropdown)
function optionChanged(newID){
    // code that updates graphics
    createScatter(newID)
    createBar(newID)
    createSummary(newID)
   
}

function createScatter(id){
    // code that makes scatter plot at id='bubble'
    let otuIDs =[];
    let otuColors = [];
    let sampleValues = [];
    let otuLabels = [];
    d3.json(bellyButtons).then(function(data){
        for (let i = 0; i < data.samples.length; i++){
            if(id === data.samples[i].id){
                for(let j =0; j < data.samples[i].sample_values.length; j++){
                    otuIDs.push(data.samples[i].otu_ids[j])
                    otuColors.push(data.samples[i].otu_ids[j])
                    sampleValues.push(data.samples[i].sample_values[j])
                    otuLabels.push(data.samples[i].otu_labels[j])
                }
            }
        }

        let scatterData = [
            {
            x:otuIDs,
            y:sampleValues,
            mode:'markers',
            marker: {size:sampleValues, color:otuColors},
            text:otuLabels
            }
        ];
        let layout = {title: "Bellybutton Samples Bubble Chart"};
        Plotly.newPlot("bubble", scatterData, layout)
        })
}

function createBar(id){
    // code that makes bar chart at id='bar'
    let x = [];
    let y = [];
    let hoverText = [];
    d3.json(bellyButtons).then(function(data){
    for(let i = 0; i < data.samples.length; i++){
        if(id === data.samples[i].id){
            for(let j = 0; j < 10; j++){
                y.push(data.samples[i].otu_ids[j]);
                x.push(data.samples[i].sample_values[j]);
                hoverText.push(data.samples[i].otu_labels[j]);
            }
        }
    }
    for(let i = 0; i < y.length; i++){
        y[i] = "OTU-"+y[i] 
    }
 
    let graphData = [
        {
        x:x,
        y:y,
        mode:'markers',
        marker: {size:16},
        text:hoverText,
        type: 'bar',
        orientation: 'h'
        }
    ];
    let layout = {title: "Bellybutton Samples Bar Chart"};
    Plotly.newPlot("bar", graphData, layout)
    })

}

function createSummary(id){
    // code that makes list, paragraph, text/linebreaks at id='sample-meta'
    d3.json(bellyButtons).then(function(data){
        let demoList = "";
        let summaryTable = document.getElementById("sample-metadata")
        idType = Number(id)
        for(let i = 0; i < data.metadata.length; i++){
            let demoData = data.metadata[i]
            if(idType === demoData.id){
                for(let [key,value] of Object.entries(demoData)){
                    demoList += key + ":" + value + "<br>"
                }
            }
        };
        summaryTable.innerHTML = demoList;
    });
}

// function called, runs init instructions
// runs only on load and refresh of browser page
init()





// STRATEGIES
// 1.  Inside-Out:  Generate each chart by assuming an ID/name then refactor the code to 
//                  work for any ID/name coming from the function.  I typically do this practice.
// 2.  Outside-In:  Generate the control (dropdown) and how the control interacts with the other parts.
//                  I gave you the basics of how it interacts above.  You could generate the dropdown
//                  and then see in the console the ID/names update as you make a change.  Then you could
//                  make your chart code.

// Overall, the above are the two steps you need to do (1.  Make plots with data, 2. make dropdown that passes id to functions)
// You could do it in either order.