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
            point_checked: this.props.point.checked
        };
    }

    render() {
        
        return (
            <View style={styles.pointWrapper}>
                <Switch
                    disabled={!this.props.user.is_vyhovnyk}
                    onValueChange={this.toggleSwitch.bind(this, this.props.point.id)}
                    value={this.state.point_checked}>
                </Switch>

                <Text style={styles.descriptionWrapper}>
                    <Text style={styles.number}> {this.props.point.id}.
                    </Text> {this.props.current_point.description}
                </Text>
            </View>
        );
    }
    toggleSwitch(point_id) {

        axios.post("http://localhost:3000/toggle_point", {
            id: this.props.user.id,
            child_id: this.props.child_id,
            checklist_id: this.props.checklist_id,
            section_id: this.props.section_id,
            point_id,
            point_checked: !this.state.point_checked
        },
            {
                headers: {
                    "x-access-token": this.props.token
                }
            }
        ).
            then(response => {
                this.props.setGurtok(response.data.gurtok);
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
        token: state.token,
        user: state.user,
        child_id: state.child_id,
        checklist_id: state.checklist_id,
        gurtok: state.gurtok,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setGurtok: (gurtok) => dispatch({ type: "SAVE_GURTOK", gurtok }),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Point);