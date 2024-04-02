<template>
  <div class="chat">
    <div class="main-navbar">
      <!-- 메인 페이지로 이동 버튼 -->
      <a href="/main" class="nav-button"><i class="fa fa-home"></i></a>
    </div>

    <div class="chat-container">
      <!-- 대화상대 리스트 -->
      <div class="chat-list">
        <h3>대화상대</h3>
        <ul>
          <li>asdasd</li>    <!-- 백 브론트 단에 데이터 바인딩 필요 -->
          <li>asdasd</li>
          <li>asdasd</li>
        </ul>
      </div>
      <input type="hidden" id="hid-roomid" >
      <!-- 채팅 뷰 페이지 -->
      <div class="chat-view">
        <!-- 채팅 상대 이름 표시 -->
        <div class="chat-navbar">
          <span class="chat-partner-name"></span>
        </div>
        <div class="chat-history">
          <div class="message my-message">
            <div class="message-content">
              <p>Hello, this is my message!</p>
            </div>
          </div>
          <div class="message other-message">
            <div class="message-content">
              <p>Hello, this is the other person's message!</p>
            </div>
          </div>
        </div>
        <div class="chat-input">
          <input type="text" id = "chat-input" placeholder="메시지를 입력하세요">
          <button id = "sendMessageButton">전송</button>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
// @ is an alias to /src
export default {
  name: 'ChatView'
}
</script>

<style>
.chat{
  height:1000px;
}
body, html {
  margin: 0;
  font-family: Arial, sans-serif;
}
.chat-container{
  height:1000px;
}
.main-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: #0dcaf0;
  padding-left: 20px;
}

.nav-button {
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  color: #333;
}

.nav-button .fa {
  margin-right: 5px;
}

.chat-container {
  display: flex;
  padding-top: 50px;
}

.chat-list {
  width: 300px;
  padding-right: 20px;
  border-right: 1px solid #ccc;
  overflow-y: scroll;
}

.chat-list h3 {
  position: relative;
  bottom:-5px;
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
}

.chat-list li {
  font-size: 16px;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
  cursor: pointer;
  background-color: #f0f0f0;
  transition: background-color 0.2s;
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
  background-color: #fff;
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 0px 3px 5px 0px #ccc;
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
  border-radius: 5px;
  border: none;
  background-color: #333;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.2s;
}

.chat-input button:hover {
  background-color: #444;
}
</style>