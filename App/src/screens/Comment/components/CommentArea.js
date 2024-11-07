import React, { useEffect, useState } from 'react';
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
import CommentItem from './CommentItem';
import { use } from 'i18next';
import { getCommentByTestId } from '../../../services/commentService';

const CommentAera = ({
    data,
    test_id,
    randomkey,
    setReplyInfor,
    handleLikeComment
}) => {
  
    const [comments,setComments] = useState([]);

    const fetchComment = async () => {
        try {
            const response = await getCommentByTestId(test_id);
            const json =  response.data;
            setComments(json);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchComment();
    }, [randomkey]);
    return (
        <View className=''>
            {
              comments?.map((comment, index) => {
                    return <CommentItem 
                    handleLikeComment={handleLikeComment}
                    setReplyInfor={setReplyInfor}
                    key={index} data={comment} />

                })
            }
        </View>
    );
};

CommentAera.propTypes = {
};
export default CommentAera; 