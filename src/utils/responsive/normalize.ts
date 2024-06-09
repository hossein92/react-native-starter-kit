import {Dimensions, PixelRatio, Platform} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 320;

export function normalize(size: number): number {
  const newSize = size * scale;
  const roundedSize = Math.round(PixelRatio.roundToNearestPixel(newSize));

  if (Platform.OS === 'android') {
    return roundedSize - 2;
  }

  return roundedSize;
}
