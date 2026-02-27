// BaseNode.js
// Reusable node abstraction that all nodes extend

import { Handle } from 'reactflow';

export const BaseNode = ({ id, title, children, handles = [], style = {} }) => {
  return (
    <div className="base-node" style={style}>
      <div className="base-node-header">
        <span className="base-node-title">{title}</span>
      </div>
      <div className="base-node-content">
        {children}
      </div>
      {handles.map((handle, index) => (
        <Handle
          key={`${id}-${handle.id}`}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          style={handle.style || {}}
          className="base-node-handle"
        />
      ))}
    </div>
  );
};
