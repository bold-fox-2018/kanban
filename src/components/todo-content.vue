<template>
    <div>
        <!-- <p style="color: black;">{{todos}}</templpate> -->
        <div class="card mb-1" v-for="td in todos" :key="td.id">
            <!-- {{td}} -->
            <div class="card-body" data-toggle="modal" :data-target="`#editTodo${td.id}`">
                <!-- {{td.status}} -->
                <a href="#">{{td.todo}}</a>
            </div>
            <div class="modal fade" :id="`editTodo${td.id}`" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> 
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Detail</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Todo</label>
                                <input type="text" class="form-control" id="exampleFormControlInput1" :placeholder="td.todo" v-model="todo">
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Description</label>
                                <input type="text" class="form-control" id="exampleFormControlInput1" :placeholder="td.description" v-model="description">
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Point</label>
                                <input type="text" class="form-control" id="exampleFormControlInput1" :placeholder="td.point" v-model="point">
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Assigned To</label>
                                <input type="text" class="form-control" id="exampleFormControlInput1" :placeholder="td.assigned_to" v-model="assigned_to">
                            </div>

                    </div>
                    <div class="modal-footer d-flex">
                        <!-- <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button> -->
                        <div>
                            <button id="modal-button" type="button" class="btn btn-primary" v-if="td.status !== 0" @click="previousState(td.id, td.status)">{{ td.previous }}</button>
                        </div>
                        <div>
                            <button id="modal-button" type="button" class="btn btn-primary delete-button" @click="remove(td.id)">Delete</button>
                        </div>
                        <div>
                            <button id="modal-button" type="button" class="btn btn-primary" v-if="td.status !== 3" @click="nextState(td.id, td.status)">{{ td.next }}</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div> 
        </div>   
    </div>
</template>

<script>
    import db from '@/Firebase/config.js'
    export default {
        props: ['todos'],
        created() {

        },
        data() {
            return {
                todo: '',
                description: '',
                status: 0,
                previous: '',
                next: '',
                point: null,
                assigned_to: '',
                modalHide: true,
                modalShow: false
            }
        },
        methods: {
            remove(id) {
                db.collection("todos")
                    .doc(id)
                    .delete()
                    .then(function() {
                        console.log($(`#editTodo${id}`));
                        $(`#editTodo${id}`).modal('toggle')
                    })
                    .catch(function(error) {
                        console.error("Error removing document: ", error);
                    });
            },
            previousState(id, state) {
                if (state == 0) {
                    console.log('gabisa')
                } else {
                    let newStatus = state - 1
                    db.collection("todos")
                        .doc(id)
                        .update({
                            status: newStatus
                        })
                        .then(function() {
                            $(`#editTodo${id}`).modal('toggle')
                            // console.log("Document successfully updated!");
                        })
                        .catch(function(error) {
                            // The document probably doesn't exist.
                            console.error("Error updating document: ", error);
                        });
                }
            },
            nextState(id, state) {
                if (this.status == 3) {
                    console.log('gabisa')
                } else {
                    let newStatus = state + 1
                    db.collection("todos")
                        .doc(id)
                        .update({
                            status: newStatus
                        })
                        .then(function() {
                            $(`#editTodo${id}`).modal('toggle')
                            // console.log("Document successfully updated!");
                        })
                        .catch(function(error) {
                            console.error("Error updating document: ", error);
                        });
                }
            }
        }
    }
</script>

<style>
    .delete-button {
        background-color: #c60d26 !important;
        color: white;
    }
</style>


