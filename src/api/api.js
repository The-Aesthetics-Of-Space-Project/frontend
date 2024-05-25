import service from './service'

export const api = {
    getUser(args) {
        return service.get(args)
    },
    getUserInfo(args){
        console.log("args: "+args);
        return service.get(args)
    },
    getFollow(args) {
        return service.get(args)
    },
    setUser(url, args) { // url 매개변수를 첫 번째 인자로 추가
        return service.post(url,args)
    },

    updateUser(args, param) { // args와 param이 동시 존재하는 경우
        return service.put(args, param)
    },
    deleteUser(args){
        return service.delete(args);
    },
    deleteFollow(args, params){
        return service.delete(args, params)
    },
    getGeneralRanking(args) {
        return service.get(args)
    },
}

export const testApi = {
    getTests() {
        return service.get(`${API_URL}${API.tests}`)
    },

    setTest(args) {
        // URL과 함께 args를 바디로 전달
        return service.post(`${API_URL}${API.test}`, args);
    },
}