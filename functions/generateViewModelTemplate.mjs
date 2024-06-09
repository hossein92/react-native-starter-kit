export const generateViewModelTemplate = (screenName) => `
import { ${screenName}ScreenViewModel } from './models';

const use${screenName}ViewModel = (): ${screenName}ScreenViewModel => {
  // state

  // functions

  // effects

  return {};
};

export default use${screenName}ViewModel;
`;
