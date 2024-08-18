<template>
  <h1>header</h1>
  <ul>
    <li v-for="item in items">
      {{ item.name }}
    </li>
  </ul>
</template>

<script setup>

let items = [
  {
    name: 'name A',
    action: 'something'
  },
  {
    name: 'name B',
    action: 'something'
  },
  {
    name: 'name C',
    action: 'something'
  },
  {
    name: 'name D',
    action: 'something'
  },
  {
    name: 'name E',
    action: 'something'
  },
];

</script>