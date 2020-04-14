import React, { Component } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
// import check_lists from "../public/check_list"
import { connect } from "react-redux";
import axios from 'axios';


const styles = StyleSheet.create({
    pointWrapper: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    descriptionWrapper: {
        paddingHorizontal: 20,
        width: "auto"
    },
    number: {
        fontWeight: "800"
    }
})

class Point extends Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            point_checked: this.props.checked
        };
    }

    render() {
        return (
            <View style={styles.pointWrapper}>
                <Switch
                    onValueChange={this.toggleSwitch.bind(this)}
                    value={this.state.point_checked}>
                </Switch>

                <Text style={styles.descriptionWrapper}>
                    <Text style={styles.number}> {this.props.point.id}.
                    </Text> {this.props.point.description}
                </Text>
            </View>
        );
    }
    toggleSwitch(checked) {

        axios.post("http://localhost:3000/lol", {
            lol: "zazaza"
        },
            {
                headers: {
                    "x-access-token": this.props.token
                }
            }
        ).
            then(response => {
                console.log(response.data);
            }).catch(err => {
                console.log(err);
            })

        this.setState({
            point_checked: !this.state.point_checked
        })
    }
}

function mapStateToProps(state) {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(Point);