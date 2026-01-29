'use client';

import { useCallback, useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  MarkerType,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Brain, Download } from 'lucide-react';
import { MindMapNode } from '@/types';

interface InteractiveMindMapCardProps {
  nodes: MindMapNode[];
  onDownload?: () => void;
}

export const InteractiveMindMapCard = ({ nodes, onDownload }: InteractiveMindMapCardProps) => {
  const centerNode = nodes.find(n => n.level === 0);
  const level1Nodes = nodes.filter(n => n.level === 1);
  const level2Nodes = nodes.filter(n => n.level === 2);

  // Convert data to ReactFlow format
  const { flowNodes, flowEdges } = useMemo(() => {
    const flowNodes: Node[] = [];
    const flowEdges: Edge[] = [];

    // Center node
    if (centerNode) {
      flowNodes.push({
        id: centerNode.id,
        type: 'default',
        position: { x: 400, y: 250 },
        data: { label: centerNode.label },
        style: {
          background: '#C07855',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: 120,
          height: 120,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '13px',
          fontWeight: 'bold',
          padding: '10px',
          textAlign: 'center',
        },
      });
    }

    // Level 1 nodes (main branches)
    const angleStep = (2 * Math.PI) / (level1Nodes.length || 1);
    level1Nodes.forEach((node, i) => {
      const angle = angleStep * i;
      const x = 400 + Math.cos(angle) * 250;
      const y = 250 + Math.sin(angle) * 200;

      flowNodes.push({
        id: node.id,
        type: 'default',
        position: { x, y },
        data: { label: node.label },
        style: {
          background: '#7A9B76',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: 100,
          height: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '11px',
          fontWeight: '600',
          padding: '8px',
          textAlign: 'center',
        },
      });

      // Add edge from center to level 1
      if (centerNode) {
        flowEdges.push({
          id: `${centerNode.id}-${node.id}`,
          source: centerNode.id,
          target: node.id,
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#7A9B76', strokeWidth: 2 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#7A9B76',
          },
        });
      }
    });

    // Level 2 nodes (details) - distributed around level 1 nodes
    level2Nodes.forEach((node, i) => {
      const parentIndex = i % level1Nodes.length;
      const parent = level1Nodes[parentIndex];

      if (parent) {
        const parentAngle = angleStep * parentIndex;
        const offset = (i / level2Nodes.length) * Math.PI * 2;
        const x = 400 + Math.cos(parentAngle) * 250 + Math.cos(offset) * 120;
        const y = 250 + Math.sin(parentAngle) * 200 + Math.sin(offset) * 100;

        flowNodes.push({
          id: node.id,
          type: 'default',
          position: { x, y },
          data: { label: node.label },
          style: {
            background: '#8FAA8B',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            width: 90,
            height: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            fontWeight: '500',
            padding: '6px',
            textAlign: 'center',
          },
        });

        // Add edge from level 1 to level 2
        flowEdges.push({
          id: `${parent.id}-${node.id}`,
          source: parent.id,
          target: node.id,
          type: 'smoothstep',
          animated: false,
          style: { stroke: '#8FAA8B', strokeWidth: 1.5 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#8FAA8B',
          },
        });
      }
    });

    return { flowNodes, flowEdges };
  }, [nodes, centerNode, level1Nodes, level2Nodes]);

  const [reactFlowNodes, setNodes, onNodesChange] = useNodesState(flowNodes);
  const [reactFlowEdges, setEdges, onEdgesChange] = useEdgesState(flowEdges);

  return (
    <div className="bg-cream-100 dark:bg-dark-card border border-sage-500/15 rounded-2xl p-8 hover:shadow-lg dark:hover:shadow-black/30 transition-shadow duration-300">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <Brain className="text-terracotta-500" size={24} />
          <div>
            <h2 className="font-heading font-bold text-2xl text-sage-800 dark:text-cream-50">
              Interactive Mind Map
            </h2>
            <p className="font-sans text-sm text-sage-600 dark:text-dark-muted">
              {nodes.length} concepts mapped • Drag nodes to explore
            </p>
          </div>
        </div>
        {onDownload && (
          <button
            onClick={onDownload}
            className="p-2 hover:bg-sage-200 dark:hover:bg-sage-800 rounded-full transition-colors text-sage-600 dark:text-sage-300"
          >
            <Download size={20} />
          </button>
        )}
      </div>

      <div
        id="mindmap-container"
        className="h-[600px] w-full bg-cream-50 dark:bg-[#252A26] rounded-xl border border-sage-500/10 overflow-hidden"
      >
        <ReactFlow
          nodes={reactFlowNodes}
          edges={reactFlowEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.5}
          maxZoom={1.5}
          attributionPosition="bottom-left"
        >
          <Background color="#7A9B76" gap={16} size={1} />
          <Controls className="bg-white dark:bg-sage-800 border border-sage-200 dark:border-sage-700 rounded-lg" />
          <MiniMap
            className="bg-cream-100 dark:bg-sage-900 border border-sage-200 dark:border-sage-700 rounded-lg"
            nodeColor={(node) => {
              if (node.style?.background === '#C07855') return '#C07855';
              if (node.style?.background === '#7A9B76') return '#7A9B76';
              return '#8FAA8B';
            }}
          />
          <Panel position="bottom-right" className="bg-white/90 dark:bg-black/50 p-3 rounded-lg text-xs font-sans backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-terracotta-500"></div>
              <span className="text-sage-600 dark:text-sage-300">Main Topic</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-sage-500"></div>
              <span className="text-sage-600 dark:text-sage-300">Sub-concept</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-sage-400"></div>
              <span className="text-sage-600 dark:text-sage-300">Detail</span>
            </div>
          </Panel>
        </ReactFlow>
      </div>

      {/* Node List */}
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-heading font-semibold text-sm text-sage-700 dark:text-sage-300 mb-2">
            Main Branches ({level1Nodes.length})
          </h4>
          <ul className="space-y-1">
            {level1Nodes.slice(0, 6).map(node => (
              <li key={node.id} className="text-sm text-sage-600 dark:text-sage-200 flex items-start gap-2">
                <span className="text-sage-500 mt-0.5">•</span>
                <span>{node.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-sm text-sage-700 dark:text-sage-300 mb-2">
            Details ({level2Nodes.length})
          </h4>
          <ul className="space-y-1">
            {level2Nodes.slice(0, 6).map(node => (
              <li key={node.id} className="text-sm text-sage-600 dark:text-sage-200 flex items-start gap-2">
                <span className="text-sage-500 mt-0.5">•</span>
                <span>{node.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
