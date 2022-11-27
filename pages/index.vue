<template>
  <div class="grid grid-cols-12 gap-2">
    <v-card class="col-span-12"></v-card>
    <v-card class="col-span-3">
      <p>and group - search</p>
    </v-card>

    <v-card class="col-span-9">
      <p>game object - fuzzy search</p>
    </v-card>

    <div class="col-span-3">
      <div class="grid grid-flow-row gap-2">
        <v-card style="height: 256px">
          <p>and group 2</p>
        </v-card>
        <v-card style="height: 128px">
          <p>and group 2</p>
        </v-card>
        <v-card style="height: 402px">
          <p>and group 2</p>
        </v-card>
      </div>
    </div>

    <div class="col-span-9">
      <SimpleTable></SimpleTable>
    </div>
  </div>
</template>

<script>
import SimpleTable from '../components/SimpleTable.vue'

export default {
  name: 'IndexPage',
  components: { SimpleTable },
}
</script>
