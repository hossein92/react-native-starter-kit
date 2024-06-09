// Function to generate templates
export const generateModelTemplate = (screenName) => `
export interface ${screenName}ScreenViewModel {
  // state: string;
  // setState: React.Dispatch<React.SetStateAction<string>>;
}
`;
