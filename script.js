
let maximumFlow = 0;

class Node {
    constructor(id){
        this.id = id;
        this.adjacent = {};
    }
}

class Graph{
    constructor(){
        this.nodes = [];
    }

    addNode(id){
        let node = new Node(id);
        this.nodes.push(node);
        return node;
    }

    getNode(id){
        return this.nodes.find(node => node.id == id);
    }

    addEdge(source, destination, capacity){

        let sourceNode = this.getNode(source) || this.addNode(source);
        let destinationNode = this.getNode(destination) || this.addNode(destination);

        sourceNode.adjacent[destination] = {
            capacity: capacity,
            flow: 0
        };
        destinationNode.adjacent[source] = {
            capacity: 0,
            flow: 0
        }; 
    }
}

function breadthFirstSearch(startNode,endNode, graph){
    let queue = [];
    let visited = new Set();  // changing to a Set for O(1) lookup
    let predecessor = {};

    if(checkIfNodeCanTravel(startNode, visited)){
        queue.push(startNode);
        visited.add(startNode.id);
    } else { 
        return false; 
    }

    while(queue.length > 0){
        let node = queue.shift();

        if(node.id == endNode.id){
            let path = [];
            let currentNode = endNode.id;
            while(currentNode != null){
                path.unshift(currentNode);
                currentNode = predecessor[currentNode];
            }
            return path;
        }

        for(let key in node.adjacent){
            if(!visited.has(key)){
                let neighbourNode = graph.getNode(key);
                if(node.adjacent[key].capacity > node.adjacent[key].flow || node.adjacent[key].flow < 0){
                    queue.push(neighbourNode);
                    visited.add(key);
                    predecessor[key] = node.id;
                }
            }
        }
    }
    return false;
}

function checkIfNodeCanTravel(node, visitedArray){

    for(let key in node.adjacent){
        let edge = node.adjacent[key];
        
        // For forward edges
        if (edge.capacity > 0 && edge.capacity > edge.flow && !visitedArray.has(key)) {
            return true;
        }
        // For reverse edges
        if (edge.capacity === 0 && edge.flow > 0 && !visitedArray.has(key)) {
            return true;
        }
    }
    return false;
}

function findPathLowestValue(path,graph){
    let lowestValue = Infinity;
    for(let i = 0; i < path.length - 1; i++){
        let nodeId = path[i];
        let nextNodeId = path[i+1];
        let node = graph.getNode(nodeId);
        let edge = node.adjacent[nextNodeId];
        let remainingCapacity = edge.capacity - edge.flow;
        if(remainingCapacity < lowestValue){
            lowestValue = remainingCapacity;
        }
    }
    return lowestValue;
}

function updatePathFlowValue(path,graph,lowestValue){

    for(let i = 0; i < path.length - 1; i++){

        let nodeId = path[i];
        let nextNodeId = path[i+1];
        let node = graph.getNode(nodeId);
        let nextNode = graph.getNode(nextNodeId);


        let edgeForward = node.adjacent[nextNodeId];
        let edgeBackward = nextNode.adjacent[nodeId];

        edgeForward.flow += lowestValue;
        edgeBackward.flow += lowestValue;
    }
    maximumFlow += lowestValue;
}

function startAlgorithm(graph, sourceId, destinationId) {

    let source = graph.getNode(sourceId);
    let destination = graph.getNode(destinationId);
    
    while (true) {
        let path = breadthFirstSearch(source, destination, graph);
        if (!path) {
            break;
        }
        
        let pathLowestValue = findPathLowestValue(path, graph);
        updatePathFlowValue(path, graph, pathLowestValue);
    }
    
    return maximumFlow;
}

// ----------------Testing----------------

// #1

// let Graph1 = new Graph();

// Graph1.addEdge('1','2',1000);
// Graph1.addEdge('1','3',1000);
// Graph1.addEdge('2','4',500);
// Graph1.addEdge('3','4',500);

// let node1 = Graph1.getNode('1');
// let node2 = Graph1.getNode('2');
// let node3 = Graph1.getNode('3');
// let node4 = Graph1.getNode('4');

// startAlgorithm(Graph1,'1','2');
// console.log("Maximum flow: " + maximumFlow);

// #2

// let Graph1 = new Graph();

// Graph1.addEdge('1','2',8);
// Graph1.addEdge('1','3',8);
// Graph1.addEdge('1','4',8);
// Graph1.addEdge('2','3',6);
// Graph1.addEdge('2','5',4);
// Graph1.addEdge('3','4',4);
// Graph1.addEdge('3','6',6);
// Graph1.addEdge('4','5',7);
// Graph1.addEdge('4','7',6);
// Graph1.addEdge('5','7',5);
// Graph1.addEdge('6','7',7);

// let node1 = Graph1.getNode('1');
// let node2 = Graph1.getNode('2');
// let node3 = Graph1.getNode('3');
// let node4 = Graph1.getNode('4');
// let node5 = Graph1.getNode('5');
// let node6 = Graph1.getNode('6');
// let node7 = Graph1.getNode('7');

// startAlgorithm(Graph1,'1','7');
// console.log("Maximum flow: " + maximumFlow);


// #3

let Graph1 = new Graph();

Graph1.addEdge('1','2',4);
Graph1.addEdge('1','3',5);
Graph1.addEdge('1','4',6);
Graph1.addEdge('1','5',7);
Graph1.addEdge('1','6',8);

Graph1.addEdge('2','4',3);
Graph1.addEdge('2','9',5);

Graph1.addEdge('3','8',9);
Graph1.addEdge('3','9',10);
Graph1.addEdge('3','11',4);

Graph1.addEdge('4','5',7);
Graph1.addEdge('4','8',6);
Graph1.addEdge('4','10',4);

Graph1.addEdge('5','3',5);
Graph1.addEdge('5','7',4);

Graph1.addEdge('6','3',7);
Graph1.addEdge('6','7',4);

Graph1.addEdge('7','10',8);
Graph1.addEdge('7','12',7);

Graph1.addEdge('8','11',6);
Graph1.addEdge('8','12',5);

Graph1.addEdge('9','10',4);
Graph1.addEdge('9','12',4);

Graph1.addEdge('10','12',6);

Graph1.addEdge('11','12',3);

let node1 = Graph1.getNode('1');
let node2 = Graph1.getNode('2');
let node3 = Graph1.getNode('3');
let node4 = Graph1.getNode('4');
let node5 = Graph1.getNode('5');
let node6 = Graph1.getNode('6');
let node7 = Graph1.getNode('7');
let node8 = Graph1.getNode('8');
let node9 = Graph1.getNode('9');
let node10 = Graph1.getNode('10');
let node11 = Graph1.getNode('11');
let node12 = Graph1.getNode('12');

startAlgorithm(Graph1,'1','12');
console.log("Maximum flow: " + maximumFlow);