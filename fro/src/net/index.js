import axios from "axios";
import { ElMessage } from "element-plus";

const defaultError = () => ElMessage.error('发生错误，请联系我们');
const defaultFailure = (message) => ElMessage.warning(message);

function post(url, data, success, failure = defaultFailure, err = defaultError) {
    axios
        .post(url, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            withCredentials: true
        })
        .then(({ data }) => {
            if (data.success) {
                success(data.message, data.status);
            } else {
                failure(data.message, data.status);
            }
        })
        .catch(err);
}
function get(url, success, failure = defaultFailure, err = defaultError) {
    axios
        .get(url, {
            withCredentials: true
        })
        .then(({ data }) => {
            if (data.success) {
                success(data.message, data.status);
            } else {
                failure(data.message, data.status);
            }
        })
        .catch(err);
}

export { post, get };
