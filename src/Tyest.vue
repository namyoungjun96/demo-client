<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import TheWelcome from "./components/TheWelcome.vue";
import { onMounted } from "vue";
import axios from "axios";

const key = {
  naverClientId: "uCoS8KzKduaXBhiQWA35",
  callbackUrl: "http://localhost:80/",
  state: "test",
};

const naverLogin = new naver.LoginWithNaverId({
  clientId: key.naverClientId,
  callbackUrl: key.callbackUrl,
  loginButton: { color: "green", type: 1, height: 30 },
});

let name;
function server() {
  axios
    .get("http://54.163.14.242:7040")
    .then((res) => {
      name = res.data;
      console.log("성공", res);
    })
    .catch((res) => {
      console.error("실패", res);
    });
}

onMounted(() => {
  // 네이버 로그인 초기화 코드
  server();
  naverLogin.init();
});

/* (5) 현재 로그인 상태를 확인 */
window.addEventListener("load", function () {
  naverLogin.getLoginStatus(function (status) {
    if (status) {
      /* (6) 로그인 상태가 "true" 인 경우 로그인 버튼을 없애고 사용자 정보를 출력합니다. */
      setLoginStatus();
    }
  });
});

/* (6) 로그인 상태가 "true" 인 경우 로그인 버튼을 없애고 사용자 정보를 출력합니다. */
function setLoginStatus() {
  var profileImage = naverLogin.user.getProfileImage();
  var nickName = naverLogin.user.getNickName();
  var imageViewer = "";
  if (profileImage) {
    imageViewer += '<br><br><img src="' + profileImage + '" height=50 /> <p>';
  }
  $("#naverIdLogin_loginButton").html(
    imageViewer + nickName + "님 반갑습니다.</p>"
  );
  $("#gnbLogin").html("Logout");
  $("#gnbLogin").attr("href", "#");
  /* (7) 로그아웃 버튼을 설정하고 동작을 정의합니다. */
  $("#gnbLogin").click(function (e) {
    e.preventDefault();
    naverLogin.logout();
    location.replace("/");
  });
}
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="./assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <router-link to="/tcomp">test</router-link>
      <p>{{ name }}!!</p>
      <HelloWorld msg="You did it!" />

      <div>
        login
        <div id="naverIdLogin"></div>
      </div>
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<script></script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
