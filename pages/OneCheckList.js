import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Switch } from 'react-native';
import Point from "../components/Point";

const styles = StyleSheet.create({
    bodyWrapper: {
        paddingTop: 20,
        paddingBottom: 60,
        paddingHorizontal: 20
    },
    titleWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 20
    },
    titleId: {
        fontSize: 20
    },
    titleName: {
        fontSize: 16,
        paddingBottom: 2
    }
})

export default class OneCheckList extends Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            switch_value: false,
            list: this.props.route.params.list ,
            current_list: this.props.route.params.current_list 
        };
    }

    render() {
        const current_list = this.state.current_list;
        const list = this.state.list.map((item, index) => (
            <View key={index} >
                {this.setTitle(current_list[index].section_id, current_list[index].section_name)}
                {this.setList(item.section_list, current_list[index].section_list)}
            </View>
        ))
        return (
            <View style={styles.bodyWrapper} >
                {list}
            </View>
        );
    }


    setTitle(section_id, section_name) {
        if (section_id || section_name) {
            return (
                <View style={styles.titleWrapper}>
                    <Text style={styles.titleId}>{section_id}.</Text>
                    <Text style={styles.titleName}>{section_name}</Text>
                </View>
            );
        } else {
            return null;
        }
    }
    setList(section_list, current_list) {
        return section_list.map((item, index) => (
            <View key={item.id} style={styles.pointWrapper}>
                <Point point={item} current_point={current_list[index]}  />
            </View>
        ))
    }
}