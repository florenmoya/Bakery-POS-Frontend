<template>
    <div class="ma-2">
            <span class="title">Settings</span>
            <div class="ma-2">
                <div> General
                    <hr>
                </div>
                <ButtonList :button_list="buttons" />
            </div>
            <div class="ma-2">
                <div> Advanced Setup
                    <hr>
                </div>
                <ButtonList :button_list="buttons2" />
            </div>
    </div>
</template>
<script>
import ButtonList from '@/components/ButtonList'

export default {
    components: {
        ButtonList
    },
    data() {
        return {
            buttons: [{
                name: 'Shop Setup',
                icon: 'redo',
                path: 'Shop/Setup'
            }, {
                name: 'Employee Setup',
                icon: 'redo',
                path: 'Employee/Setup'
            }],            
            buttons2: [ {
                name: 'Employee Roles',
                icon: 'money_off',
                path: 'Employee/Roles'
            },{
                name: 'Import Item',
                icon: 'money_off',
                path: 'settings/import'
            }],

        }
    },
}

</script>
