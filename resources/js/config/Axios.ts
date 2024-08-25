import axios from "axios";
import { getToken } from "@/helpers/Functions";

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

axios.defaults.baseURL = `/api/v1`;
axios.defaults.headers.common["Authorization"] = getToken();
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

export default axios;
