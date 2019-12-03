import Actions from "./action_type";

let server = window.STACK_BLITZ
  ? "https://raw.githubusercontent.com/max3a3/es6-brush/es6-brush-13/assets"
  : ".";
export const INITIAL_STATE = {
  type: "brush",
  diameter_brush: 30,
  hardness_brush: 5,

  co_stamp_image_src: `${server}/brush/calligraphy-1.png`
};

export function sketchpadReducer(state, action) {
  switch (action.type) {
    case Actions.UPDATE_KEY:
      return { ...state, [action.payload.key]: action.payload.value };
    default:
      return state;
  }
}
