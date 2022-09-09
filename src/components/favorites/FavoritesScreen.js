import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import FavoritesEmptyState from './FavoritesEmptyState';
import Colors from 'cryptoTracker/src/res/colors';
import Storage from 'cryptoTracker/src/libs/storage';
import CoinsItem from '../coins/CoinItem';

class FavoritesScreen extends Component {

    state = {
        favorites: [],
    }

    getFavorites = async () => {
        try {
            const allKeys = await Storage.instance.getAllKeys();

            const keys = allKeys.filter((key) => key.includes("favorite-"));

            const favs = await Storage.instance.multiGet(keys);

            const favorites = favs.map((fav) => JSON.parse(fav[1]));
            
            console.log("favs", favorites);

            this.setState({ favorites });

        } catch (err) {
            console.log("get favorites err", err);
        }
    }

    handlePress = (coin) => {
        this.props.navigation.navigate("CoinDetail", { coin });
    }

    componentDidMount() {
        this.props.navigation.addListener("focus", this.getFavorites);
    }

    componentWillUnmount() {
        this.props.navigation.removeListener("focus", this.getFavorites);
    }

    render () {

        const { favorites } = this.state;
        return (
            <View style={styles.container}>
                {
                    favorites.length < 1 ? <FavoritesEmptyState />
                    : <FlatList 
                        data={favorites}
                        renderItem={({ item }) => 
                            <CoinsItem 
                                item={item} 
                                onPress={() => this.handlePress(item)} 
                                />}
                        />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.current,
    }
});

export default FavoritesScreen;