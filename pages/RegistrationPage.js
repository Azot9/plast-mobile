import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Alert, Keyboard, TouchableWithoutFeedback, Switch } from 'react-native';
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    switcherAndInputs: {
        flexGrow: 1,
        justifyContent: 'center'
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
    switchWrapper: {
        paddingBottom: 20,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center'
    },
    switcher: {
        marginHorizontal: 30
    }
});


class RegistrationPage extends Component {
    state = {
        email: '',
        password: '',
        name: '',
        surname: '',
        is_loging_in: true,
        is_vyhovnyk: false
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.bodyWrapper} >
                    <View style={styles.topBarWrapper}>
                        <View style={styles.topBar}>
                            <Text style={styles.text}>Plast</Text>
                            <Text style={styles.text}>{this.state.is_vyhovnyk ? "18-35" : "11-18"}  </Text>
                        </View>
                    </View>
                    <View style={styles.switcherAndInputs}>
                        <View style={styles.switchWrapper}>
                            <Text>Юнак</Text>
                            <Switch
                                style={styles.switcher}
                                onValueChange={this.toggleSwitch.bind(this)}
                                value={this.state.is_vyhovnyk}
                                ios_backgroundColor="#7f0000"
                                trackColor={{ true: '#004d40', false: '#7f0000' }}
                            >
                            </Switch>
                            <Text>Виховник</Text>
                        </View>
                        {this.chosedInputs()}
                    </View>
                    <View style={styles.tabs}>
                        <Button onPress={() => this.chooseLogIn()} title="Увійти" />
                        <Button onPress={() => this.chooseSignUp()} title="Зареєструватись" />
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
                    <Button onPress={() => this.logIn()} title="Увійти" />
                </View>
            )
        } else {
            return (
                <View style={styles.inputsWrapper}>
                    <TextInput value={this.state.name} onChangeText={name => this.setState({ name })} style={styles.textInput} placeholder="name" />
                    <TextInput value={this.state.surname} onChangeText={surname => this.setState({ surname })} style={styles.textInput} placeholder="surname" />
                    <TextInput value={this.state.email} onChangeText={email => this.setState({ email })} style={styles.textInput} placeholder="login" />
                    <TextInput value={this.state.password} onChangeText={password => this.setState({ password })} style={styles.textInput} placeholder="password" secureTextEntry={true} />
                    <Button onPress={() => this.signUp()} title="Зареєструватись" />
                </View>
            )
        }
    }

    toggleSwitch() {
        this.setState({
            is_vyhovnyk: !this.state.is_vyhovnyk
        });
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
            password: this.state.password,
            is_vyhovnyk: this.state.is_vyhovnyk
        }).
            then(response => {
                this.props.setToken(response.headers["x-auth-token"]);
                this.props.setUser(response.data.user);
                if (response.data.gurtok) {
                    this.props.setGurtok(response.data.gurtok);
                }
                if (this.state.is_vyhovnyk) {
                    this.props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'MemberList' }],
                    });
                } else {
                    this.props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'OneMember' }],
                    });
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    signUp() {
        axios.post("http://localhost:3000/registration", {
            is_vyhovnyk: this.state.is_vyhovnyk,
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            surname: this.state.surname
        }).
            then(response => {
                console.log(response.data);
                Alert.alert("Дякуємо!", "Ви успішно зареєстрован, тепер перейдіть до входу.");
            })
            .catch(err => {
                Alert.alert("Помилка!", "Щось пішло не так...");
                console.log(err);
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
        setUser: (user) => dispatch({ type: "SAVE_USER", user }),
        setGurtok: (gurtok) => dispatch({ type: "SAVE_GURTOK", gurtok })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);