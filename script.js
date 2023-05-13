let maximumFlow = 0;

function createNode(name,type,ableToReachNodes,visitedTo){

    let node = {
        name: name,
        type: type,
        ableToReachNodes: ableToReachNodes,
        visitedTo: visitedTo
    };
    return node;
};

let Node1 = createNode("Node1","source");
let Node2 = createNode("Node2","node");
let Node3 = createNode("Node3","node");
let Node4 = createNode("Node4","destination",[]);
let Node5 = createNode("Node5","node");
let Node6 = createNode("Node6","node");
let Node7 = createNode("Node7","node");
let Node8 = createNode("Node8","node");

Node1.ableToReachNodes = [[Node3,10,0],[Node2,10,0]];
Node2.ableToReachNodes = [[Node3,5,0]];
Node3.ableToReachNodes = [[Node4,7,0],[Node6,10,0]];
Node6.ableToReachNodes = [[Node4,10,0],[Node8,9,0]];
Node7.ableToReachNodes = [[Node8,10,0]];
Node8.ableToReachNodes = [[Node7,10,0]];

function breadthFirstSearch(startNode, endNode){
    let queue = [];
    let visited = [];
    queue.push(startNode);
    while(queue.length > 0){
        let node = queue.shift();
        if(node.name == endNode.name){
            return true;
        }
        if(!visited.includes(node.name)){
            visited.push(node.name);
            for(let i = 0; i < node.ableToReachNodes.length; i++){
                let nextNode = node.ableToReachNodes[i][0];
                if (!visited.includes(nextNode) && !queue.includes(nextNode)) {
                    queue.push(nextNode);
                }
            }
        }
    }
    return visited;
};

function checkIfNodeCanTravel(node){

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

console.log(breadthFirstSearch(Node1,Node5));
console.log("can travel: ");
console.log(checkIfNodeCanTravel(Node6));
console.log(findPathNodeIndex([Node1,Node2,Node3,Node6,Node8]));

console.log(findPathLowestValue([Node1,Node2,Node3,Node6,Node8],findPathNodeIndex([Node1,Node2,Node3,Node6,Node8])));