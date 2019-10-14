// need dispatch 
import Hashids from 'hashids';
// caller call this and call dispathc on the return
import Actions from './action_type'
export function AddRect(path) {
    return ({
    type: Actions.ADD_RECT,
    payload: {
      id: new Hashids('path').encode(new Date().getTime()),
      type:'Shape',
      ...path,
    },
    meta: {skipHistory},
  })

}