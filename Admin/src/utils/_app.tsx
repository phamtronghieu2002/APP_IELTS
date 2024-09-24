import { _const } from "../_constant"
import { api, history } from "../_helper"
import { IServerMenu } from "../_types/interfaceType"
import { IUserInfo } from "../_types/userType"
import { store } from "../app/store"
import { routeConfig } from "../configs/routeConfig"
import { Coppy } from "../conponents/Coppy"
import {
  IRouteModalProps,
  setMenu,
  setRouteModalState,
  // settingApp,
} from "../features/interface/interfaceSlice"
import {
  IUserAccess,
  setCmcServer,
  setDriver,
  setUserAccess,
  setUserChild,
} from "../features/user/userSlice"
// import { getCmcServerService } from "../services/dev_cmcServerServices"
import { getMenuService } from "../services/interfaceServices"

import {
  deleteUserService,
  disableService,
  getUserChildService,
  getUserInfoService,
  logoutService,
  resetPassService,
} from "../services/userServices"
import { _array } from "./_array"
import { requestFCMToken } from "./firebase"
import { getString } from "./getString"
import storage from "./storage"

type REALTIME_PROMISE_DATA = "gps" | "info" | "alarm"

export const _app = {
  logout: async () => {
    logoutService().finally(() => {
      storage.clearToken?.()
      window.location.href = routeConfig?.login
      // history.navigate?.(routeConfig?.login)
    })
  },

  cameraFrame: {
    localStorage: {
      setCamNum(num: number) {
        storage.setItem("onlineCamnum", `${num}`)
      },
      getCamNum() {
        const camNum = storage.getItem("onlineCamnum")

        return Number(camNum || 4) || 4
      },
    },
  },

  monitorVehicle: {
    bar: {
      setWidth(width: number) {
        _app?.settingM?.set?.(
          "_monitor_bar_width",
          width || _const?.interface?.map_vehicleFrameWidth,
        )
      },
      getWidth() {
        return (
          _app?.settingM?.get?.("_monitor_bar_width") ||
          _const?.interface?.map_vehicleFrameWidth
        )
      },
    },
  },

  settingM: {
    set(key: string, value: any) {
      const data = storage?.getItem?.(_const?.storeKey?.settingM)
      storage?.setItem(_const?.storeKey?.settingM, { ...data, [key]: value })
    },
    get(key: string) {
      return storage?.getItem?.(_const?.storeKey?.settingM)?.[key]
    },
  },
  setting: (key: string, value: any) => {
    // store.dispatch?.(
    //   settingApp?.({
    //     key: key,
    //     value: value,
    //   }),
    // )
  },
  getSetting: () => {
    return storage.getItem?.(_const?.storeKey?.setting)
  },

  setUserAuthed: (isAuth: boolean) => {
    const dispatch = store.dispatch
    dispatch(
      setUserAccess({
        isAuth,
      }),
    )
  },

  getInitialData: {
    userInfo: async () => {
      return new Promise(async (resolve, reject) => {
        try {
          const fb = await getUserInfoService()
          const data: IUserInfo = fb?.data?.[0]
          const dispatch = store.dispatch

          dispatch(
            setUserAccess({
              userInfo: data,
            }),
          )
          resolve(data)
        } catch (error) {
          reject(error)
        }
      })
    },

    userChild: async () => {
      return new Promise(async (resolve, reject) => {
        try {
          const fb = await getUserChildService()

          const userTree = _array.userChildTree(fb?.data)
          const userRows = fb?.data

          const dispatch = store.dispatch
          dispatch(
            setUserChild({
              child: userTree?.child,
              row: userRows,
              object: userTree?.objectUser,
            }),
          )

          resolve(true)
        } catch (error) {
          // resolve(error)
          reject(error)
        }
      })
    },

    menu: async () => {
      return new Promise(async (resolve, reject) => {
        try {
          const fb = await getMenuService()
          const data: IServerMenu[] = fb?.data
          const dispatch = store.dispatch

          dispatch(setMenu(data))

          resolve(data)
        } catch (error) {
          reject(error)
        }
      })
    },


    all: async () => {
      const userInfoPromise = _app.getInitialData?.userInfo()
      const user: any = await userInfoPromise
      const userId = user?.id

      const menuPromise = _app.getInitialData?.menu()

      return Promise.all([
        userInfoPromise,
        menuPromise,

      ])
    },
  },

  routeModal: {
    showModalRoute: (data: {
      startTime: number
      endTime: number
      imei: string
    }) => {
      const dispatch = store?.dispatch
      dispatch?.(
        setRouteModalState?.({
          isOpen: true,
          imei: data?.imei,
          startTime: data?.startTime,
          endTime: data?.endTime,
        }),
      )
    },

    hideModalRoute: () => {
      const dispatch = store?.dispatch
      dispatch?.(
        setRouteModalState?.({
          isOpen: false,
        }),
      )
    },
  },

  user: {
    resetPass: (userId: number, userName: string, onSuccess?: () => void) => {
      api.modal?.confirm?.({
        title: (
          <div>
            Bạn có muốn reset mật khẩu tài khoản{" "}
            <span className="font-semibold">{userName}</span> về mặc định?
          </div>
        ),
        content: "",
        onOk: () => {
          const loadingApiClose = api.message?.loading(
            `Đang đặt lại mật khẩu cho tài khoản ${userName}`,
            20,
          )
          resetPassService(userId)
            .then((fb: any) => {
              onSuccess?.()

              api.modal?.info({
                title: "Đã đặt lại mật khẩu mới",
                content: (
                  <div>
                    <div>Tài khoản: {userName}</div>
                    <div className="flex items-center gap-2">
                      Mật khẩu mới:{" "}
                      <Coppy>
                        {fb?.data?.[0]?.new_password ||
                          _const?.string?.message?.unknow}
                      </Coppy>
                    </div>
                  </div>
                ),
              })
            })
            .catch((error) => {
              api.message?.error(getString?.errorAxiosParams(error))
            })
            .finally(() => {
              loadingApiClose?.()
            })
        },
      })
    },

    disabled: (userId: number, userName: string, onSuccess?: () => void) => {
      api.modal?.confirm?.({
        title: (
          <div>
            Bạn có muốn vô hiệu hoá tài khoản{" "}
            <span className="font-semibold">{userName}</span>?
          </div>
        ),
        content:
          "Người dùng sẽ không thể đăng nhập vào tài khoản khi bị vô hiệu hoá",
        onOk: () => {
          const loadingApiClose = api.message?.loading(
            `Đang vô hiệu hoá tài khoản ${userName}`,
            20,
          )
          disableService(userId, 0)
            .then((fb: any) => {
              onSuccess?.()

              api.message?.info(`Đã vô hiệu hoá tài khoản ${userName}`)
            })
            .catch((error) => {
              api.message?.error(getString?.errorAxiosParams(error))
            })
            .finally(() => {
              loadingApiClose?.()
            })
        },
      })
    },

    actived: (userId: number, userName: string, onSuccess?: () => void) => {
      api.modal?.confirm?.({
        title: (
          <div>
            Bạn có muốn bỏ vô hiệu hoá tài khoản{" "}
            <span className="font-semibold">{userName}</span>?
          </div>
        ),
        content: "Người dùng sẽ đăng nhập vào tài khoản",
        onOk: () => {
          const loadingApiClose = api.message?.loading(
            `Đang bỏ vô hiệu hoá tài khoản ${userName}`,
            20,
          )
          disableService(userId, 1)
            .then((fb: any) => {
              onSuccess?.()

              api.message?.info(`Đã bỏ vô hiệu hoá tài khoản ${userName}`)
            })
            .catch((error) => {
              api.message?.error(getString?.errorAxiosParams(error))
            })
            .finally(() => {
              loadingApiClose?.()
            })
        },
      })
    },

    delete: (userId: number, userName: string, onSuccess?: () => void) => {
      api.modal?.confirm?.({
        title: (
          <div>
            Bạn có muốn xoá tài khoản{" "}
            <span className="font-semibold">{userName}</span>?
          </div>
        ),
        content: "Người dùng sẽ không thể đăng nhập vào tài khoản khi bị xoá",
        onOk: () => {
          const loadingApiClose = api.message?.loading(
            `Đang xoá tài khoản ${userName}`,
            20,
          )
          deleteUserService(userId)
            .then((fb: any) => {
              onSuccess?.()
              api.message?.info(`Đã xoá tài khoản ${userName}`)
            })
            .catch((error: any) => {
              api.message?.error(getString?.errorAxiosParams(error))
            })
            .finally(() => {
              loadingApiClose?.()
            })
        },
      })
    },
  },


}
