// submit.js

import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);

    const handleSubmit = async () => {
      try {
        const response = await fetch('http://localhost:8000/pipelines/parse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nodes, edges }),
        });

        const data = await response.json();

        alert(
          `Pipeline Analysis:\n\n` +
          `Nodes: ${data.num_nodes}\n` +
          `Edges: ${data.num_edges}\n` +
          `Is DAG: ${data.is_dag ? 'Yes' : 'No'}`
        );
      } catch (error) {
        alert('Error: Could not connect to the backend server. Make sure it is running on port 8000.');
      }
    };

    return (
        <div className="submit-bar">
            <button className="submit-button" type="button" onClick={handleSubmit}>
              Submit Pipeline
            </button>
        </div>
    );
};
