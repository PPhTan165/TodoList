<script setup lang="ts">

</script>

<template>
  <main>
    <h2>ABOUT</h2>
    <div class="content">
      <div class="about">
        <p>
          Hi! My name is <span>PHUC TAN</span>, and I’m a passionate web
          developer. This is my very first full-stack project built with Vue 3
          on the frontend and Node.js on the backend. Since this is my first
          time developing a complete application from start to finish, I know it
          might not be perfect yet—but I’m eager to learn and improve.
        </p>
        <p>
          I truly appreciate you taking the time to try out and review this
          project. Your feedback means a lot to me because it will help me gain
          real-world experience, refine my skills, and become a better
          developer. Please feel free to share any suggestions, comments, or
          critiques about the project’s functionality, code structure, design,
          or overall user experience.
        </p>
        <p>
          Thank you once again for your time and support. I hope this project
          can not only showcase my current abilities but also demonstrate my
          willingness to grow, adapt, and deliver better products in the future!
        </p>
      </div>
      <div class="ava">
        <img
          src="../assets/img/IMG_8730.JPG"
          alt=""
          width="350px"
          height="500px"
          loading="lazy"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
@property --h {
  syntax: "<number>";
  inherits: false;
  initial-value: 0;
}
h2 {
  margin-top: 20px;
  text-align: right;
  font-size: 2rem;
  font-weight: 800;
  text-decoration: underline;
}
.content {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 20px;
  border-radius: 20px;
  margin-top: 20px;
  transition: all 0.3s ease-in;
}
.about {
  border: 4px solid hsl(var(--h), 200%, 80%);
  border-right: none;
  border-radius: 12px 0 0 12px;
  padding: 20px;
  height: 500px;
  animation: border 5s linear infinite;
  background-color: #000000;
}
img {
  border: 4px solid hsl(var(--h), 200%, 80%);
  border-left: none;
  border-radius: 0 12px 12px 0;
  padding: 20px;
  height: 500px;
  animation: border 5s linear infinite;
  background-color: #000000;
}
.about p {
  max-width: 800px;
  font-size: 1.2rem;
  margin: 20px auto;
  color: rgba(255, 255, 255, 0.719);
  text-align: justify;
}

span {
  --h: 0;
  color: hsl(var(--h) 80% 80%);
  font-weight: 600;
  font-size: 1.8rem;
  animation: name 5s linear infinite;
}

@keyframes name {
  to {
    --h: 360;
  }
}

@keyframes border {
  to {
    --h: 360;
  }
}
</style>
