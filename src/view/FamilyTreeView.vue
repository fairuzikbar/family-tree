<template>
<div>
  <div v-if="loading" class="heart-loader">
    <svg viewBox="0 0 120 120">
      <g class="heart-loader__group">
        <circle class="heart-loader__circle m--left" cx="60" cy="30" r="30" />
        <circle class="heart-loader__circle m--right" cx="60" cy="30" r="30" />
        <path class="heart-loader__heartPath"
          d="M 60,30 A 30,30 0 0,1 90,60 Q 60,90 30,60 A 30,30 0 0,1 60,30 Z" />
        <path class="heart-loader__stroke"
          d="M 60,30 A 30,30 0 0,1 90,60 Q 60,90 30,60 A 30,30 0 0,1 60,30 Z" />
      </g>
    </svg>
  </div>
  <div id="tree" ref="tree" v-show="!loading"></div>
</div>
  <!-- <div id="tree" ref="tree"></div> -->
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
      loading: true,
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
        this.loading = false;
      } catch (err) {
        console.error("Failed to fetch family data", err)
        this.loading = false;
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
        // enableCollapse: false,
        expandCollapse: {
          visible: true,
          size: 20,
          color: "blue",
          borderColor: "black",
          arrowColor: "white"
        },
        // scaleInitial: FamilyTree.match.boundary,
        // min: false
        miniMap: true,
      })

      this.family.on('render-link', (sender, args) => {
        const cnodeData = this.family.get(args.cnode.id);
        const nodeData = this.family.get(args.node.id);
        const isDivorced =
          cnodeData?.divorced?.includes(args.node.id) &&
          nodeData?.divorced?.includes(args.cnode.id);
        if (isDivorced) {
          args.html = args.html.replace("path", "path stroke-dasharray='3, 2'");
          // // Tambahkan ikon heart di tengah garis
          // args.html = args.html.replace("use", `use xlink:href="#heart" x="${args.p.xa}" y="${args.p.ya}"`);
        }
      });
      // this.family.on('click', function (sender, args) {
      //     if (args.node.min) {
      //         sender.maximize(args.node.id);
      //     }
      //     else {
      //         sender.minimize(args.node.id);
      //     }
      //     return false;
      // });
      /*
      FamilyTree.templates.tommy_female.defs =
          `<g transform="matrix(0.05,0,0,0.05,-12,-9)" id="heart">
              <path fill="#F57C00" d="M438.482,58.61c-24.7-26.549-59.311-41.655-95.573-41.711c-36.291,0.042-70.938,15.14-95.676,41.694l-8.431,8.909  l-8.431-8.909C181.284,5.762,98.663,2.728,45.832,51.815c-2.341,2.176-4.602,4.436-6.778,6.778 c-52.072,56.166-52.072,142.968,0,199.134l187.358,197.581c6.482,6.843,17.284,7.136,24.127,0.654 c0.224-0.212,0.442-0.43,0.654-0.654l187.29-197.581C490.551,201.567,490.551,114.77,438.482,58.61z"/>
          <g>`;
      FamilyTree.templates.tommy_male.defs =
          `<g transform="matrix(0.05,0,0,0.05,-12,-9)" id="heart">
              <path fill="#F57C00" d="M438.482,58.61c-24.7-26.549-59.311-41.655-95.573-41.711c-36.291,0.042-70.938,15.14-95.676,41.694l-8.431,8.909  l-8.431-8.909C181.284,5.762,98.663,2.728,45.832,51.815c-2.341,2.176-4.602,4.436-6.778,6.778 c-52.072,56.166-52.072,142.968,0,199.134l187.358,197.581c6.482,6.843,17.284,7.136,24.127,0.654 c0.224-0.212,0.442-0.43,0.654-0.654l187.29-197.581C490.551,201.567,490.551,114.77,438.482,58.61z"/>
          <g>`;
      
      FamilyTree.templates.tommy_female.defs =
          `<g transform="matrix(0.05,0,0,0.05,-12,-9)" id="brokenheart">
              <path fill="#F57C00" d="M473.7 73.8l-2.4-2.5c-46-47-118-51.7-169.6-14.8L336 159.9l-96 64 48 128-144-144 96-64-28.6-86.5C159.7 19.6 87 24 40.7 71.4l-2.4 2.4C-10.4 123.6-12.5 202.9 31 256l212.1 218.6c7.1 7.3 18.6 7.3 25.7 0L481 255.9c43.5-53 41.4-132.3-7.3-182.1z"/>
          <g>`;
      FamilyTree.templates.tommy_male.defs =
          `<g transform="matrix(0.05,0,0,0.05,-12,-9)" id="brokenheart">
              <path fill="#F57C00" d="M473.7 73.8l-2.4-2.5c-46-47-118-51.7-169.6-14.8L336 159.9l-96 64 48 128-144-144 96-64-28.6-86.5C159.7 19.6 87 24 40.7 71.4l-2.4 2.4C-10.4 123.6-12.5 202.9 31 256l212.1 218.6c7.1 7.3 18.6 7.3 25.7 0L481 255.9c43.5-53 41.4-132.3-7.3-182.1z"/>
          <g>`;
      */
      
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
      // FamilyTree.templates.tommy.min = Object.assign({}, FamilyTree.templates.tommy);
      // FamilyTree.templates.tommy.min.size = [250, 60];
      // FamilyTree.templates.tommy.min.img_0 = "";
      // FamilyTree.templates.tommy.min.field_0 = "",
      // FamilyTree.templates.tommy.min.field_1 = `<text data-width="230" style="${textStyles["field_1"]}" fill="#ffffff" x="125" y="40" text-anchor="middle">{val}</text>`;
      // FamilyTree.templates.tommy.min.field_2 = "";
      // FamilyTree.templates.tommy.min.field_3 = "";
      // FamilyTree.templates.tommy_male.min = Object.assign({}, FamilyTree.templates.tommy.min);
      // FamilyTree.templates.tommy_male.min.node = '<rect x="0" y="0" height="{h}" width="{w}" stroke-width="1" fill="#039BE5" stroke="#aeaeae" rx="7" ry="7"></rect>';
      // FamilyTree.templates.tommy_female.min = Object.assign({}, FamilyTree.templates.tommy.min);
      // FamilyTree.templates.tommy_female.min.node = '<rect x="0" y="0" height="{h}" width="{w}" stroke-width="1" fill="#F57C00" stroke="#aeaeae" rx="7" ry="7"></rect>';
    }
  },
  mounted() {
    this.fetchNodes()
  }
}
</script>

