import Toast from 'react-native-toast-message';


const showToast = (type,content) => {
    Toast.show({
        type: 'success',
        text1: 'Hello',
        text2: 'This is some something 👋'
    });
}

export default showToast;