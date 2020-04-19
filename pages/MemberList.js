import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TextInput, TouchableOpacity } from 'react-native';


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
    addNewWrapper: {
        padding: 20,
        paddingTop: 60
    },
    addInput: {
        borderBottomColor: "#000",
        borderBottomWidth: 1,
        height: 30,
        marginTop: 30,
        paddingLeft: 8,
        paddingBottom: 10,
        fontSize: 16
    },
    buttonAddWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 20
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
        let member_list = this.state.member_list.map((member, index) => (
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
                    <View>
                        {member_list}
                    </View>
                    <View style={styles.addNewWrapper}>
                        <Text>Добавити нового юнака</Text>
                        <TextInput style={styles.addInput} placeholder="Логін юнака" />
                        <View style={styles.buttonAddWrapper} >
                            <Button title="Додати"></Button>
                        </View>
                    </View>

                </ScrollView>
            </View>
        );
    }
}