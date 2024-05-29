import axios, {CancelToken} from 'axios'
import Store from "@/store/index";

// 프로젝트 설정에 맞게, 기본적인 정보를 넣어주세요
const service = axios.create({
    baseURL: 'http://jerry6475.iptime.org:20000',
    timeout: 10000, // 요청 타임아웃 설정 (밀리초)

});

// 요청 인터셉터 추가
service.interceptors.request.use(
    (config) => {
        // 파일 데이터 여부를 검사
        if (config.data instanceof FormData) {
            config.headers['Content-Type'] = 'multipart/form-data';
        }else {
            config.headers['Content-Type'] = 'application/json';
        }

        const userId = Store.state.userId;
        if(userId){
            config.headers['userId'] = userId;
        }

        // 취소 토큰 생성
        const source = CancelToken.source();

        // 생성한 취소 토큰을 config.cancelToken에 설정
        config.cancelToken = source.token;

        return config;

    },
    (error) => {
        // 요청 에러 처리
        return Promise.reject(error);
    }
)

// 응답 인터셉터 추가
service.interceptors.response.use(
    (response) => {
        if (response.status === 404) {
            console.log("404 페이지로 넘어가야 함!");
        }
        return response;
    },
    async(error) =>{
        if (error.response?.status === 401) {
            error.config.headers = {
                'Content-Type': 'application/json',
            };
            console.log("응답 인터셉터 오류", error);

            const response = await axios.request(error.config);
            return response;

        }
        return Promise.reject(error);
    }
);
const args="";
const params="";

// 조회
service.get(args).then((res) => {
        return res.data;
});

// 삭제
service.delete(args).then((res) => {
    return res;
});

service.put(args, params).then((res) => {
    return res;
});
service.post(args, params).then((res) => {
    return res;
});

export default {
    async get(args) {
        try {
            const res = await service.get(args);
            return res;

        } catch (e) {
        }
    },
    async post(args, params) {
        try {
            const res = await service.post(args, params);
            return res;
        } catch (e) {
            return null;
        }
    },
    // 수정
    async put(args, params) {
        try {
            const res = await service.put(args, params);
            return res;
        } catch (e) {
            return null;
        }
    },

    async delete(args) {
        try {
            const res = await service.delete(args);
            return res;
        } catch (e) {
            return null;
        }
    },
}