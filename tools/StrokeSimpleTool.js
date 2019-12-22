import React from 'react';

import {Tool, PaperScope} from '@psychobolt/react-paperjs';

// use path from it
class StrokeSimpleToolComponent extends React.Component {
  onMouseDrag = (toolEvent) => {
  }
  onMouseUp = (event) => {
  }

  onMouseDown = (event) => {
  }

  render() {
    const {innerRef, ...rest} = this.props;
    return (
      <Tool
        {...rest}
        ref={innerRef}
        onMouseDown={this.onMouseDown}
        onTouchMove={this.onMouseDrag}
        onMouseDrag={this.onMouseDrag}
        onMouseUp={this.onMouseUp}
      />
    );
  }

}

// default react scripts don't support @PaperScope decorator
let StrokeSimpleTool = PaperScope(StrokeSimpleToolComponent)
export default React.forwardRef((props, ref) => <StrokeSimpleTool innerRef={ref} {...props} />);

