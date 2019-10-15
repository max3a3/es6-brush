export const INITIAL_STATE = {
  ids: [],
  shapes: {}
};
export function canvasReducer(state, action) {
  switch (action.type) {
    case "ADD_SHAPE": //modify the
      let ids = state.ids.concat(action.payload.id);
      let shapes = { ...state.shapes, [action.payload.id]: action.payload };

      return { ...state, ids, shapes };

    default:
      return state;
  }
}
