import React, { useState } from 'react';

import {
    View,
    Text,
    Image,
    ScrollView,
    SafeAreaView,
    FlatList,
    SectionList,
    TextInput,
    TouchableOpacity,
    Pressable,
    StyleSheet,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Progress from 'react-native-progress';

const DropdownSection = ({ nameSection, numquestions, percent, dataSection  }) => {

    const [isOpen, setIsOpen] = useState(false);
    return (
        <View className="mt-5 p-5 pt-3">
            <TouchableOpacity
                className="justify-center pt-3 rounded-xl bg-white"
                onPress={() => setIsOpen(!isOpen)}
                style={styles.header}
            >
                <View className="w-[315px] h-[60px] flex flex-col">
                    <View className=" flex-row">
                        <Icon style={{marginLeft:15}} name="school" size={24} color="#000" />
                        <Text style={styles.sectionTitle}>{nameSection}</Text>
                    </View>
                    <View className=" flex flex-row justify-between">
                        <Text style={{ marginLeft: 16 }}>{numquestions} questions</Text>
                        <Text>Correct   |</Text>
                        <View className="flex-row items-center justify-between mr-2">
                            <Progress.Bar
                                progress={percent / 100}
                                width={68}
                                color="#FF0505"
                            />
                            <Text style={styles.percentageText}>{percent}%</Text>
                            <Icon
                                name={isOpen ? 'chevron-up' : 'chevron-down'}
                                size={24}
                                color="#000"
                            />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

            {isOpen && (
                <FlatList
                scrollEnabled={false}
                    data={dataSection}
                    renderItem={({ item }) => (
                        <View className='bg-white rounded-xl ' style={styles.item}>
                            <Text style={styles.itemTitle}>
                                {'\u2022'} {item.title}
                            </Text>
                            <TouchableOpacity style={styles.progressContainer}>
                                <Text style={styles.progressText}>
                                    {item.progress}%
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item) => item.key}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        // shadown bottom
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    questionsText: {
        marginLeft: 'auto',
        marginRight: 10,
    },
    correctText: {
        marginRight: 10,
    },
    percentageText: {
        marginLeft: 5,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemTitle: {
        fontSize: 14,
        marginLeft: 10,
    },
    progressContainer: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 4,
        marginRight:10
    },
    progressText: {
        fontSize: 12,
    },
});

export default DropdownSection;
