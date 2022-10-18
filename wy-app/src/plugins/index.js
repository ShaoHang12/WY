import { Search, Swipe, SwipeItem, Popup, Form, Field, Button } from "vant";
import "vant/lib/index.css";
let plugins = [Search, Swipe, SwipeItem, Popup, Form, Field, Button];
export default function getVant(app) {
  plugins.forEach((item) => {
    return app.use(item);
  });
}
