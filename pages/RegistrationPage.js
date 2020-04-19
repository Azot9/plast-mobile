import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Keyboard, TouchableWithoutFeedback } from 'react-native';
import axios from 'axios';
import setToken from "../actions"
import { connect } from "react-redux";


const styles = StyleSheet.create({
    bodyWrapper: {
        justifyContent: 'space-around',
        height: '100%'
    },
    topBarWrapper: {
        backgroundColor: '#ffffff',
        fontWeight: 'bold',
        fontSize: 30,
        height: 84,
        borderColor: 'rgba(0, 0, 0, .5)',
        borderBottomWidth: 1,
        justifyContent: 'flex-end'
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: "space-between",
        width: "100%",
        paddingBottom: 10,
        paddingLeft: 16,
        paddingRight: 16
    },
    text: {
        fontSize: 17,
        color: "#FF2D55"
    },
    inputsWrapper: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 36,
        borderRadius: 10,
        backgroundColor: 'rgba(142, 142, 147, 0.12)',
        paddingVertical: 7,
        paddingHorizontal: 13,
        width: "90%",
        marginBottom: 16,
        fontSize: 16
    },
    tabs: {
        flexDirection: "row",
        justifyContent: 'space-between',
        padding: 16,
        paddingBottom: 40
    },
});


class RegistrationPage extends Component {
    state = {
        email: '',
        password: '',
        name: '',
        surname: '',
        is_loging_in: true
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.bodyWrapper} >
                    <View style={styles.topBarWrapper}>
                        <View style={styles.topBar}>
                            <Text style={styles.text}>Plast</Text>
                            <Text style={styles.text}>11-18</Text>
                        </View>
                    </View>
                    {this.chosedInputs()}
                    <View style={styles.tabs}>
                        <Button onPress={() => this.chooseLogIn()} title="Log in" />
                        <Button onPress={() => this.chooseSignUp()} title="Sign up" />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    chosedInputs() {
        if (this.state.is_loging_in) {
            return (
                <View style={styles.inputsWrapper}>
                    <TextInput value={this.state.email} onChangeText={email => this.setState({ email })} style={styles.textInput} placeholder="login" />
                    <TextInput value={this.state.password} onChangeText={password => this.setState({ password })} style={styles.textInput} placeholder="password" secureTextEntry={true} />
                    <Button onPress={() => this.logIn()} title="Log in" />
                </View>
            )
        } else {
            return (
                <View style={styles.inputsWrapper}>
                    <TextInput value={this.state.name} onChangeText={name => this.setState({ name })} style={styles.textInput} placeholder="name" />
                    <TextInput value={this.state.surname} onChangeText={surname => this.setState({ surname })} style={styles.textInput} placeholder="surname" />
                    <TextInput value={this.state.email} onChangeText={email => this.setState({ email })} style={styles.textInput} placeholder="login" />
                    <TextInput value={this.state.password} onChangeText={password => this.setState({ password })} style={styles.textInput} placeholder="password" secureTextEntry={true} />
                    <Button onPress={() => this.signUp()} title="Sign Up" />
                </View>
            )
        }

    }

    chooseLogIn() {
        this.setState({
            is_loging_in: true
        });
    }

    chooseSignUp() {
        this.setState({
            is_loging_in: false
        });
    }

    logIn() {
        axios.post("http://localhost:3000/", {
            email: this.state.email,
            password: this.state.password
        }).
            then(response => {
                this.props.setToken(response.headers["x-auth-token"]);
                // console.log(response.headers["x-auth-token"]);
                this.props.setUser(response.data);
                this.props.navigation.navigate('MemberList');
            })
            .catch(err => {
                console.log(123123);
                console.log(err);
            })
    }
    signUp() {
        axios.post("http://localhost:3000/registration", {
            is_vyhovnyk: false,
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            surname: this.state.surname
        }).
            then(response => {
                console.log(response.data);
            })
    }
}


function mapStateToProps(state) {
    return {
        token: state.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setToken: (token) => dispatch({ type: "SAVE_TOKEN", token }),
        setUser: (user) => dispatch({ type: "SAVE_USER", user })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);