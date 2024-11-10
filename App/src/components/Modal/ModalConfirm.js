import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import Modal from "react-native-modal";
import MainButton from "../Button/MainButton";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModal } from "../../fetures/settingSlice";
import { getData } from "../../utils/asyncStore";
import configs from "../../configs";

export function ModalConfirm({
    navigation
}) {

    const storeSetting = useSelector((state) => state.setting.openModal);
    const dispatch = useDispatch();




    return (
        <View style={{ flex: 1 }}>


            <Modal isVisible={storeSetting}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View className="w-[100%] h-[160px] bg-slate-50 rounded-lg flex  items-center pt-5 gap-1">
                        <Text className="font-bold">
                            Noitice
                        </Text>
                        <Text className="text-gray-600">
                            Please login  to view your performance statistics
                        </Text>
                        <View className="flex flex-row gap-3">
                            <MainButton
                                onPress={() => {
                                    dispatch(setOpenModal(false))
                                }}
                                classNames={"border"}
                                classNamesText={"text-white"}
                                backgroundColor="blue"
                                width={150}
                                title={"Later"}
                            />
                            <MainButton
                                onPress={async () => {

                                    navigation.navigate(configs?.screenName?.login, {
                                        isGuest: true,
                                        isIntro: false
                                    })
                                    dispatch(setOpenModal(false))
                                }}
                                classNamesText={"font-bold"}
                                width={150}
                                title={"Login"}
                            />
                        </View>
                    </View>

                </View>
            </Modal>
        </View>
    )
};