import axios from "axios";
import { getToken } from "@/Helpers/Functions";

axios.defaults.baseURL = `/api`;
axios.defaults.headers.common["Authorization"] = getToken();

export default axios;
