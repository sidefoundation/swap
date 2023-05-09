<template>
  <p class="text-4xl font-bold underline">Hello SWAP!</p>

  <button class="btn">Button</button>

  <Icon name="uil:github" size="40" />

  <div>
    <h1>Color mode: {{ $colorMode.value }}</h1>
    <select v-model="$colorMode.preference">
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="sepia">Sepia</option>
    </select>
  </div>
</template>

<script setup>
const colorMode = useColorMode();
console.log(colorMode.preference);
</script>