<style scoped>
.heart-loader {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 180px;
  height: 180px;
  transform: translate(-50%, -50%);
  z-index: 9999;
}

.heart-loader__group {
  transform-origin: 0 90px;
  animation: group-anim 8s 0s;
}

.heart-loader__circle {
  stroke: #B8B8B8;
  stroke-dasharray: 188.522, 188.522;
  stroke-dashoffset: 188.522;
}

.heart-loader__heartPath {
  stroke: #E21737;
  fill: transparent;
  stroke-dasharray: 308.522, 308.522;
  stroke-dashoffset: 308.522;
  animation: heart-anim 8s 0s infinite;
}

.heart-loader__stroke {
  stroke: white;
  stroke-dasharray: 600, 600;
  stroke-dashoffset: 600;
  animation: strokeAnim 8s 4s infinite;
}

@keyframes heart-anim {
  55% { stroke-dashoffset: 308.522; fill: transparent; }
  70% { stroke-dashoffset: 0; fill: transparent; }
  87% { stroke-dashoffset: 0; fill: #E21737; }
  100% { stroke-dashoffset: 0; fill: #E21737; }
}

@keyframes strokeAnim {
  33% { stroke-dashoffset: 600; }
  66% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: 0; }
}

@keyframes group-anim {
  43% { transform: rotate(0); }
  100% { opacity: 1; }
}
</style>  