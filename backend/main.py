from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
from collections import defaultdict, deque

app = FastAPI()

# Configure CORS - Production-ready
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

class Node(BaseModel):
    id: str
    type: str

class Edge(BaseModel):
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
async def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    
    # DAG Detection using Kahn's Algorithm (Topological Sort)
    def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
        if not nodes:
            return True
            
        # Build adjacency list and in-degree map
        graph = defaultdict(list)
        in_degree = {node.id: 0 for node in nodes}
        
        for edge in edges:
            graph[edge.source].append(edge.target)
            if edge.target in in_degree:
                in_degree[edge.target] += 1
        
        # Find all nodes with no incoming edges
        queue = deque([node_id for node_id in in_degree if in_degree[node_id] == 0])
        visited_count = 0
        
        # Process nodes with no incoming edges
        while queue:
            node = queue.popleft()
            visited_count += 1
            
            # Reduce in-degree for neighbors
            for neighbor in graph[node]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)
        
        # If we visited all nodes, it's a DAG
        return visited_count == num_nodes
    
    is_dag_result = is_dag(pipeline.nodes, pipeline.edges)
    
    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag_result
    }
