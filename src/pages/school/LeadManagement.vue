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
                <q-td key="status" :props="props">{{ props.row.status }}</q-td>
                <!-- <q-td><img @click="editModal(props.row)" src="/images/icons/edit.svg" class="edit"/></q-td> -->
                <q-td key="id"><q-checkbox v-model="selection" :val="props.row.id" color="teal"/></q-td>
                </q-tr>
            </template>
        </q-table>
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
        <q-page-sticky position="bottom-left" :offset="[50, 10]">
            <q-fab icon="add" label="Actions" direction="up" color="accent">
                <q-fab-action label-position="left" color="primary" @click="selectNone" label="Unselect All" v-if="selection.length"/>
                <q-fab-action label-position="left" color="primary" @click="addLead" label="Add Lead"/>
                <q-fab-action label-position="left" color="primary" @click="uploadExcel" label="Upload Excel"/>
                <q-fab-action label-position="left" color="primary" @click="sendMail" label="Send a Mail"/>
                <q-fab-action label-position="left" color="primary" @click="sendSms" label="Send an SMS"/>
                <q-fab-action label-position="left" color="primary" @click="selectAll" label="Select All"/>
                <q-fab-action label-position="left" color="primary" @click="editModal" label="Update Lead" v-if="selection.length==1"/>
                <q-fab-action label-position="left" color="primary" @click="allotCounsellor" label="Allot Counsellor" v-if="selection.length==1"/>
            </q-fab>
        </q-page-sticky>
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
            jsonData: [],
            statusOptions: [
                { text: 'Active', value: 1},
                { text: 'Not Active', value: 0},
            ],
            selection: [],
            medium: false,
            medium2: false,
            medium3: false,
            pagination: { rowsPerPage: 30 },
            column: [
                { name: 'id', label: 'Sl No.', align: 'left', field: 'Edit', },
                { name: 'name', label: 'Name', align: 'left', field: 'name', sortable: true,},
                { name: 'email', label: 'Email', align: 'left', field: 'email', sortable: true,},
                { name: 'phone', label: 'Phone', align: 'left', field: 'phone', sortable: true,},
                { name: 'source', label: 'Source', align: 'left', field: 'source', sortable: true,},
                { name: 'status', label: 'Status', align: 'left', field: 'status', sortable: true,},
                { name: 'id', label: 'Action', align: 'left', field: 'id', sortable: true,}
            ],
        }
    },
    methods: {
        ...mapActions(['schoolBasics']),
        selectAll(){
            var all = []
            this.leadsFilter.map((i)=>( all.push(i.id) ))
            this.selection = all
        },
        selectNone(){ this.selection= [] },
        addLead(){ this.medium= true },
        addHandler(e){
            e.preventDefault();
            const data={
                schoolId:       1,
                name:           this.name,
                email:          this.email,
                phone:          this.phone,
                source:         this.source,
                status:         this.status
            }
            this.$store.dispatch('addLead', data);
            this.resetData()
        },
        editModal(){
            const data = this.leadsFilter.filter(i=>i.id==this.selection[0])[0]
            this.medium2= true,
            this.id = data.id,
            this.name = data.name,
            this.email = data.email,
            this.phone = data.phone,
            this.source = data.source,
            this.status = data.status
        },
        updateHandler(e){
            e.preventDefault();
            const data={
                id:             this.id,
                schoolId:       1,
                name:           this.name,
                email:          this.email,
                phone:          this.phone,
                source:         this.source,
                status:         this.status
            }
            this.$store.dispatch('updateLead', data);
            this.resetData()
        },
        resetData() {
            this.name= '',
            this.email= '',
            this.phone= '',
            this.source= '',
            this.status= '',
            this.selection= [],
            this.medium = false;
            this.medium2 = false;
        },
        sendMail(){},
        sendSms(){},
        allotCounsellor(){},
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
        setData(data){
        },
        uploadFile(){
            const data={
                jsonData: this.jsonData
            }
            this.$store.dispatch('uploadExcelUsers', data);
            this.medium3 = false
            this.jsonData= []
        }
    },
    computed: {
        ...mapGetters(['leadsFilter']),
    },
    created() {
        const data={
            schoolId: 1,
        }
        this.$store.dispatch('getLeads', data);
    }
};
</script>
<style>
</style>
