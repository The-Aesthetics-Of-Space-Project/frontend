import service from './service'

export const api = {
    /* 사용자 목록 조회 */
    getUser(args) {
        return service.get(args)
    },
    /* 마이페이지 유저 정보 조회 요청 */
    getUserInfo(args){
        return service.get(args)
    },
    /* 팔로워, 팔로잉 리스트 전체 조회 */
    getFollow(args) {
        return service.get(args)
    },
    /* 서버쪽에 이미지 요청 */
    getImg(args){
        return service.get(args)
    },
    /* 게시글 전체 목록 조회*/
    getPost(args){
        return service.get(args)
    },
    setUser(args, params) { // url 매개변수를 첫 번째 인자로 추가
        return service.post(args,params)
    },
    /* 게시글 작성 이미지 요청(첨부할 때) */
    setGeneralUser(args, params){
      return service.post(args, params)
    },
    /* 좋아요 등록 */
    setLike(args, params){
        return service.post(args, params)
    },
    /* 좋아요 취소 */
    unSetLike(args, params){
        return service.post(args, params)
    },
    /* 스크랩 등록 */
    setScrap(args, params){
        return service.post(args, params)
    },
    /* 댓글 등록 */
    setComment(args, params){
        return service.post(args, params)
    },
    /* 스크랩 취소 */
    unSetScrap(args, params){
        return service.post(args, params)
    },
    /* 마이페이지 유저 정보 수정 */
    updateUser(args, param) { // args와 param이 동시 존재하는 경우
        return service.put(args, param)
    },
    /* 사용자 목록 삭제(=회원 탈퇴) */
    deleteUser(args){
        return service.delete(args);
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

    setTest(args) {
        // URL과 함께 args를 바디로 전달
        return service.post(`${API_URL}${API.test}`, args);
    },
}