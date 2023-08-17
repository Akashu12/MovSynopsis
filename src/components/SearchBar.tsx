import React, { useState } from 'react';
import {
    StyleSheet,
    useColorScheme,
    Dimensions,
    TextInput,
    ViewStyle,
} from 'react-native';
import { apiKey } from '../../App';
import { useAppDispatch } from '../redux/hooks';
import { setMovies } from '../redux/moviesListSlice';
const { width } = Dimensions.get('window');

interface SearchBarProps {
    onGetInitialData:() => void;
  }

export const SearchBar = ({onGetInitialData}: SearchBarProps) => {
    const isDarkMode = useColorScheme() === 'dark';
    const dispatch = useAppDispatch();
    const [search, setSearch] = useState<string>('');

    const makeSearchAPICall = (searchValue: string) => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
        };

        fetch(`https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=en-US&page=1`, options)
            .then(response => response.json())
            .then(response => {
                dispatch(setMovies(response.results))
            })
            .catch(err => dispatch(setMovies([])));
    };

    const debounce = <T extends any[]>(fn: (...args: T) => void, delay = 1000) => {
        let timerId: NodeJS.Timeout | null = null;
        return (...args: T) => {
            if (timerId) {
                clearTimeout(timerId);
            }
            timerId = setTimeout(() => fn(...args), delay);
        };
    };

    const onInput = debounce(makeSearchAPICall, 500);

    const onSearch = (txt: string) => {
        setSearch(txt);
        if (txt.length === 0) {
            onGetInitialData();
        } else {
            onInput(txt);
        }
    };

    return (
        <TextInput
            style={[styles.input as ViewStyle, { borderColor: isDarkMode ? 'white' : 'black', }]}
            onChangeText={onSearch}
            value={search}
            placeholder="Search Movies..."
        />
    )
}

const styles = StyleSheet.create({
    input: {
        height: width * 0.1,
        width: width * 0.9,
        margin: 12,
        borderWidth: 1,
        borderRadius: width * 0.02,
        padding: 10,
    },
});