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
  Col,
  Row,
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
  Col,
  Row,
  Dialog,
];
export default function getVant(app) {
  plugins.forEach((item) => {
    return app.use(item);
  });
}
