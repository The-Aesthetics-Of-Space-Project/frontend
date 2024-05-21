<template>
  <div class="custom-chat"> <!--세션 아이디-->
    <button id="fullscreenButton"><img src="@/assets/fullscreen.png" width="40" height="40"></button> <!-- 풀 스크린 버튼 추가 -->
    <div class="custom-chat-container">
      <!-- 대화상대 리스트 -->
      <div class="custom-chat-list">
        <h3>대화상대</h3>
        <ul>
          <button @click='partername'>목록</button>
          <li v-for="user in users" :key="user.id"><span style="color: black; font-size: 500px;">{{ user.name }}</span></li>
        </ul>
      </div>
      <input type="hidden" id="hid-roomid">
      <!-- 채팅 뷰 페이지 -->
      <div class="custom-chat-view">
        <!-- 채팅 상대 이름 표시 -->
        <div class="custom-chat-navbar">
          <span class="custom-chat-partner-name"></span>
        </div>
        <div class="custom-chat-history">
          <!-- 메시지 목록 -->
          <div class="custom-message custom-my-message">
            <div class="custom-message-content">
              <p>Hello, this is my message!</p>
            </div>
          </div>
          <div class="custom-message custom-other-message">
            <div class="custom-message-content">
              <p>Hello, this is the other person's message!</p>
            </div>
          </div>
        </div>
        <div class="custom-chat-input">
          <!-- 입력 필드와 전송 버튼 -->
          <input type="text" id="custom-chat-input" v-model="inputMessage" placeholder="send a message" @keyup.enter="sendMessage">
          <button id="custom-sendMessageButton" :disabled="inputMessage.trim() === ''" @click="sendMessage">전송</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  data() {

    return {
      users : [],
      // 채팅 입력 데이터
      inputMessage: '',
      // 채팅 기록
      messages: [],
      userId : this.$store.state.userId,
      chatPartners: '',
    }
  },
  mounted() {
    this.partername();
  },
  methods: {
    partername(){
      axios.get(`http://jerry6475.iptime.org:20000/chatroom/${encodeURIComponent(this.userId)}`)
          .then(res => {
            this.users = res.data.list;
            console.log(res.data.list);
          })
          .catch(error => {
            console.log("list-failed");
          });
    },
    // 메시지 전송 메소드
    sendMessage() {
      if (this.inputMessage.trim() !== '') {
        // 새 메시지 객체 생성
        const newMessage = {
          content: this.inputMessage,
          type: 'custom-my-message' // 'custom-my-message' 또는 'custom-other-message'
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
    var chatView = document.querySelector('.custom-chat-view'); // custom-chat-view 요소 선택
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
  var input = document.getElementById('custom-chat-input');
  var sendButton = document.getElementById('custom-sendMessageButton');

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
.custom-chat {
  height: 1000px;
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
  left: 250px;
  top: 5px;
}

#fullscreenButton:focus {
  outline: none; /* 클릭 시 나타나는 포커스 테두리 제거 */
}

.fullscreen-button > span {
  display: none;
}

.custom-my-message {
  text-align: right; /* 오른쪽 정렬 */
  margin-left: auto; /* 왼쪽 마진을 자동으로 설정하여 오른쪽 정렬 */
}

.custom-other-message {
  text-align: left; /* 왼쪽 정렬 */
  margin-right: auto; /* 오른쪽 마진을 자동으로 설정하여 왼쪽 정렬 */
}

.custom-chat-container {
  height: 1000px;
}

.custom-chat-container {
  display: flex;
}

.custom-chat-list {
  width: 300px;
  border-right: 1px solid;
}

.custom-chat-list h3 {
  position: relative;
  bottom: -50px;
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.custom-chat-list ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: relative;
  bottom: -60px;
  left: 15px;
}

.custom-chat-list li {
  font-size: 16px;
  padding: 13px;
  border-radius: 5px;
  margin-bottom: 5px;
  cursor: pointer;
  background-color: #f0f0f0;
  transition: background-color 0.2s;
  width: 270px;
}

.custom-chat-list li:hover {
  background-color: #e0e0e0;
}

.custom-chat-view {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 300px);
  height: 100%;
  background-color: white;
}

.custom-chat-navbar {
  height: 50px;
  background-color: #fafafa;
  box-shadow: 0px 3px 5px 0px #ccc;
  display: flex;
  align-items: center;
  padding-left: 20px;
  font-size: 16px;
  font-weight: bold;
}

.custom-chat-history {
  flex: 1 1 auto;
  overflow-y: scroll;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  margin-bottom: 20px;
}

.custom-chat-input {
  display: flex;
  justify-content: space-between;

}
</style>