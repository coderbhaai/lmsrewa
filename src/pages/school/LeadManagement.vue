<template>
    <q-page padding>
        <q-table title="Admission Leads" :data="leadsFilter" :columns="column" row-key="id" class="my-sticky-header-table" :pagination.sync="pagination">
            <template v-slot:header="props"><q-tr :props="props"><q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th></q-tr></template>
            <template v-slot:body="props">
                <q-tr :props="props">
                <q-td key="id" :props="props">{{ props.row.id }}</q-td>
                <q-td key="name" :props="props">{{ props.row.name }}</q-td>
                <q-td key="email" :props="props">{{ props.row.email }}</q-td>
                <q-td key="phone" :props="props">{{ props.row.phone }}</q-td>
                <q-td key="source" :props="props">{{ props.row.source }}</q-td>
                <!-- <q-td key="status" :props="props">{{ props.row.status }} </q-td> -->
                <q-td key="status" :props="props">
                    <q-toggle v-model="props.row.status==1 ? true : false" color="primary" @input="changeStatus(props.row.id, props.row.status)"></q-toggle>
                </q-td>
                <!-- <q-td><img @click="editModal(props.row)" src="/images/icons/edit.svg" class="edit"/></q-td> -->
                <q-td><q-checkbox v-model="selection" :val="props.row" color="teal"/></q-td>
                </q-tr>
            </template>
        </q-table>
        <q-page-sticky position="bottom-left" :offset="[50, 10]">
            <q-fab icon="add" label="Actions" direction="up" color="accent">
                <q-fab-action label-position="left" color="primary" @click="selectNone" label="Unselect All" v-if="selection.length"/>
                <q-fab-action label-position="left" color="primary" @click="addLead" label="Add Lead"/>
                <q-fab-action label-position="left" color="primary" @click="uploadExcel" label="Upload Excel"/>
                <q-fab-action label-position="left" color="primary" @click="sendMail" label="Send a Mail" v-if="selection.length"/>
                <q-fab-action label-position="left" color="primary" @click="sendSms" label="Send an SMS" v-if="selection.length"/>
                <q-fab-action label-position="left" color="primary" @click="selectAll" label="Select All"/>
                <q-fab-action label-position="left" color="primary" @click="editModal" label="Update Lead" v-if="selection.length==1"/>
                <q-fab-action label-position="left" color="primary" @click="counsellorModal" label="Allot Counsellor" v-if="selection.length"/>
                <q-fab-action label-position="left" color="primary" @click="checkLog" label="check History" v-if="selection.length==1"/>
            </q-fab>
        </q-page-sticky>
        <q-dialog v-model="medium" persistent transition-show="scale" transition-hide="scale">
            <q-card style="width: 70vw; max-width: 80vw;">
                <q-card-section class="modalHead"><div class="text-h6">Add Lead</div><q-btn flat label="Close" color="primary" v-close-popup @click="resetData()"/></q-card-section>
                <q-card-section class="q-pt-none">
                <q-form class="q-gutter-md" @submit="addHandler">
                    <div class="row">
                        <div class="col-4 q-pr-lg"><q-input v-model="name" label="Name" required/></div>
                        <div class="col-4 q-pr-lg"><q-input v-model="email" label="Email" required/></div>
                        <div class="col-4 q-pr-lg"><q-input v-model="phone" label="Phone" required/></div>
                        <div class="col-8 q-pr-lg"><q-input v-model="source" label="Source" required/></div>
                        <div class="col-4 q-pr-lg"><q-select map-options emit-value v-model="status" :options="statusOptions" option-value="value" option-label="text" label="Status" required/></div>
                    </div>
                    <div class="text-center"><q-btn label="Submit" type="submit" color="primary" class="q-mr-lg" /></div>
                </q-form>
                </q-card-section>
            </q-card>
        </q-dialog>
        <q-dialog v-model="medium2" persistent transition-show="scale" transition-hide="scale">
            <q-card style="width: 70vw; max-width: 80vw;">
                <q-card-section class="modalHead"><div class="text-h6">Update Lead</div><q-btn flat label="Close" color="primary" v-close-popup @click="resetData()"/></q-card-section>
                <q-card-section class="q-pt-none">
                <q-form class="q-gutter-md" @submit="updateHandler">
                    <div class="row">
                    <div class="col-4 q-pr-lg"><q-input v-model="name" label="Name" required/></div>
                    <div class="col-4 q-pr-lg"><q-input v-model="email" label="Email" required/></div>
                    <div class="col-4 q-pr-lg"><q-input v-model="phone" label="Phone" required/></div>
                    <div class="col-8 q-pr-lg"><q-input v-model="source" label="Source" required/></div>
                    <div class="col-4 q-pr-lg"><q-select map-options emit-value v-model="status" :options="statusOptions" option-value="value" option-label="text" label="Status" required/></div>
                    </div>
                    <div class="text-center"><q-btn label="Submit" type="submit" color="primary" class="q-mr-lg" /></div>
                </q-form>
                </q-card-section>
            </q-card>
        </q-dialog>
        <q-dialog v-model="medium3" persistent transition-show="scale" transition-hide="scale">
            <q-card style="width: 70vw; max-width: 80vw;">
                <q-card-section class="modalHead"><div class="text-h6">Upload Excel Sheet</div><q-btn flat label="Close" color="primary" v-close-popup @click="resetData()"/></q-card-section>
                <q-card-section class="q-pt-none">
                <q-form class="q-gutter-md" @submit="uploadFile">
                    <div class="row">
                        <div class="col-6 q-pr-lg"><input @change="previewFiles" type="file"></div>
                        <div class="col-6 text-center"><q-btn label="Upload Excel sheet" type="submit" color="primary" class="q-mr-lg" /></div>
                    </div>
                </q-form>
                </q-card-section>
            </q-card>
        </q-dialog>
        <q-dialog v-model="medium4" persistent transition-show="scale" transition-hide="scale">
            <q-card style="width: 70vw; max-width: 80vw;">
                <q-card-section class="modalHead"><div class="text-h6">Assign a Counsellor</div><q-btn flat label="Close" color="primary" v-close-popup @click="resetData()"/></q-card-section>
                <q-card-section class="q-pt-none">
                    <q-form class="q-gutter-md" @submit="addCounsellor">
                        <div class="row">
                            <div class="col-6">
                                <q-select map-options emit-value v-model="counsellorSelected" :options="counsellors" option-value="id" option-label="name" label="Select Counsellor" required/>
                            </div>                            
                            <div class="col-6 text-center flex-hc"><q-btn label="Submit" type="submit" color="primary" class="q-mr-lg" /></div>
                        </div>
                    </q-form>
                </q-card-section>
            </q-card>
        </q-dialog>
        <q-dialog v-model="medium5" persistent transition-show="scale" transition-hide="scale">
            <q-card style="width: 70vw; max-width: 80vw;">
                <q-card-section class="modalHead"><div class="text-h6">Log for {{this.selectedId.name}}</div><q-btn flat label="Close" color="primary" v-close-popup @click="closeLog()"/></q-card-section>
                <q-card-section class="q-pt-none">
                    <q-table  :data="leadLog" :columns="column2" row-key="id" class="my-sticky-header-table table-responsive link-cursor">
                        <template v-slot:header="props"><q-tr :props="props"><q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th></q-tr></template>
                        <template v-slot:body="props">
                            <q-tr :props="props">
                                <q-td key="id" :props="props">{{ props.row.id }}</q-td>
                                <q-td key="created_at" :props="props">{{ props.row.created_at }}</q-td>
                                <q-td key="entry" :props="props">{{ props.row.entry }}</q-td>
                                <q-td key="loggedByName" :props="props">{{ props.row.loggedByName }}</q-td>
                            </q-tr>
                        </template>
                    </q-table>
                    
                </q-card-section>
            </q-card>
        </q-dialog>
    </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'LeadManagement',
    data() {
        return {
            id: '',
            name: '',
            email: '',
            phone: '',
            source: '',
            status: '',
            oldName: '',
            oldEmail: '',
            oldPhone: '',
            oldSource: '',
            oldStatus: '',
            statusName: '',
            oldStatusName : '',
            counsellorSelected: '',
            role:  '',
            jsonData: [],
            statusOptions: [
                { text: 'Active', value: 1},
                { text: 'Not Active', value: 0},
            ],
            selection: [],
            selectedId: {},
            medium: false,
            medium2: false,
            medium3: false,
            medium4: false,
            medium5: false,
            pagination: { rowsPerPage: 30 },
            column: [
                { name: 'id', label: 'Sl No.', align: 'left', field: 'Edit', },
                { name: 'name', label: 'Name', align: 'left', field: 'name', sortable: true,},
                { name: 'email', label: 'Email', align: 'left', field: 'email', sortable: true,},
                { name: 'phone', label: 'Phone', align: 'left', field: 'phone', sortable: true,},
                { name: 'source', label: 'Source', align: 'left', field: 'source', sortable: true,},
                { name: 'status', label: 'Status', align: 'left', field: 'status', sortable: true,},
                { name: 'index', label: 'Action', align: 'left', sortable: true,}
            ],
            column2: [
                { name: 'id', label: 'Sl No.', align: 'left', field: 'Edit', },
                { name: 'created_at', label: 'Date', align: 'left', field: 'created_at', sortable: true,},
                { name: 'entry', label: 'Entry', align: 'left', field: 'entry', sortable: true,},
                { name: 'loggedByName', label: 'Logged By', align: 'left', field: 'loggedByName', sortable: true,}
            ],
        }
    },
    methods: {
        ...mapActions(['schoolBasics']),
        selectAll(){
            var all = []
            this.leadsFilter.map((i)=>( all.push(i.id) ))
            this.selection = all
            // console.log(`this.$refs`, this.$refs.leftDrawer)
            // this.$refs.leftDrawer.open()
        },
        selectNone(){ this.selection= [] },
        addLead(){ this.medium= true },
        addHandler(e){
            e.preventDefault();
            const data={
                schoolId:                       1,
                name:                           this.name,
                email:                          this.email,
                phone:                          this.phone,
                source:                         this.source,
                status:                         this.status,
                loggedby:                       this.user.id,
                schoolId:                       this.user.institute
            }
            this.$store.dispatch('addLead', data);
            this.resetData()
        },
        editModal(){
            const data = this.leadsFilter.filter(i=>i.id==this.selection[0])[0]
            this.medium2= true
            this.id = data.id
            this.name = data.name
            this.email = data.email
            this.phone = data.phone
            this.source = data.source
            this.status = data.status
            this.oldName = data.name
            this.oldEmail = data.email
            this.oldPhone = data.phone
            this.oldSource = data.source
            this.oldStatus = data.status
        },
        updateHandler(e){
            e.preventDefault();
            const data={
                id:                             this.id,
                schoolId:                       1,
                name:                           this.name,
                email:                          this.email,
                phone:                          this.phone,
                source:                         this.source,
                status:                         this.status,
                loggedby:                       this.user.id,
                schoolId:                       this.user.institute
            }
            if(this.oldStatus==0){ this.oldStatusName = "Not Active" }else{ this.oldStatusName = "Active" }
            if(this.status==0){ this.statusName = "Not Active" }else{ this.statusName = "Active" }
            var changes = []
            if(this.oldName != this.name){ changes.push(`Name changed from ${this.oldName} to ${this.name}`) }
            if(this.oldEmail != this.email){ changes.push(`Email changed from ${this.oldEmail} changed to ${this.email}`) }
            if(this.oldPhone != this.phone){ changes.push(`Phone changed from ${this.oldPhone} changed to ${this.phone}`) }
            if(this.oldSource != this.source){ changes.push(`Source changed from ${this.oldSource} changed to ${this.source}`) }
            if(this.oldStatus != this.status){ changes.push(`Status changed from ${this.oldStatusName} changed to ${this.statusName}`) }
            data.changes = changes
            this.$store.dispatch('updateLead', data);
            this.resetData()
        },
        resetData() {
            this.name = ''
            this.email = ''
            this.phone = ''
            this.source = ''
            this.status = ''
            this.oldName =''
            this.oldEmail =''
            this.oldPhone =''
            this.oldSource =''
            this.oldStatus =''
            this.statusName = '',
            this.oldStatusName = '',
            this.counsellorSelected = ''
            this.counsellorName = ''
            this.selection = []
            this.selectedId = ""
            this.medium = false
            this.medium2 = false
            this.medium3 = false
            this.medium4 = false
            this.medium5 = false
        },
        closeLog() {
            this.resetData()
            this.$store.dispatch('clearLeadLog');
        },
        sendMail(){},
        sendSms(){},
        counsellorModal(){ this.medium4= true },
        addCounsellor(){
            const data={
                id:                             JSON.stringify(this.selection),
                counsellorSelected:             this.counsellorSelected,
                counsellorName:                 this.counsellors.filter(i=>i.id == this.counsellorSelected)[0].name,
                loggedby:                       this.user.id,
                schoolId:                       this.user.institute
            }
            if(this.selection.length>1){ 
                data.type = "Multiple"
                data.leadId = JSON.stringify(this.selection)
            }else{ 
                    data.type = "Single" 
                    data.leadId = this.selection[0]
            }
            this.$store.dispatch('addCounsellor', data);
            this.resetData()
        },
        uploadExcel(){ this.medium3= true },
        previewFiles(event) {
            if(event.target.files.length > 0) {
                var XLSX = require("xlsx");
                var f = event.target.files[0];
                var reader = new FileReader();
                var This = this
                reader.onload = function(e) {
                    var data = new Uint8Array(e.target.result);
                    var workbook = XLSX.read(data, {type: 'array'});
                    let sheetName = workbook.SheetNames[0];
                    let worksheet = workbook.Sheets[sheetName];
                    This.jsonData= XLSX.utils.sheet_to_json(worksheet)
                    This.jsonData.map(i=>( i.schoolId = 1 ))
                };
                reader.readAsArrayBuffer(f);
            }
        },
        uploadFile(){
            const data={
                jsonData:                       this.jsonData,
                loggedby:                       this.user.id,
                schoolId:                       this.user.institute
            }
            this.$store.dispatch('uploadExcelUsers', data);
            this.medium3 = false
            this.jsonData= []
        },
        checkLog(){
            const data={
                leadId:             this.selection[0].id,
            }
            this.$store.dispatch('getLeadLog', data); 
            this.selectedId = this.selection[0]
            this.medium5= true
        },
        changeStatus(id, status){
            if(status == 0){ var change = 1 }else{ var change = 0}
            const data = {
                id:                             id,
                status:                         change,
                loggedby:                       this.user.id,
                schoolId:                       this.user.institute,
                type:                           "Single",
            };
            this.$store.dispatch('changeLeadStatus', data);
        },
    },
    computed: {
        ...mapGetters(['user','leadsFilter', 'counsellors', 'leadLog']),
    },
    created() {
        const data={
            schoolId: this.user.institute,
        }
        this.$store.dispatch('getLeads', data);
    }
};
</script>
<style lang="sass" scoped>
</style>