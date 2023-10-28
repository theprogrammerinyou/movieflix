import { View, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
import { theme } from '../theme';
const {width, height} =  Dimensions.get('window');

export default function Loading() {
  return (
    <View style={[styles.container, { height, width }]}>
        <Progress.CircleSnail thickness={12} size={160} color={theme.background} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});