int width = 1200;
int height = 800;
int depth = 100;
int numNodes = 10;
ArrayList<PVector> nodeList;

ArrayList<PVector> initNodes(int numNodes) {
    ArrayList<PVector> newNodeList = new ArrayList<PVector>();
    for (int i = 0; i < numNodes; i++) {
        newNodeList.add(new PVector(random(width), random(height), random(depth)));
    };
    return newNodeList;
}

void drawNodes() {
    for (PVector node : nodeList) {
        ellipse(node.x, node.y, 5, 5);
    }
}

void setup() {
    nodeList = initNodes(numNodes);
    size(1200, 800, P3D);
    background(31);
    stroke(20);
    strokeWeight(3);
}

void draw() {
    background(31);
    drawNodes();
}
