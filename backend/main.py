from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Pipeline(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)

    # Check if graph is a DAG using topological sort (Kahn's algorithm)
    adj = {node['id']: [] for node in pipeline.nodes}
    in_degree = {node['id']: 0 for node in pipeline.nodes}

    for edge in pipeline.edges:
        source = edge.get('source')
        target = edge.get('target')
        if source in adj and target in adj:
            adj[source].append(target)
            in_degree[target] += 1

    # Kahn's algorithm
    queue = [node_id for node_id, deg in in_degree.items() if deg == 0]
    visited_count = 0

    while queue:
        current = queue.pop(0)
        visited_count += 1
        for neighbor in adj[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    is_dag = visited_count == num_nodes

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag,
    }
