var Viva = require("vivagraphjs")
var g = require('./graph')
var data = g.graph;
var sel = g.selected
var container;
function main(document) {
    container = document.body
    var graph = Viva.Graph.graph();
    var graphText = data.split("\n")
    for(var gt in graphText){
        if(graphText[gt].length > 0){
            var node = graphText[gt].split(":")[0]
            graph.addNode(parseInt(node), {selected:sel.indexOf(parseInt(node)) > -1 ? true : false})
            var adj = graphText[gt].split(":")[1].split(",")
            for (var ad in adj){
                if(adj[ad] > 0){
                    graph.addLink(parseInt(node), parseInt(adj[ad]));
                }
            }
        }
    }

    // first we generate DOM label for each graph node. Be cautious
    // here, since for large graphs with more than 1k nodes, this will
    // become a bottleneck.
    var domLabels = generateDOMLabels(graph);

    var layout = Viva.Graph.Layout.forceDirected(graph, {
        springLength : 900,
        springCoeff : 0.0000,
        dragCoeff : 0.00,
        gravity : 0
    });

    var graphics = Viva.Graph.View.webglGraphics();
    graphics
    .placeNode(function(ui, pos) {
        // This callback is called by the renderer before it updates
        // node coordinate. We can use it to update corresponding DOM
        // label position;

        // we create a copy of layout position
        var domPos = {
            x: pos.x,
            y: pos.y
        };
        // And ask graphics to transform it to DOM coordinates:
        graphics.transformGraphToClientCoordinates(domPos);

        // then move corresponding dom label to its own position:
        var nodeId = ui.node.id;
        var labelStyle = domLabels[nodeId].style;
        labelStyle.left = domPos.x + 'px';
        labelStyle.top = domPos.y + 'px';
    });

    var renderer = Viva.Graph.View.renderer(graph, {
            layout     : layout,
            graphics   : graphics,
            container  : container
        });

    renderer.run();

}
function generateDOMLabels(graph) {
    // this will map node id into DOM element
    var labels = Object.create(null);
    graph.forEachNode(function(node) {
        var label = document.createElement('span');
        console.log(node.data.selected)
        if(node.data.selected){
            label.classList.add('node-label-selected');
        }else{
            label.classList.add('node-label');
        }
        label.innerText = node.id;
        labels[node.id] = label;
        container.appendChild(label);
    });
    // NOTE: If your graph changes over time you will need to
    // monitor graph changes and update DOM elements accordingly
    return labels;
}
exports.main = main