import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./router";
import useAuth from "./composables/useAuth";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const options =  {
	position: "top-right",
	timeout: 5000,
	closeOnClick: true,
	pauseOnFocusLoss: true,
	pauseOnHover: true,
	draggable: true,
	draggablePercent: 0.6,
	showCloseButtonOnHover: false,
	hideProgressBar: true,
	closeButton: "button",
	icon: true,
	rtl: false,
	zIndex : 10000
};

const app = createApp(App);
app.use(router);
app.use(Toast, options);
useAuth(app);

app.mount("#app");
