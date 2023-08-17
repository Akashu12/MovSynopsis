import React from 'react';
import {
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    useColorScheme,
    StyleSheet,
    ViewStyle
} from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import { RatingComponent } from './RatingComponent';

const { width, height } = Dimensions.get('window');
export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    overview: string;
    release_date: string
};

interface MovieItemProps {
    item: Movie;
    onItemPress: () => void
}

export const MovieCard = ({ item, onItemPress }: MovieItemProps) => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <TouchableOpacity
            onPress={onItemPress}
            style={[styles.movieCardContainerStyle as ViewStyle, { backgroundColor: isDarkMode ? '#3d3b3b' : '#e0e0e0' }]}
        >
            <FastImage
                style={styles.posterImageStyle as FastImageProps["style"]}
                source={{
                    uri: `https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
            />
            <RatingComponent item={item} />
            <View
                style={[styles.movieDeatilsViewStyle as ViewStyle, { backgroundColor: isDarkMode ? 'rgba(61,59,59,0.7)' : 'rgba(224,224,224,0.7)', }]}
            >
                <Text style={[styles.titleText as ViewStyle, { color: isDarkMode ? 'white' : 'black' }]}>
                    {item.title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    movieCardContainerStyle: {
        borderRadius: width * 0.03,
        width: width * 0.44,
        margin: width * 0.02,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    posterImageStyle: {
        borderRadius: width * 0.03,
        width: width * 0.44,
        height: height * 0.30,
    },
    movieDetailsViewContainerStyle: {
        position: 'absolute',
        margin: width * 0.005,
        backgroundColor: 'black',
        borderRadius: width * 0.055,
    },
    movieDeatilsViewStyle: {
        borderBottomLeftRadius: width * 0.03,
        borderBottomRightRadius: width * 0.03,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingVertical: width * 0.02,
        paddingHorizontal: width * 0.02,
    },
    titleText: {
        fontSize: width * 0.04
    }
});