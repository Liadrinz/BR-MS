var template = 
`<div :style="style">
  <div style="float: right; z-index: 1;">
  <el-button
    type="info" size="mini" plain round
    @click="fold = false"
    v-if="options"
    v-show="fold">
    <i class="el-icon-arrow-down"></i>&nbsp;全部显示
  </el-button>
  </div>
  <el-radio
  size="mini" border
  style="margin-right: 8px"
  v-model="isNoSelect"
  @change="handleNoSelect"
  :label="true">{{ noselect }}
  </el-radio>
  <el-checkbox-group style="display:inline" v-model="innerCheckVal">
  <el-checkbox
    v-for="op in options"
    :label="op"
    :key="op"
    border size="mini"></el-checkbox>
  </el-checkbox-group>
  <div style="float: right; z-index: 1;">
  <el-button
    type="info" size="mini" plain round
    @click="fold = true"
    v-if="options"
    v-show="!fold">
    <i class="el-icon-arrow-up"></i>&nbsp;隐藏
  </el-button>
  </div>
</div>`;

export default {
    template: template,
    props: {
        options: Array,
        height: {
            default: 40,
            type: Number
        },
        noselect: {
            default: '不限',
            type: String
        },
        checkVal: {
            default: Array,
            type: Array
        }
    },
    model: {
        prop: 'checkVal',
        event: 'checked'
    },
    created: function () {
        this.innerCheckVal = this.checkVal;
        if (this.innerCheckVal.length === 0) {
            this.isNoSelect = true;
        }
    },
    data: function () {
        return {
            fold: true,
            isNoSelect: true,
            innerCheckVal: []
        }
    },
    computed: {
        style: function () {
            return {
                height: this.fold ? this.height + 'px' : 'auto',
                "line-height": this.height + 'px',
                overflow: 'hidden'
            }
        }
    },
    watch: {
        innerCheckVal: function (val) {
            this.$emit('checked', val);
            this.isNoSelect = (val.length === 0);
        }
    },
    methods: {
        handleNoSelect: function () {
            this.innerCheckVal = [];
        }
    }
}