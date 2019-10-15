// need dispatch
import Hashids from "hashids";
// caller call this and call dispathc on the return
import Actions from "./action_type";

export function AddRect(props) {
  return {
    type: Actions.ADD_SHAPE,
    payload: {
      id: new Hashids("path").encode(new Date().getTime()),
      type: "rectangle",
      ...props
    }
  };
}
