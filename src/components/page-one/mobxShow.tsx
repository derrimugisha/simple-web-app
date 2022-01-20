import React from "react"
import Todolist from "./mobx"
import { TodoStore } from "./store"

const MobxShow=()=>{
    return <div><Todolist todoStore={TodoStore}/></div>
}
export default MobxShow