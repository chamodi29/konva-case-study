import React from 'react';
import { createRoot } from 'react-dom/client';
import { Stage, Layer, Circle, Text } from 'react-konva';

function generateShapes() {
  return [...Array(8)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    rotation: Math.random() * 180,
    isDragging: false,
  }));
}

const INITIAL_STATE = generateShapes();

const App = () => {
  const [circles, setCircles] = React.useState(INITIAL_STATE);

  const handleDragStart = (e:any) => {
    const id = e.target.id();
    setCircles(
      circles.map((circle) => {
        return {
          ...circle,
          isDragging: circle.id === id,
        };
      })
    );
  };
  const handleDragEnd = (e: any) => {
    setCircles(
      circles.map((circle) => {
        return {
          ...circle,
          isDragging: false,
        };
      })
    );
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text text="You can drag any circle here" />
        {circles.map((circle) => (
          <Circle
            key={circle.id}
            id={circle.id}
            x={circle.x}
            y={circle.y}
            radius={40}
            fill="#FE74D0"
            opacity={0.8}
            draggable
            rotation={circle.rotation}
            shadowColor="black"
            shadowBlur={10}
            shadowOpacity={0.6}
            shadowOffsetX={circle.isDragging ? 10 : 5}
            shadowOffsetY={circle.isDragging ? 10 : 5}
            scaleX={circle.isDragging ? 1.2 : 1}
            scaleY={circle.isDragging ? 1.2 : 1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default App;
