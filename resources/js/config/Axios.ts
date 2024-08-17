import axios from "axios";
import { getToken } from "@/helpers/Functions";

axios.defaults.baseURL = `/api/v1`;
axios.defaults.headers.common["Authorization"] = getToken();

export default axios;
