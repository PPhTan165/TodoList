<script setup lang="ts">
import { nextTick, ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { RouterLink, useRouter } from "vue-router";
import HeaderComponent from "@/components/Header/HeaderComponent.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import * as yup from "yup";

const email = ref("");
const password = ref("");
const remember = ref(false)
const authStore = useAuthStore();
const router = useRouter();

const toggleRemember = () => {
  remember.value = !remember.value
}

const schema = yup.object().shape({
  email: yup.string().required("email không được để trống"),
  password: yup.string().required("Password không được để trống"),
});

const handleLogin = async () => {
  try {
    await schema.validate(
      { email: email.value, password: password.value },
      { abortEarly: false }
    );

    // chờ loginUser hoàn tất
    
    await authStore.loginUser({
      email: email.value,
      password: password.value,
    });

    // đảm bảo vue đã phản ứng xong
    await nextTick();

    router.push("/"); // chỉ push sau khi store đã sẵn sàng
  } catch (err: any) {
    if (err.errors) {
      alert(err.errors.join(", "));
    } else {
      alert("Đăng nhập thất bại");
    }
  }
};
</script>

<template>
  <HeaderComponent />
  <section class="container">
    <div class="head">
      <RouterLink to="/">
        <font-awesome-icon :icon="['fas','arrow-left']"/>
        Back</RouterLink>
      <RouterLink to="/register">
        Register
        <font-awesome-icon :icon="['fas','arrow-right']"/>
      </RouterLink>
    </div>

    <h2>ĐĂNG NHẬP</h2>
    <div class="main">
      <div class="left-content">
        <div class="input-login">
          <label for="email"> Email </label>
          <input type="email" id="email" name="email" v-model="email" />
        </div>

        <div class="input-login">
          <label for="psw"> Password </label>
          <input type="password" id="psw" name="psw" v-model="password" />
        </div>

        <div class="checkbox">
          <input type="checkbox" name="remember" id="" @click="toggleRemember"/>
          <span>Ghi nhớ đăng nhập</span>
        </div>
        <div class="center">
          <button class="btn" @click="handleLogin">Đăng nhập</button>
        </div>
      </div>
      <span class="center-line"></span>
      <div class="right-content">
        <button>
          <font-awesome-icon :icon="['fab', 'google']" />
          Google
        </button>
        <button>
          <font-awesome-icon :icon="['fab', 'github']" />
          Github
        </button>
        <button>
          <font-awesome-icon :icon="['fab', 'facebook']" />
          Facebook
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.head{
  display: flex;
  justify-content: space-between;
}

.container {
  display: inline-block;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 28px;
  margin-top: 50px;
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
}

h2 {
  text-align: left;
  font-weight: 700;
  font-size: 30px;
  margin: 20px 0 0 60px;
}

.main {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 20px;
}

.left-content {
  display: block;
}

.input-login input {
  display: block;
  width: 390px;
  height: 40px;
  margin: 10px 0 20px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.checkbox input {
  margin: 0 10px 10px 0;
}
.btn {
  width: 250px;
  height: 50px;
  margin-top: 20px;
  font-size: 20px;
  color: white;
  background-color: rgb(41, 141, 255);
  border-radius: 8px;
  border: 1px solid;
}

.right-content {
  display: block;
}

.right-content button {
  display: block;
  width: 390px;
  height: 40px;
  margin-bottom: 20px;
  border: 1px solid black;
  background-color: white;
  border-radius: 8px;
}

.center-line {
  border: 1px solid black;
  height: 300px;
  width: 1px;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
