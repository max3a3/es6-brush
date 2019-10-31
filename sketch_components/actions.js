import Actions from "./action_type";
import {update_vars} from "../sketch_utils/settings";

export function updateKey(key,value) {
  update_vars(key,value)
  return {
    type: Actions.UPDATE_KEY,
    payload: {
      key,
      value
    }
  };
}

