<template>
    <q-page padding>
        <section class="points mb-5">
            <div class="container page py-3">
                <h1 class="heading">ONLINE <span>TEST SERIES</span></h1>
                <p class="text-center">Boost your academic performance </p>
                <p>Our online test series is highly recommended by teachers, schools and education experts for practice by students to improve their academic performance. It is highly flexible with lots of options provided for students to decide on which topic and subtopic to test themselves along with the difficulty levels. The MCQ based test is assessed immediately and the scoring and the results of same are also provided once you submit the paper. For subjective test paper, you have to answer it on white paper and share the scanned files to us for evaluation.</p>
                <p>With our online test series you will be able to identify areas that you need to work on and perform well in academics. The questions in the online test series are prepared by our expert teachers from IIT and NITs who have tremendous amount of experience in teaching. The questions in test series are updated regularly to keep it as per the latest exam patterns.</p>
                <q-form class="q-gutter-md" @submit="onSubmit" v-if="this.showFilter" >
                    <div class="row">
                        <div class="col-4 q-pr-lg q-mb-lg"><q-select emit-value map-options v-model="type" :options="typeOptions" option-value="id" option-label="name" label="Type" :rules="[...rules.required]"/></div>
                        <div class="col-4 q-pr-lg q-mb-lg"><q-select map-options emit-value v-model="paper" :options="paperOptions" label="Select Paper Type" :option-value="i => i.tab1" :option-label="i => i.name" :rules="[...rules.required]"/></div>
                        <div class="col-4 q-pr-lg q-mb-lg"><q-select emit-value map-options v-model="difficulty" :options="difficultyOptions" option-value="id" option-label="name" label="Difficulty" :rules="[...rules.required]"/></div>
                        <div class="col-4 q-pr-lg q-mb-lg"><q-select emit-value map-options v-model="board" :options="boardOptions" option-value="id" option-label="name" label="Board" :rules="[...rules.required]"/></div>
                        <div class="col-4 q-pr-lg q-mb-lg"><q-select emit-value map-options v-model="classes" :options="classOptions" option-value="id" option-label="name" label="Class" @input="classSelected()" :rules="[...rules.required]"/></div>
                        <div class="col-4 q-pr-lg q-mb-lg"><q-select emit-value map-options v-model="subject" :options="basicSubjectFilter" option-value="id" option-label="name" label="Subject" @input="subjectSelected()" :rules="[...rules.required]"/></div> 
                        <div class="col-4 q-pr-lg q-mb-lg"><q-select multiple emit-value map-options v-model="topic" :options="basicTopicFilter" option-value="id" option-label="name" label="Topic" @input="topicSelected()" :rules="[...rules.required]"/></div>
                        <div class="col-sm-8 q-pr-lg q-mb-lg"><q-select multiple map-options emit-value v-model="subTopic" :options="testSubTopicFilter" option-value="id" option-label="name" label="SubTopic" @input="subTopicSelected()" :rules="[...rules.required]"/></div>
                    </div>
                    <p class="text-center" v-if="this.topic.length && questCount< this.paper"><strong>Note: </strong>We are in the process of adding more questions to our database. Till then you need to add more topics and subtopics in it to create a test paper.</p>
                    <div class="text-center"><q-btn label="Create Test" type="submit" color="primary" :disabled="isDisabled"/></div>
                </q-form>
                <div class="text-center" v-if="!this.showFilter">
                    <q-btn color="deep-orange" glossy label="Login to take Test" v-if="!user" @click="$router.replace('/login')"/>
                    <q-btn color="deep-orange" glossy label="Recharge Wallet to take Test" v-else-if="this.balance<50" @click="$router.replace('/blog')"/>
                    <q-btn color="deep-orange" glossy label="Take A Test" v-else @click="showFilters()"/>
                </div>
                <div class="row q-my-lg">
                    <div class="col-sm-12 text-center">
                        <h2 class="heading">Advantages of<span> online test series</span></h2>
                        <p class="text-center">There are a lot of test series available online but we offer you the best. Let’s look at some of the reasons, why you should take our test series.</p>
                    </div>
                    <div class="col-sm-4 q-mb-lg text-center">
                        <img src="/images/icons/test-customisation.svg" alt="Online Test Series for students"/>
                        <h3>Customize your test </h3>
                        <p>Test as per your requirement</p>
                        <q-btn color="white" text-color="primary" label="Read More" @click="showChild(1)"/>
                    </div>
                    <div class="col-sm-4 q-mb-lg text-center">
                        <img src="/images/icons/online-test-evaluation.svg" alt="Made Easy Test Series"/>
                        <h3>Quick evaluation &amp; assessment</h3>
                        <p>Immediate results and learning gap analysis</p>
                        <q-btn color="white" text-color="primary" label="Read More" @click="showChild(2)"/>
                    </div>
                    <div class="col-sm-4 q-mb-lg text-center">
                        <img src="/images/icons/cost-effective.svg" alt="Online Test Series"/>
                        <h3>Cost effective</h3>
                        <p>We provide the cheapest online test series</p>
                        <q-btn color="white" text-color="primary" label="Read More" @click="showChild(3)"/>
                    </div>
                </div>
                <div class="child">
                    <div v-if="this.active=='1'">
                        <h4>Customize your test</h4>
                        <p>You can select various parameters to customize your online test. You can select the sub topics on which you want to be tested and mix them as per your requirement. This allows you to focus extensively on specific parts of a topic and understand where you need to work on. Each topic in a subject is carefully subdivided into subtopics and you can select them as per your convenience. </p>
                        <p>We give the students the freedom to customize their test. Select from the various parameters to customize your online test. You can select the sub-topics on which you want to be tested and combine them as per your requirement. Each topic in a subject is carefully subdivided into subtopics and you can select them as per your convenience. This allows you to focus extensively on specific areas of a subject and understand where you need to work on. For us, catering to the need of the students is paramount. That is why we have designed our online tests as flexible as possible.  </p>
                        <q-btn color="white" text-color="primary" label="Close" @click="hideChild()"/><q-btn class="closeBtn" round color="primary" icon="remove" @click="hideChild()"/>
                    </div>
                    <div v-if="this.active=='2'">
                        <h4>Quick evaluation &amp; assessment</h4>
                        <p>Once you are done with the exams, you will not have to wait for long for the scores / ratings. The Multiple Choice Questions based online test gets evaluated instantly and you get the scores. For subjective based tests, you get a question paper which you need to print and then answer on a clean white A4 paper. Once done, scan the paper and upload it for us to review. Our examiners will check the paper and mail it back to you. The whole process takes up to 48 hours from the time you upload the answer sheet. The tests give a good opportunity for students to revise the chapters and find gaps in their preparedness which they can cover in time. The questions in test series come up very randomly to make sure no specific patterns are followed to prepare you for any surprises in the exams. With the online test series on Study Spectrum, students can prepare themselves very easily for the real-life exam and nail it.</p>
                        <p>The tests give a good opportunity for students to revise the chapters and find gaps in their preparedness which they can cover in time. The questions in test series come up very randomly to make sure no specific patterns are followed to prepare you for any surprises in exams.</p>
                        <p>With the online test series on Study Spectrum, students can prepare themselves very easily for the real life exam and ace it.</p>
                        <q-btn color="white" text-color="primary" label="Close" @click="hideChild()"/><q-btn class="closeBtn" round color="primary" icon="remove" @click="hideChild()"/>
                    </div>
                    <div v-if="this.active=='3'">
                        <h4>Cost effective</h4>
                        <p>Our online test series are highly cost effective. We keep it low as compared to other similar platforms so that maximum students can make use of this extremely effective tool to prepare for exams. The charges depend on the parameters you select. It varies as per your requirement. If you compare, you will find our cost per test is the lowest in the market. We care for the students and thus do not want to impose a huge price on these online tests. We want to keep it affordable to all.</p>
                        <q-btn color="white" text-color="primary" label="Close" @click="hideChild()"/><q-btn class="closeBtn" round color="primary" icon="remove" @click="hideChild()"/>
                    </div>
                </div>
                <div class="row q-my-lg">
                    <div class="col-sm-4 q-mb-lg text-center">
                        <img src="/images/icons/online-test-security.svg" alt="Made Easy Online Test Series"/>
                        <h3>Security and confidentiality</h3>
                        <p>Results and performances are kept confidential</p>
                        <q-btn color="white" text-color="primary" label="Read More" @click="showChild(4)"/>
                    </div>
                    <div class="col-sm-4 q-mb-lg text-center">
                        <img src="/images/icons/time-flexibility.svg" alt="Textbook Online Test Series"/>
                        <h3>Flexible time schedule</h3>
                        <p>Take test as per your convenience</p>
                        <q-btn color="white" text-color="primary" label="Read More" @click="showChild(5)"/>
                    </div>
                    <div class="col-sm-4 q-mb-lg text-center">
                        <img src="/images/icons/online-test-accuracy.svg" alt="Online Mock Test"/>
                        <h3>Accuracy and fair evaluation</h3>
                        <p>Test series made by acclaimed teachers</p>
                        <q-btn color="white" text-color="primary" label="Read More" @click="showChild(6)"/>
                    </div>
                </div>
                <div class="child">
                    <div v-if="this.active=='4'">
                        <h4>Security and confidentiality</h4>
                        <p>We do not share your results with anyone else. Only you can access the results of these tests after you login into Study Spectrum. The results stay in our system for a year and you can check how you performed as many times as you want. With us, you can rest assured about the confidentiality and privacy of your test materials. We have high professional ethics, and thus the results are only published in respective profiles. It is your results, so it belongs to you. For us, your information security comes first. We have earned confidence of our students over time; we cannot afford to sabotage it on any unethical ground. </p>
                        <q-btn color="white" text-color="primary" label="Close" @click="hideChild()"/><q-btn class="closeBtn" round color="primary" icon="remove" @click="hideChild()"/>
                    </div>
                    <div v-if="this.active=='5'">
                        <h4>Flexible time schedule</h4>
                        <p>There can be various reasons that one might not be able to finish the test at one go like time crunch, any emergency, network, or technical glitch and other. No need to worry! Our system supports you to reattempt the online test. If you feel, you are not prepared, you do not have to rush for the tests and can take them at your own convenience. Even in situations where you start a test and for some reason you want to postpone it to a later date or time, you can simply skip not to attempt the answers and prepare again. You can always come back to the test later when you are ready and give your best shot. </p>
                        <p>The test would be saved and waiting in your account just like that.</p>
                        <q-btn color="white" text-color="primary" label="Close" @click="hideChild()"/><q-btn class="closeBtn" round color="primary" icon="remove" @click="hideChild()"/>
                    </div>
                    <div v-if="this.active=='6'">
                        <h4>Accuracy and fair evaluation</h4>
                        <p>Once you submit the answers to your online test, it goes to the teachers for evaluation. We can assure you that the papers are thoroughly checked and vetted by the faculty. The evaluation is done with complete fairness and accuracy. In our experience so far, we never received any complaint, disagreement or displeasure about the scoring or the evaluation process. The teachers behind the test series are from premier institutes like IITs and NITs. From preparing the test papers to reviewing the answers, they do it with full dedication and sincerity.</p>
                        <p>Once the evaluation is done you are intimated about the score and you can analyze them at your end. For any doubt or clarity, the teachers are always there to guide you. The evaluation of the subjective test series is completed with detailed feedback and suggestions.</p>
                        <q-btn color="white" text-color="primary" label="Close" @click="hideChild()"/><q-btn class="closeBtn" round color="primary" icon="remove" @click="hideChild()"/>
                    </div>
                </div>
                <div class="row q-my-lg">
                    <div class="col-sm-4 q-mb-lg text-center">
                        <img src="/images/icons/save-test-paper.svg" alt="Free Online Test Series"/>
                        <h3>Save the paper for later</h3>
                        <p>Take test as per your timing and flexibility</p>
                        <q-btn color="white" text-color="primary" label="Read More" @click="showChild(7)"/>
                    </div>
                    <div class="col-sm-4 q-mb-lg text-center">
                        <img src="/images/icons/improve-speed.svg" alt="Best Test Series For Students"/>
                        <h3>Improve speed</h3>
                        <p>Rapid tests to improve the speed</p>
                        <q-btn color="white" text-color="primary" label="Read More" @click="showChild(8)"/>
                    </div>
                    <div class="col-sm-4 q-mb-lg text-center">
                        <img src="/images/icons/boost-confidence.svg" alt="Free Online Mock Test"/>
                        <h3>Boost confidence</h3>
                        <p>Boost the morale of student with easy preparations</p>
                        <q-btn color="white" text-color="primary" label="Read More" @click="showChild(9)"/>
                    </div>
                </div>
                <div class="child">
                    <div v-if="this.active=='7'">
                        <h4>Save the paper for later</h4>
                        <p>The best part about the online test series is unlike your physical exams the test series gets saved on your profile for future reference. As long as you have an account with us, your answer sheets are saved with us. You might want to refer to the answer sheet or revisit the paper you attempted to revise, so without a hassle you get access to that. This does not incur any additional cost from your end. You only pay for taking the online tests, not extra charges are imposed on you. It is your paper and that belongs to you.</p>
                        <q-btn color="white" text-color="primary" label="Close" @click="hideChild()"/><q-btn class="closeBtn" round color="primary" icon="remove" @click="hideChild()"/>
                    </div>
                    <div v-if="this.active=='8'">
                        <h4>Improve speed</h4>
                        <p>Speed is another major factor when it comes to exams. Comfortably finishing the test paper within the stipulated timeline pose a challenge for many. How to attempt all questions leaving ample time to revise before submission is a technique. With our online tests student get to increase the speed of answering papers. This helps students a lot in real life exams and prepares them for better score in exams. The test makes you do a lot of calculations in mind like how much time to spend on certain type of questions. Taking on demo exams thus becomes essential to increase the speed of answering. The more you practice, the faster your speed gets.</p>
                        <q-btn color="white" text-color="primary" label="Close" @click="hideChild()"/><q-btn class="closeBtn" round color="primary" icon="remove" @click="hideChild()"/>
                    </div>
                    <div v-if="this.active=='9'">
                        <h4>Boost confidence</h4>
                        <p>Study Spectrum not only helps you learn what is in your curriculum at school, but also helps you sharpen your confidence. We understand only study cannot secure good score in the exams until the students are confident enough to perform well during the exams. Kids often get exam phobia and tend to forget even the things they already know or learnt. Thus, practice and demo exams have been proven effective to combat this. It prepares the students to be ‘exam-ready’.  Our skillful teachers with this online test series try to boost your confidence level higher and makes you prepared to face the actual exams without fear. Our online test series is highly recommended and popular. Students have reported an increase in motivation level after trying out our tests.</p>
                        <q-btn color="white" text-color="primary" label="Close" @click="hideChild()"/><q-btn class="closeBtn" round color="primary" icon="remove" @click="hideChild()"/>
                    </div>
                </div>
            </div>
        </section>
    </q-page>
