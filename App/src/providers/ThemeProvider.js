import React, { useContext, useState } from "react";
import { useColorScheme } from 'react-native';
import { NativeWindStyleSheet } from "nativewind";
import { getData, storeData } from "../utils/asyncStore";

// Khởi tạo context
export const ThemeContext = React.createContext();

// Provider quản lý theme
export const ThemeProvider = ({ children }) => {
    const colorScheme = useColorScheme();  // Lấy theme từ hệ điều hành
    const [theme, setTheme] = useState('light');  // State để lưu theme hiện tại

    NativeWindStyleSheet.setColorScheme("dark");
    // const initTheme = async () => {
    //     try {
    //         const storedTheme = await getData("theme");
    //         console.log('====================================');
    //         console.log(storedTheme);
    //         console.log('====================================');
    //         if (!storedTheme) {
    //             await storeData("theme", "light"); // Lưu theme mặc định là "light"
    //             NativeWindStyleSheet.setColorScheme("light");
    //             setTheme('light');
    //         } else {
    //             NativeWindStyleSheet.setColorScheme(storedTheme);
    //             setTheme(storedTheme);
    //         }
    //     } catch (error) {
    //         console.error("Failed to initialize theme", error);
    //     }
    // };

    // // Thay đổi class NativeWind dựa vào colorScheme hoặc lưu theme
    // React.useEffect(() => {
    //     initTheme();
    // }, [colorScheme]);

    // // Hàm để thay đổi theme
    const toggleTheme = async (newTheme) => {
        setTheme(newTheme);
        NativeWindStyleSheet.setColorScheme(newTheme);
        await storeData("theme", newTheme);  // Lưu theme vào storage
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Hook để truy cập theme từ bất kỳ component nào
export const useTheme = () => useContext(ThemeContext);
