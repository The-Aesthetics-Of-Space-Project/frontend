<template>
  <div class="custom-chat"> <!--세션 아이디-->
    <button id="fullscreenButton"><img src="@/assets/fullscreen.png" width="40" height="40"></button>
    <!-- 풀 스크린 버튼 추가 -->
    <div class="custom-chat-container">
      <!-- 대화상대 리스트 -->
      <div class="custom-chat-list">
        <img id="chat-hover"src='@/assets/community_image_list/back.png' width="33px" height="33px" @click=" $router.back()" style="position: relative; left:-40%; top:1.1%;">
        <h3>대화상대</h3>
        <ul>
          <li v-for="user in users" :key="user" @dblclick="selectUser(user)" > {{ user }}</li>
        </ul>
      </div>
      <input type="hidden" id="hid-roomid">
      <!-- 채팅 뷰 페이지 -->
      <div class="custom-chat-view">

        <!-- 채팅 상대 이름 표시 -->
        <div class="custom-chat-navbar">
          <span class="custom-chat-partner-name">{{selectedUser}}</span>
        </div>
        <div class="chat-history">
          <div class="message my-message">
            <div class="card" style="width: 400px; height: 370px; position: relative; left:-42%; top:150px; border-radius: 25px;">
              <dotlottie-player src="https://lottie.host/493aaf35-73e8-4e69-a2a4-b0d1875e082e/QX6Hs3wmqf.json" class="card-img-top" background="transparent" speed="1" style="width: 340px; height: 340px;" loop autoplay></dotlottie-player>
              </div>
          </div>
          <span style="position: relative; top:190px; left:-5.2%; font-size: 16.5px;">메시지를 시작하려면 대화 상대를 선택하세요.</span>
          <div class="message other-message">
          </div>
        </div>
        <div class="custom-chat-input">
          <!-- 입력 필드와 전송 버튼 -->
          <input type="text" id="chat-input" v-model="inputMessage" placeholder="send a message..." v-if="selectedUser" style="font-size: 15px;" @keyup.enter="sendMessage">
          <button class="btn btn-outline-secondary" id="sendMessageButton" v-if="selectedUser" :disabled="inputMessage.trim() === ''" @click="sendMessage">전송</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client'
import {api} from "@/api/api";

export default {
  data() {
    return {
      users: '',
      inputMessage: '',
      messages: [],
      userId: this.$store.state.userId,
      chatPartners: '',
      selectedUser: '',
      socket: null,
      stompClient: null,
      chatInput: '',
      reciver: '',
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

      this.connectAndSubscribe(this.roomid);
    },
    connectAndSubscribe(roomId) {
      if (this.socket) {
        this.socket.close();
      }
      this.socket = new SockJS('http://jerry6475.iptime.org:20000/gs-guide-websocket');
      this.stompClient = Stomp.over(this.socket, {
        protocols: ['v12.stomp']
      });

      this.stompClient.connect({}, (frame) => {
        this.stompClient.subscribe(`/pub/${this.roomid}`, (message) => {
          this.requestNewMessages();
        });
      });
    },
    async partername() {
      await api.getChatUserId(`/chatroom/${encodeURIComponent(this.userId)}`)
          .then(res => {
            this.users = res.data.list;
          })
          .catch(error => {
            console.error("list-failed", error);
          });
    },
    async selectUser(user) {

      this.selectedUser = user;
      this.chatPartners = user;
      await api.setChatPartnerId(`/api/chat_room/${encodeURIComponent(this.selectedUser)}/${encodeURIComponent(this.userId)}`)
          .then(response => response.data)
          .then(newRoomId => {
            this.roomid = newRoomId;
            this.connectAndSubscribe(this.roomid);
          })
          .catch(error => {
            console.error('Error creating chat room:', error);
          });

      await api.getChatUserId(`/api/chat_history/${encodeURIComponent(this.selectedUser)}/${encodeURIComponent(this.userId)}`, {
        userId: this.userId,
        selectedUser: this.selectedUser,
      })
          .then(res => {
            this.displayMessages(res.data);
          })
          .catch(error => {
            console.error('Server request failed:', error);
          });


      if (this.chatPartners === '') {
        alert('상대방을 선택해주세염');
        return;
      }
      this.sendMessage();
    },
    displayMessages(messages) {
      const chatHistoryElement = document.querySelector('.chat-history');

      chatHistoryElement.innerHTML = '';
      // Clear existing messages
      // Convert object to array if it's not already
      if (!Array.isArray(messages)) {
        messages = [messages];
      }

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
    },
    sendMessage() {

      if (this.stompClient && this.inputMessage) {
        const messageObj = {
          content: this.inputMessage,
          sender: this.userId,
          reciver: this.chatPartners,
          roomid: this.roomid
        };

        this.stompClient.send(`/app/${this.roomid}`, JSON.stringify(messageObj), {});

        // Clear the input field after sending the message
        this.inputMessage = '';

        // Request server for new messages after sending a message
        this.requestNewMessages();
      }
    },
    async requestNewMessages() {
      await api.getChatUserId(`http://jerry6475.iptime.org:20000/api/chat_history/${encodeURIComponent(this.selectedUser)}/${encodeURIComponent(this.userId)}`, {
        userId: this.userId,
        selectedUser: this.selectedUser,
      })
          .then(res => {
            this.displayMessages(res.data);
          })
          .catch(error => {
            console.error('Server request failed:', error);
          });
    }
  }
}
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


.custom-chat-container {
  display: flex;
  height: 1000px;
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
  background-color: white;
  transition: background-color 0.2s;
  width: 270px;
}

.custom-chat-list li:hover {
  background-color: #f0f0f0;

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
  background-color: #f5f5f5;
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
  border-radius: 5px;
  width: 90%;
  height: 50px;
  position: relative;
  left: 15px;
  top: 15px;
}

.message-content {
  max-width: 50%;
  padding: 10px 20px; /* 패딩 조정 */
  border-radius: 20px; /* 둥근 모서리 조정 */
  word-wrap: break-word;
  position: relative; /* 말풍선 꼬리를 위한 설정 */
  margin: 10px 0; /* 간격 조정 */
}

/* 나의 메시지 스타일 */
.my-message {
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
}

.my-message .message-content {
  background-color: #0dcaf0; /* 배경색 변경 */
  color: white; /* 글자색 변경 */
  border: none; /* 테두리 제거 */
}

/* 상대방 메시지 스타일 */
.other-message {
  display: flex;
  justify-content: flex-start; /* 왼쪽 정렬 */
}

.other-message .message-content {
  background-color: #ffc107; /* 배경색 변경 */
  color: black; /* 글자색 변경 */
  border: none; /* 테두리 제거 */
}

#sendMessageButton {
  border-radius: 5px;
  position: relative;
  left: 45%;
  width: 80px;
  height: 50px;
  top: -35px;
}
#sendMessageButton:hover{
  background-color : white;
  color:black;
}
#chat-hover:hover{
  cursor: pointer;
}
</style>