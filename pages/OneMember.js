import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import check_lists from "../public/check_list"

const styles = StyleSheet.create({
    bodyWrapper: {
        paddingTop: 20,
        paddingBottom: 60,
        paddingHorizontal: 20
    },
    nameTitle: {
        fontSize: 32,
        paddingBottom: 30
    },
    checkElWrapper: {
        paddingTop: 30,
        paddingBottom: 10,
        borderColor: 'rgba(0, 0, 0, .2)',
        borderBottomWidth: 1,
    },
    checkEl: {
        fontSize: 18
    }
})

export default class OneMember extends Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            member: props.route.params.member
        };
    }

    render() {
        const member_check_list = check_lists.map((item, index) => (
            <TouchableOpacity key={item.id} style={styles.checkElWrapper} onPress={() => {
                this.props.navigation.navigate('OneCheckList', {
                    list: item.list
                });
            }}>
                <Text style={styles.checkEl}>{index}.  {item.name}</Text>
            </TouchableOpacity>
        ))
        return (
            <View style={styles.bodyWrapper} >
                <Text style={styles.nameTitle}>{this.state.member.name}</Text>
                {member_check_list}
            </View>
        );
    }
}