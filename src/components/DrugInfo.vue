<template>
    <div>
        <h1 class="title is-1 is-marginless"> {{ drugName.toUpperCase() }} </h1>
        <p class='g-name'> <strong class='type-label'>Generic Names : </strong>{{ getDrugGenericNames() }}</p>
        <p class='alt-name'> <strong class='type-label'>Brand Names : </strong>{{ getDrugBrandNames() }}</p>
        <div class="control">
            <div class="tags has-addons">
                <span class="tag is-dark">Classification</span>
            </div>
        </div>
        <div class="notification is-primary has-text-grey"> {{ getClassification() }} {{ getUsage() }}</div>
        <div class="field" v-if='checkControlled'>
            
            <div class="notification is-danger has-text-light"> {{ getSchedule() }}</div>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            otherType: 'Brand',
            isControlled: true,
            schedule: ''
        }
    },
    props: ['drug2', 'drugName', 'allDrugs', 'type'],
    methods: {
        getDrugBrandNames() {
            var string = '';
            this.allDrugs.forEach( drug => {
                let tempString = string.toLowerCase();
                console.log(tempString);
                if (tempString.indexOf(drug.openfda.brand_name[0].toLowerCase()) == -1) {
                    string = string + ' / ' + drug.openfda.brand_name[0];
                }
            });
            return string;
        },
        getDrugGenericNames() {
            var string = '';
            this.allDrugs.forEach( drug => {
                let tempString = string.toLowerCase();
                console.log(tempString);
                if (tempString.indexOf(drug.openfda.generic_name[0].toLowerCase()) == -1) {
                    string = string + ' / ' + drug.openfda.generic_name[0];
                }
            });
            return string;
        },
        getUsage() {
            var str = '';
            var count = 0;
            while (str == '') {
                if (this.allDrugs[count].spl_medguide) {
                    str = this.allDrugs[count].spl_medguide[0];
                }
                count++;
                if (count >= this.allDrugs.length) {
                    break;
                }
            }
            var startIndex = str.toLowerCase().indexOf('what is ' + this.drugName.toLowerCase() + '?');
            var endIndex = str.toLowerCase().indexOf('.', startIndex) + 1;
            return str.slice(startIndex, endIndex);
        },
        getSchedule() {
            var count = 0;
            while (this.schedule == '') {
                if (this.allDrugs[count].controlled_substance) {
                    this.schedule = this.allDrugs[count].controlled_substance[0];
                }
                count++; 
                if (count >= this.allDrugs.length) {
                    break;
                }
            }
            return this.schedule;
        },
        getClassification() {
            var str = '';
            var count = 0;
            while (str == '') {
                //console.log(this.allDrugs[count].spl_medguide[0]);
                if (this.allDrugs[count].mechanism_of_action) {
                    str = this.allDrugs[count].mechanism_of_action[0];
                }
                count++;
                if (count >= this.allDrugs.length) {
                    break;
                }
            }
            var generic = this.drug2.openfda.generic_name[0].toLowerCase().split(' ');
            var tempName = this.drugName.toLowerCase();
            var startIndex = str.toLowerCase().indexOf(tempName);
            if (startIndex == -1 ) {
                startIndex = str.toLowerCase().indexOf(generic[0].toLowerCase());
            }
            var endIndex = str.indexOf('.', startIndex);
            return str.slice(startIndex, endIndex + 1);
        }
    },
    computed: {
        checkControlled() {
            var truth = false;
           this.allDrugs.forEach( drug => {
               if (drug.controlled_substance) {
                   truth = true;
               }
           });
        return truth;
        }
    }

}
</script>

<style>
h1 {
font-family: 'Heebo', sans-serif;
-webkit-text-stroke: 2px orange;
background: repeating-linear-gradient(0, rgba(168, 168, 168, 0.24) 0px, rgba(168, 168, 168, 0.24) 9px,rgba(242, 242, 242, 0.24) 9px, rgba(242, 242, 242, 0.24) 18px),repeating-linear-gradient(90deg, rgba(237, 237, 237, 0.09) 0px, rgba(237, 237, 237, 0.09) 10px,rgba(73, 73, 73, 0.09) 10px, rgba(73, 73, 73, 0.09) 20px),linear-gradient(90deg, rgb(232, 68, 4),rgb(94, 27, 193));
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
}
.alt-name {
    padding-bottom: 1em;
}
.type-label {
    color: rgb(255, 251, 0);
}
</style>
