import React, { Component, useRef, useEffect } from "react";
import { render } from "react-dom";
import invariant from "invariant";

import {
  Rectangle,
  PaperContainer,
  renderWithPaperScope
} from "@psychobolt/react-paperjs";

import DotBounded from "./DotBounded";


const canvasReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_RECT': //modify the 
    
      return {ids,objects}
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: true };
        } else {
          return todo;
        }
      });
    case 'UNDO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: false };
        } else {
          return todo;
        }
      });
    default:
      return state;
  }
};


export default function BrushPaperApp() {
  let paperRef = useRef(null);
  useEffect(() => { //componentdidmount to get the paper ref
    let paper = paperRef.current.props.paper;
    invariant(paper, "paper not defind");
    let dot = new DotBounded(paper, 30, 20);
  }, []);

const [todos, dispatch] = useReducer(todoReducer, initialTodos);


  console.log("brush function");
  return (
    <PaperContainer
      ref={paperRef}
      className="flex_item"
      canvasProps={{ width: 400, height: 300, className: "tool_canvas" }}
    >
      <Rectangle
        position={[90, 60]}
        width={90}
        height={60}
        strokeColor="red"
        fillColor="yellow"
      />
    </PaperContainer>
  );
}
