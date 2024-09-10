// import * as Notifications from 'expo-notifications';
// import * as Permissions from 'expo-permissions';
// export const registerForPushNotificationsAsync = async () => {
//     const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
//     let finalStatus = existingStatus;
  
//     // Nếu trạng thái hiện tại là chưa cấp quyền, yêu cầu cấp quyền
//     if (existingStatus !== 'granted') {
//       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//       finalStatus = status;
//     }
  
//     // Nếu người dùng không cấp quyền, không làm gì
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
  
//     // Lấy token thông báo
//     const token = await Notifications.getExpoPushTokenAsync();
//     console.log(token);
//     return token;
//   };
  
//   // Thiết lập notification
//   export const schedulePushNotification = async () => {
//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: "You've got a new message!",
//         body: 'Here is the notification body',
//         data: { data: 'goes here' },
//       },
//       trigger: { seconds: 2 }, // Gửi thông báo sau 2 giây
//     });
//   };s