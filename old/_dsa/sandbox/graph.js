/**
 * Graphs can be represented using,
 *  - adjacent matrix
 *  - adjacent list
 *
 * There are 2 popular types of graphs
 *  - directed
 *  - undirected
 *
 * Other types
 *  - weighted
 *  - cyclic, etc
 *
 * Terms related to graph
 *  - Vertex means Node
 *  - Edge means connection between 1 Vertex to other Vertex
 */

class Graph {
  constructor() {
    this.adjacentList = {};
  }

  addVertex(vertex) {
    if (!this.adjacentList[vertex]) {
      this.adjacentList[vertex] = new Set();
    }
  }

  addEdge() {}
  removeEdge(vertex1, vertex2) {
    this.adjacentList[vertex1].delete(vertex2);
    this.adjacentList[vertex2].delete(vertex1);
  }

  /**
   * 1 check if vertex exist
   * 2 remove the edge bwt these vertex
   * 3 delete the vertex
   */
  removeVertex(vertex) {
    if (!this.adjacentList[vertex]) return null;
    for (let adjacentVertex of this.adjacentList[vertex]) {
      this.removeEdge(adjacentVertex, vertex);
    }
    delete this.adjacentList[vertex];
  }

  hasEdge(vertex1, vertex2) {
    return (
      this.adjacentList[vertex1].has(vertex2) &&
      this.adjacentList[vertex2].has(vertex1)
    );
  }
  display() {}
}
