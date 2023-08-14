import React from "react";
import ReactDOM from "react-dom";
import htm from "htm";
import { useDrag } from 'react-dnd'
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

export function ExampleCounter(props) {
  // const [count, setCount] = React.useState(0);

  // const updateCount = () => {
  //   const newCount = count + 1;
  //   props.onCountChange(newCount);
  //   setCount(newCount);
  // };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "BOX",
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
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
  return (<div ref={drag} data-testid={`box`}>
      {name}ASDASD
    </div>)
}
