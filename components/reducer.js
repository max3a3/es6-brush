export const INITIAL_STATE = {
  ids: [],
  shapes: {}
};
export function canvasReducer(state, action) {
  switch (action.type) {
    case "ADD_SHAPE": //ADD concat to  ids and shapes
      let ids = state.ids.concat(action.payload.id);
      let shapes = { ...state.shapes, [action.payload.id]: action.payload }; // flatten it

      return { ...state, ids, shapes };
    case "SET_PROP":
      let old_shapes = state.shapes;
      let { id, prop } = action.payload;
      let shapes = {
        ...old_shapes,
        [id]: { ...old_shapes[id], ...prop }
      };
      return { ...state, shapes };
    default:
      return state;
  }
}
