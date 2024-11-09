import React from 'react';
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
} from 'react-native';
import dayjs from 'dayjs';
import { use } from 'i18next';
import { useSelector } from 'react-redux';
const CommentItem = ({ data, setReplyInfor, handleLikeComment }) => {


    const userStorage = useSelector(state => state.user);

    return (
        <View className=''>
            <View className="main_content flex flex-row  items-start ">
                <View className="avatar  ">
                    <Image
                        style={{ width: 30, height: 30, borderRadius: 50 }}

                        source={{
                            uri: data?.user_id?.avatarPicture
                        }}
                    />
                </View>
                <View className="information flex flex-col gap-2 flex-1 ml-2">
                    <Text className="text-blue-500">
                        {data?.user_id?.displayname}
                    </Text>
                    <Text className="">
                        {data.content}
                    </Text>

                    <View className="actions flex flex-row">
                        <Text className="">
                            {dayjs(data.createdAt).format('DD/MM/YYYY')}

                        </Text>
                        <Pressable className="ml-3 mr-3" onPress={() => {
                            handleLikeComment(data._id)
                        }}>
                            <Text className="font-bold">
                                {data?.likes?.length > 0 && data?.likes?.includes(userStorage?.user?._id) ? `Unlike (${data?.likes?.length})` : (data?.likes?.length > 0 ? `like (${data?.likes?.length})` : "like")}
                            </Text>
                        </Pressable>
                        <Pressable

                            className="" onPress={() => {
                                setReplyInfor({
                                    username: data.user_id.displayname,
                                    parent_id: data._id
                                })
                            }}>
                            <Text className="font-bold">
                                Reply
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <View className="sub_content ml-10 mt-3">
                {
                    data?.replies.map((item, index) => {
                        return <CommentItem
                            handleLikeComment={handleLikeComment}
                            setReplyInfor={setReplyInfor}
                            key={index} data={item} />

                    })
                }
            </View>
        </View>
    );
};

CommentItem.propTypes = {
};
export default CommentItem;