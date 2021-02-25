<template>
  <div class="nofind">
    404
    <div v-for="(item,index) in activeUsers" :key='index' >
      {{item.name}}
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      list:[
        {name:'cgw1',active:true},
        {name:'cgw2',active:true},
        {name:'cgw3',active:false},
        {name:'cgw4',active:true},
      ]
    }
  },
  computed: {
  activeUsers() {
    return this.list.filter(function (user) {
      return user.active
    })
  }
}
}
</script>
<style lang="sass" scoped>

</style>
