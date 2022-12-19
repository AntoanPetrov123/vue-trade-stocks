<template>
    <div id="signup">
        <div class="signup-form">
            <form @submit.prevent="onSubmit">
                <div class="input" :class="{ invalid: $v.username.$error }">
                    <label for="username">Username</label>
                    <input type="text" id="username" @touch="$v.username.$touch()" v-model="username">
                    <p v-if="!$v.username.required">Username must be not empty</p>
                </div>
                <div class="input" :class="{ invalid: $v.email.$error }">
                    <label for="email">Mail</label>
                    <!-- input="$v" give us access to validators / reserved word -->
                    <input type="email" id="email" @blur="$v.email.$touch()" v-model="email">
                    <p v-if="!$v.email.email">Email is invalid</p>
                </div>
                <div class="input" :class="{ invalid: $v.age.$error }">
                    <label for="age">Your Age</label>
                    <input type="number" id="age" @blur="$v.age.$touch()" v-model.number="age">
                    <!-- $v.age.$params.minVal.min get params passed to a function, in our case it is 18 -->
                    <p v-if="!$v.age.minVal">You have to be at least {{ $v.age.$params.minVal.min }} years old.</p>
                </div>
                <div class="input" :class="{ invalid: $v.password.$error }">
                    <label for="password">Password</label>
                    <input type="password" id="password" @blur="$v.password.$touch()" v-model="password">
                    <p v-if="!$v.password.minLen">Password must be at least {{ $v.password.$params.minLen.min }}
                        characters.
                    </p>
                </div>
                <div class="input" :class="{ invalid: $v.confirmPassword.$error }">
                    <label for="confirm-password">Confirm Password</label>
                    <input type="password" id="confirm-password" @blur="$v.confirmPassword.$touch()"
                        v-model="confirmPassword">
                    <p v-if="!$v.confirmPassword.sameAs">Passwords must be equal.</p>
                </div>
                <div class="input">
                    <label for="country">Country</label>
                    <select id="country" v-model="country">
                        <option value="usa">USA</option>
                        <option value="bulgaria">Bulgaria</option>
                        <option value="uk">UK</option>
                        <option value="germany">Germany</option>
                    </select>
                </div>
                <div class="input" :class="{ invalid: $v.balance.$error }">
                    <label for="balance">Balance</label>
                    <input type="number" id="balance" @blur="$v.balance.$touch()" v-model="balance">
                    <p v-if="!$v.balance.minVal">You have deposit at least {{ $v.balance.$params.minVal.min }} $.</p>
                    <p v-if="!$v.balance.maxVal">You have deposit at last {{ $v.balance.$params.maxVal.max }} $.</p>
                </div>
                <!-- <div class="hobbies">
                    <h3>Add some Hobbies</h3>
                    <button @click="onAddHobby" type="button">Add Hobby</button>
                    <div class="hobby-list">
                        <div class="input" v-for="(hobbyInput, index) in hobbyInputs" :key="hobbyInput.id">
                            <label :for="hobbyInput.id">Hobby #{{ index }}</label>
                            <input type="text" :id="hobbyInput.id" v-model="hobbyInput.value">
                            <button @click="onDeleteHobby(hobbyInput.id)" type="button">X</button>
                        </div>
                    </div>
                </div> -->
                <div class="input inline" :class="{ invalid: $v.terms.$valid }">
                    <input type="checkbox" id="terms" @change="$v.terms.$touch()" v-model="terms">
                    <label for="terms">Accept Terms of Use</label>
                </div>
                <div class="submit">
                    <button type="submit" :disabled="$v.$invalid">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>
  
<script>
import { required, email, numeric, minValue, minLength, sameAs, requiredUnless, maxValue } from 'vuelidate/lib/validators';

export default {
    data() {
        return {
            username: '',
            email: '',
            age: null,
            password: '',
            confirmPassword: '',
            country: 'usa',
            balance: null,
            // hobbyInputs: [],
            terms: false
        }
    },
    validations: {
        username: {
            required
        },
        email: {
            required,
            email
        },
        age: {
            required,
            numeric,
            minVal: minValue(18)
        },
        password: {
            required,
            minLen: minLength(6)
        },
        confirmPassword: {
            // sameAs: sameAs('password')
            sameAs: sameAs(vm => {
                return vm.password;
            })
        },
        terms: {
            required: requiredUnless(vm => {
                return vm.country === 'bulgaria';
            })
        },
        balance: {
            required,
            numeric,
            minVal: minValue(100),
            maxVal: maxValue(10000)
        }
    },
    methods: {
        // onAddHobby() {
        //     const newHobby = {
        //         id: Math.random() * Math.random() * 1000,
        //         value: ''
        //     }
        //     this.hobbyInputs.push(newHobby)
        // },
        // onDeleteHobby(id) {
        //     this.hobbyInputs = this.hobbyInputs.filter(hobby => hobby.id !== id)
        // },
        onSubmit() {
            const formData = {
                username: this.username,
                email: this.email,
                age: this.age,
                password: this.password,
                confirmPassword: this.confirmPassword,
                country: this.country,
                balance: this.balance,
                // hobbies: this.hobbyInputs.map(hobby => hobby.value),
                terms: this.terms
            }
            console.log(formData)
            this.$store.dispatch('register', formData);
        }
    }
}
</script>
  
<style scoped>
.signup-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
}

.input {
    margin: 10px auto;
}

.input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
}

.input.inline label {
    display: inline;
}

.input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
}

.input.inline input {
    width: auto;
}

.input input:focus {
    outline: none;
    border: 1px solid #521751;
    background-color: #eee;
}

.input.invalid label {
    color: red;
}

.input.invalid input {
    border: 1px solid red;
    background-color: #ee6e86;
}

.input select {
    border: 1px solid #ccc;
    font: inherit;
}

.hobbies button {
    border: 1px solid #521751;
    background: #521751;
    color: white;
    padding: 6px;
    font: inherit;
    cursor: pointer;
}

.hobbies button:hover,
.hobbies button:active {
    background-color: #8d4288;
}

.hobbies input {
    width: 90%;
}

.submit button {
    border: 1px solid #521751;
    color: #521751;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
}

.submit button:hover,
.submit button:active {
    background-color: #521751;
    color: white;
}

.submit button[disabled],
.submit button[disabled]:hover,
.submit button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
}
</style>