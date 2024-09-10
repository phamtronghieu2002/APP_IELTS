import Toast from 'react-native-toast-message';


const showToast = (type, content) => {
    Toast.show({
        type,
        text1: content,
    });
}

export default showToast;