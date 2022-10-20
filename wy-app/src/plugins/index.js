import { Search, Swipe, SwipeItem, Popup, Form, Field, Button, NavBar,PullRefresh,List } from "vant";
import "vant/lib/index.css";
let plugins = [Search, Swipe, SwipeItem, Popup, Form, Field, Button, NavBar,PullRefresh,List ];
export default function getVant(app) {
  plugins.forEach((item) => {
    return app.use(item);
  });
}
