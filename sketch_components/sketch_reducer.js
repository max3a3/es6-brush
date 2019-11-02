import Actions from './action_type'
export const INITIAL_STATE = {
  type:'brush',
  diameter_brush:30,
  hardness_brush:5,

  co_stamp_image_src:'./brush/calligraphy-1.png'
};

export function sketchpadReducer(state, action) {
  switch (action.type) {
    case Actions.UPDATE_KEY:
      return {...state, [action.payload.key]:action.payload.value}
    default:
      return state;
  }
}
