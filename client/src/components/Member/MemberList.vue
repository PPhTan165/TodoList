<template>
  <div class="member-box">
    <div>
      <h4>Quản trị:</h4>
      <ul>
        <li v-for="(admin, i) in admins" :key="'admin-' + i">{{ admin }}</li>
      </ul>
    </div>

    <div>
      <h4>Thành viên:</h4>
      <ul>
        <li v-for="(member, i) in members" :key="'member-' + i">{{ member }}</li>
      </ul>
    </div>

    <button class="invite-btn">Mời</button>
  </div>
</template>

<script setup>
defineProps({
  admins: {
    type: Array,
    default: () => []
  },
  members: {
    type: Array,
    default: () => []
  }
});
</script>

<style scoped>
h4 {
  margin-bottom: 5px;
  font-size: 25px;
  font-weight: 600;
}
ul {
  list-style-type: disc;
  padding-left: 18px;
  margin-bottom: 15px;
}
.invite-btn {
  display: block;
  width: 100%;
  font-size: large;
  font-weight: 600;
  background: white;
  border: none;
  padding: 8px 0;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0,0,0,0.2);
  cursor: pointer;
}
.invite-btn:hover {
  background-color: #eee;
}

ul li { 
    font-size: 18px;
    margin: 0 0 15px 10px;
}
</style>
