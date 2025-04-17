<template>
    <div id="tree" ref="tree"></div>
</template>

<script>
import FamilyTree from '@balkangraph/familytree.js'

export default {
    name: 'wrbt',
    data() {
        return {
            nodes: []
        }
    },
    methods: {
        async fetchNodes() {
            try {
                const res = await fetch('/api/db') // path ini tergantung setup kamu
                const data = await res.json()
                console.log(data)
                const filtered = data.filter(item => item.fams === 'wrbt');
                this.nodes = filtered
                this.mytree(this.$refs.tree, this.nodes)
            } catch (err) {
                console.error("Failed to fetch family data", err)
            }
        },
        mytree(domEl, x) {
            this.family = new FamilyTree(domEl, {
                nodes: x,
                nodeBinding: {
                    field_0: "name",
                    field_1: "nickname",
                    img_0: "img"
                },
                editForm: {
                    readOnly: true,
                    buttons: {
                        pdf: null,
                        share: null
                    }
                },
                nodeMouseClick: FamilyTree.action.none,
                toolbar: {
                    zoom: true,
                    fit: true,
                },
                menu: {
                    pdf: { text: "Export PDF" },
                    png: { text: "Export PNG" },
                    svg: { text: "Export SVG" }
                },
                // scaleInitial: FamilyTree.match.boundary,
                orientation: FamilyTree.orientation.top,
            })
        }
    },
    mounted() {
        this.fetchNodes()
    }
}
</script>

<style scoped>
</style>