<template>
    <!-- Modal -->
    <div class="modal fade" :id="'detail-modal-' + category" tabindex="-1" role="dialog" aria-labelledby="detailModalTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Detail Task: {{ todo.name }} for {{ todo.assignedTo }} Halo</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <strong>Task Description:</strong> <br> {{ todo.description}} <br>
                <strong>Point:</strong> <br> {{ todo.point }} <br>
                <strong>Status: </strong> <br> {{ todo.category }} <br>
                
            </div>
            <div class="modal-footer">
                <div class="d-flex justify-content-between">
                    <button class="btn" style="background-color: red; color: white;" v-if="todo.category === 'ToDo'" @click.prevent="updateTodo(todo.id, todo.category, -1)">Back-Log</button>
                    <button class="btn btn-warning" v-if="todo.category === 'Doing'" @click.prevent="updateTodo(todo.id, todo.category, -1)">To Do</button>
                    <button class="btn btn-primary" v-if="todo.category === 'Done'" @click.prevent="updateTodo(todo.id, todo.category, -1)">Doing</button>
                    <button class="btn btn-danger" @click.prevent="deleteTodo(todo.id)">Delete</button>
                    <button class="btn btn-warning" v-if="todo.category === 'Back-Log'" @click.prevent="updateTodo(todo.id, todo.category, 1)">To Do</button>
                    <button class="btn btn-primary" v-if="todo.category === 'ToDo'" @click.prevent="updateTodo(todo.id, todo.category, 1)">Doing</button>
                    <button class="btn btn-success" v-if="todo.category === 'Doing'" @click.prevent="updateTodo(todo.id, todo.category, 1)">Done</button>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import db from '@/api/firebase';
export default {
    props: ['todo', 'category'],
    methods: {
        updateTodo(id, category, direction) {
            console.log("masuk update todo", id, category, direction)
            const categoryList = ['Back-Log', 'ToDo', 'Doing', 'Done']
            db.collection('todos')
                .doc(id)
                .update({
                category: categoryList[categoryList.indexOf(category) + direction]
                })
                .then(() => {
                console.log('update berhasil')
                })
                .catch(err => {
                console.log(err)
                })
        },
        deleteTodo(id) {
            console.log("masuk delete todo", id)
            db.collection('todos')
                .doc(id)
                .delete()
                .then(response => {
                console.log('delete berhasil', response)
                })
                .catch(err => {
                console.log(err)
                })
        },
    }
}
</script>


