
<template>
  <div>
    <input type="text" v-model="title" @keydown.enter="addTodo" />
    <ul v-if="todos.length">
      <transition-group name="flip-list" tag="ul">
        <li v-for="(todo,index) in todos" :key="todo.title">
          <input type="checkbox" v-model="todo.done" />
          <span :class="{ done: todo.done }"> {{ todo.title }}</span>
          <span @click="removeTodo($event,index)">X</span>
        </li>
      </transition-group>
    </ul>
    <div v-else>暂无数据</div>
    <div>
        全选<input type="checkbox" v-model="allDone" />
        <span>{{active}}/{{all}}</span>
    </div>
  </div>

  <div class="animate-wrap">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="animate" v-show="animate.show">
      📋
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref,computed,reactive } from "vue";
let title = ref("");
let todos = ref([{title:'学习Vue',done:false}])

function addTodo() {
  todos.value.push({
    title: title.value,
    done: false,
  });
  title.value = "";
}
let active = computed(()=>{
    return todos.value.filter((v)=>!v.done).length
})
let all = computed(() =>{
    return  todos.value.length
})
let allDone = computed({
    get:function(){
        return active.value === 0
    },
    set:function(value){
        todos.value.forEach((todo)=>{
            todo.done = value
        })
    }
})

let animate = reactive({ show:false, el:null})

function removeTodo(e,i){
  animate.el = e.target
  animate.show = true
  todos.value.splice(i,1)
}

function beforeEnter(el){
  let dom = animate.el
  let rect = dom.getBoundingClientRect()
  let x = window.innerWidth - rect.left - 60
  let y = rect.top - 10
  el.style.transform = `translate(-${x}px, ${y}px)`
}

function enter(el,done){
  document.body.offsetHeight
  el.style.transform = `translate(0,0)`
  el.addEventListener('transitionend', done)
}
function afterEnter(el){
  animate.show = false
  el.style.display = 'none'
}

</script>

<style scoped>
  .flip-list-move { transition: transform 0.8s ease;}
  .flip-list-enter-active,.flip-list-leave-active { transition: all 1s ease;}.flip-list-enter-from,.flip-list-leave-to { opacity: 0; transform: translateX(30px);}
  .animate-wrap .animate{ position :fixed; right :10px; top :10px; z-index: 100; transition: all 0.5s linear;}
</style>