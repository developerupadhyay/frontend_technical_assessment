// textNode.js

import { useState, useEffect, useRef, useMemo } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);

  // Extract unique variable names from {{ varName }} patterns
  const variables = useMemo(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const vars = new Set();
    let match;
    while ((match = regex.exec(currText)) !== null) {
      vars.add(match[1]);
    }
    return Array.from(vars);
  }, [currText]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [currText]);

  const outputHandles = [
    { type: 'source', position: Position.Right, id: 'output' },
  ];

  return (
    <BaseNode
      id={id}
      title="Text"
      handles={outputHandles}
      style={{ minWidth: 200, minHeight: 80 }}
    >
      <label>
        Text:
        <textarea
          ref={textareaRef}
          className="text-node-textarea"
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          rows={1}
        />
      </label>
      {variables.map((varName, index) => (
        <Handle
          key={`${id}-var-${varName}`}
          type="target"
          position={Position.Left}
          id={`${id}-${varName}`}
          style={{ top: `${((index + 1) / (variables.length + 1)) * 100}%` }}
          className="base-node-handle"
        />
      ))}
      {variables.length > 0 && (
        <div className="text-node-variables">
          {variables.map((v) => (
            <span key={v} className="variable-tag">{v}</span>
          ))}
        </div>
      )}
    </BaseNode>
  );
};
