import React from 'react'
import { createRoot } from 'react-dom/client'
import { Stage, Layer, Line, Text } from 'react-konva'
import { useEffect } from 'react'

const App = () => {
  const [tool, setTool] = React.useState('pen')
  const [lines, setLines] = React.useState([] as any[])
  const isDrawing = React.useRef(false)

  useEffect(() => {
    //get lines from localstorage
    const linesString = window.localStorage.getItem('Lines') as string
    console.log(linesString)
    if (linesString) {
      const linesArray = JSON.parse(linesString)
      console.log(linesArray)
      setLines(linesArray)
    }
    return () => {}
  }, [])

  //setLines
  const handleMouseDown = (e: any) => {
    isDrawing.current = true
    const pos = e.target.getStage().getPointerPosition()
    const updatedLines = [...lines, { tool, points: [pos.x, pos.y] }]
    setLines(updatedLines)
  }

  const handleMouseMove = (e: any) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return
    }
    const stage = e.target.getStage()
    const point = stage.getPointerPosition()
    let lastLine = lines[lines.length - 1]
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y])

    // replace last
    lines.splice(lines.length - 1, 1, lastLine)
    setLines(lines.concat())
  }

  const handleMouseUp = () => {
    isDrawing.current = false

    //todo: stringify updated lines
    var myJsonString = JSON.stringify(lines)
    //save result in local storage
    window.localStorage.setItem('Lines', myJsonString)
  }

  const handleClear = () => {
    //todo: stringify updated lines
    var myJsonString = JSON.stringify([])
    setLines([])
    //save result in local storage
    window.localStorage.setItem('Lines', myJsonString)
  }

  return (
    <div>
      <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value)
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>
      <button onClick={handleClear}>clear</button>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          <Text text="Just start drawing" x={5} y={30} />
          <Text text="Erase" x={10} y={60} />
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#FFF753"
              strokeWidth={10}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              opacity={0.5}
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
      </Stage>
    </div>
  )
}

export default App
