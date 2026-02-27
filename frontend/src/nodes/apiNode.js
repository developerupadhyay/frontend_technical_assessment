// apiNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const APINode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || '');

  const handles = [
    { type: 'target', position: Position.Left, id: 'headers', style: { top: '33%' } },
    { type: 'target', position: Position.Left, id: 'body', style: { top: '66%' } },
    { type: 'source', position: Position.Right, id: 'response' },
  ];

  return (
    <BaseNode id={id} title="API Call" handles={handles}>
      <label>
        Method:
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </label>
      <label>
        URL:
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." />
      </label>
    </BaseNode>
  );
};
