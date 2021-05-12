<template>
    <q-page padding>
        <section class="points mb-5">
            <div class="container page py-3">
                <h1 class="heading">Daily <span>Practice</span></h1>
                <div v-if="!allowPractice">
                    <p class="text-center">Boost your academic performance </p>
                    <p>Our online test series is highly recommended by teachers, schools and education experts for practice by students to improve their academic performance. It is highly flexible with lots of options provided for students to decide on which topic and subtopic to test themselves along with the difficulty levels. The MCQ based test is assessed immediately and the scoring and the results of same are also provided once you submit the paper. For subjective test paper, you have to answer it on white paper and share the scanned files to us for evaluation.</p>
                    <p>With our online test series you will be able to identify areas that you need to work on and perform well in academics. The questions in the online test series are prepared by our expert teachers from IIT and NITs who have tremendous amount of experience in teaching. The questions in test series are updated regularly to keep it as per the latest exam patterns.</p>
                    <div class="text-center">
                        <q-btn color="deep-orange" glossy label="Login to take Test" v-if="!user" @click="$router.replace('/login')"/>
                        <!-- <q-btn color="deep-orange" glossy label="Recharge Wallet to take Test" v-else-if="this.balance<50" @click="$router.replace('/blog')"/> -->
                        <q-btn color="deep-orange" glossy label="Take A Test" v-else @click="initiateTest()"/>
                    </div>
                </div>
            </div>
            <div class="container page py-3" v-if="allowPractice && !startPractice">
                <q-form class="q-gutter-md" @submit="onSubmit">
                    <div class="row">
                        <div class="col-4 q-pr-lg q-mb-lg"><q-select emit-value map-options v-model="subject" :options="dpSubject" option-value="id" option-label="name" label="Subject" @input="subjectSelected()" :rules="[...rules.required]"/></div>
                        <div class="col-4 q-pr-lg q-mb-lg"><q-select multiple emit-value map-options v-model="topic" :options="dpTopicFilter" option-value="id" option-label="name" label="Topics" @input="topicSelected()" :rules="[...rules.required]"/></div>
                        <div class="col-4 q-pr-lg q-mb-lg"><q-select multiple emit-value map-options v-model="subTopic" :options="dpSubTopicFilter" option-value="id" option-label="name" label="Sub Topics" :rules="[...rules.required]"/></div>
                    </div>
                    <!-- <p class="text-center" v-if="this.topic.length && questCount< this.paper"><strong>Note: </strong>We are in the process of adding more questions to our database. Till then you need to add more topics and subtopics in it to create a test paper.</p>  -->
                    <div class="text-center"><q-btn label="Start Practice" type="submit" color="primary"/></div>
                </q-form>
                <div class="text-center q-mt-xl"><q-btn color="deep-orange" glossy label="End Practice" @click="endPractice()"/></div>
            </div>
            <div class="container page py-3" v-if="allowPractice && startPractice">
                <div class="col-12 q-mb-lg">
                    <q-card class="my-card q-pa-sm" bordered>
                        <q-card-section horizontal>
                            <q-card-actions vertical class="justify-around q-px-md action">
                                <p><strong>Q</strong></p>
                                <q-btn flat round color="red" icon="favorite" />
                                <q-btn flat round color="accent" icon="bookmark" />
                                <q-btn flat round color="primary" icon="share" />
                            </q-card-actions>
                            <div class="w-100" v-if="activeData.id">
                                <div v-html="activeData.question" class="question"></div>
                                <div class="q-mb-sm">
                                    <div class="q-mb-sm option" v-for='(j, index) in JSON.parse(activeData.options)' :key='index'>
                                        <div class="optionItem"><span>{{index+1}} </span><div v-html="j" class="optionItemDetail"></div></div>
                                        <div><q-radio :disable="dpIsDisabled" v-model="dpAnswerList[dpActiveIndex-1]" :val="index+1" color="teal" @input="submitOption(index+1)"/></div>
                                    </div>
                                </div>
                                <p class="marks">{{activeData.marks}} <strong>Marks</strong></p>
                            </div>
                        </q-card-section>
                        <q-separator/>
                        <q-card-section v-if="dpSolved" class="row prevSubmit">
                            <q-btn color="primary" glossy label="Previous Question1" v-if="dpActiveIndex>0" @click="prevQuestion()"/>
                            <q-btn color="deep-orange" glossy label="Next Question" @click="nextQuestion()"/>
                        </q-card-section>
                        <q-card-section v-else class="row prevSubmit">
                            <q-btn color="primary" glossy label="Previous Question2" v-if="dpActiveIndex>1" @click="prevQuestion()"/>
                            <q-btn color="deep-orange" glossy label="Submit Answer" @click="submitAnswer()"/>
                        </q-card-section>
                        <div class="q-px-md" v-if="dpSolved">
                            <div v-if="this.dpAnswerList[this.dpActiveIndex-1] == this.activeData.solution">
                                <h3>Rightly Answered</h3>
                            </div>
                            <div v-else>
                                <div class="answer">
                                    <h3>Wrongly Answered</h3>
                                    <p>The right answer is {{this.activeData.solution}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="q-px-md row" v-if="dpTotal">
                            <div class="col-sm-6">
                                <h3><strong>Questions Number</strong> : 
                                <span v-if="this.dpActiveIndex!=this.dpQuestions.length">{{this.dpActiveIndex}}</span>
                                <span v-else>{{this.dpQuestions.length}}</span>
                                
                                <!-- {{this.dpActiveIndex}}{{this.dpQuestions.length}} -->
                                </h3>
                            </div>
                            <div class="col-sm-6">
                                <h3 class="text-right"><strong>Score</strong>: {{this.dpScore}} / {{this.dpTotal}}</h3>
                            </div>
                        </div>
                    </q-card>
                </div>
            </div>
        </section>
    </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { message, rules } from '../../store/functions';

export default {
    name: 'DailyPractice',
    data() {
        return {
            rules : rules,
            // subject: '',
            // topic: [],
            // subTopic: [],
            subject: 28,
            topic: [[39,40,41,42,43,44,45,46,47]],
            subTopic: [105,106,107,108,109,110,111,112,113,114,115,116,117,118],
            review: false,
        }
    },
    methods: {
        ...mapActions(['user', 'balance']),
        initiateTest(){
            this.subject = '';
            this.topic = [];
            this.subTopic= [];
            const data={
                'userId': this.user.id,
            }
            this.$store.dispatch('dailyPracticeData', data);
        },
        endPractice(){ this.$store.dispatch('endPractice'); },
        subjectSelected(){
            this.topic = [];
            const data={
                'subject': this.subject,
            }
            this.$store.dispatch('dpSubjectSelected', data);
        },
        topicSelected(){
            const data={
                'subject': this.subject,
                'topic': this.topic,
            }
            this.$store.dispatch('dpTopicSelected', data);
        },
        submitOption(index){
            this.$store.dispatch('dpSubmitOption', index);
        },
        submitAnswer(){
            if(this.dpAnswerList[this.dpActiveIndex-1]){
                const data={
                    'userId': this.user.id,
                    'dpId': this.dpFilters.id,
                    'answerList': JSON.stringify(this.dpAnswerList),
                    'answer': this.dpAnswerList[this.dpActiveIndex-1],
                    'solution': this.activeData.solution,
                    'marks': this.activeData.marks,
                }
                this.$store.dispatch('dpSubmitAnswer', data);
            }else{
                message('Please answer first');
            }
        },
        prevQuestion(){
            if(this.dpAnswerList.length== this.dpQuestions.length){
                if(this.dpActiveIndex!= 0){
                    message('Showing you the preview from Prev');
                    this.dpPreview(this.dpActiveIndex-1)
                }else{
                    message('You have reached the end');
                }
            }else{
                message('Please answer this quetion first');
            }
        },
        nextQuestion(){
            if(this.dpAnswerList.length== this.dpQuestions.length && this.activeData.id== this.dpQuestions.slice(-1)[0]){
                const data={
                    'userId': this.user.id,
                    'dpId': this.dpFilters.id,
                    'exclude': this.dpQuestions,
                    'subTopic': this.subTopic
                }
                this.$store.dispatch('dpNextQuestion', data);
            }else{
                this.dpPreview(this.dpActiveIndex+1)
                message('Showing you the preview from next');
            }
        },
        dpPreview(id){
            const data={
                'question': this.dpQuestions[id],
                'index': id
            }
            this.$store.dispatch('dpPreview', data);
                
        },
        onSubmit(e) {
            e.preventDefault();
            if(!this.subject){
                message('Please select Subject');
            }else if(!this.topic.length){
                message('Please select Topic');
            }else if(!this.subTopic.length){
                message('Please select  Sub Topics');
            }else{
                const data={
                    'userId': this.user.id,
                    'subject': this.subject,
                    'topic': this.topic,
                    'subTopic': this.subTopic,
                }
                this.$store.dispatch('startDailyPractice', data);
            }
        },
    },
    computed: {
        ...mapGetters(['user', 'allowPractice', 'startPractice', 'dpSubject', 'dpTopicFilter', 'dpSubTopicFilter', 'dpQuestions','dpAnswerList', 'activeData', 'dpActiveIndex', 'dpSolved', 'dpFilters', 'dpIsDisabled', 'dpTotal', 'dpScore']),
    },
    created() {
        const data={
            'dpId': this.dpFilters.id
        }
        this.$store.dispatch('initializeDp', data);
        if(this.activeData.id != this.dpQuestions.slice(-1)[0]){
            this.dpPreview(this.dpQuestions.length-1)
        }
    },
};
</script>
<style lang="sass" scoped>
    .action p
        margin: 0
        text-align: center
        line-height: 1em
    .option
        display: flex
        align-items: center
        justify-content: space-between
    .optionItem
        display: flex
        align-items: center
        justify-content: flex-start
        span
            margin-right: 10px
            font-weight: 600
    .optionItemDetail
        p
            margin-bottom: 0
    .questMark
        align-items: center
        justify-content: space-between
    .marks
        margin: 0
        text-align: right
    .prevSubmit
        align-items: center
        justify-content: space-between
    .answer
        display: flex
        align-items: center
        justify-content: space-between
        p
            margin: 0
            line-height: unset

</style>
