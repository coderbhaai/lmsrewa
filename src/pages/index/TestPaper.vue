<template>
    <q-page padding >
        <div class="container page py-3">
            <h1 class="heading">Take a Test</h1>
            <p v-if="solved" class="text-center">You Scored <strong>{{score}}</strong> out of <strong>{{total}}</strong></p>
            <p v-else class="text-center">Best of Luck</strong></p>
            <div class="container">
                <div class="row q-mb-lg questMark">
                    <span><strong>Total Questions:</strong> {{questions.length}}</span>
                    <span><strong>Total Marks:</strong> {{total}}</span>
                </div>
                <q-form class="q-gutter-md" @submit="onSubmit">
                    <div class="row">
                        <div class="col-12 q-mb-lg" v-for='(i, index) in questions' :key='i.id' >
                            <q-card class="my-card q-pa-sm" bordered>
                                <q-card-section horizontal>
                                    <q-card-actions vertical class="justify-around q-px-md action">
                                        <p><strong>Q {{index +1}}</strong></p>
                                        <q-btn flat round color="red" icon="favorite" />
                                        <q-btn flat round color="accent" icon="bookmark" />
                                        <q-btn flat round color="primary" icon="share" />
                                    </q-card-actions>
                                    <div class="w-100">
                                        <div v-html="i.question" class="question"></div>
                                        <div class="q-mb-sm" v-if="i.type==25">
                                            <div class="q-mb-sm option" v-for='(j, index2) in JSON.parse(i.options)' :key='index2' >
                                                <div class="optionItem"><span>{{index2+1}} </span><div v-html="j" class="optionItemDetail"></div></div>
                                                <div><q-radio :disable="isDisabled" v-model="answerList[index]" :val="index2+1" color="teal"/></div>
                                            </div>
                                        </div>
                                        <div v-else>
                                        </div>
                                        <p class="marks">{{marks[index]}} <strong>Marks</strong></p>
                                    </div>
                                </q-card-section>
                                <q-separator v-if="solved"/>
                                <q-card-section v-if="solved">
                                    <div class="text-subtitle2" v-if="answer[index]==solution[index]">Rightly Answered</div>
                                    <div class="text-subtitle2" v-else-if="answer[index]=='blank'"> Not Answered ! The right answer is {{solution[index]}}</div>
                                    <div class="text-subtitle2" v-else> Wrongly Answered ! The right answer is {{solution[index]}}</div>
                                </q-card-section>
                            </q-card>
                        </div>
                        <div class="text-center w-100" v-if="!solved"><q-btn label="Submit Answers" type="submit" color="primary"/></div>
                        <div class="text-center w-100" v-else>
                            <p class="text-center">You Scored <strong>{{score}}</strong> out of <strong>{{total}}</strong></p>
                            <q-btn color="deep-orange" glossy label="Take Another Test" @click="$router.replace('/online-test-series')"/>
                        </div>
                    </div>
                </q-form>
            </div>
        </div>
    </q-page>
</template>
<script>
import { LocalStorage } from 'quasar';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'TestPaper',
    data() {
        return {
            showFilter: false,
            balance: parseInt( LocalStorage.getItem('balance')),
            answerList: this.$store.getters.answer,
            solutionList: this.$store.getters.solution,
            marksList: this.$store.getters.marks,
            solvedState: this.$store.getters.solved,
            isDisabled: this.$store.getters.disable,
        }
    },
    methods: {
        ...mapActions(['questions']),
        onSubmit(e) {
            e.preventDefault();
            const data={
                'id': this.$route.params.id,
                'userId': this.user.id,
                'answer': JSON.stringify(this.answerList),
                'solution': JSON.stringify(this.solution),
                'marks': JSON.stringify(this.marksList),
            }
            this.$store.dispatch('submitTest', data);
        },
    },
    computed: {
        ...mapGetters(['testId','user', 'balance', 'testPaper', 'questions', 'answer', 'solution', 'marks', 'solved', 'total', 'score', 'disable']),
        mycomputed() {
            this.answerList = this.$store.getters.answer,
            this.solutionList = this.$store.getters.solution
            this.marksList = this.$store.getters.marks
            this.solvedState = this.$store.getters.solved
            this.isDisabled = this.$store.getters.disable
        },
    },
    created() {
        const data={
            id: this.$route.params.id,
            userId: this.user.id
        }
        this.$store.dispatch('testPaper', data);
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
</style>
