
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
}


// -------------_Testing----------------

let Graph1 = new Graph();
Graph1.addEdge('A','B',3);
Graph1.addEdge('A','C',3);
Graph1.addEdge('B','D',1);

let node1 = Graph1.getNode('A');
let node2 = Graph1.getNode('B');
let node3 = Graph1.getNode('C');
let node4 = Graph1.getNode('D');

let testBFS = breadthFirstSearch(node1,node4,Graph1);
console.log("Path: " + testBFS);
let  testLowestValue = findPathLowestValue(testBFS,Graph1);
console.log("LowValue: " + testLowestValue);

console.log("Original values: ");
console.log("Node1: " + node1.adjacent['B'].flow + "Capacity: " + node1.adjacent['B'].capacity);
console.log("Node2: " + node2.adjacent['A'].flow + "Capacity: " + node2.adjacent['A'].capacity);
console.log("Node2: " + node2.adjacent['D'].flow + "Capacity: " + node2.adjacent['D'].capacity);
console.log("Node4: " + node4.adjacent['B'].flow + "Capacity: " + node4.adjacent['B'].capacity);

let testUpdate = updatePathFlowValue(testBFS,Graph1,testLowestValue);

console.log("Node1: " + node1.adjacent['B'].flow + "Capacity: " + node1.adjacent['B'].capacity);
console.log("Node2: " + node2.adjacent['A'].flow + "Capacity: " + node2.adjacent['A'].capacity);
console.log("Node2: " + node2.adjacent['D'].flow + "Capacity: " + node2.adjacent['D'].capacity);
console.log("Node4: " + node4.adjacent['B'].flow + "Capacity: " + node4.adjacent['B'].capacity);