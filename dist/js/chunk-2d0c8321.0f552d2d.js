(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c8321"],{"549e":function(a,e,o){"use strict";o.r(e),o.d(e,"createAgendaVazia",(function(){return O}));var i=function(){var a=this,e=a.$createElement,o=a._self._c||e;return o("v-dialog",{attrs:{value:a.value,width:"550",persistent:""}},[o("v-card",[o("v-card-title",{staticClass:"font-weight-bold headline d-flex justify-center"},[a._v(" Configurar disponibilidade de horário ")]),o("v-card-subtitle",{staticClass:"mt-1",attrs:{align:"center"}},[a._v(" Selecione os dias da semana em que você tem disponibilidade de horário para atender como tutor. ")]),o("div",{staticClass:"px-6 pb-4"},[o("v-form",{model:{value:a.canSalvarConfiguracao,callback:function(e){a.canSalvarConfiguracao=e},expression:"canSalvarConfiguracao"}},[o("v-chip-group",{attrs:{"active-class":"primary white--text",mandatory:""},model:{value:a.diaSelecionado,callback:function(e){a.diaSelecionado=e},expression:"diaSelecionado"}},a._l(a.diasSemana,(function(e,i){return o("v-chip",{key:i,attrs:{value:e.value},domProps:{textContent:a._s(e.nome)}})})),1),a._l(a.diasSemana,(function(e){return[o("FormHorariosLivresDia",{directives:[{name:"show",rawName:"v-show",value:a.diaSelecionado===e.value,expression:"diaSelecionado === dia.value"}],key:e.nome,attrs:{dia:a.diaSelecionado},on:{"horario-removido":a.removeHorario,"horario-adicionado":a.addHorario},model:{value:a.copiaHorarios[e.value],callback:function(o){a.$set(a.copiaHorarios,e.value,o)},expression:"copiaHorarios[dia.value]"}})]}))],2)],1),o("v-divider"),o("v-card-actions",[o("v-spacer"),o("v-btn",{attrs:{color:"grey",text:""},on:{click:a.cancelaConfiguracao}},[a._v("Cancelar")]),o("v-btn",{attrs:{color:"green",disabled:!a.canSalvarConfiguracao,text:""},on:{click:a.salvaConfiguracao}},[a._v("Salvar")])],1)],1)],1)},r=[],t=o("d4ec"),n=o("bee2"),c=o("262e"),s=o("2caf"),u=(o("d3b7"),o("3ca3"),o("ddb0"),o("a434"),o("d81d"),o("b64b"),o("4de4"),o("9ab4")),d=o("1b40"),l=o("2ef0"),v=o("15fd"),f=o("dc05"),p=o("fe5a"),b=["_id","__v"];function h(a,e){return new Promise((function(o,i){Object(p["a"])().post("users/tutores/".concat(a,"/agenda"),e).then((function(a){var e=a.data.tutor.agenda,i=(e._id,e.__v,Object(v["a"])(e,b));o(i)})).catch((function(a){var e=Object(f["a"])(a);i(e)}))}))}var m=o("6fc5"),g=o("cdd0"),j=o("ed54"),H=function(){return o.e("chunk-2d2299ab").then(o.bind(null,"ddc8"))},O=function(){return{segunda:[],terca:[],quarta:[],quinta:[],sexta:[]}},S=function(a){Object(c["a"])(o,a);var e=Object(s["a"])(o);function o(){var a;return Object(t["a"])(this,o),a=e.apply(this,arguments),a.authModule=Object(m["e"])(g["a"],a.$store),a.copiaHorarios=O(),a.diaSelecionado="segunda",a.canSalvarConfiguracao=!0,a.diasSemana=[{nome:"Segunda",value:"segunda"},{nome:"Terça",value:"terca"},{nome:"Quarta",value:"quarta"},{nome:"Quinta",value:"quinta"},{nome:"Sexta",value:"sexta"}],a}return Object(n["a"])(o,[{key:"addHorario",value:function(){this.copiaHorarios[this.diaSelecionado].push({inicio:"",fim:""})}},{key:"removeHorario",value:function(a){this.copiaHorarios[this.diaSelecionado].splice(a,1)}},{key:"removeHorariosVazios",value:function(a){var e=Object(l["cloneDeep"])(a);return Object.keys(e).map((function(a){var o=a;e[o]=e[o].filter((function(a){return a.inicio&&a.fim}))})),e}},{key:"cancelaConfiguracao",value:function(){this.resetaHorarios(),this.$emit("input",!1)}},{key:"salvaConfiguracao",value:function(){var a=this,e=this.authModule.user;if(Object(j["c"])(e)){var o=this.removeHorariosVazios(this.copiaHorarios);h(e._id,o).then((function(e){a.$emit("horarios-atualizados",e);var o=a.authModule.user;if(Object(j["c"])(o)){var i=Object(l["cloneDeep"])(o);i.agenda=e,a.authModule.AUTH_UPDATE({user:i}),a.$emit("input",!1)}}))}}},{key:"resetaHorarios",value:function(){var a=this;this.copiaHorarios=Object(l["cloneDeep"])(this.horariosTutor),Object.keys(this.copiaHorarios).map((function(e){var o=e,i=a.copiaHorarios[o];0===i.length&&i.push({inicio:"",fim:""}),a.copiaHorarios[o]=i}))}},{key:"mounted",value:function(){this.resetaHorarios()}}]),o}(d["d"]);Object(u["a"])([Object(d["b"])({required:!0})],S.prototype,"value",void 0),Object(u["a"])([Object(d["b"])({type:Object,required:!1,default:O})],S.prototype,"horariosTutor",void 0),S=Object(u["a"])([Object(d["a"])({name:"ModalConfigurarHorarios",components:{FormHorariosLivresDia:H}})],S);var k=S,y=k,_=o("2877"),C=Object(_["a"])(y,i,r,!1,null,null,null);e["default"]=C.exports}}]);
//# sourceMappingURL=chunk-2d0c8321.0f552d2d.js.map