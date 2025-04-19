<template>
    <div id="tree" ref="tree"></div>
</template>

<script>
import FamilyTree from '@balkangraph/familytree.js'
import fams from '/api/db.json'

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
                // const data = await res.json()
                const data = fams
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
                    field_0: "nickname",
                    field_1: "name",
                    field_2: "place",
                    field_3: "year", 
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
                scaleInitial: FamilyTree.match.boundary,
                // orientation: FamilyTree.orientation.top,
            })

            this.family.on('render-link', (sender, args) => {
                const cnodeData = this.family.get(args.cnode.id);
                const nodeData = this.family.get(args.node.id);
                if (
                    cnodeData?.divorced?.includes(args.node.id) &&
                    nodeData?.divorced?.includes(args.cnode.id)
                ) {
                    args.html = args.html.replace("path", "path stroke-dasharray='3, 2'");
                }
            });

            FamilyTree.templates.tommy_male.field_0 =
                '<text class="field_0" style="font-size: 14px;" fill="#ffffff" x="125" y="30" text-anchor="middle">{val}</text>';
            FamilyTree.templates.tommy_male.field_1 =
                '<text class="field_1" style="font-size: 18px; font-weight: bold" fill="#ffffff" x="125" y="50" text-anchor="middle">{val}</text>';
            FamilyTree.templates.tommy_male.field_2 =
                '<text class="field_2" style="font-size: 14px;" fill="#ffffff" x="125" y="70" text-anchor="middle">{val}</text>';
            FamilyTree.templates.tommy_male.field_3 =
                '<text class="field_3" style="font-size: 14px;" fill="#ffffff" x="125" y="90" text-anchor="middle">{val}</text>';
            FamilyTree.templates.tommy_female.field_0 =
                '<text class="field_0" style="font-size: 14px;" fill="#ffffff" x="125" y="30" text-anchor="middle">{val}</text>';
            FamilyTree.templates.tommy_female.field_1 =
                '<text class="field_1" style="font-size: 18px; font-weight: bold" fill="#ffffff" x="125" y="50" text-anchor="middle">{val}</text>';
            FamilyTree.templates.tommy_female.field_2 =
                '<text class="field_2" style="font-size: 14px;" fill="#ffffff" x="125" y="70" text-anchor="middle">{val}</text>';
            FamilyTree.templates.tommy_female.field_3 =
                '<text class="field_3" style="font-size: 14px;" fill="#ffffff" x="125" y="90" text-anchor="middle">{val}</text>';
        }
    },
    mounted() {
        this.fetchNodes()
    }
}
</script>

<style scoped>
</style>