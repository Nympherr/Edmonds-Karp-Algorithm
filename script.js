function createNode(name,type,ableToReachNodes){

    let node = {
        name: name,
        type: type,
        ableToReachNodes: ableToReachNodes,
    };
    return node;
};

let Node1 = createNode("Node1","source");
let Node2 = createNode("Node2","node");
let Node3 = createNode("Node3","node");
let Node4 = createNode("Node4","destination",[]);
let Node5 = createNode("Node5","node",[]);
let Node6 = createNode("Node6","node");
let Node7 = createNode("Node7","node");
let Node8 = createNode("Node8","node");

Node1.ableToReachNodes = [[Node2,10,0],[Node3,10,0]];
Node2.ableToReachNodes = [[Node3,5,0]];
Node3.ableToReachNodes = [[Node4,7,0],[Node6,10,0]];
Node6.ableToReachNodes = [[Node4,5,0],[Node8,7,0]];
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

console.log(breadthFirstSearch(Node1,Node5));