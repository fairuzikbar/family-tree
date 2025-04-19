<template>
    <div id="tree" ref="tree"></div>
  </template>
  
  <script>
  import FamilyTree from '@balkangraph/familytree.js'
  
  export default {
    name: 'FamilyTreeView',
    props: {
      fams: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        nodes: []
      }
    },
    methods: {
      async fetchNodes() {
        try {
          const res = await fetch('/api/db')
          const data = await res.json()
          const filtered = data.filter(item => item.fams === this.fams)
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
        })
  
        this.family.on('render-link', (sender, args) => {
          const cnodeData = this.family.get(args.cnode.id)
          const nodeData = this.family.get(args.node.id)
          if (
            cnodeData?.divorced?.includes(args.node.id) &&
            nodeData?.divorced?.includes(args.cnode.id)
          ) {
            args.html = args.html.replace("path", "path stroke-dasharray='3, 2'")
          }
        })
  
        const textStyles = {
          field_0: 'font-size: 14px;',
          field_1: 'font-size: 18px; font-weight: bold;',
          field_2: 'font-size: 14px;',
          field_3: 'font-size: 14px;'
        }
  
        for (const gender of ['tommy_male', 'tommy_female']) {
          Object.keys(textStyles).forEach((field, i) => {
            FamilyTree.templates[gender][field] =
              `<text class="${field}" style="${textStyles[field]}" fill="#ffffff" x="125" y="${30 + i * 20}" text-anchor="middle">{val}</text>`
          })
        }
      }
    },
    mounted() {
      this.fetchNodes()
    }
  }
  </script>
  
  <style scoped>
  </style>
  