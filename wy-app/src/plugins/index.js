import { Search, Swipe, SwipeItem, Popup, Form, Field, Button, Progress } from "vant";
import "vant/lib/index.css";
let plugins = [Search, Swipe, SwipeItem, Popup, Form, Field, Button, Progress];
export default function getVant(app) {
  plugins.forEach((item) => {
    return app.use(item);
  });
}
