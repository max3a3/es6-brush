export function BrushCreator(paper, props) {
  //todo how to pass context?
  if (!props.position) props.position = [0, 0]; // set default
  var brush = new BrushCustomPaper(props);
  return brush;
}

export const BrushType = "Brush"; //match the custom type registered in renderer
export const BrushComponent = React.forwardRef((props, ref) => (
  <BrushType ref={ref} {...props} />
));
