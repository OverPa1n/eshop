import { createAction, props } from '@ngrx/store';
import {UserInterface} from "../models/user";


export const buildUserSession = createAction('[Users] Build User Session')

export const buildUserSessionSuccess = createAction('[Users] Build User Session Success',
  props<{ user: UserInterface }>()
);

export const buildUserSessionFailed = createAction('[Users] Build User Session Failed',
  props<{ error: string }>()
);
