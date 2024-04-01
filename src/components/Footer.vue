<template>
  <div class="Footer">
    <div class="footer-line">
    </div>
    <div class="footer">
      <div class="socialIcons">
        <a href=""><i class="fa-brands fa-facebook"></i><img src="../assets/footer_icon/google-icon.png" height="30" width="30"></a>
        <a href=""><i class="fa-brands fa-instagram"></i><img src="../assets/footer_icon/instagram-icon.png" height="50" width="50"></a>
        <a href=""><i class="fa-brands fa-twitter"></i><img src="../assets/footer_icon/facebook-icon.png" height="40" width="40"></a>
        <a href=""><i class="fa-brands fa-google-plus"></i><img src="../assets/footer_icon/twiter-icon.png" height="40" width="40"></a>
        <a href=""><i class="fa-brands fa-youtube"></i><img src="../assets/footer_icon/youtube-icon.png" height="40" width="40"></a>
      </div>
      <p>Home &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;이용약관&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소개</p>
      <p>문의 : 010 - xxxx - xxxx</p>
      <div class="footer-sub-contnet">
        <p>Copy right @2024; Designed by .zip</p>
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
.Footer
{
  height:210px;
  padding-top: 50px;
}


.footer
{
  width:100%;
  height:210px;
  background-color: #1C1C1C;
  position: relative;
  opacity: 0.95;
}

.footer h4
{
  position: relative;
  bottom:-115px;
}
.footer p{
  position: relative;
  top:63px;
  font-size: 18px;
  color:white;
}
.footer-sub-contnet{
  width:100%;
  height:70px;
  background-color: #151515;
  position: relative;
  top:54px;
  color:white;
}
.footer-sub-contnet p{
  position: relative;
  top:20px;
  font-size: 18px;
}

.socialIcons{
  display: flex;
  justify-content: center;
}
.socialIcons a{
  width: 50px;
  height:50px;
  text-decoration: none;
  background-color: white;
  margin: 10px;
  border-radius: 50%;
  position: relative;
  top:50px;
}
.socialIcons a i{
  font-size: 2em;
  color: black;
  opacity: 0.9;
}
/* Hover affect on social media icon */
.socialIcons a:hover{
  background-color: #111;
  transition: 0.5s;
}
.socialIcons a:hover i{
  color: white;
  transition: 0.5s;
}
img{
  position: relative;
  top:-5px;
}
</style>