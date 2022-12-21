<template>
  <slot></slot>
</template>

<script lang="ts" setup>

const startDrag = (event: DragEvent, itemId: number) => {
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = "move"
    event.dataTransfer.effectAllowed = "move"
    event.dataTransfer.setData("itemId", itemId.toString())
  }

  const onDrop = (event: DragEvent) => {
    if (event.dataTransfer) {
      const itemId = event.dataTransfer.getData("itemId")

    }
  }

</script>
