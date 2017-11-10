var fs = require("fs")
var connectionChance
var amountOfNodes
var graph

function determineConnections(current){
     for(var i = 1; i <= amountOfNodes; i++){
        if(i != current){
            var chance = Math.random()
            if(chance < connectionChance){
                graph += `${i},`
            }
        }
    }
}

function constructGraph(){
    for(var i = 1; i < amountOfNodes; i++){
        graph += `${i}: `
        determineConnections(i)
        graph += "\n"
    }
}


function main(){
    amountOfNodes = 20
    connectionChance = 0.1
    var numberOfGraphs = 20
    for(var i = 0; i < numberOfGraphs; i++){
        graph = ""
        constructGraph()
        fs.writeFile(`customGraph-${i}.txt`,graph,(err) => {
            if (err) console.log("oops!", err)
        })
    }
}
main()