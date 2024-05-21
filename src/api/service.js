import axios, {CancelToken} from 'axios'

// 프로젝트 설정에 맞게, 기본적인 정보를 넣어주세요
const service = axios.create({
    baseURL: 'http://localhost:3000', // API의 기본 URL 설정 서버 주소: http://jerry6475.iptime.org:20000
    timeout: 10000, // 요청 타임아웃 설정 (밀리초)

});


service.interceptors.request.use(
    (config) => {
        // 파일 데이터 여부를 검사
        if (config.data instanceof FormData) {
            config.headers['Content-Type'] = 'multipart/form-data';
        } else {
            config.headers['Content-Type'] = 'application/json';
        }

        const source = CancelToken.source();

        config.cancelToken = source.token;

        return config;

    },
    (error) => {
        // 요청 에러 처리
        return Promise.reject(error);
    }
)

service.interceptors.response.use(
    (response) => {
        if (response.status === 404) {
            console.log("404 페이지로 넘어가야 함!");
        }
        console.log("res.data 값이다", response.data);
        return response;
    },
    async(error) =>{
        if (error.response?.status === 401) {
            error.config.headers = {
                'Content-Type': 'application/json',
            };

            const response = await axios.request(error.config);
            return response;

        }
        return Promise.reject(error);
    }
);
const args="";
const params="";
const url="";
// 조회
service.get(args).then((res) => {
        console.log("응답 성공!_!", res.data);
        return res.data;
    })
    .catch((error) => {
        console.log("에러입니다!!!",error);
    })

// 삭제
service.delete(args).then((res) => {
    console.log("삭제 성공!_!", res);
    return res;
})
    .catch((error) => {
        console.log("삭제 에러입니다!!!",error);
    })

service.put(args, params).then((res) => {
    console.log("수정 성공!_!", res);
    return res;
})
    .catch((error) => {
        console.log("수정 에러입니다!!!",error);
    })
service.post(args, params).then((res) => {
    console.log("post: 응답 성공!_!", res);
    return res;
})
    .catch((error) => {
        console.log("post: 전송 에러입니다!!!",error);
    })

export default {
    async get(args) {
        try {
            const res = await service.get(args)
            console.log("service.js: res값 -> ", res)
            return res;

        } catch (e) {
            return console.log("error")
        }
    },

    async post(args, params) {
        try {
            const res = await service.post(args, params);
            console.log("service.js: post 요청 응답 -> ", res);
            return res;
        } catch (e) {
            console.error("post 요청 중 에러 발생: ", e);
            return null;
        }
    },
    // 수정
    async put(options) {
        try {
            const res = await service.put(args, params);
            console.log("service.js: res값 -> ", res);
            return res;
        } catch (e) {
            console.log("error");
            return null;
        }
    },

    async delete(args) {
        try {
            const res = await service.delete(args);
            console.log("service.js: res값 -> ", res);
            return res;
        } catch (e) {
            console.log("error");
            return null;
        }
    },
}