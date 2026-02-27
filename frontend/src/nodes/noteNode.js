// noteNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const NoteNode = ({ id, data }) => {
  const [content, setContent] = useState(data?.content || 'Add a note...');
  const [color, setColor] = useState(data?.color || '#fff9c4');

  return (
    <BaseNode id={id} title="Note" handles={[]} style={{ backgroundColor: color, borderColor: '#e6d54d' }}>
      <textarea
        className="text-node-textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={2}
        style={{ backgroundColor: 'transparent' }}
      />
      <label>
        Color:
        <select value={color} onChange={(e) => setColor(e.target.value)}>
          <option value="#fff9c4">Yellow</option>
          <option value="#c8e6c9">Green</option>
          <option value="#bbdefb">Blue</option>
          <option value="#ffccbc">Orange</option>
          <option value="#f8bbd0">Pink</option>
        </select>
      </label>
    </BaseNode>
  );
};
