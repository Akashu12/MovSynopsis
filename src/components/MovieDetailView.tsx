import React from 'react';
import {
    Text,
    View,
    Dimensions,
    StyleSheet,
    ViewStyle
} from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import ReactNativeModal from 'react-native-modal';
import { Movie } from './MovieCard';
import { RatingComponent } from './RatingComponent';

const { width, height } = Dimensions.get('window');
interface modalViewProps {
    item: Movie,
    visible: boolean,
    onHide: () => void
}
export const MovieDetailsView = ({item, visible, onHide}: modalViewProps ) => {
    

    return (
        <ReactNativeModal
            backdropColor="#B4B3DB"
            backdropOpacity={0.9}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={600}
            animationOutTiming={600}
            backdropTransitionInTiming={600}
            backdropTransitionOutTiming={600}
            onModalHide={() => onHide()}
            isVisible={visible}
            onBackdropPress={() => onHide()}
            
        >
            <View style={styles.modalContainerStyle as ViewStyle}>
                <FastImage
                    style={styles.posterImageStyle as FastImageProps["style"]}
                    source={{
                        uri: `https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <RatingComponent item={item} />
                <View style={{width: width*0.90, padding: width*0.02}}>
                    <Text style={styles.labelStyle}>Title: <Text style={styles.textStyle}>{item.title}</Text></Text>
                    <Text style={styles.labelStyle}>Release Date: <Text style={styles.textStyle}>{item.release_date}</Text></Text>
                    <Text style={styles.labelStyle}>About Movie: <Text style={styles.textStyle}>{item.overview}</Text></Text>
                </View>
            </View>
        </ReactNativeModal>
    )
}

const styles = StyleSheet.create({
    modalContainerStyle: {
        maxHeight: height * 0.70,
        borderRadius: width * 0.03,
        width: width * 0.90,
        backgroundColor: 'rgb(61,59,59)'
    },
    posterImageStyle: {
        borderTopRightRadius: width * 0.03,
        borderTopLeftRadius: width * 0.03,
        width: width * 0.90,
        height: height * 0.35,
    },
    labelStyle: {
        color: 'white',
        fontSize: width*0.035,
        fontWeight: 'bold',
        marginBottom: width*0.02
    },
    textStyle: {
        fontSize: width*0.035,
        color: '#EEEDED',
        fontWeight: 'normal',
    },
});



