import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, Platform } from 'react-native'
import Colors from 'cryptoTracker/src/res/colors';

const CoinsItem = ({ item, onPress }) => {

    const getImageArrow = () => {
        if (item.percent_change_1h > 0) {
            return require("cryptoTracker/src/assets/arrow_up.png");
        } else {
            return require("cryptoTracker/src/assets/arrow_down.png");
        }
    }

    const getSymbolIcon = () => {
        return `https://c1.coinlore.com/img/25x25/${item.nameid}.png`
    }

    return (
        <Pressable onPress={onPress} style={styles.container}>
            <View style={styles.row}>
                <Image 
                    style={styles.symbolIcon}
                    source={{ uri: getSymbolIcon() }}
                    />
                <Text style={styles.symbolText}>{item.symbol}</Text>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.priceText}>{`$${item.price_usd}`}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.percentText}>{item.percent_change_1h}</Text>
                <Image
                    style={styles.imgIcon}
                    source={getImageArrow()}
                    />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        justifyContent: 'space-between',
        borderBottomColor: Colors.zircon,
        borderBottomWidth: 1,
        paddingLeft: Platform.OS == "ios" ? 0 : 16,
        marginLeft: Platform.OS == "ios" ? 16 : 0,
    },
    row: {
        flexDirection: "row",
    },
    symbolIcon: {
        width: 25,
        height: 25,
        marginRight: 16,
    },
    symbolText: {
        color: 'white',
        fontWeight: 'bold',
        fontsize: 16,
        marginRight: 12,
    },
    nameText: {
        color: "white",
        fontSize: 14,
        marginRight: 16,
    },
    percentText: {
        color: "white",
        fontSize: 12,
        marginRight: 8,
    },
    priceText: {
        color: "white",
        fontSize: 14,
    },
    imgIcon: {
        width: 22,
        height: 22,
    }
})

export default CoinsItem;