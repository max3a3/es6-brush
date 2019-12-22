

// use path from it
class StrokeSimpleToolComponent extends React.Component {
}

// default react scripts don't support @PaperScope decorator
let StrokeSimpleTool = PaperScope(StrokeSimpleToolComponent)
export default React.forwardRef((props, ref) => <StrokeSimpleTool innerRef={ref} {...props} />);

