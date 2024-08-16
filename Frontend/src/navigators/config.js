import configs from "../configs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";

const screensStack = [{
    name: configs.screenName.home,
    component: Home,
    options: { title: "Welcome Home" },
},{
    name: configs.screenName.profile,
    component: Profile,
    options: { title: "Welcome Profile" },
}]
export default screensStack;