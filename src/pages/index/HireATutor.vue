<template>
    <q-page padding>
        <section class="points mb-5">
            <div class="container page py-3">
                <h1 class="heading">Hire A <span>Tutor</span></h1>
                <p class="text-center">Hire tutors for home tuition through simple steps</p>
                <p>You can easily hire tutors near you for your studies requirement by filling up a simple for on our website. The details in the form are then shown to teachers near you who reach out to you to discuss your requirement. You can check their credentials and ask for few demo classes. Once you are happy and satisfied with the classes, you can hire the tutor to continue further. The financial understanding is completely between you and the teacher and we do not charge or influence this in any way. Hiring tutors had never been this easy. So simple fill a form and hire a tutor from pool we have today.</p>
                <div class="text-center" v-if="!showForm">
                    <q-btn color="deep-orange" glossy label="Login to Hire a Tutor" v-if="!user" @click="$router.replace('/login')"/>
                    <q-btn color="deep-orange" glossy label="Hire A Tutor" v-else @click="startForm()"/>
                </div>
                <q-form class="q-gutter-md hireTutorForm" v-if="showForm" @submit="onSubmit">
                    <div class="row q-pt-lg">
                        <div class="col-3 q-pr-lg q-mb-lg"><q-select emit-value map-options v-model="board" :options="boardOptions" option-value="id" option-label="name" label="Board" required/></div>
                        <div class="col-3 q-pr-lg q-mb-lg"><q-select emit-value map-options v-model="classes" :options="classOptions" option-value="id" option-label="name" label="Class" required @input="classSelected()"/></div>
                        <div class="col-3 q-pr-lg q-mb-lg"><q-select emit-value map-options v-model="subject" :options="subjectOptions" option-value="id" option-label="name" label="Subject" required /></div>
                        <div class="col-3 q-pr-lg q-mb-lg"><q-select emit-value map-options v-model="mode" :options="modeOptions" option-value="id" option-label="name" label="Learning Mode" required /></div>
                    </div>
                     <div class="row">
                        <div class="col-3 q-pr-lg q-mb-lg"><q-input v-model="phone" label="Phone" required error-message="Please use maximum 3 characters"/></div>
                        <div class="col-3 q-pr-lg q-mb-lg"><q-input v-model="state" label="State" required/></div>
                        <div class="col-3 q-pr-lg q-mb-lg"><q-input v-model="city" label="City" required/></div>
                        <div class="col-3 q-pr-lg q-mb-lg"><q-input v-model="street" label="Street" required/></div>
                        <div class="col-12 q-pr-lg q-mb-lg"><q-input v-model="message" label="Message" type="textarea"/></div>
                        <q-btn class="closeBtn" round color="primary" icon="remove" @click="hideForm()"/>
                    </div>
                    <div class="text-center"><q-btn label="Post the requirement" type="submit" color="primary"/></div>
                </q-form>
                <!-- <div class="text-center q-mt-lg" v-if="showForm">
                    <q-btn class="closeBtn" round color="primary" icon="remove" @click="hideForm()"/>
                    <q-btn label="Cancel requirement" type="submit" color="primary" @click="hideForm()"/>
                </div> -->
                <div class="row q-my-lg">
                    <div class="col-sm-12 text-center">
                        <h2 class="heading">Hire A <span>Tutor</span></h2>
                        <p class="text-center">Study Spectrum is a well-established and highly recognized educational website having a good pool of tutors. These tutors are well experienced and masters of their respective subjects. Our most appraised and recognized support is the tutoring service. We facilitate in connecting you with the best tutors in the desired subjects and classes in a very easy manner.</p>
                        <p class="text-center">There are various other reasons to choose our services which are given below.</p>
                    </div>
                    <div class="col-sm-4 q-mb-lg text-center">
                        <img src="/images/icons/best-teachers.svg" alt="Hire tutors in India">
                        <h3>Teachers are available for everything</h3>
                        <p>Anything and everything you want to learn</p>
                        <q-btn color="white" text-color="primary" label="Read More" @click="showChild(1)"/>
                    </div>
                    <div class="col-sm-4 q-mb-lg text-center">
                        <img src="/images/icons/best-educational-website.svg" alt="Hire tutors as per preference">
                        <h3>Hire tutors as per your preferences</h3>
                        <p>Hire the kind of teacher that your prefer</p>
                        <q-btn color="white" text-color="primary" label="Read More" @click="showChild(2)"/>
                    </div>
                    <div class="col-sm-4 q-mb-lg text-center">
                        <img src="/images/icons/test-customisation.svg" alt="Hire a tutor near you">
                        <h3>Huge list of teachers</h3>
                        <p>Show your requirement to a huge base </p>
                        <q-btn color="white" text-color="primary" label="Read More" @click="showChild(3)"/>
                    </div>
                </div>
                <div class="child">
                    <div v-if="this.active=='1'">
                        <h4>Teachers are available for everything</h4>
                        <p>Different students, different requirements. But we cater to all. With us, you will never run out of options to choose from. We have a great line up of teachers with varied range of skillsets and expertise. With us, you can get anything and everything you want to learn. Our teachers are there to assist you. They come from different educational background and prior teaching experience with renowned institutes. Therefore, they mentor the students with abled guidance according to individual needs.</p>
                        <q-btn color="white" text-color="primary" label="Close" @click="hideChild()"/>
                        <q-btn class="closeBtn" round color="primary" icon="remove" @click="hideChild()"/>
                    </div>
                    <div v-if="this.active=='2'">
                        <h4>Hire teachers as per your preference</h4>
                        <p>All our tutors are highly experienced and qualified in their respective fields of expertise. They provide best tuition support, teach you everything in a very professional but friendly way. You will find it much easier with our teachers to clear your doubts and concepts. The faculties are selected after determining their teaching capabilities and thorough process of evaluation. All of them were serving different big schools and training institutes before joining us. So, there is no need to worry about the quality of education. </p>
                        <q-btn color="white" text-color="primary" label="Close" @click="hideChild()"/>
                        <q-btn class="closeBtn" round color="primary" icon="remove" @click="hideChild()"/>
                        </div>
                    <div v-if="this.active=='3'">
                        <h4>Huge list of teachers</h4>
                        <p>We have a long list of teachers on board with us and we keep on enrolling new tutors to the platform. We want to ensure quality education and thus we take the teachers’ bandwidth into consideration. We do not want to bombard them with too many students and divide their focus. We at Study spectrum thrives at enhancing the education system with innovative approach towards the tuition services. Thus, even our faculty selection criteria are quite stringent.  We also keep exchanging feedback with the teachers.</p>
                        <q-btn color="white" text-color="primary" label="Close" @click="hideChild()"/>
                        <q-btn class="closeBtn" round color="primary" icon="remove" @click="hideChild()"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-4 q-mb-lg text-center">
                        <img src="/images/icons/cost-effective.svg" alt="Hire tutors for home tuition">
                        <h3>Hire at your own rate</h3>
                        <p>There is no minimal amount of fees</p>
                        <q-btn color="white" text-color="primary" label="Read More" @click="showChild(4)"/>
                    </div>
                    <div class="col-sm-4 q-mb-lg text-center">
                        <img src="/images/icons/join-us.svg" alt="Hire tutors for free">
                        <h3>Zero tutor hiring charges</h3>
                        <p>We dont charge anyting for hiring</p>
                        <q-btn color="white" text-color="primary" label="Read More" @click="showChild(5)"/>
                    </div>
                    <div class="col-sm-4 q-mb-lg text-center">
                        <img src="/images/icons/time-flexibility.svg" alt="Hire tutors for your child">
                        <h3>Only limited calls you will get</h3>
                        <p>Connect with first 10 tutors only.</p>
                        <q-btn color="white" text-color="primary" label="Read More" @click="showChild(6)"/>
                    </div>
                </div>
                <div class="child">
                    <div v-if="this.active=='4'">
                        <h4>Hire at your own rate</h4>
                        <p>You have all the freedom in the world to hire tutors at your own rate. There is no limit of any kind from us.</p>
                        <p>We promote education for all. Money should never come in the way of education. We have students who belong to different socio-economic background coming from small to large cities. Therefore, we have not standardized the tuition fee. Pay what your pocket permits. With us when you hire a tutor, you have all the freedom in the world to discuss, agree and hire at your own rate. There is no such limit defined by us. It is upto the discretion of the teacher and your requirement. Rate may vary from one tutor to the other. </p>
                        <q-btn class="closeBtn" round color="primary" icon="remove" @click="hideChild()"/>
                    </div>
                    <div v-if="this.active=='5'">
                        <h4>Zero tutor hiring charges</h4>
                        <p>Its absolutely free to post your requirement.</p>
                        <p>We do not charge anything extra for our service. We work as a bridge between the students and the teachers. We act a platform to connect you, let you post your requirement at absolutely free of cost, provide you with phone numbers. Further, you are free to proceed, speak to multiple teachers and finalize whom you like against a tuition fee you mutually agree upon. We are nowhere a part of this entire selection process. Rest assured that no extra or hidden cost is involved in hiring a tutor.   </p>
                        <q-btn class="closeBtn" round color="primary" icon="remove" @click="hideChild()"/>
                    </div>
                    <div v-if="this.active=='6'">
                        <h4>Only limited calls you will get</h4>
                        <p>Connect with first 10 tutors only afterthat the requirement will be automatically close. This is to ensure that you are nto flooded with calls for a very long time. If you are not able to close the requirement in the 10 calls, you can post it again on the website. This time with more specific details to get the perfect teacher.</p>
                        <p>We have a long list of tutors enrolled with us. We give you the opportunity to connect with any 10 tutors from the list. Once you exceed that count, the requirement gets automatically closed. We do not like to keep a single request open-ended for long. We also never encourage one request holder being flooded with too many calls. Thus, we have the option to post a fresh request on our website with more specific details to get the perfect teacher. if you are unable to close your requirement within the said limit. </p>
                        <q-btn class="closeBtn" round color="primary" icon="remove" @click="hideChild()"/>
                    </div>
                </div>
            </div>
        </section>
    </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { email, maxValue, minValue, numeric, required } from 'vuelidate/lib/validators'
