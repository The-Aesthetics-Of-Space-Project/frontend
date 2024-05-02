<template>
  <div class="chat">
    <button id="fullscreenButton"><img src="@/assets/fullscreen.png" width="40" height="40"></button> <!-- 풀 스크린 버튼 추가 -->
    <div class="chat-container">
      <!-- 대화상대 리스트 -->
      <div class="chat-list">
        <h3>대화상대</h3>
        <ul>
          <li>user_name0</li> <!-- 백 브론트 단에 데이터 바인딩 필요 -->
          <li>user_name1</li>
          <li>user_name2</li>
        </ul>
      </div>
      <input type="hidden" id="hid-roomid">
      <!-- 채팅 뷰 페이지 -->
      <div class="chat-view">
        <!-- 채팅 상대 이름 표시 -->
        <div class="chat-navbar">
          <span class="chat-partner-name"></span>
        </div>
        <div class="chat-history">
          <!-- 메시지 목록 -->
          <div v-for="(message, index) in messages" :key="index" :class="['message', message.isMine ? 'my-message' : 'other-message']">
            <div class="message-content">
              <p>{{ message.content }}</p>
            </div>
          </div>
        </div>
        <div class="chat-input">
          <!-- 입력 필드와 전송 버튼 -->
          <input type="text" id="chat-input" v-model="inputMessage" placeholder="send a message" @keyup.enter="sendMessage">
          <button id="sendMessageButton" :disabled="inputMessage.trim() === ''" @click="sendMessage">전송</button>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
// @ is an alias to /src
export default {
  data() {
    return {
      // 채팅 입력 데이터
      inputMessage: '',
      // 채팅 기록
      messages: []
    }
  },
  methods: {
    // 메시지 전송 메소드
    sendMessage() {
      if (this.inputMessage.trim() !== '') {
        // 새 메시지 객체 생성
        const newMessage = {
          content: this.inputMessage,
          type: 'my-message' // 'my-message' 또는 'other-message'
        };
        // 메시지 목록에 추가
        this.messages.push(newMessage);
        // 입력 필드 초기화
        this.inputMessage = '';
      }
    }
  },
  name: 'ChatView'
}
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('fullscreenButton').addEventListener('click', function () {
    var chatView = document.querySelector('.chat-view'); // chat-view 요소 선택
    if (!document.fullscreenElement) { // 현재 전체 화면 모드가 아니라면
      if (chatView.requestFullscreen) { // 표준 메서드
        chatView.requestFullscreen();
      }
    } else { // 이미 전체 화면 모드라면
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var input = document.getElementById('chat-input');
  var sendButton = document.getElementById('sendMessageButton');

  function updateButtonState() {
    if (input.value.trim() !== '') {
      sendButton.disabled = false;
      sendButton.classList.add('active'); // 내용이 있을 때 active 클래스 추가
    } else {
      sendButton.disabled = true;
      sendButton.classList.remove('active'); // 내용이 없을 때 active 클래스 제거
    }
  }

  input.addEventListener('input', updateButtonState);

  // 페이지 로딩 시 버튼 상태 초기화
  updateButtonState();
});

</script>

<style>


/* 추가적인 스타일링이 필요한 경우 여기에 추가 */
.chat{
  height:1000px;
}

body, html {
  margin: 0;
  font-family: Arial, sans-serif;
}

#fullscreenButton {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  position: absolute;
  left:250px;
  top:5px;
}

#fullscreenButton:focus {
  outline: none; /* 클릭 시 나타나는 포커스 테두리 제거 */
}

.fullscreen-button > span {
  display: none;
}

.my-message {
  text-align: right; /* 오른쪽 정렬 */
  margin-left: auto; /* 왼쪽 마진을 자동으로 설정하여 오른쪽 정렬 */
}

.other-message {
  text-align: left; /* 왼쪽 정렬 */
  margin-right: auto; /* 오른쪽 마진을 자동으로 설정하여 왼쪽 정렬 */
}
.chat-container{
  height:1000px;
}

.chat-container {
  display: flex;
}
.chat-list {
  width: 300px;
  border-right: 1px solid ;
}

.chat-list h3 {
  position: relative;
  bottom:-50px;
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.chat-list ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: relative;
  bottom:-60px;
  left:15px;
}

.chat-list li {
  font-size: 16px;
  padding: 13px;
  border-radius: 5px;
  margin-bottom: 5px;
  cursor: pointer;
  background-color: #f0f0f0;
  transition: background-color 0.2s;
  width:270px;

}

.chat-list li:hover {
  background-color: #e0e0e0;
}

.chat-view {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 300px);
  height: 100%;
  background-color: white;
}

.chat-navbar {
  height: 50px;
  background-color: #fafafa;
  box-shadow: 0px 3px 5px 0px #ccc;
  display: flex;
  align-items: center;
  padding-left: 20px;
  font-size: 16px;
  font-weight: bold;
}

.chat-history {
  flex: 1 1 auto;
  overflow-y: scroll;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  margin-bottom: 20px;
}

.chat-input {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 0px 3px 5px 0px #ccc;
  width:90%;
  margin: auto;
  border-radius: 30px;
  border : 1px solid lightgray;
  position: relative;
  top:-10px;
}

.chat-input input {
  flex: 1;
  margin-right: 10px;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  outline: none;
}

.chat-input button {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 30px;
  border: none;
  background-color: #333;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.2s;
  background-color: #0dcaf0;
}

/* 비활성화된 버튼 스타일 */
button:disabled {
  color: #999;
  background-color: #ddd;
  cursor: default;
}

/* 활성화된 버튼에 대한 hover 스타일, active 클래스가 있을 때만 적용 */
.chat-input:hover {
  cursor: pointer; /* 또는 원하는 커서 스타일 */
}
</style>