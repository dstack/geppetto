<template>
  <Settings>
    <label>X Position ( {{xPos}} )
      <input type="range" @input="updateData($event)" name="xPos" v-bind:value="xPos" min="-2" max="2" step="0.1" />
    </label>

    <label>Y Position ( {{yPos}} )
      <input type="range" @input="updateData($event)" name="yPos" v-bind:value="yPos" min="-2" max="2" step="0.1" />
    </label>

    <label>Scale ( {{scale}} )
      <input type="range" @input="updateData($event)" name="scale" v-bind:value="scale" min="0.25" max="2" step="0.05" />
    </label>
  </Settings>
</template>

<script>
  import { ipcRenderer } from 'electron'
  import Settings from './Settings'
  export default {
    name: 'PosOriApp',
    data: () => {
      return {
        yPos: 0,
        xPos: 0,
        scale: 1
      }
    },
    methods: {
      updateData: function (evt) {
        let el = evt.srcElement
        this[el.name] = el.value
        ipcRenderer.send('pos-ori', {prop: el.name, val: el.value})
      }
    },
    components: {
      Settings
    }
  }
</script>

<style></style>
