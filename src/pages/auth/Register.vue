<template>
    <q-layout>
        <q-page-container>
        <q-page class="flex flex-center">
            <div id="particles-js" :class="$q.dark.isActive ? 'dark_gradient' : 'normal_gradient'"></div>
            <q-btn color="white" class="absolute-top-right" flat round @click="$q.dark.toggle()" :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'" />
            <q-card class="login-form" v-bind:style=" $q.platform.is.mobile ? { width: '80%' } : { width: '40%' } " >
            <!-- <q-img src="../../statics/images/pharmacy.jpg"></q-img> -->
            <q-card-section>
                <!-- <q-avatar size="74px" class="absolute" style="top: 0;right: 25px;transform: translateY(-50%);"><img src="https://cdn.quasar.dev/img/boy-avatar.png" /></q-avatar> -->
                <div class="row no-wrap items-center">
                <div class="col text-h6 ellipsis">Regsiter With Us</div>
                </div>
            </q-card-section>
            <q-card-section>
                <q-form class="q-gutter-md" @submit="onSubmit">
                    <q-input v-model="name" label="Name" :rules="[...rules.required]"/>
                    <q-input v-model="email" label="Email" :rules="[...rules.required]"/>
                    <q-input v-model="password" label="Password" :rules="[...rules.required]"/>
                    <q-input v-model="confirm_password" label="Confirm Password" :rules="[...rules.required]"/>
                    <q-input v-model="confirm_password" label="Confirm Password" :rules="[...rules.required]"/>
                    <q-select v-model="role" :options="options" option-value="value" option-label="text" label="Iam a" :rules="[...rules.required]"/>
                    <div v-if="this.role.value=='CheckUser'">
                        <q-select emit-value map-options v-model="institute" :options="schoolOptions" option-value="value" option-label="text" label="Select Organisation" :rules="[...rules.required]"/>
                        <!-- <q-select v-model="institute" :options="schoolOptions" option-value="value" option-label="text" label="Select Organisation" /> -->
                        <p>Your login will be held till the organisation approves it</p>
                    </div>
                    <div><q-btn label="Register" type="submit" color="primary"/></div>
                </q-form>
            </q-card-section>
            </q-card>
        </q-page>
        </q-page-container>
    </q-layout>
</template>

<script>
    import { mapGetters } from 'vuex';
    import {rules} from '../../store/functions'

    export default {
        data() {
            return {
                rules : rules,
                name: 'Amit',
                email: 'amit.khare588@gmail.com',
                password: '123456789',
                confirm_password: '123456789',
                role: {'text': '', 'value': ''},
                institute: '',
                options: [
                    {'text': 'Student', 'value': 'User'},
                    {'text': 'Parent', 'value': 'Parent'},
                    {'text': 'Home Tutor', 'value': 'Tutor'},
                    {'text': 'Teacher', 'value': 'Teacher'},
                    {'text': 'Institute Admin', 'value': 'CheckUser'},
                ],
            }
        },
        methods: {
            onSubmit(e) {
                e.preventDefault();
                if(this.role.value=='User' || this.role.value=='Tutor'){
                    var status = 1
                }else{
                    var status = 0
                }
                const data = {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    confirm_password: this.confirm_password,
                    role: this.role.value,
                    status: status,
                    institute: this.institute.value
                };
                this.$store.dispatch('register', data);
            },
            // ...mapActions(['schoolOptions']),
        },
        mounted() {
            particlesJS("particles-js", {
                "particles": {
                    "number": {
                        "value": 80,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#ffffff"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 5
                        },
                        "image": {
                            "src": "img/github.svg",
                            "width": 100,
                            "height": 100
                        }
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": false,
                        "anim": {
                            "enable": false,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 40,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#ffffff",
                        "opacity": 0.4,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 6,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "grab"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 140,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            });
            // if(typeof(Storage) !== "undefined" && JSON.parse(localStorage.getItem('user'))){
            //     this.setState({ auth: JSON.parse(localStorage.getItem('user')).auth || false })
            // }
        },
        computed: {
            ...mapGetters(['schoolOptions']),
        },
        created() {
            this.$store.dispatch('schoolOptions');
        },
    }
</script>

<style>
    #particles-js {
    position: absolute;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    }
    .normal_gradient {
        background: linear-gradient(145deg, rgb(74, 94, 137) 15%, #b61924 70%);
    }
    .dark_gradient {
        background: linear-gradient(145deg, rgb(11, 26, 61) 15%, #4c1014 70%);
    }
    .login-form {
        position: absolute;
    }
</style>
