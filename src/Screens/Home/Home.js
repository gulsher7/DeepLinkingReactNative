import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, SafeAreaView, StyleSheet, View, Text, FlatList, Image } from 'react-native';


// create a component
const Home = ({ navigation }) => {
    const [usersData, setUsers] = useState([])
    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        const headers = { 'app-id': '6186158c7f5fa01a0b0240f4' }
        try {
            const res = await axios['get']('https://dummyapi.io/data/v1/user', { headers })
            console.log("res==>>>>", res)
            setUsers(res.data.data)
        } catch (error) {
            console.log("erro riased", error)
            alert('error')
        }
    }
    const onPressItem = (item) => {
        navigation.navigate('UserDetail', { userId: item.id })
    }
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
                activeOpacity={0.8}
                onPress={() => onPressItem(item)}
            >
                <Image style={styles.imgStyle} source={{ uri: item?.picture }} />
                <Text style={styles.nameText}>{item?.firstName} {item?.lastName}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <SafeAreaView style={{ marginHorizontal: 24 }}>
                <Text style={{ ...styles.nameText, alignSelf: 'center' }}>All Users </Text>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={usersData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={() => <View style={{ marginBottom: 40 }} />}
                    ListHeaderComponent={() => <View style={{ height: 10 }} />}
                />
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imgStyle: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    nameText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 8
    }
});

export default Home;
