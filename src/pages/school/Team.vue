<template>
    <div class="q-pa-md">
        <q-table v-if="teamPending.length" title="Pending Members" :data="teamPending" :columns="columns" row-key="id" :pagination.sync="pagination" class="q-mb-xl">
            <template v-slot:header="props"><q-tr :props="props"><q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th></q-tr></template>
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td key="id" :props="props">{{ props.row.id }}</q-td>
                    <q-td key="name" :props="props">{{ props.row.name }}</q-td>
                    <q-td key="email" :props="props">{{ props.row.email }}</q-td>
                    <q-td key="role" :props="props">{{ props.row.role }}</q-td>
                    <q-td key="status" :props="props" v-if="props.row.status == '1'" >Active</q-td>
                    <q-td key="status" :props="props" v-if="props.row.status == '0'">Not Active</q-td>
                    <q-td key="updated_at" :props="props">{{ props.row.updated_at }}</q-td>
                    <q-td><img @click="updateDialog(props.row)" src="/images/icons/edit.svg" class="edit"/></q-td>
                </q-tr>
            </template>
        </q-table>
        <q-dialog v-model="medium" persistent transition-show="scale" transition-hide="scale">
            <q-card style="width: 70vw; max-width: 80vw;">
                <q-card-section class="modalHead"><div class="text-h6">Update Basic</div><q-btn flat label="Close" color="primary" v-close-popup @click="resetData()"/></q-card-section>
                <q-card-section class="q-pt-none">
                <q-form class="q-gutter-md" @submit="addToTeam">
                    <div class="row">
                        <div class="col-3 q-pr-lg"><q-input v-model="name" label="Name"  required/></div>
                        <div class="col-3 q-pr-lg"><q-input v-model="email" label="Email"  required/></div>
                        <div class="col-3 q-pr-lg"><q-select map-options emit-value v-model="role" :options="roleOptions" option-value="value" option-label="name" label="Role" required /></div>
                        <div class="col-3 q-pr-lg"><q-select map-options emit-value v-model="status" :options="statusOptions" option-value="value" option-label="name" label="Status" required @input="checkStatus()"/></div>
                        <div class="col-12 q-mt-xl">
                            <h3>Rights for {{name}}</h3>
                            <div class="row rights">
                                <q-toggle v-model="changeroles" label="Can change roles" true-value='1' false-value='0' @input="checkStatus()"/>
                                <q-toggle v-model="sendEmail" label="Can send emails" true-value='1' false-value='0' @input="checkStatus()"/>
                                <q-toggle v-model="sendSms" label="Can send SMS" true-value='1' false-value='0' @input="checkStatus()"/>
                                <q-toggle v-model="sendWhatsApp" label="Can send Whatsapp" true-value='1' false-value='0' @input="checkStatus()"/>
                            </div>
                        </div>
                    </div>
                    <div class="text-center"><q-btn label="Add to Team" type="submit" color="primary" class="q-mr-lg" /></div>
                </q-form>
                </q-card-section>
            </q-card>
        </q-dialog>
        <q-table v-if="team.length" title="Team Members" :data="team" :columns="columns2" row-key="id" class="my-sticky-header-table" :pagination.sync="pagination">
            <template v-slot:header="props"><q-tr :props="props"><q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th></q-tr></template>
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td key="teamId" :props="props">{{ props.row.teamId }}</q-td>
                    <q-td key="name" :props="props">{{ props.row.name }}</q-td>
                    <q-td key="email" :props="props">{{ props.row.email }}</q-td>
                    <q-td key="role" :props="props">{{ props.row.role }}</q-td>
                    <q-td key="teamStatus" :props="props" v-if="props.row.teamStatus == '1'" >Active</q-td>
                    <q-td key="teamStatus" :props="props" v-if="props.row.teamStatus == '0'">Not Active</q-td>
                    <q-td key="updated_at" :props="props">{{ props.row.updated_at }}</q-td>
                    <q-td><img @click="updateTeam(props.row)" src="/images/icons/edit.svg" class="edit"/></q-td>
                </q-tr>
            </template>
        </q-table>
        <q-dialog v-model="medium2" persistent transition-show="scale" transition-hide="scale">
            <q-card style="width: 70vw; max-width: 80vw;">
                <q-card-section class="modalHead"><div class="text-h6">Update Team</div><q-btn flat label="Close" color="primary" v-close-popup @click="resetData()"/></q-card-section>
                <q-card-section class="q-pt-none">
                <q-form class="q-gutter-md" @submit="updateTeamHandler">
                    <div class="row">
                        <div class="col-3 q-pr-lg"><q-input v-model="name" label="Name"  required/></div>
                        <div class="col-3 q-pr-lg"><q-input v-model="email" label="Email"  required/></div>
                        <div class="col-3 q-pr-lg"><q-select map-options emit-value v-model="role" :options="roleOptions" option-value="value" option-label="name" label="Role" required /></div>
                        <div class="col-3 q-pr-lg"><q-select map-options emit-value v-model="status" :options="statusOptions" option-value="value" option-label="name" label="Status" required @input="checkStatus()"/></div>
                        <div class="col-12 q-mt-xl">
                            <h3>Rights for {{name}}</h3>
                            <div class="row rights">
                                <q-toggle v-model="changeroles" label="Can change roles" true-value='1' false-value='0' @input="checkStatus()"/>
                                <q-toggle v-model="sendEmail" label="Can send emails" true-value='1' false-value='0' @input="checkStatus()"/>
                                <q-toggle v-model="sendSms" label="Can send SMS" true-value='1' false-value='0' @input="checkStatus()"/>
                                <q-toggle v-model="sendWhatsApp" label="Can send Whatsapp" true-value='1' false-value='0' @input="checkStatus()"/>
                            </div>
                        </div>
                    </div>
                    <div class="text-center"><q-btn label="Update Team" type="submit" color="primary" class="q-mr-lg" /></div>
                </q-form>
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';
    import { message } from '../../store/functions';

    export default {
        name: 'Team',
        data() {
            return {
                id: '',
                userId: '',
                schoolId: '',
                name: '',
                email: '',
                status: '',
                role: '',
                changeroles: '0',
                sendEmail: '0',
                sendSms: '0',
                sendWhatsApp: '0',
                roleOptions: [
                    {name: 'Admin', value: 'Admin'},
                    {name: 'Super Admin', value: 'SuperAdmin'},
                ],
                statusOptions: [
                    {name: 'Not Active', value: 0},
                    {name: 'Active', value: 1},
                ],
                medium: false,
                medium2: false,
                pagination: { rowsPerPage: 30 },
                columns: [
                    { name: 'id', label: 'Sl No.', align: 'left', field: 'Edit', },
                    { name: 'name', label: 'Name', align: 'left', field: 'name', sortable: true, },
                    { name: 'email', label: 'Email', align: 'left', field: 'email', sortable: true, },
                    { name: 'role', label: 'Role', align: 'left', field: 'role', sortable: true, },
                    { name: 'status', label: 'Status', align: 'left', field: 'status', sortable: true, },
                    { name: 'updated_at', label: 'Date', align: 'left', field: 'updated_at', sortable: true, },
                    { name: 'id', label: 'Edit', align: 'left', field: 'id', sortable: true, },
                ],
                columns2: [
                    { name: 'teamId', label: 'Sl No.', align: 'left', field: 'Edit', },
                    { name: 'name', label: 'Name', align: 'left', field: 'name', sortable: true, },
                    { name: 'email', label: 'Email', align: 'left', field: 'email', sortable: true, },
                    { name: 'role', label: 'Role', align: 'left', field: 'role', sortable: true, },
                    { name: 'teamStatus', label: 'Status', align: 'left', field: 'teamStatus', sortable: true, },
                    { name: 'updated_at', label: 'Date', align: 'left', field: 'updated_at', sortable: true, },
                    { name: 'id', label: 'Edit', align: 'left', field: 'id', sortable: true, },
                ],
            }
        },
        methods: {
            addToTeam(e) {
                e.preventDefault();
                if(this.status!== 1){
                    message('You have not added the user to team!!!');
                    this.resetData();
                }else{
                    console.log('clicked')
                    const data = {
                        userId: this.userId,
                        schoolId: this.schoolId,
                        status: this.status,
                        role: this.role,
                        changeroles : parseInt(this.changeroles),
                        sendemail : parseInt(this.sendEmail),
                        sendsms : parseInt(this.sendSms),
                        sendwhatsapp : parseInt(this.sendWhatsApp),
                    };
                    console.log(`data`, data)
                    this.$store.dispatch('addToTeam', data);
                    this.resetData();
                }
            },
            updateDialog(data) {
                this.userId = data.id;
                this.name = data.name;
                this.email = data.email;
                this.status = data.status;
                this.role = data.role;
                this.schoolId = data.institute;
                this.medium = true;
            },
            updateTeam(data) {
                console.log(`data`, data)
                this.id = data.teamId;
                this.userId = data.userId;
                this.name = data.name;
                this.email = data.email;
                this.status = data.status;
                this.role = data.role;
                this.medium2 = true;
                this.changeroles = data.changeroles.toString();
                this.sendEmail = data.sendemail.toString();
                this.sendSms = data.sendsms.toString();
                this.sendWhatsApp = data.sendwhatsapp.toString();
                this.medium = true;
            },
            resetData() {
                this.id = '';
                this.name = '',
                this.email = '',
                this.status = '';
                this.role = '';
                this.schoolId = '',
                this.medium = false;
                this.resetRights();
            },
            resetRights(){
                this.changeroles = '0';
                this.sendEmail = '0';
                this.sendSms = '0';
                this.sendWhatsApp = '0';
            },
            checkStatus() { 
                if(this.status=='0'){ 
                    this.resetRights(); 
                    message('Inactive users have no rights');
                } 
            },
            updateTeamHandler(e) {
                e.preventDefault();
                const data = {
                    id: this.id,
                    userId: this.userId,
                    status: this.status,
                    role: this.role,
                    changeroles : parseInt(this.changeroles),
                    sendemail : parseInt(this.sendEmail),
                    sendsms : parseInt(this.sendSms),
                    sendwhatsapp : parseInt(this.sendWhatsApp),
                };

                console.log(`data`, data)
                this.$store.dispatch('updateTeam', data);
                this.resetData();
            },
        },
        computed: {
            ...mapGetters(['user', 'team', 'teamPending']),
        },
        created() {
            if(this.user.institute){
                const data={
                    id: this.user.institute,
                }
                this.$store.dispatch('getTeam', data); 
            }
        },
    };
</script>
<style lang="sass" scoped>
    .rights
        align-items: center
        justify-content: space-between
</style>