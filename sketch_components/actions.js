import Actions from "./action_type";

export function updateKey(key,value) {
  return {
    type: Actions.UPDATE_KEY,
    payload: {
      key,
      value
    }
  };
}

