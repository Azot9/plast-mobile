import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';


const styles = StyleSheet.create({
    bodyWrapper: {
        paddingTop: 20,
        paddingBottom: 60
    },

    itemWrapper: {
        padding: 20,
        paddingTop: 40,
        borderColor: 'rgba(0, 0, 0, .2)',
        borderBottomWidth: 1,
        width: "100%"
    },
    item: {

    }
})

export default class MemberList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            member_list: [
                {
                    id: 0,
                    name: "Ігор",
                    progress: {},
                    visiting: {}
                },
                {
                    id: 1,
                    name: "Олег",
                    progress: {},
                    visiting: {}
                },
            ]
        }
    }



    render() {
        let member_list = this.state.member_list.map( (member, index) => (
            <TouchableOpacity style={styles.itemWrapper} key={member.id} onPress={() => {
                this.props.navigation.navigate('OneMember', {
                    member
                });
            }}>
                <Text style={styles.item} >{index + 1}. {member.name}</Text>
            </TouchableOpacity>
        ))

        return (
            <View style={styles.bodyWrapper} >
                <ScrollView>
                    {member_list}
                </ScrollView>
            </View>
        );
    }
}