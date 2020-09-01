import { Action } from './Action';

export type Reducer<S, A = Action> = (state: S, action: A) => S;
