// mergeNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const MergeNode = ({ id, data }) => {
  const [strategy, setStrategy] = useState(data?.strategy || 'concat');

  const handles = [
    { type: 'target', position: Position.Left, id: 'input-a', style: { top: '33%' } },
    { type: 'target', position: Position.Left, id: 'input-b', style: { top: '66%' } },
    { type: 'source', position: Position.Right, id: 'output' },
  ];

  return (
    <BaseNode id={id} title="Merge" handles={handles}>
      <label>
        Strategy:
        <select value={strategy} onChange={(e) => setStrategy(e.target.value)}>
          <option value="concat">Concatenate</option>
          <option value="interleave">Interleave</option>
          <option value="override">Override (B)</option>
        </select>
      </label>
    </BaseNode>
  );
};
