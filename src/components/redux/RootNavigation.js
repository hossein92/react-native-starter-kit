// RootNavigation.js

import {createNavigationContainerRef} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function reset(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name}],
      }),
    );
  }
}
export function resetStack({screen, stack}) {
  if (navigationRef.current && navigationRef.current.isReady()) {
    navigationRef.current.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          // {name: screen}, // Use the provided screen parameter
          {
            name: stack,
            state: {
              routes: [
                {
                  name: screen,
                },
              ],
            },
          }, // Use the provided stack parameter
        ],
      }),
    );
  }
}

// add other navigation functions that you need and export them
