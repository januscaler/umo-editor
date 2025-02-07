<template>
  <menus-button
    ico="comment"
    :text="t('comment.text')"
    @menu-click="openCommentBox"
  />
</template>

<script setup lang="ts">
const { editor } = useStore()
const openCommentBox = () => {
  editor.value?.commands.focus()
}
</script>

<style lang="less" scoped></style>
