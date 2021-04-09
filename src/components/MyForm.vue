<template>
  <div class="my-form">
      <form class="ui form">
            <div class="fields">
                <div class="four wide field">
                    <label>Name</label>
                    <input type="text"
                    name="name"
                    placeholder="First name"
                    @change="handleChange"
                    :value="form.name"
                    />
                </div>

                <!-- <div class="four wide field">
                    <label>Last Name</label>
                    <input type="text" name="last_name" placeholder="Last name" />
                </div> -->

                <div class="six wide field">
                    <label>E-mail</label>
                    <input type="email"
                    name="email"
                    placeholder="E-mail"
                    @change="handleChange"
                    :value="form.email"
                    />
                </div>

                <div class="four wide field">
                    <label>Password</label>
                    <input type="password"
                    name="password"
                    placeholder="Your password"
                    @change="handleChange"
                    :value="form.password"
                    />
                </div>


                <div class="two wide field">
                    <button :class="btnClass"
                    @click="onFormSubmit">{{ btnName }}</button>
                </div>
                
            </div>
      </form>
  </div>
</template>

<script>
export default {
    name: "MyForm",
    data() {
        return {
            btnName: "SAVE",
            btnClass: "ui primary button submit-button"
        }
    },
    props: {
        form: {
            type: Object
        }
    },
    methods: {
        handleChange(event) {
            const {name, value} = event.target;
            let form = this.form;
            form[name] = value;
            // this.form = form;
        },
        onFormSubmit(e) {
            // prevent form submit
            e.preventDefault();

            // form validation
            if(this.formValidation()) {
                // window.console.log("ready to submit");
                this.$emit("onFormSubmit", this.form);

                // change the button to save
                this.btnName = "SAVED";
                this.btnClass = "ui primary button submit-button";

            }
        },
        formValidation() {
            //name
            if(document.getElementsByName('name')[0].value === "") {
                alert('Enter name');
                return false;
            }

            //email
            if(document.getElementsByName('email')[0].value === "") {
                alert('Enter email');
                return false;
            }

            //password
            if(document.getElementsByName('password')[0].value === "") {
                alert('Enter password');
                return false;
            }

            return true;
            
        },
    }, //fin methods

    updated() {
        if(this.form.isEdit) {
            this.btnName = "Update";
            this.btnClass = "ui orange button submit-button";
        }
    }
};

</script>

<style scoped>
label{
    color: snow !important;
}

</style>