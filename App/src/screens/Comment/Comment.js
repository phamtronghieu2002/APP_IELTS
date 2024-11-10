import React, { useEffect, useRef } from 'react';
import {
    View,
    TextInput,
    ScrollView,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Keyboard,
    Text
} from 'react-native';
import MainLayout from '../../layouts/MainLayout';
import HeaderScreen from '../../components/Header/HeaderScreen';
import CommentAera from './components/CommentArea';
import Icon from 'react-native-vector-icons/Feather';
import { createComment, likeComment, replyComment } from '../../services/commentService';
import Toast from 'react-native-toast-message';
const Comment = ({ navigation, route }) => {
    const { test_id } = route.params;
    const [comments, setComments] = React.useState("");
    const [randomkey, setRandomKey] = React.useState(0);
    const [replyInformation, setReplyInfor] = React.useState(null);
    const scrollViewRef = useRef(null);
    const inputRef = useRef(null);


    const handleClickReply = (data) => {
        inputRef.current.focus();
        setReplyInfor(data);

    }
    const handleSendComment = async () => {
        try {
            if (comments === '') {
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'Error',
                    text2: 'Comment is required',
                    visibilityTime: 4000,
                    autoHide: true,
                });
                return;
            }
            if (replyInformation) {
                await replyComment(test_id, replyInformation?.parent_id, comments);
                setReplyInfor(null);

            } else {

                await createComment(test_id, comments);
                setReplyInfor(null);
            }
            setRandomKey(Math.random());
            setComments('');
            Keyboard.dismiss();

        } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
        }
    }

    const handleLikeComment = async (comment_id) => {
        try {
            await likeComment(comment_id);
            setRandomKey(Math.random());
        } catch (error) {
            console.log("error", error);

        }
    }


    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [randomkey]);


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderScreen label="Comment" navigation={navigation} />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView
                    ref={scrollViewRef} // Gán ref cho ScrollView
                    style={{ flex: 1 }}>
                    <View style={{ paddingHorizontal: 20, paddingTop: 8 }}>
                        <CommentAera
                            handleLikeComment={handleLikeComment}
                            setReplyInfor={handleClickReply}
                            randomkey={randomkey}
                            test_id={test_id}
                        />
                    </View>
                </ScrollView>
                <View
                    className="p-1"
                    style={{ backgroundColor: 'white' }}>
                    {
                        replyInformation && (
                            <View className="flex flex-row items-center mb-2">
                                <Icon name="message-circle" size={25} color="red" />
                                <Text className="ml-3">
                                    Replying to {replyInformation.username}
                                </Text>
                                <Pressable
                                    className="ml-3"
                                    onPress={() => setReplyInfor(null)}>
                                    <Icon name="x" size={25} color="gray" />
                                </Pressable>
                            </View>
                        )
                    }
                    <View className="border border-gray-300 p-3 pl-5 pr-5 flex flex-row justify-between items-center">

                        <TextInput
                            className=" w-[90%] p-4"
                            ref={inputRef}
                            value={comments}
                            onChangeText={(text) => setComments(text)}
                            style={{}}
                            placeholder='Comment'
                        />
                        <Pressable className=" p-2" onPress={handleSendComment}>
                            <Icon name="send" size={25} color="red" />
                        </Pressable>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Comment;
