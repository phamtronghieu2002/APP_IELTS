import React, { useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, KeyboardAvoidingView, Platform } from 'react-native';

import BottomSheet, { BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import { TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { addBookmark } from '../../services/testResultServices';
import Toast from 'react-native-toast-message';
const BottomSheetExample = ({
    cb,
    test_id,
    note
}) => {
    // ref
    const bottomSheetRef = useRef(null);
    const [note_bookmark, setNoteBookmark] = React.useState(note);
    // callbacks
    const handleSheetChanges = useCallback((index) => {

        index == -1 && cb?.()
    }, []);

    // variables
    const snapPoints = ['15%']; // Ví dụ: snap tại 50% chiều cao màn hình

    // renders

    const handleSave = async () => {
        try {
            await addBookmark(test_id, note_bookmark);
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Thành công',
                text2: 'Đã thêm bookmark'
            });
            cb?.()
        } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
        }
    }

    const handleCancel = async () => {
        try {
            await addBookmark(test_id, note_bookmark, false);
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Thành công',
                text2: 'Đã bỏ bookmark'
            });
            cb?.()
        } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
        }
    }

    return (

        <BottomSheet
            ref={bottomSheetRef}
            index={0} // Bắt đầu ở snap point đầu tiên
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            enablePanDownToClose={true} // Cho phép kéo xuống để đóng
            keyboardBehavior='fillParent' // Tự động điều chỉnh khi bàn phím hiện lên
            keyboardBlurBehavior='restore' // Tự động điều chỉnh khi bàn phím hiện lên
        >
            <BottomSheetView style={styles.contentContainer}>
                <KeyboardAvoidingView

                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >

                    <View className="w-full">
                        <View className="bg-red-600">


                            <BottomSheetTextInput
                                value={note_bookmark}
                                onChangeText={setNoteBookmark}
                                style={{ backgroundColor: 'white', borderColor: 'gray', borderWidth: 1, height: 100, padding: 10 }}

                                placeholder="Nhập nội dung bookmark"
                                multiline
                            />
                        </View>
                        <View className="flex flex-row gap-4 mt-4">
                            {/* Nút Lưu */}
                            <Pressable

                                onPress={handleSave}
                                className="flex flex-row items-center px-4 py-2 bg-blue-600 rounded-lg">
                                <Icon name="save" size={20} color="#fff" />
                                <Text className="text-white text-lg font-semibold ml-2">Lưu</Text>
                            </Pressable>

                            {/* Nút Bỏ bookmark */}
                            <Pressable
                                onPress={handleCancel}
                                className="flex flex-row items-center px-4 py-2 bg-red-400 rounded-lg">
                                <Icon name="bookmark-remove" size={20} color="#fff" />
                                <Text className="text-white text-lg font-semibold ml-2">Bỏ bookmark</Text>
                            </Pressable>
                        </View>
                    </View>
                </KeyboardAvoidingView>

            </BottomSheetView>
        </BottomSheet>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        // height: 300, // Không cần thiết khi đã dùng snapPoints
        padding: 36,
        paddingBottom: 0,
        alignItems: 'center',
    },
});

export default BottomSheetExample;