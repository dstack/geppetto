<template>
  <Settings>
    <label>
      Peer ID<br/>
      <small>
        The ID you will connect with, used in the viewer to connect to your instance.
      </small>

      <input type="text" @input="updatePeerID($event)" v-bind:value="peerID" name="peerID" placeholder="Blank, use random" />

      <div class="warning" v-show="pidChanged">
        Updating this will restart the application.  Please confirm this action.
        <button class="btn" @click="commitPidChange($event)">Apply and Restart</button>
      </div>
    </label>

    <label>
      Character BG color
      <input type="text" @input="updateBGColor($event)" v-bind:value="bgColor" name="bgColor" placeholder="00ff00" />
    </label>
    <br/><br/>
    <center>
      More settings coming soon, have patience
    </center>

  </Settings>
</template>

<script>
  import Settings from './Settings'
  const settings = require('electron-settings')
  const app = require('electron').remote.app

  export default {
    name: 'SettingsApp',
    data: () => {
      let startingPID = settings.get('me.peerID')
      let startingBGColor = settings.get('me.bgColor')
      return {
        lastPeerID: startingPID,
        peerID: startingPID,
        pidChanged: false,
        bgColor: startingBGColor
      }
    },
    methods: {
      updatePeerID: function (evt) {
        let nval = evt.target.value
        this.peerID = nval
        if (this.lastPeerID !== this.peerID) {
          this.pidChanged = true
        }
      },
      commitPidChange: function (evt) {
        settings.set('me.peerID', this.peerID)
        // restart app
        app.relaunch()
        app.exit()
      },
      updateBGColor: function (evt) {
        let nval = evt.target.value.replace(/[^0-9a-f]/gi, '')
        this.bgColor = nval
        console.log('nval', this.bgColor)
        settings.set('me.bgColor', this.bgColor)
      }
    },
    components: {
      Settings
    }
  }
</script>

<style></style>
