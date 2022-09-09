import React, { Component } from 'react';
import { 
    View, 
    Text, 
    Image, 
    StyleSheet, 
    SectionList, 
    Pressable, 
    FlatList, 
    Alert 
} from 'react-native';
import Colors from 'cryptoTracker/src/res/colors'
import Http from 'cryptoTracker/src/libs/http';
import CoinMarketItem from './CoinMarketItem';
import Storage from 'cryptoTracker/src/libs/storage';

class CoinDetailScreen extends Component {

    state = {
        coin: {},
        markets: [],
        isFavorite: false,
    }

    toggleFavorite = () => {
        if (this.state.isFavorite) {
            this.removeFavorite();
        } else {
            this.addFavorite();
        }
    }

    addFavorite = async () => {
        const coin = JSON.stringify(this.state.coin);
        const key = `favorite-${this.state.coin.id}`;

        const stored = await Storage.instance.store(key, coin);

        console.log("stored", stored);

        if (stored) {
            this.setState({ isFavorite: true })
        }
    }

    removeFavorite = () => {

        Alert.alert("Remove favorite", "Are you sure", [
            {
                text: "No, cancel",
                onPress: () => {},
                style: "cancel"
            }, {
                text: "Yes, remove",
                onPress: async () => {
                    
                    const key = `favorite-${this.state.coin.id}`;

                    await Storage.instance.remove(key);

                    this.setState({ isFavorite: false });
                },
                style: "destructive",
            }
        ])
    }

    getFavorite = async () => {
        try {

            const key = `favorite-${this.state.coin.id}`;
    
            const favStr = await Storage.instance.get(key);

            console.log("fav", favStr);

            if (favStr !== null) {
                this.setState({ isFavorite: true });
            }

        } catch (err) {

            console.log("get favorites error", err);

            throw Error(err);
        }
    }

    getSymbolIcon = (nameStr) => {

        if (nameStr) {
            const name = nameStr.toLowerCase().replace(" ", "-");
            return `https://c1.coinlore.com/img/25x25/${name}.png`
        }

    }

    getSections = (coin) => {
        const sections = [
            {
                title: "Market cap",
                data: [coin.market_cap_usd],
            },
            {
                title: "Volume 24h",
                data: [coin.volume24],
            }, 
            {
                title: "Change 24h",
                data: [coin.percent_change_24h],
            }]
            return sections;
    }

    getMarkets = async (coinId) => {
        const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;

        const markets = await Http.instance.get(url);

        this.setState({ markets });
    }

    componentDidMount() {
        const { coin  } = this.props.route.params;

        this.props.navigation.setOptions({ title: coin.symbol});

        this.getMarkets(coin.id);

        
        this.setState({ coin }, () => {
            this.getFavorite();
        });
    }

    render() {

        const { coin, markets, isFavorite } = this.state

        return (
            <View style={styles.container}>
                <View style={styles.subHeader}>
                    <View style={styles.row}>
                        <Image 
                            style={styles.iconImage}
                            source={{uri: this.getSymbolIcon(coin.name)}}
                        />
                        <Text style={styles.titleText}>{coin.name}</Text>
                    </View>

                    <Pressable 
                        style={[
                            styles.btnFavorite,
                            isFavorite ? 
                            styles.btnFavoriteRemove :
                            styles.btnFavoriteAdd
                        ]}
                        onPress={this.toggleFavorite}
                        >
                        <Text style={styles.btnFavoriteText}>{isFavorite ? "Remove favorite" : "Add Favorite"}</Text>
                    </Pressable>
                </View>
                <SectionList 
                    style={styles.section}
                    sections={this.getSections(coin)}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => 
                        <View style={styles.sectionItem}>
                            <Text style={styles.itemText}>{item}</Text>
                        </View>
                        }
                    renderSectionHeader={({ section }) => 
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>{section.title}</Text>
                        </View>
                    }
                    />

                    <Text style={styles.marketsTitle}>Markets</Text>
                    <FlatList 
                        style={styles.list}
                        horizontal={true}
                        data={markets}
                        renderItem={({item}) => <CoinMarketItem item={item} />}
                        />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.current,
    },
    iconImage: {
        width: 25,
        height: 25,
    },
    row: {
        flexDirection: "row",
    },
    titleText: {
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.white,
        marginLeft: 8,
    },
    subHeader: {
        backgroundColor: "rgba(0,0,0,0.1)",
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    section: {
        maxHeight: 220,
    },
    sectionHeader: {
        backgroundColor: "rgba(0,0,0, 0.2)",
        padding: 8,
    },
    sectionItem: {
        padding: 8,
    },
    itemText: {
        color: Colors.white,
        fontSize: 14,
    },
    list: {
        maxHeight: 100,
        paddingLeft: 16,
    },
    marketsTitle: {
        color: Colors.white,
        fontSize: 16,
        marginBottom:  16,
        marginLeft: 16,
        fontWeight: "bold",
    },
    sectionTitle: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: "bold",
    },
    btnFavorite: {
        padding: 8,
        borderRadius: 8,
    },
    btnFavoriteAdd: {
        backgroundColor: Colors.picton,
    },
    btnFavoriteRemove: {
        backgroundColor: Colors.carmine,
    },
    btnFavoriteText: {
        color: Colors.white,
    }
})

export default CoinDetailScreen