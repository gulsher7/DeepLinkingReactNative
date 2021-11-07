import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Share from 'react-native-share';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const UserDetail = ({ navigation, route }) => {
    const { userId } = route.params

    const [usersDetail, setUserDetail] = useState({})
    useEffect(() => {
        getUserDetail()
    }, [])

    const getUserDetail = async () => {
        const headers = { 'app-id': '6186158c7f5fa01a0b0240f4' }
        try {
            const res = await axios['get'](`https://dummyapi.io/data/v1/user/${userId}`, { headers })
            console.log("res==>>>>", res.data)
            setUserDetail(res.data)
        } catch (error) {
            console.log("erro riased", error)
            alert('error')
        }
    }

    const generateLink = async () => {
        try {
            var link = await dynamicLinks().buildShortLink({
                link: `https://deeplinkmyapp.page.link/ezHe?id=${userId}`,
                domainUriPrefix: 'https://deeplinkmyapp.page.link',
                android: {
                    packageName: 'com.deeplinkingproject',
                    minimumVersion: '18'
                },
                ios: {
                    appStoreId: '123456789',
                    bundleId: 'com.deepLinkingProjectBundleId',
                    minimumVersion: '18'
                },
            },
                dynamicLinks.ShortLinkType.DEFAULT
            )
            return link
        } catch (error) {
            console.log("error raised", error)
        }
    }

    const shareUser = async (id) => {
        const getLink = await generateLink()
        console.log("get linkkk kdjfkdlfdf",getLink)
        const res = await Share.open(({
            message: 'Dummy message',
            url: getLink
        }))
        console.log("res==>>>", res)
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ marginHorizontal: 24 }}>
                <Text style={{ ...styles.nameText, alignSelf: 'center' }}>User Detail</Text>
                <Image
                    source={{ uri: usersDetail?.picture }}
                    style={styles.imgStyle}
                />
                <Text style={styles.nameText}>{usersDetail?.firstName} {usersDetail?.lastName}</Text>

                <Text>Email: {usersDetail?.email}</Text>
                <Text style={{ marginVertical: 8 }}>Phone: {usersDetail?.phone}</Text>
                <Text>Country: {usersDetail?.location?.country}</Text>

                <TouchableOpacity
                    style={styles.btnStyle}
                    onPress={() => shareUser(userId)}
                >
                    <Text style={{
                        color: 'blue'
                    }}>Share this user</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.btnStyle}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={{
                        color: 'red'
                    }}>Go Back</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imgStyle: {
        width: '100%',
        height: '40%',
        borderRadius: 30,
        backgroundColor: 'rgba(0,0,0,0.1)',
        alignSelf: 'center',
        marginTop: 16
    },
    nameText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 8,
        alignSelf: 'center',
        marginVertical: 8
    },
    btnStyle: {
        height: 42,
        width: '100%',
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.4)',
        marginVertical: 8
    }
});

export default UserDetail;
