<template>
    <v-chip
        v-if="inDevelopment"
        style="position: absolute; z-index: 3; top: -1.2rem; left: -1.4rem; transition: all 0.2s"
        :color="color"
        :style="hover ? [{ transform: 'rotate(' + -370 + 'deg)' }, { transition: 'all 0.2s' }] : ''"
        :dark="darkTheme"
    >
        <span class="chipInDev">
            {{ text }}
        </span>
    </v-chip>
</template>

<script>
import { mapState } from "vuex";
export default {
    props: ["inDevelopment", "color", "text", "hover"],
    computed: {
        ...mapState(["darkTheme"]),
    },
};
</script>

<style>
.chipInDev {
    font-family: "Source Sans Pro", sans-serif;
    font-size: 1.0rem;
}
</style>
