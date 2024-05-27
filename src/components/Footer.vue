<template>
  <div class="Footer">
    <div class="footer-line">
    </div>
    <div class="footer">
      <div class="socialIcons">
        <a href=""><i class="fa-brands fa-facebook"></i><img src="../assets/footer_icon/google_icon.png" height="30" width="30"></a>
        <a href=""><i class="fa-brands fa-instagram"></i><img src="../assets/footer_icon/instagram_icon.png" height="50" width="50"></a>
        <a href=""><i class="fa-brands fa-twitter"></i><img src="../assets/footer_icon/facebook_icon.png" height="40" width="40"></a>
        <a href=""><i class="fa-brands fa-google-plus"></i><img src="../assets/footer_icon/twiter_icon.png" height="40" width="40"></a>
        <a href=""><i class="fa-brands fa-youtube"></i><img src="../assets/footer_icon/youtube_icon.png" height="40" width="40"></a>
      </div>
      <p>Home &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;이용약관&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소개</p>
      <div class="footer-sub-contnet">
        <p>Copy right @2024; Designed by Aesthetics Of Space</p>
      </div>
    </div>
  </div>
</template>

<script>
export default
{
// eslint-disable-next-line vue/multi-word-component-names
  name: 'Footer',
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
}
.Footer {
  background-color: #f2f2f2;
  text-align: center;
  padding: 20px 0;
  position: relative;
  bottom: 0;
  width: 100%;
}
.socialIcons a {
  margin: 0 10px;
  display: inline-block;
}
.socialIcons img, .socialIcons i {
  vertical-align: middle;
}
.footer p {
  color: #666;
  margin: 10px 0;
}
.footer-sub-contnet p {
  color: #aaa;
  font-size: 14px;
}
</style>