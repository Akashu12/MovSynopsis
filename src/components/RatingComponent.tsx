import React from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    ViewStyle
} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { Movie } from './MovieCard';

const { width } = Dimensions.get('window');
interface RatingComponentProps {
    item: Movie
}
export const RatingComponent = ({item}: RatingComponentProps) => {
    return(
        <View
                style={styles.movieDetailsViewContainerStyle as ViewStyle}
            >
                <CircularProgress
                    inActiveStrokeColor={'black'}
                    radius={width * 0.055}
                    activeStrokeWidth={width * 0.01}
                    value={item.vote_average * 10}
                    inActiveStrokeWidth={width * 0.01}
                    activeStrokeColor={'#21853c'}
                    duration={1000}
                    progressValueColor={'#21853c'}
                    valueSuffix={'%'}
                    progressValueFontSize={width * 0.03}
                    valueSuffixStyle={{ fontSize: width * 0.03 }}
                    maxValue={100}
                    delay={100}
                    inActiveStrokeOpacity={0.3}
                />
            </View>
    )
}

const styles = StyleSheet.create({
    movieDetailsViewContainerStyle: {
        position: 'absolute',
        margin: width * 0.005,
        backgroundColor: 'black',
        borderRadius: width * 0.055,
    },
});
