import {
  Search,
  Swipe,
  SwipeItem,
  Popup,
  Form,
  Field,
  Button,
  NavBar,
  PullRefresh,
  List,
  Cell,
  Dialog,
} from "vant";
import "vant/lib/index.css";
let plugins = [
  Search,
  Swipe,
  SwipeItem,
  Popup,
  Form,
  Field,
  Button,
  NavBar,
  PullRefresh,
  List,
  Cell,
  Dialog,
];
export default function getVant(app) {
  plugins.forEach((item) => {
    return app.use(item);
  });
}
