import {StatusBar, Platform} from 'react-native';

// Function to get status bar height
const getStatusBarHeight = () => {
  // Check if the platform is iOS
  if (Platform.OS === 'ios') {
    // Check if the device is in portrait or landscape mode
    if (Platform.isPad) {
      // If it's an iPad, return the larger status bar height
      return 24; // Landscape height
    } else {
      // If it's an iPhone, return the standard status bar height
      return StatusBar.currentHeight || 44; // Portrait height
    }
  } else if (Platform.OS === 'android') {
    // For Android, return the standard status bar height
    // You can adjust this value based on your specific requirements
    return StatusBar.currentHeight || 24;
  }
  // For other platforms, return 0
  return 0;
};
export default getStatusBarHeight;
// Usage
// const statusBarHeight = getStatusBarHeight();
// console.log('Status bar height:', statusBarHeight);
