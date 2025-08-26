<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const slides = [
  { text: "Trang 1" },
  { text: "Trang 2" },
  { text: "Trang 3" },
  { text: "Trang 4" },
  { text: "Trang 5" },
];

const currentIndex = ref(0);
let interval: any = null;

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.length;
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + slides.length) % slides.length;
};

const goToSlide = (index: number) => {
  currentIndex.value = index;
};

onMounted(() => {
  interval = setInterval(nextSlide, 3000); // tự động chuyển 3 giây
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<template>
  <div class="carousel">
    <!-- Slides -->
    <div
      class="carousel-inner"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div v-for="(slide, index) in slides" :key="index" class="carousel-item">
        <h1>{{ slide.text }}</h1>
      </div>
    </div>

    <!-- Prev & Next buttons -->
    <button class="carousel-btn prev" @click="prevSlide">‹</button>
    <button class="carousel-btn next" @click="nextSlide">›</button>

    <!-- Dots -->
    <div class="carousel-dots">
      <span
        v-for="(slide, index) in slides"
        :key="index"
        :class="{ active: index === currentIndex }"
        @click="goToSlide(index)"
      ></span>
    </div>
  </div>
</template>

<style scoped>
.carousel {
  position: relative;
  width: 100%;
  max-width: 1280px;
  height: 400px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.carousel-inner {
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%;
  height: 100%;
}

.carousel-item {
  min-width: 100%;
  height: 100%;
  background: #777777;
  color: white;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-btn {
  position: absolute;
  top: 40%;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 2rem;
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 50%;
  user-select: none;
  z-index: 10;
}

.carousel-btn:hover {
  background: rgba(0, 0, 0, 0.7);
}

.prev {
  left: 10px;
}
.next {
  right: 10px;
}

.carousel-dots {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
}

.carousel-dots span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background 0.3s ease;
}

.carousel-dots span.active {
  background: white;
}
</style>
