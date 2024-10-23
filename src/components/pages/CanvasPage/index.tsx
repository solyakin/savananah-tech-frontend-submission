import React from 'react';
import  { useState } from 'react'
import { Circle, Layer, Rect, Stage } from 'react-konva'
import { Link } from 'react-router-dom';
import { PrimeHeader } from 'pages/Home/styled';
import { Heading, ListContainer } from 'pages/PokemanPage/styled';

interface Shape {
    id: string;
    type: 'rect' | 'circle';
    x: number;
    y: number;
    width?: number;
    height?: number;
    radius?: number;
    fill: string;
    isDragging: boolean;
}

const CanvasPage =  () => {
    
    const [selectedShapes, setSelectedShapes] = useState<string[]>([]);
    const [shapes, setShapes] = useState<Shape[]>([
      { id: 'rect1', type: 'rect', x: 50, y: 50, width: 100, height: 100, fill: 'red', isDragging: false },
      { id: 'circle1', type: 'circle', x: 250, y: 150, radius: 50, fill: 'blue', isDragging: false },
    ]);

    // Handle dragging start
    const handleDragStart = (id: string) => {
        const newShapes = shapes.map(shape => {
        if (shape.id === id) {
            return { ...shape, isDragging: true };
        }
        return shape;
        });
        setShapes(newShapes);
    };

    // Handle dragging end
    const handleDragEnd = (id: string, e: any) => {
        const newShapes = shapes.map(shape => {
        if (shape.id === id) {
            return {
            ...shape,
            isDragging: false,
            x: e.target.x(),
            y: e.target.y(),
            };
        }
        return shape;
        });
        setShapes(newShapes);
    };

    // Handle shape selection
    const handleSelectShape = (id: string) => {
      if (selectedShapes.includes(id)) {
      setSelectedShapes(selectedShapes.filter(shapeId => shapeId !== id));
      } else if (selectedShapes.length < 2) {
      setSelectedShapes([...selectedShapes, id]);
      }
    };
    
  return (
    <>
      <PrimeHeader>
        <Link to={'/'}>Home</Link>
        <Link to={'/pokeman'}>Pokeman</Link>
        <Link to={'/canvas'}>Draw canvas</Link>
      </PrimeHeader>
      <ListContainer>
        <Heading>Canvas Page</Heading>
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            {shapes.map((shape) => {
              if (shape.type === 'rect') {
                return (
                  <Rect
                    key={shape.id}
                    x={shape.x}
                    y={shape.y}
                    width={shape.width!}
                    height={shape.height!}
                    fill={selectedShapes.includes(shape.id) ? 'green' : shape.fill}
                    draggable={selectedShapes.includes(shape.id)}
                    onDragStart={() => handleDragStart(shape.id)}
                    onDragEnd={(e) => handleDragEnd(shape.id, e)}
                    onClick={() => handleSelectShape(shape.id)}
                    stroke={selectedShapes.includes(shape.id) ? 'black' : undefined}
                    strokeWidth={selectedShapes.includes(shape.id) ? 2 : 0}
                  />
                );
              } else if (shape.type === 'circle') {
                return (
                  <Circle
                    key={shape.id}
                    x={shape.x}
                    y={shape.y}
                    radius={shape.radius!}
                    fill={selectedShapes.includes(shape.id) ? 'green' : shape.fill}
                    draggable={selectedShapes.includes(shape.id)}
                    onDragStart={() => handleDragStart(shape.id)}
                    onDragEnd={(e) => handleDragEnd(shape.id, e)}
                    onClick={() => handleSelectShape(shape.id)}
                    stroke={selectedShapes.includes(shape.id) ? 'black' : undefined}
                    strokeWidth={selectedShapes.includes(shape.id) ? 2 : 0}
                  />
                );
              }
              return null;
            })}
          </Layer>
        </Stage>
      </ListContainer>
    </>
  )
}

export default CanvasPage;