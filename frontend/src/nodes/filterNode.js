// filterNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'contains');
  const [value, setValue] = useState(data?.value || '');

  const handles = [
    { type: 'target', position: Position.Left, id: 'input' },
    { type: 'source', position: Position.Right, id: 'true', style: { top: '33%' } },
    { type: 'source', position: Position.Right, id: 'false', style: { top: '66%' } },
  ];

  return (
    <BaseNode id={id} title="Filter" handles={handles}>
      <label>
        Condition:
        <select value={condition} onChange={(e) => setCondition(e.target.value)}>
          <option value="contains">Contains</option>
          <option value="equals">Equals</option>
          <option value="startsWith">Starts With</option>
          <option value="endsWith">Ends With</option>
        </select>
      </label>
      <label>
        Value:
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      </label>
    </BaseNode>
  );
};