import { message } from '../../store/functions';

export default {
    name: 'HireATutor',
    data() {
        return {
            showForm : false,
            active: '',
            step: 1,
            board: '',
            classes: '',
            subject: '',
            mode :  '',
            phone : '',
            state : '',
            city : '',
            street : '',
            message : '',
        }
    },
    methods: {
        ...mapActions(['user']),
        showChild(id) { this.active= id },
        hideChild() { this.active= '' },
        classSelected() {
            const data={ classSelected: this.classes }
            this.$store.dispatch('hireClassSelected', data);
        },
        startForm(){ this.showForm = true },
        hideForm(){ this.showForm = false },
        onSubmit(e){
            e.preventDefault();
            // if (this.$v.$anyError) {
            //     this.$q.notify({
            //     color: 'red-4',
            //     textColor: 'white',
            //     icon: 'warning',
            //     message: 'Form not valid'
            //     })
            // } else {
            //     this.$q.notify({
            //     color: 'green-4',
            //     textColor: 'white',
            //     icon: 'cloud_done',
            //     message: 'Form submitted'
            //     })
            // }
            const data={
                'userId': this.user.id,
                'board': this.board,
                'classes': this.classes,
                'subject': this.subject,
                'mode': this.mode,
                'phone': this.phone,
                'state': this.state,
                'city': this.city,
                'street': this.street,
                'message': this.message,
            }
            this.$store.dispatch('postRequirement', data);

        },
        myRule (val) {
            if (val === null) {
                return 'You must make a selection!'        
            }
        }
    },
    computed: {
        ...mapGetters(['user', 'boardOptions', 'classOptions', 'subjectOptions', 'modeOptions']),
        isValid () {
            return this.state.length <= 3
        }
    },
    created() {
        this.$store.dispatch('hireATutor');
    },
    validations: {
        name: {
            required,
        },
        age: {
            required,
            numeric,
            min: minValue(1),
            max: maxValue(180),
        },
        email: {
            required,
            email,
        },
    },
}
</script>
<style lang="sass" scoped>
    .hireTutorForm
        .closeBtn
            position: absolute
            top: 0
            right: 0
</style>
