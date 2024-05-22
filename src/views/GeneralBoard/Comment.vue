<template>
  <div class="comment">
    <div class="comment-content">
      <section class="comment-user-profile" :style="profileStyle">
        <!-- <img :src="comment.user.profileImage" alt="Profile Image"> -->
      </section>
      <section class="user-comment-wrapper">
        <section class="comment-user-nickname">{{ comment.user.nickname }}</section>
        <section class="user-comment-content">{{ comment.content }}</section>
      </section>
      <!-- reply 클릭 시 답글 작성 버튼 나타남 -->
      <button @click="toggleReply">Reply</button>
      <div v-if="showReply">
        <input type="text" v-model="replyContent" placeholder="Write a reply..." />
        <!-- 답글 작성 버튼 -->
        <button @click="submitReply">Submit</button>
      </div>
    </div>
    <!-- 대댓글 표시 -->
    <div v-if="comment.replies && comment.replies.length" class="replies">
      <Comment v-for="reply in comment.replies" :key="reply.id" :comment="reply" @reply="addReply"></Comment>
    </div>
  </div>
</template>

<script>
import Store from "@/store/index";
import {api} from "@/api/api";

export default {
  name: 'Comment',
  props: {
    comment: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      showReply: false,
      replyContent: '',
      users: {
        userId: Store.state.userId,
        nickname: Store.state.nickname,
        profile: Store.state.profile,
      }
    };
  },
  computed: {
    profileStyle() {
      return {
        position: 'relative',
        width: '52%',
        height: '52px',
        left: '15px',
        top: '5px',
        backgroundColor: 'chartreuse',
        border: '1px solid #8D8D8D',
        borderRadius: '50%'
      };
    }
  },
  methods: {
    /* 답글 입력 창 토글: Reply 버튼 클릭 시 답글 입력 창 나타남 */
    toggleReply() {
      this.showReply = !this.showReply;
    },
    /* 새로운 답글 서버에 전송 등록되면 목록 보임 */
    async submitReply(parentId) {
      if (this.replyContent.trim()) {
        const args= '/api/general/comment';
        const newReply = {
          content: this.replyContent,
          articleId: this.posts.articleId,
          nickname: this.users.nickname,
          parentId: parentId, // 부모 댓글의 id를 parentId로 설정
        };
        try {
          const response = await api.setComment(args, newReply);
          const replyData = response.data;
          const parentComment = this.findCommentById(this.comments, parentId);
          if (parentComment) {
            if (!parentComment.replies) {
              parentComment.replies = [];
            }
            parentComment.replies.push({
              id: replyData.id,
              user: {
                nickname: this.$store.state.nickname,
                profileImage: this.$store.state.profile
              },
              content: this.replyContent,
              replies: []
            });
          }
          this.replyContent = '';
        } catch (error) {
          console.error('Error posting reply:', error);
        }
      }
    },
    /* 특정 댓글에 대댓글 추가 */
    addReply({ reply, parentId }) {
      if (this.comment.id === parentId) {
        if (!this.comment.replies) {
          this.comment.replies = [];
        }
        this.comment.replies.push(reply);
      }
    }
  }
};
</script>

<style>
.comment {
  margin-bottom: 20px;
}
.comment-content {
  margin-bottom: 10px;
}
.comment-user-nickname {
  position: relative;
  width: 100%;
  text-align: left;
  top: 3px;
  left: -30px;
  font-size: 16.5px;
  font-weight: 550;
}
.user-comment-content {
  position: relative;
  height: 20px;
  font-size: 20px;
  text-align: left;
  left: -28px;
  font-weight: 540;
  top: 5px;
}
.replies {
  margin-left: 20px;
}
</style>
