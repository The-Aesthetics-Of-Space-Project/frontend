import service from './service'

export const api = {
    /* 사용자 목록 조회 */
    getUser(args) {
        return service.get(args)
    },
    /* 팔로워/팔로잉 목록 조회 */
    getFollow(args) {
        return service.get(args)
    },
    setUser(args,param) {
        return service.post(args, param)
    },
    updateUser(args, param) { // args와 param이 동시 존재하는 경우
        return service.put(args, param)
    },
    /* 사용자 목록 삭제(=회원 탈퇴) */
    deleteUser(args, params){
        return service.delete(args, params);
    },
    /* 팔로워/팔로잉 삭제 요청 */
    deleteFollow(args, params){
        return service.delete(args, params)
    }
}

export const testApi = {
    getTests() {
        return service.get(`${API_URL}${API.tests}`)
    },
    /* test 등록하기
     * @param { Object } args
     * @param { string } args.args1 - 이것
     * @param { string } args.args2 - 저것
     * @param { string } args.args3 - 그것
     */
    setTest(args) {
        return service.post(`${API_URL}${API.test(args)}`)
    }
}