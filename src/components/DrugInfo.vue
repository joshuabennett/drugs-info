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
            isControlled: true,
            schedule: ''
        }
    },
    props: ['drug2', 'drugName', 'allDrugs', 'type'],
    methods: {
        // Loops through all drugs and adds their Brand name to the list unless it's already in the list. Returns string of all unique brand names.
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
        // Returns string of all unique generic names from list of all drugs.
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
        // Returns the first drug to contain SPL medguide, slicing out the first sentence after "What is DRUG?"
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
        // Returns the string for controlled substance information if there is any in any of the drugs.
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
        // Returns mechanism of action information for the first drug that has such information. Only returns first sentence after naming the drug.
        getClassification() {
            var str = '';
            var count = 0;
            while (str == '') {
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
        // Return boolean to see if drug has controlled substance information or not.
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
