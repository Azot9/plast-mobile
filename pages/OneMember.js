import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import check_lists from "../public/check_list"
import { connect } from "react-redux";

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

class OneMember extends Component {

    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            member: props.route.params ? props.route.params.member : null
        };
    }

    render() {
        let current_member;
        if(this.props.user.is_vyhovnyk) {
            current_member = this.state.member;
        } else {
            current_member = this.props.user;
        }
        const user_check_lists = [current_member.check_list_zero, current_member.check_list_first, current_member.check_list_second];
        user_check_lists.map(item => {
            console.log(item)
        })
        const member_check_list = user_check_lists.map((item, index) => {
            const current_check_lists = check_lists.find(check_item => check_item.id == item.id);
            return (
                <TouchableOpacity key={item.id} style={styles.checkElWrapper} onPress={() => {
                    this.props.navigation.navigate('OneCheckList', {
                        list: item.list,
                        current_list: current_check_lists.list
                    });
                }}>
                    <Text style={styles.checkEl}>{index}.  {current_check_lists.name}</Text>
                </TouchableOpacity>
            )
        })
        return (
            <View style={styles.bodyWrapper} >
                <Text style={styles.nameTitle}>{current_member.name}</Text>
                {member_check_list}
            </View>
        );
    }
}


function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(OneMember);