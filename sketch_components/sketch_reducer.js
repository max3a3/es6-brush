import Actions from './action_type'
export const INITIAL_STATE = {
  diameter_brush:30,
  hardness_brush:5
};

export function sketchpadReducer(state, action) {
  switch (action.type) {
    case Actions.UPDATE_KEY:
      return {...state, [action.payload.key]:action.payload.value}
    default:
      return state;
  }
}
