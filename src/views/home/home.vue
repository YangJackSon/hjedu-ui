<template>
    <div class="hello">

        <ul>

            <li><router-link :to="{name: 'base'}">base</router-link></li>
            <li><router-link :to="{name: 'res'}">res</router-link></li>
            <li><router-link :to="{name: 'teacherManagement'}">teacherManagement</router-link></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'home',
        props: {
            msg: String
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
</style>
