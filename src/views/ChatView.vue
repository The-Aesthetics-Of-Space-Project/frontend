<template>
  <div class="custom-chat" > <!--세션 아이디-->
    <button id="fullscreenButton"><img src="@/assets/fullscreen.png" width="40" height="40"></button> <!-- 풀 스크린 버튼 추가 -->
    <button @click=" $router.back()">뒤로가기</button>
    <div class="custom-chat-container">
      <!-- 대화상대 리스트 -->
      <div class="custom-chat-list">
        <h3>대화상대</h3>
        <ul>
          <li v-for="user in users" :key="user" @dblclick="selectUser(user)"> {{user}}</li>
      </ul>
      </div>
      <input type="hidden" id="hid-roomid">
      <!-- 채팅 뷰 페이지 -->
      <div class="custom-chat-view">
        <span style="position: relative; left:-40%; top:30px;">{{ selectedUser }}</span>

        <!-- 채팅 상대 이름 표시 -->
        <div class="custom-chat-navbar">
          <span class="custom-chat-partner-name"></span>
        </div>
        <div class="chat-history">
          <div class="message my-message">
            <div class="message-content" >
              <p>Hello, this is my message!</p>
            </div>
          </div>
          <div class="message other-message">
            <div class="message-content" >
              <p>Hello, this is the other person's message!</p>
            </div>
          </div>
        </div>
        <div class="custom-chat-input">
          <!-- 입력 필드와 전송 버튼 -->
          <input type="text" id="chat-input" v-model="inputMessage" placeholder="send a message" @keyup.enter="sendMessage">
          <button id="sendMessageButton" :disabled="inputMessage.trim() === ''" @click="sendMessage">전송</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client'
export default {
  data() {
    return {
      users: [],
      inputMessage: '',
      messages: [],
      userId: this.$store.state.userId,
      chatPartners: '',
      selectedUser: '',
      receiver: '',
      sender: '',
      socket: null,
      stompClient: null,
    }
  },
  mounted() {
    this.partername();
    this.initWebSocket();
  },
  methods: {
    initWebSocket() {
      this.userId = this.$store.state.userId;
      if (!this.userId) {
        console.error('세션 ID가 없거나 유효하지 않습니다.');
        return;
      }

      this.connectAndSubscribe(this.roomId);
    },
    connectAndSubscribe(roomId) {
      if (this.socket) {
        this.socket.close();
      }
      this.socket = new SockJS('http://jerry6475.iptime.org:20000/gs-guide-websocket');
      this.stompClient = Stomp.over(this.socket);

      this.stompClient.connect({}, (frame) => {
        this.stompClient.subscribe(`/pub/${roomId}`, (message) => {
          this.displayMessage(JSON.parse(message.body));
        });
      });
      console.log(roomId);
    },
    partername() {
      axios.get(`http://jerry6475.iptime.org:20000/chatroom/${encodeURIComponent(this.userId)}`)
          .then(res => {
            this.users = res.data.list;
            console.log(res.data);
          })
          .catch(error => {
            console.log("list-failed");
          });
    },
    selectUser(user) {
      this.selectedUser = user;

      axios.post(`http://jerry6475.iptime.org:20000/api/chat_room/${encodeURIComponent(this.selectedUser)}/${encodeURIComponent(this.userId)}`)
          .then(response => response.data)
          .then(newRoomId => {
            console.log('Updating roomId from', this.roomId, 'to', newRoomId);
            this.roomId = newRoomId;
            this.connectAndSubscribe(this.roomId);
          })
          .catch(error => {
            console.error('Error creating chat room:', error);
          });

      axios.post(`http://jerry6475.iptime.org:20000/api/chat_history/${encodeURIComponent(this.selectedUser)}/${encodeURIComponent(this.userId)}`, {
        userId: this.userId,
        selectedUser: this.selectedUser,
      })
          .then(res => {
            console.log('Server response:', res.data);
            this.displayMessages(res.data);
          })
          .catch(error => {
            console.error('Server request failed:', error);
          });
    },
    displayMessages(messages) {
      const chatHistoryElement = document.querySelector('.chat-history');

      // Clear existing messages
      chatHistoryElement.innerHTML = '';

      messages.forEach(message => {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");

        if (message.sender === this.userId) {
          messageElement.classList.add("my-message");
        } else {
          messageElement.classList.add("other-message");
        }

        const contentElement = document.createElement("div");
        contentElement.classList.add("message-content");

        const p1 = document.createElement("p");
        p1.textContent = message.content;

        contentElement.appendChild(p1);
        messageElement.appendChild(contentElement);
        chatHistoryElement.append(messageElement);
      });
    }
  },
  name: 'ChatView'
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('fullscreenButton').addEventListener('click', function () {
    var chatView = document.querySelector('.custom-chat-view');
    if (!document.fullscreenElement) {
      if (chatView.requestFullscreen) {
        chatView.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  });
});
</script>

<style>
/* 추가적인 스타일링이 필요한 경우 여기에 추가 */
.custom-chat {
  height: 980px;
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


.custom-chat-container {
  display: flex;
  height: calc(100% - 50px);
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

.chat-history {
  flex: 1 1 auto;
  overflow-y: scroll;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  margin-bottom: 20px;
}

#chat-input {
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  width: 90%;
  height: 60px;
  position: relative;
  left:15px;
  top:15px;
}
.my-message,
.other-message {
  margin-bottom :10px ; /* 위아래 간격 조절 */
  padding :10px ;
  border-radius :15px ;
}


.my-message {
  display:flex ;
  justify-content:flex-end ;
}
.other-message {
  display:flex ;
  justify-content:flex-start ;
}
.message-content{
  max-width :50% ;
  padding :10px ;
  border-radius :15px ;
  word-wrap :break-word ; /* 단어가 행 끝에 도달하면 다음 행으로 이동 */
}


.my-message .message-content {
  background-color:#0dcaf0 ; /* 자신의 메시지 배경색 */
}
.other-message .message-content{
  background-color:#ffc107; /* 상대방의 메시지 배경색 */
}
#sendMessageButton{
 border-radius: 5px;
  position: relative;
  left: 45%;
  width: 80px;
  height: 60px;
  top:-45px;
}
</style>