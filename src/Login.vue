<template>
  <div>
    <div id="naverIdLogin"></div>
  </div>
</template>

<script>
const key = {
  naverClientId: "uCoS8KzKduaXBhiQWA35",
  callbackUrl: "http://localhost:80/login/naver/",
  state: "test",
};
export default {
  mounted() {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: key.naverClientId,
      callbackUrl: key.callbackUrl,
      loginButton: { color: "green", type: 3, height: 60 },
    });
    naverLogin.init();
  },
};
</script>

<style></style>
