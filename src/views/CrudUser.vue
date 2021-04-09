<template>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css">
    <div id="nav">
        <div class="ui main container">
            <MyForm :form="form" @onFormSubmit="onFormSubmit"/>
            <Loader v-if="loader"/>
            <CustomerList :customers="customers" @onDelete="onDelete" @onEdit="onEdit" />
        </div>
    </div>
</template>

<script>
const axios = require('axios').default;

import MyForm from "../components/MyForm.vue";
import CustomerList from "../components/CustomerList.vue";
import Loader from "../components/Loader.vue";

export default {
    name: 'CrudUser',
    components: {
        MyForm,
        CustomerList,
        Loader
    },
    data() {
    return {
        url: "https://unnatural.fr/api/users",
        customers: [],
        form: {name: '', email: '', password: '', isEdit: false},
        loader: false
    };
    },
    methods: {
        getCustomers() {
            this.loader = true;

            axios.get(this.url).then(data => {
            this.customers = data.data;

            this.loader = false;
            });
        },
        deleteCustomer(id) {
            this.loader = true;

            axios.delete(`${this.url}/${id}`)
            .then(() => {
            this.getCustomers();
            })
            .catch(e => {
            alert(e);
            });
        },
        createCustomer(data) {
            this.loader = true;

            axios.post(this.url, {
            name: data.name,
            email: data.email,
            password: data.password
            }).then(() => {
            this.getCustomers();
            }). catch(e => {
            alert(e);
            });
        },
        editCustomer(data) {
            this.loader = true;

            axios.put(`${this.url}/${data.id}` , {
            name: data.name,
            email: data.email,
            password: data.password,
            }).then(() => {
            this.getCustomers();
            }).ctach(e => {
            alert(e);
            })
        },
        onDelete(id) {
            // window.console.log("app delete" + id);
            this.deleteCustomer(id);
        },
        onEdit(data) {
            // window.console.log("add edit", data);
            this.form = data;
            this.form.isEdit = true;
        },
        onFormSubmit(data) {
            // window.console.log("app onformsubmit", data);

            if (data.isEdit) {
            // call edit customer
            this.editCustomer(data);
            }
            else {
            // call create customer
            this.createCustomer(data);
            }
        }
    },
    created() {
    this.getCustomers();
    }
}
</script>

<style lang="scss" scoped>
.vue-color {
  background: #41b883 !important;
}

.main.container {
  margin-top: 60px;
}

.submit-button {
  margin-top: 24px !important;
  float: right;
}

.data {
  margin-top: 15px;
}

thead tr th {
  background-color: green !important;
}

.ui.inverted.dimmer {
  background-color: rgba(225, 255, 255, 0) !important;
}
</style>