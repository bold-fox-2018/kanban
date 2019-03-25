<template>
    <div id="navbar">
        <NavbarGeneral></NavbarGeneral>

        <div class="d-flex">
            <OuterCards :detail="todo"></OuterCards>
            <OuterCards :detail="doToday"></OuterCards>
            <OuterCards :detail="inProgress"></OuterCards>
            <OuterCards :detail="done"></OuterCards>
        </div>
    </div>
</template>

<script>
    import NavbarGeneral from '@/components/NavbarGeneral.vue'
    import OuterCards from '@/components/outer-cards.vue'
    import InputForm from '@/components/input-form.vue'
    import db from '@/Firebase/config.js'

    export default {
        name: 'navbar',
        components: {
            NavbarGeneral: NavbarGeneral,
            OuterCards: OuterCards
        },
        created() {
            db.collection("todos").onSnapshot(querySnapshot => {
                    this.todo.todos = []
                    this.doToday.todos = []
                    this.inProgress.todos = []
                    this.done.todos = []
                    querySnapshot.forEach((doc) => {
                        let data = doc.data()
                        data['id'] = doc.id
                        data['previous'] = this.definePrev(data.status)
                        data['next'] = this.defineNext(data.status)
                        if (doc.data().status == 0) {
                            this.todo.todos.push(data)
                        } else if (doc.data().status == 1) {
                            this.doToday.todos.push(data)
                        } else if (doc.data().status == 2) {
                            this.inProgress.todos.push(data)
                        } else {
                            this.done.todos.push(data)
                        }
                });
            })
        },
        data() {
            return {
                todo: {
                    title: 'To Do',
                    borderColor: 'max-width: 18rem; background-color: #719fe8;',
                    todos: [],
                },
                doToday: {
                    title: 'Do Today',
                    borderColor: 'max-width: 18rem; background-color: #77c678;',
                    todos: []
                },
                inProgress: {
                    title: 'In Progress',
                    borderColor: 'max-width: 18rem; background-color: #cc9278;',
                    todos: []
                },
                done: {
                    title: 'Done',
                    borderColor: 'max-width: 18rem; background-color: #9575c6;',
                    todos: []
                }
            }
        }, 
        methods: {
            definePrev(status) {
                if (status == 1) {
                    // this.next = 'In Progress'
                    return 'To Do'
                } else if (status == 2) {
                    // this.next = 'Done'
                    return 'Do Today'
                } else if (status == 3) {
                    return 'In Progress'
                }
            },
            defineNext(status) {
                if (status == 0) {
                    return 'Do Today'
                } else if (status == 1) {
                    return 'In Progress'
                    // this.previous = 'To Do'
                } else if (status == 2) {
                    return 'Done'
                    // this.previous = 'Do Today'
                }
            }
        }
    }
</script>

