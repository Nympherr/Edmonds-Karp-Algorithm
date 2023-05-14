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


function breadthFirstSearch(startNode, endNode){
    let queue = [];
    let visited = [];
    let predecessor = {};

    if(checkIfNodeCanTravelGeneral(startNode) == true){
    queue.push(startNode);
    visited.push(startNode.name);
    }
    else{ return false; }

    while(queue.length > 0){

        let node = queue.shift();

        if(node.name == endNode.name){
            let path = [];
            while(node != null){
                path.unshift(node);
                node = predecessor[node.name];
            }
            return path; // path from startNode to endNode
        }

            for(let i = 0; i < node.ableToReachNodes.length; i++){

                let nextNode;
                if(checkIfNodeCanTravelParticular(node,i) == true){
                    nextNode = node.ableToReachNodes[i][0];
                }
                else{ continue; }

                if (!visited.includes(nextNode.name)) {
                    let canTravel = true;
                    let pred = predecessor[node.name];
                    while(pred != null){
                        let index = pred.ableToReachNodes.findIndex(n => n[0].name == node.name);
                        if(index != -1 && pred.ableToReachNodes[index][1] <= 0){
                            canTravel = false;
                            break;
                        }
                        pred = predecessor[pred.name];
                    }
                    if(canTravel){
                        predecessor[nextNode.name] = node;
                        queue.push(nextNode);
                        visited.push(nextNode.name);
                    }
                }
        }
    }
    return false;
};

function checkIfNodeCanTravelParticular(node,index){

    if(node.ableToReachNodes[index][1] > 0){ return true; }
    else{ return false; }

}

function checkIfNodeCanTravelGeneral(node){

    let canTravel = false;

    for(let i=0; i < node.ableToReachNodes.length ; i++){

        if(node.ableToReachNodes[i][1] > 0){
            canTravel = true;
            return canTravel;
        }
    }

    return canTravel;
}

// Because nodes have other reachable nodes sometimes in a path you may not know
// from which node your node came from. This function will return a correct index
// for every node in a path so that it would know with which flow value to work
function findPathNodeIndex(nodePathArray){

    let indexArray = [];

    // checks the current node
    for(let i = 0; i < nodePathArray.length - 1 ; i++){

        // checks current node's all reachable nodes
        for(let j = 0; j < nodePathArray[i].ableToReachNodes.length ; j++){

                // checks at which index names are same
                if(nodePathArray[i].ableToReachNodes[j][0].name == nodePathArray[i + 1].name){
                    indexArray.push(j);
                }
        }
    }
    return indexArray;
}

function findPathLowestValue(nodePathArray,index){

    let lowestValue = nodePathArray[0].ableToReachNodes[0][1];

    for(let i = 1; i < nodePathArray.length - 1; i++){
        if(nodePathArray[i].ableToReachNodes[index[i]][1] < lowestValue){
            lowestValue = nodePathArray[i].ableToReachNodes[index[i]][1];
        }
    }
    return lowestValue;
}

function updateFlowValue(nodePathArray,index,lowestValue){
    
        for(let i = 0; i < nodePathArray.length - 1; i++){
            nodePathArray[i].ableToReachNodes[index[i]][1] -= lowestValue;
            nodePathArray[i].ableToReachNodes[index[i]][2] += lowestValue;
        }
        maximumFlow += lowestValue;
}

function programStart(startNode,endNode){

    let status = true;

    while(status == true){
        let path = breadthFirstSearch(startNode,endNode);
        if(path == false){
            status = false;
            console.log("Maximum flow: " + maximumFlow);
        }
        else{
            let index = findPathNodeIndex(path);
            let lowestValue = findPathLowestValue(path,index);
            updateFlowValue(path,index,lowestValue);
        }
    }
}

//------------------Testing------------------//

// Try #1

// let Node1 = createNode("Node1","source");
// let Node2 = createNode("Node2","node");
// let Node3 = createNode("Node3","node");
// let Node4 = createNode("Node4","destination",[]);

// Node1.ableToReachNodes = [[Node2,1000,0,1000],[Node3,1000,0,1000]];
// Node2.ableToReachNodes = [[Node4,500,0,500]];
// Node3.ableToReachNodes = [[Node4,500,0,500]];

// Try #2

// let Node1 = createNode("Node1","source");
// let Node2 = createNode("Node2","node");
// let Node3 = createNode("Node3","node");
// let Node4 = createNode("Node4","node");
// let Node5 = createNode("Node5","node");
// let Node6 = createNode("Node6","node");
// let Node7 = createNode("Node7","destination",[]);

// Node1.ableToReachNodes = [[Node2,8,0,8],[Node3,8,0,8],[Node4,8,0,8]];
// Node2.ableToReachNodes = [[Node3,6,0,6],[Node5,4,0,4]];
// Node3.ableToReachNodes = [[Node4,4,0,4],[Node6,6,0,6]];
// Node4.ableToReachNodes = [[Node5,7,0,7],[Node7,6,0,6]];
// Node5.ableToReachNodes = [[Node7,5,0,5]];
// Node6.ableToReachNodes = [[Node7,7,0,7]];

// Try #3

// let Node1 = createNode("Node1","source");
// let Node2 = createNode("Node2","node");
// let Node3 = createNode("Node3","node");
// let Node4 = createNode("Node4","node");
// let Node5 = createNode("Node5","node");
// let Node6 = createNode("Node6","node");
// let Node7 = createNode("Node7","node");
// let Node8 = createNode("Node8","node");
// let Node9 = createNode("Node9","node");
// let Node10 = createNode("Node10","node");
// let Node11 = createNode("Node11","node");
// let Node12 = createNode("Node12","destination");

// Node1.ableToReachNodes = [[Node2,4,0,4],[Node3,5,0,5],[Node4,6,0,6],[Node5,7,0,7],[Node6,8,0,8]];
// Node2.ableToReachNodes = [[Node4,3,0,3],[Node9,5,0,5]];
// Node3.ableToReachNodes = [[Node8,9,0,9],[Node9,10,0,10],[Node11,4,0,4]];
// Node4.ableToReachNodes = [[Node5,7,0,7],[Node8,6,0,6],[Node10,4,0,4]];
// Node5.ableToReachNodes = [[Node3,5,0,5],[Node7,4,0,4]];
// Node6.ableToReachNodes = [[Node3,7,0,7],[Node7,4,0,4]];
// Node7.ableToReachNodes = [[Node10,8,0,8],[Node12,7,0,7]];
// Node8.ableToReachNodes = [[Node11,6,0,6],[Node12,5,0,5]];
// Node9.ableToReachNodes = [[Node10,4,0,4],[Node12,4,0,4]];
// Node10.ableToReachNodes = [[Node12,6,0,6]];
// Node11.ableToReachNodes = [[Node12,3,0,3]];


// programStart(Node1,Node12);