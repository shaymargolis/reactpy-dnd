import React from "react";
import ReactDOM from "react-dom";
import htm from "htm";
import { useDrag } from 'react-dnd'
import { useDrop } from 'react-dnd'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const html = htm.bind(React.createElement);

export function bind(node, config) {
  return {
    create: (type, props, children) => React.createElement(type, props, ...children),
    render: (element) => ReactDOM.render(element, node),
    unmount: () => ReactDOM.unmountComponentAtNode(node),
  }
}

export function CustomDndProvider({children}) {
  return <DndProvider backend={HTML5Backend}>
          {children}
        </DndProvider>
}

const style: React.CSSProperties = {
  height: '12rem',
  width: '12rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
}

export const ExampleTarget: React.FC = () => {
  // const [count, setCount] = React.useState(0);

  // const updateCount = () => {
  //   const newCount = count + 1;
  //   props.onCountChange(newCount);
  //   setCount(newCount);
  // };

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "BOX",
    drop: () => ({ name: 'Dustbin' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  const isActive = canDrop && isOver
  let backgroundColor = '#222'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }

  return (
    <div ref={drop} style={{ ...style, backgroundColor }} data-testid="dustbin">
      {isActive ? 'Release to drop' : 'Drag a box here'}
    </div>
  )
}

interface DropResult {
  name: string
}

const boxStyle: React.CSSProperties = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
}

export function DraggableItem({name, dropEnd, ... props}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "BOX",
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>()
      dropEnd(item, dropResult);

      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))
  const opacity = isDragging ? 0.4 : 1
  return <div style={{ ...boxStyle, opacity, color: 'black' }} ref={drag} data-testid={`box`}>
      {name}
    </div>
}
