import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TextInput, TouchableOpacity, Alert } from 'react-native';
import { connect } from "react-redux";
import axios from 'axios';



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

class MemberList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            child_login: "",
        }
    }



    render() {
        for (const iterator of this.props.gurtok) {
            console.log(iterator);
        }


        let member_list = this.props.gurtok.map((member, index) => (
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
                        <TextInput value={this.state.child_login} onChangeText={child_login => this.setState({ child_login })} style={styles.addInput} placeholder="Логін юнака" />
                        <View style={styles.buttonAddWrapper} >
                            <Button onPress={() => this.addChild()} title="Додати" ></Button>
                        </View>
                    </View>

                </ScrollView>
            </View>
        );
    }

    addChild() {

        axios.post("http://localhost:3000/add_child",
            {
                email: this.state.child_login,
                id: this.props.user.id
            },
            {
                headers: {
                    "x-access-token": this.props.token
                }
            }).
            then(response => {
                Alert.alert("Юнака успішно додано");
                console.log(response.data);
                this.props.setGurtok(response.data.gurtok);
                console.log(this.props.gurtok);
            })
            .catch(err => {
                Alert.alert("Не можливо добавити цього юнака");
                console.log(err);
            })
    }


}


function mapStateToProps(state) {
    return {
        token: state.token,
        user: state.user,
        gurtok: state.gurtok,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setGurtok: (gurtok) => dispatch({ type: "SAVE_GURTOK", gurtok })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberList);