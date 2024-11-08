import * as fs from 'fs';

// Define the Node interface
interface Node {
    parentId: number | null;
    code: string;
    displayName: string;
    memberCount: number;
    children: Node[];
    id: number;
}

// Function to generate fake data
function generateData(totalItems: number): Node {
    const rootNode: Node = {
        parentId: null,
        code: '00001',
        displayName: 'Root',
        memberCount: 0,
        children: [],
        id: 1,
    };

    // Use a queue to track nodes currently being processed
    const queue: Node[] = [rootNode];
    let idCounter = 2; // Start at 2 because the root has id 1

    while (idCounter <= totalItems) {
        // Remove a node from the queue
        const currentNode = queue.shift();
        if (!currentNode) break; // Exit if there are no nodes to process

        // Generate a random number of children (1 to 3)
        const numberOfChildren = Math.floor(Math.random() * 3) + 1;

        for (let i = 0; i < numberOfChildren && idCounter <= totalItems; i++) {
            // Create a new child node
            const childNode: Node = {
                parentId: currentNode.id,
                code: `00001.${String(idCounter).padStart(5, '0')}`,
                displayName: `Item ${idCounter}`,
                memberCount: Math.floor(Math.random() * 10),
                children: [],
                id: idCounter++,
            };

            // Add the child node to the children of the current node
            currentNode.children.push(childNode);
            // Add the child node to the queue for further processing
            queue.push(childNode);
        }
    }

    return rootNode;
}

// Main function to execute data generation
function main() {
    const totalItems = 50000; // Total number of items to generate
    const fakeData = generateData(totalItems); // Generate data

    // Write generated data to a JSON file
    const filePath = 'fakeData.json'; // Output file name
    fs.writeFileSync(filePath, JSON.stringify(fakeData, null, 2)); // Write generated data to a file
    console.log(`The file ${filePath} was successfully created and contains ${totalItems} items.`);
}

// Execute the main function
main();
