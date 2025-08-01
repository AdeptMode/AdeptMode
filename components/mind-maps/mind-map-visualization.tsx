"use client"

import type React from "react"

import { useCallback, useEffect, useState, useRef } from "react"
import type { MindMapNode } from "@/app/actions/mind-map-generator-api"
import { X, ChevronRight, BookOpen, Lightbulb, Target } from "lucide-react"

interface MindMapVisualizationProps {
  data: MindMapNode
  zoomLevel: number
}

// Enhanced color palette with gradients
const COLOR_PALETTE = [
  {
    bg: "bg-gradient-to-br from-purple-100 to-purple-200",
    border: "border-purple-400",
    text: "text-purple-900",
    shadow: "shadow-purple-200",
    glow: "shadow-lg shadow-purple-200/50",
  },
  {
    bg: "bg-gradient-to-br from-blue-100 to-blue-200",
    border: "border-blue-400",
    text: "text-blue-900",
    shadow: "shadow-blue-200",
    glow: "shadow-lg shadow-blue-200/50",
  },
  {
    bg: "bg-gradient-to-br from-green-100 to-green-200",
    border: "border-green-400",
    text: "text-green-900",
    shadow: "shadow-green-200",
    glow: "shadow-lg shadow-green-200/50",
  },
  {
    bg: "bg-gradient-to-br from-amber-100 to-amber-200",
    border: "border-amber-400",
    text: "text-amber-900",
    shadow: "shadow-amber-200",
    glow: "shadow-lg shadow-amber-200/50",
  },
  {
    bg: "bg-gradient-to-br from-rose-100 to-rose-200",
    border: "border-rose-400",
    text: "text-rose-900",
    shadow: "shadow-rose-200",
    glow: "shadow-lg shadow-rose-200/50",
  },
  {
    bg: "bg-gradient-to-br from-indigo-100 to-indigo-200",
    border: "border-indigo-400",
    text: "text-indigo-900",
    shadow: "shadow-indigo-200",
    glow: "shadow-lg shadow-indigo-200/50",
  },
]

