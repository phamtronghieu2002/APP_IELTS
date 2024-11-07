import React, { useCallback, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types'
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
    Button,
} from 'react-native';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconFather from 'react-native-vector-icons/Feather';
import IconAwsomwe from 'react-native-vector-icons/FontAwesome';
import IconMe from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import ModalBookmark from '../Modal/ModalBookmark';
import Modal from "react-native-modal";
import BottomSheet from '@gorhom/bottom-sheet';
import { Sheet } from 'react-modal-sheet';
import BottomSheetExample from '../Modal/ModalBookmark';
import configs from '../../configs';
import { ModalConfirm } from '../Modal/ModalConfirm';
import { setOpenModal } from '../../fetures/settingSlice';
const ActionBar = ({
    total_correct,
    total_question,
    onPressNext,
    classNames,
    navigation
}) => {

    const icon = total_correct == total_question
        ? "https://res.cloudinary.com/dzpj1y0ww/image/upload/v1728032233/ielts/happy-face_1_r8nulh.png"
        : "https://res.cloudinary.com/dzpj1y0ww/image/upload/v1728032427/ielts/sad_1_gnhkwx.png";
    const colorText = total_correct == total_question ? "text-green-500" : "text-red-500";

    const testStore = useSelector((state) => state.test);
    const userStore = useSelector((state) => state.user);
    const dispatch = useDispatch();


    const [isModalVisible, setModalVisible] = useState(false);
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    const sheetRef = useRef(null);

    const handleOpenSheet = useCallback(() => {
        sheetRef.current?.expand();
    }, []);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


    const handleClickCommentButton = () => {


        if (userStore?.user?.email) {

            navigation.navigate(configs.screenName.comment, {
                test_id: testStore?.testResults?.test_id
            });
        } else {
            navigation.navigate(configs?.screenName?.login, {
                isGuest: true,
                isIntro: false,
                isCommentScreen: true
            })

        }



    }

    return (
        <>
            <View
                style={{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 2,
                        height: 2,
                    },
                    shadowOpacity: 0.5,
                    shadowRadius: 3.84,
                    elevation: 5,
                    flex: 1
                }}
                className={`w-full  h-[90px] bg-slate-50 fixed shadow-2xl rounded-xl flex flex-row items-center mb-20 pl-5 pr-8 justify-between ${classNames}`} >
                <View className="flex flex-row items-center gap-3">
                    <Image
                        style={{ width: 30, height: 30 }}
                        source={{
                            uri: icon,
                        }}
                    />
                    <Text className={`text-lg font-bold  ${colorText}`}>
                        {
                            `Correct: ${total_correct}/${total_question}`
                        }
                    </Text>
                </View>
                <View className="actions flex flex-row gap-5 items-center">





                    <Pressable className="relative" onPress={toggleModal}>
                        {
                            testStore?.testResults?.bookmark && <View className="w-[10px] h-[10px] bg-yellow-400 rounded-full absolute z-10 right-[-2px] top-[-1px]">

                            </View>
                        }
                        <IconAwsomwe name="bookmark" size={33} color="violet" />
                    </Pressable>





                    <Pressable className="" onPress={handleClickCommentButton}>
                        <IconMe name="message" size={33} color="blue" />
                    </Pressable>

                    <Pressable className="" onPress={onPressNext}>
                        <IconIon name="arrow-forward-circle-sharp" size={45} color="green" />
                    </Pressable>



                </View>
            </View>
            {
                isModalVisible && <BottomSheetExample
                    note={testStore?.testResults?.note_bookmark}
                    test_id={testStore?.testResults?.test_id}
                    cb={toggleModal}
                />
            }
            {/* <ModalConfirm /> */}
        </>
    );
};

ActionBar.propTypes = {
};
export default ActionBar;