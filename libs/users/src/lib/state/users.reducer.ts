import {Action, createReducer, on} from '@ngrx/store';

import * as UsersActions from './users.actions';
import {UserInterface} from "../models/user";

export const USERS_FEATURE_KEY = 'users';

export interface UsersState {
  user: UserInterface | null;
  isAuthenticated: boolean;
}

export interface UsersPartialState {
    readonly [USERS_FEATURE_KEY]: UsersState;
}

export const initialUsersState: UsersState = {
  user: null,
  isAuthenticated: false
}

const usersReducer = createReducer(
  initialUsersState,
  // first parameter indicates an action on which reducer subscribe
  // second parameter will change the state
  on(UsersActions.buildUserSession, (state) => ({...state})),
  on(UsersActions.buildUserSessionSuccess, (state, action) => ({...state, isAuthenticated: true, user: action.user})),
  on(UsersActions.buildUserSessionFailed, (state) => ({...state, isAuthenticated: false, user: null}))
)

export function reducer(state: UsersState | undefined, action: Action) {
    return usersReducer(state, action);
}
