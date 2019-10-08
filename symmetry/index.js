// set up transform for tests
import {getHorizontalTransform} from "./HTransform";

export let _transformModes = [];

export function initTransformModes() {
    _transformModes.push(getHorizontalTransform())
}
