import React, {Component} from 'react';
import { TextInput, StyleSheet, Platform, View } from 'react-native';
import Colors from 'cryptoTracker/src/res/colors';

class CoinSearch extends Component  {

    state = {
        query: "",
    }

    handleText = (query) => {
        this.setState({ query });

        if (this.props.onChange) {
            this.props.onChange(query);
        }
    }

    render () {

        const { query } = this.state;

        return (
            <View>
                <TextInput
                    style={[
                        styles.textInput,
                        Platform.OS == "ios" ? styles.textInputIOS
                        : styles.textInputAndroid
                        ]}
                    onChangeText={this.handleText}
                    value={query}
                    placeholder="Search coin"
                    placeholderTextColor="white"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        height: 46,
        backgroundColor: Colors.current,
        paddingLeft: 16,
        color: "white",
    },
    textInputAndroid: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.zircon,
    },
    textInputIOS: {
        margin: 8,
        borderRadius: 8,
    }
})

export default CoinSearch;