</template>
<script>
import { LocalStorage } from 'quasar';
import { mapGetters } from 'vuex';
import {rules} from '../../store/functions'

export default {
    name: 'OnlineTestSeries',
    data() {
        return {
            rules : rules,
            active: '',
            type: 25,
            paper: 10,
            difficulty : 22,
            board : 9,
            classes : '',
            subject : '',
            topic : [],
            subTopic : [],
            showFilter: false,
            balance: parseInt( LocalStorage.getItem('balance')),
            isDisabled: true
        }
    },
    methods: {
        showChild(id) { this.active= id; },
        hideChild() { this.active= ''; },
        showFilters() { this.showFilter = true },
        classSelected() {
            this.subject = ''
            this.topic = []
            this.subTopic = []
            const data={
                classSelected: this.classes
            }
            this.$store.dispatch('basicClassSelected', data);
        },
        subjectSelected() {
            this.topic = []
            this.subTopic = []
            const data={
                boardSelected: this.board,
                typeSelected: this.type,
                difficultySelected: this.difficulty,
                classSelected: this.classes,
                subjectSelected: this.subject
            }
            this.$store.dispatch('basicSubjectSelected', data);
            this.$store.dispatch('checkQuestSummary', data);
        },
        topicSelected() {
            this.subTopic = []
            const data={
                classSelected: this.classes,
                subjectSelected: this.subject,
                topicSelected: this.topic,
            }
            this.$store.dispatch('testTopicSelected', data);
        },
        subTopicSelected() {
            const data={
                classSelected: this.classes,
                subjectSelected: this.subject,
                topicSelected: this.topic,
                subTopicSelected: this.subTopic,
            }
            this.$store.dispatch('testSubTopicSelected', data);
            if(this.questCount< this.paper){ this.isDisabled = true }else{ this.isDisabled= false}
        },
        onSubmit(e) {
            e.preventDefault();
            const data={
                'userId': this.user.id,
                'type': this.type,
                'paper': this.paper,
                'difficulty': this.difficulty,
                'board': this.board,
                'classes' : this.classes,
                'subject':  this.subject,
                'topic':    JSON.stringify(this.topic),
                'subTopic': JSON.stringify(this.subTopic),
                'filter' : JSON.stringify([this.board, this.classes, this.subject, this.topic, this.subTopic, this.difficulty, this.type, this.paper]),
            }
            this.$store.dispatch('createTest', data);
        },
    },
    computed: {
        ...mapGetters(['user', 'balance', 'boardOptions', 'difficultyOptions', 'typeOptions', 'paperOptions', 'basicOptions', 'classOptions', 'basicSubjectFilter', 'basicTopicFilter', 'testSubTopicFilter', 'questSummary', 'questSummaryFilter', 'questCount']),
    },
    created() {
        this.$store.dispatch('onlineTestSeries');
    },
};
</script>
<style lang="sass" scoped>
</style>