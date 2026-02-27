// transformNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'uppercase');

  const handles = [
    { type: 'target', position: Position.Left, id: 'input' },
    { type: 'source', position: Position.Right, id: 'output' },
  ];

  return (
    <BaseNode id={id} title="Transform" handles={handles}>
      <label>
        Operation:
        <select value={operation} onChange={(e) => setOperation(e.target.value)}>
          <option value="uppercase">Uppercase</option>
          <option value="lowercase">Lowercase</option>
          <option value="trim">Trim</option>
          <option value="reverse">Reverse</option>
          <option value="capitalize">Capitalize</option>
        </select>
      </label>
    </BaseNode>
  );
};
