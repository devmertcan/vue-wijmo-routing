<template>
    <div>
      <!-- Button to open the modal -->
      <button class="btn btn-primary" @click="openModal">Manage Tags</button>
  
      <!-- Tag modal component -->
      <TagModal :isOpen="isModalOpen" @close="closeModal" />
    </div>
  </template>
  
  <script>
  import TagModal from "@/components/TagModal.vue";
  import { ref, defineComponent} from "vue";
  
  export default defineComponent ({
    name: "TagManage",
    components: {
      TagModal
    },
    data() {
      return {
        isModalOpen: false
      };
    },
    methods: {
      openModal() {
        this.isModalOpen = true;
      },
      closeModal() {
        this.isModalOpen = false;
      }
    }
  });
  </script>
  