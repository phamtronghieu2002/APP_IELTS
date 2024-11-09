import { Button, Linking, Alert } from 'react-native';
export const handleSendEmail = () => {
    const email = 'email@example.com'; // Địa chỉ email nhận
    const subject = 'Phản hồi từ ứng dụng học IELTS'; // Tiêu đề email
    const body = 'Xin chào, tôi muốn phản hồi về ứng dụng...'; // Nội dung email

    // Tạo URL email
    const emailUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Mở ứng dụng email
    Linking.openURL(emailUrl).catch(() => {
      Alert.alert('Lỗi', 'Không thể mở ứng dụng email.');
    });
  };