export default function MindMapVisualization({ data, zoomLevel }: MindMapVisualizationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({})
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [selectedNode, setSelectedNode] = useState<MindMapNode | null>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  // Handle node expansion toggle
  const toggleNode = useCallback((nodeId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }))
  }, [])

  // Handle node selection
  const selectNode = useCallback((node: MindMapNode, event: React.MouseEvent) => {
    event.stopPropagation()
    setSelectedNode(node)
  }, [])

  // Close explanation panel
  const closeExplanation = useCallback(() => {
    setSelectedNode(null)
  }, [])

  // Handle mouse interactions
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest(".mind-map-node")) {
        return
      }
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
    },
    [position],
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        })
      }
    },
    [isDragging, dragStart],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Event listeners
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])

  // Center the mind map initially
  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect()
      setPosition({
        x: width / 2,
        y: height / 2,
      })
    }
  }, [])

  // Render node function
  const renderNode = useCallback(
    (node: MindMapNode, level = 0, index = 0, parentX = 0, parentY = 0) => {
      const isExpanded = expandedNodes[node.id] !== false
      const nodeWidth = 200
      const nodeHeight = 60
      const horizontalSpacing = 280
      const verticalSpacing = 120

      // Calculate position
      const x = level === 0 ? 0 : parentX + horizontalSpacing
      const y = level === 0 ? 0 : parentY + (index - (node.children?.length || 1) / 2 + 0.5) * verticalSpacing

      const scaledX = x * zoomLevel
      const scaledY = y * zoomLevel
      const absoluteX = position.x + scaledX
      const absoluteY = position.y + scaledY

      // Get color scheme
      const colorSet = COLOR_PALETTE[level % COLOR_PALETTE.length]
      const isSelected = selectedNode?.id === node.id
      const isHovered = hoveredNode === node.id

      return (
        <div key={node.id} className="relative">
          {/* Connection line */}
          {level > 0 && (
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              <defs>
                <linearGradient id={`gradient-${node.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#9333ea" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              <line
                x1={position.x + parentX * zoomLevel}
                y1={position.y + parentY * zoomLevel}
                x2={absoluteX}
                y2={absoluteY}
                stroke={`url(#gradient-${node.id})`}
                strokeWidth={3 * zoomLevel}
                strokeDasharray={level > 1 ? "8,4" : "none"}
                className="drop-shadow-sm"
              />
            </svg>
          )}

          {/* Node */}
          <div
            className={`mind-map-node absolute px-4 py-3 rounded-xl border-2 cursor-pointer transition-all duration-300 transform ${
              isSelected
                ? "bg-gradient-to-br from-purple-200 to-purple-300 border-purple-500 ring-4 ring-purple-300 ring-opacity-50 scale-110"
                : isHovered
                  ? `${colorSet.bg} ${colorSet.border} ${colorSet.glow} scale-105`
                  : `${colorSet.bg} ${colorSet.border} shadow-lg hover:${colorSet.glow} hover:scale-105`
            }`}
            style={{
              left: absoluteX - (nodeWidth * zoomLevel) / 2,
              top: absoluteY - (nodeHeight * zoomLevel) / 2,
              width: nodeWidth * zoomLevel,
              minHeight: nodeHeight * zoomLevel,
              zIndex: isSelected ? 20 : isHovered ? 15 : 10,
            }}
            onClick={(e) => selectNode(node, e)}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            {/* Node Content */}
            <div className="flex items-center justify-between h-full">
              <div className="flex-1">
                <div className={`font-bold text-center ${colorSet.text} text-sm leading-tight`}>{node.label}</div>
                {level === 0 && <div className="text-xs text-center text-gray-600 mt-1">Main Topic</div>}
              </div>

              {/* Node Icon */}
              <div className="ml-2">
                {level === 0 ? (
                  <Target className="h-4 w-4 text-purple-600" />
                ) : level === 1 ? (
                  <BookOpen className="h-3 w-3 text-blue-600" />
                ) : (
                  <Lightbulb className="h-3 w-3 text-green-600" />
                )}
              </div>
            </div>

            {/* Expand/collapse button */}
            {node.children && node.children.length > 0 && (
              <button
                className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                  isExpanded ? "bg-red-500 text-white hover:bg-red-600" : "bg-green-500 text-white hover:bg-green-600"
                } shadow-lg`}
                onClick={(e) => toggleNode(node.id, e)}
              >
                {isExpanded ? "−" : "+"}
              </button>
            )}

            {/* Child count indicator */}
            {node.children && node.children.length > 0 && (
              <div className="absolute -top-2 -left-2 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                {node.children.length}
              </div>
            )}
          </div>

          {/* Children */}
          {isExpanded && node.children && node.children.length > 0 && (
            <div>{node.children.map((child, childIndex) => renderNode(child, level + 1, childIndex, x, y))}</div>
          )}
        </div>
      )
    },
    [expandedNodes, position, zoomLevel, toggleNode, selectNode, selectedNode, hoveredNode],
  )

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50"
      onMouseDown={handleMouseDown}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, #9333ea 2px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Mind map container */}
      <div className="absolute inset-0 z-10">{data && renderNode(data)}</div>

      {/* Enhanced explanation panel */}
      {selectedNode && (
        <div className="absolute top-4 right-4 w-96 max-h-[calc(100%-2rem)] bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-purple-200 z-30 overflow-hidden">
          {/* Panel Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                <h3 className="font-bold text-lg">{selectedNode.label}</h3>
              </div>
              <button
                onClick={closeExplanation}
                className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/20"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Panel Content */}
          <div className="p-4 overflow-y-auto max-h-96">
            <div className="prose prose-sm max-w-none">
              <div className="bg-blue-50 rounded-lg p-3 mb-4">
                <div className="flex items-center mb-2">
                  <Lightbulb className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="font-semibold text-blue-800">Detailed Explanation</span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {selectedNode.explanation ||
                    "This concept is part of a comprehensive topic network. Click on related nodes to explore connections and build deeper understanding."}
                </p>
              </div>

              {/* Additional context */}
              <div className="bg-green-50 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <Target className="h-4 w-4 text-green-600 mr-2" />
                  <span className="font-semibold text-green-800">Learning Tip</span>
                </div>
                <p className="text-gray-700 text-sm">
                  Explore connected concepts by expanding related nodes. Each connection represents important
                  relationships in your topic.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced navigation instructions */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-200 z-20 max-w-xs">
        <div className="flex items-center mb-2">
          <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mr-2">
            <span className="text-white text-xs">?</span>
          </div>
          <span className="font-semibold text-gray-800">Navigation Guide</span>
        </div>
        <ul className="space-y-1 text-xs text-gray-600">
          <li className="flex items-center">
            <ChevronRight className="h-3 w-3 mr-1 text-purple-500" />
            Click nodes for detailed explanations
          </li>
          <li className="flex items-center">
            <ChevronRight className="h-3 w-3 mr-1 text-blue-500" />
            Use +/− buttons to expand/collapse
          </li>
          <li className="flex items-center">
            <ChevronRight className="h-3 w-3 mr-1 text-green-500" />
            Drag to navigate the mind map
          </li>
          <li className="flex items-center">
            <ChevronRight className="h-3 w-3 mr-1 text-amber-500" />
            Numbers show child concept count
          </li>
        </ul>
      </div>

      {/* Zoom level indicator */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border border-gray-200 z-20">
        <span className="text-sm font-medium text-gray-700">Zoom: {Math.round(zoomLevel * 100)}%</span>
      </div>
    </div>
  )
}
