(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["PagePerfilTutor"],{"0599":function(t,e,a){},"0dce":function(t,e,a){"use strict";a("cedd")},"1a74":function(t,e,a){"use strict";e["a"]=["UTFPR","UNIVASF","UNIRIO","UNIR","UNIPAMPA","UNILAB","UNILA","UNIFESSPA","UNIFESP","UNIFEI","UNIFAP","UNIFAL-MG","UnB","UFVJM","UFV","UFU","UFTM","UFT","UFSM","UFSJ","UFSCar","UFSC","UFSB","UFS","UFRRJ","UFRR","UFRPE","UFRN","UFRJ","UFRGS","UFRB","UFRA","UFR","UFPR","UFPI","UFPel","UFPE","UFPB","UFPA","UFOPA","UFOP","UFOB","UFNT","UFMT","UFMS","UFMG","UFMA","UFLA","UFJF","UFJ","UFGD","UFG","UFFS","UFF","UFES","UFERSA","UFDPar","UFCSPA","UFCG","UFCat","UFCA","UFC","UFBA","UFAPE","UFAM","UFAL","UFAC","UFABC","FURG"]},"43df":function(t,e,a){},4723:function(t,e,a){"use strict";a("91c6")},7906:function(t,e,a){},8767:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tableContainer"},[a("v-tabs",{staticClass:"tabBar",model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[a("v-tab",[t._v("Meu Perfil")]),a("v-tab",[t._v("Habilidades")])],1),a("v-tabs-items",{model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[a("v-tab-item",[a("TabDadosUsuarioTutor",{attrs:{isEditing:t.isEditing}})],1),a("v-tab-item",[a("TabSelecaoHabilidades")],1)],1)],1)},s=[],r=a("d4ec"),o=a("bee2"),n=a("262e"),c=a("2caf"),l=(a("a9e3"),a("9ab4")),u=a("cdd0"),d=a("6fc5"),b=a("1b40"),v=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-form",{staticClass:"px-6 pb-6 pt-2",model:{value:t.canSubmit,callback:function(e){t.canSubmit=e},expression:"canSubmit"}},[a("v-row",[a("v-card-title",{staticClass:"pa-0 grey--text text--darken-1"},[t._v("Dados Pessoais")]),a("v-spacer"),a("v-btn",{attrs:{color:t.isEditing?"red":"grey","x-large":"",text:""},on:{click:function(e){t.isEditing=!t.isEditing}}},[a("span",{domProps:{textContent:t._s(t.isEditing?"Cancelar":"Editar")}}),a("v-icon",{staticClass:"ml-3",domProps:{textContent:t._s(t.isEditing?"mdi-pencil-off-outline":"mdi-pencil")}})],1)],1),a("v-row",[a("v-col",{attrs:{cols:"12",md:"3"}},[a("v-text-field",{attrs:{rules:t.rules.nome,disabled:!t.isEditing,label:"Nome Completo"},model:{value:t.user.nome,callback:function(e){t.$set(t.user,"nome",e)},expression:"user.nome"}})],1),a("v-col",{attrs:{cols:"12",md:"3"}},[a("v-text-field",{directives:[{name:"mask",rawName:"v-mask",value:"##/##/####",expression:"'##/##/####'"}],attrs:{rules:t.rules.dataNascimento,disabled:!t.isEditing,label:"Data de Nascimento","append-icon":"mdi-calendar"},model:{value:t.dataNascimentoNaoFormatada,callback:function(e){t.dataNascimentoNaoFormatada=e},expression:"dataNascimentoNaoFormatada"}})],1),a("v-col",{attrs:{cols:"12",md:"3"}},[a("v-select",{attrs:{rules:t.rules.genero,items:t.genero,disabled:!t.isEditing,label:"Gênero"},model:{value:t.user.genero,callback:function(e){t.$set(t.user,"genero",e)},expression:"user.genero"}})],1),a("v-col",{attrs:{cols:"12",md:"3"}},[a("v-text-field",{attrs:{label:"CPF",disabled:""},model:{value:t.user.cpf,callback:function(e){t.$set(t.user,"cpf",e)},expression:"user.cpf"}})],1)],1),a("v-row",[a("v-col",{attrs:{cols:"12",md:"3"}},[a("v-autocomplete",{attrs:{items:t.siglasUniversidades,rules:t.rules.campoObrigatorio,disabled:!t.isEditing,label:"Universidade"},model:{value:t.user.universidade,callback:function(e){t.$set(t.user,"universidade",e)},expression:"user.universidade"}})],1),a("v-col",{attrs:{cols:"12",md:"3"}},[a("v-text-field",{attrs:{rules:t.rules.semestreAtual,disabled:!t.isEditing,label:"Semestre Atual"},model:{value:t.user.semestreAtual,callback:function(e){t.$set(t.user,"semestreAtual",t._n(e))},expression:"user.semestreAtual"}})],1),a("v-col",{attrs:{cols:"12",md:"3"}},[a("v-text-field",{attrs:{disabled:!t.isEditing,label:"Nível Lecionamento"},model:{value:t.user.cursoLicensiatura,callback:function(e){t.$set(t.user,"cursoLicensiatura",e)},expression:"user.cursoLicensiatura"}})],1)],1),a("v-card-title",{staticClass:"px-0 pb-0 pt-2 grey--text text--darken-1"},[t._v("Dados de Usuário")]),a("v-row",[a("v-col",{attrs:{cols:"12",md:"3"}},[a("v-text-field",{attrs:{disabled:!t.isEditing,label:"E-mail"},model:{value:t.user.email,callback:function(e){t.$set(t.user,"email",e)},expression:"user.email"}})],1),a("v-col",{attrs:{cols:"12",md:"3"}},[a("v-text-field",{attrs:{disabled:!t.isEditing,label:"Celular"},model:{value:t.user.celular,callback:function(e){t.$set(t.user,"celular",e)},expression:"user.celular"}})],1)],1),a("v-card-actions",{staticClass:"pa-0"},[a("v-btn",{staticClass:"mr-4 white--text",attrs:{disabled:!t.isEditing,color:"red"},on:{click:function(e){t.dialogDesativacaoConta=!0}}},[a("span",[t._v("Desativar Conta")])]),a("v-btn",{staticClass:"white--text",attrs:{disabled:!t.isEditing,color:"primary"},on:{click:function(e){t.dialogAlterarSenha=!0}}},[a("span",[t._v("Alterar Senha")])]),a("v-spacer"),t.isEditing?a("v-btn",{attrs:{disabled:!t.canSubmit||t.isSavingUsuario,loading:t.isSavingUsuario,color:"success"},on:{click:t.updateUsuario}},[a("span",[t._v("Concluir Edição")])]):t._e()],1),a("DialogDesativacaoConta",{model:{value:t.dialogDesativacaoConta,callback:function(e){t.dialogDesativacaoConta=e},expression:"dialogDesativacaoConta"}}),a("DialogAlterarSenha",{model:{value:t.dialogAlterarSenha,callback:function(e){t.dialogAlterarSenha=e},expression:"dialogAlterarSenha"}})],1)},m=[],f=a("5530"),p=(a("d3b7"),a("3ca3"),a("ddb0"),a("ac1f"),a("00b4"),a("d71e")),h=a("1a74"),g=a("d257"),C=function(){return a.e("chunk-82269e38").then(a.bind(null,"3d2c"))},x=function(){return a.e("chunk-2d0d3bf9").then(a.bind(null,"5da5"))},O=function(t){Object(n["a"])(a,t);var e=Object(c["a"])(a);function a(){var t;return Object(r["a"])(this,a),t=e.apply(this,arguments),t.authModule=Object(d["e"])(u["a"],t.$store),t.canSubmit=!0,t.tab=0,t.siglasUniversidades=h["a"],t.userCopy=Object(f["a"])({},t.authModule.user),t.isSavingUsuario=!1,t.dialogAlterarSenha=!1,t.dialogDesativacaoConta=!1,t.dataNascimentoNaoFormatada=Object(g["d"])(t.user.dataNascimento),t.genero=[{text:"Masculino",value:"M"},{text:"Feminino",value:"F"}],t.rules={nome:[function(t){return!!t||"Nome é obrigatório"},function(t){return!!t&&t.length>=6||"Nome deve ter no minimo 6 caracteres"},function(t){return!!t&&t.length<=60||"Nome deve ter no máximo 60 caracteres"}],email:[function(t){return!!t||"E-mail é obrigatório"},function(t){return!!t&&/.+@.+/.test(t)||"E-mail inválido"}],dataNascimento:[function(t){return!!t||"Data de nascimento é obrigatório"},function(t){return t?Object(p["a"])(t)||"Data inválida":"Campo Obrigatório"}],genero:[function(t){return!!t||"Gênero é obrigatório"}],celular:[function(t){return!!t||"Celular é obrigatório"},function(t){return!!t&&t.length>=14||"Número inválido"}],semestreAtual:[function(t){return!!t&&t>=1&&t<=16||"Número inválido"}]},t}return Object(o["a"])(a,[{key:"onDataNascimentoChange",value:function(t){this.user.dataNascimento=10===(null===t||void 0===t?void 0:t.length)?Object(g["a"])(t):""}},{key:"canEditUser",get:function(){return this.tab>0}},{key:"user",get:function(){return this.isEditing?this.userCopy:this.authModule.user}},{key:"toggleEditMode",value:function(){this.userCopy=Object(f["a"])({},this.authModule.user),this.isEditing=!this.isEditing}},{key:"updateUsuario",value:function(){var t=this;this.isSavingUsuario=!0,this.authModule.updateUser({id:this.user._id,user:this.user}).then((function(){t.$emit("finished-editing"),t.$toasted.success("Dados atualizados",{theme:"toasted-primary",position:"top-left",duration:3e3})})).finally((function(){t.isSavingUsuario=!1,t.isEditing=!1}))}}]),a}(b["d"]);Object(l["a"])([Object(b["b"])({type:Boolean,required:!0})],O.prototype,"isEditing",void 0),Object(l["a"])([Object(b["e"])("dataNascimentoNaoFormatada")],O.prototype,"onDataNascimentoChange",null),O=Object(l["a"])([Object(b["a"])({name:"TabDadosUsuarioTutor",components:{DialogDesativacaoConta:C,DialogAlterarSenha:x}})],O);var U=O,F=U,k=(a("a6d8"),a("2877")),j=Object(k["a"])(F,v,m,!1,null,"22365f84",null),y=j.exports,_=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-row",{attrs:{"no-gutters":"",align:"center"}},[a("v-col",{staticClass:"mx-auto",attrs:{cols:"12",md:"10",lg:"8"}},[a("v-card",{staticClass:"mb-2"},[a("v-card-title",{staticClass:"font-weight-bold pb-2 grey--text text--darken-2"},[a("v-icon",{attrs:{left:""}},[t._v("mdi-account-details")]),t._v(" Minhas Habilidades ")],1),a("v-divider",{staticClass:"my-2"}),a("div",{staticClass:"pa-4"},[a("span",{staticClass:"grey--text text--darken-1 subtitle-1"},[t._v(" Suas habilidades são utilizadas para que professores te encontrem com mais facilidade, selecione as que você mais possui afinidade ")])]),t.isLoading?[a("v-row",{staticClass:"text-center",attrs:{align:"center",justify:"center"}},[a("v-col",{staticClass:"my-8"},[a("v-progress-circular",{staticClass:"mr-2",attrs:{indeterminate:"",color:"grey"}})],1)],1)]:t.failedToLoad?[a("v-row",{staticClass:"text-center",attrs:{align:"center",justify:"center"}},[a("v-col",{staticClass:"my-8"},[a("v-card-title",{staticClass:"mx-auto"},[t._v("Erro ao carregar habilidades")])],1)],1)]:[a("v-chip-group",{staticClass:"px-4 mb-4",attrs:{column:"",multiple:""}},[a("div",{staticClass:"my-auto mr-6"},[a("span",{staticClass:"subtitle grey--text text--darken-2 mr-3"},[t._v("Habilidades Selecionadas:")]),a("span",{class:["subtitle","font-weight-bold"],domProps:{textContent:t._s(t.habilidadesUsuario.length)}}),a("span",[t._v(" de ")]),a("span",{staticClass:"subtitle font-weight-bold"},[t._v(t._s(t.getHabilidadesLength()))])]),t._l(t.habilidadesUsuario,(function(e){return a("v-chip",{key:e._id,attrs:{outlined:"",close:""},on:{"click:close":function(a){return t.removeHabilidade(e)}}},[a("span",{domProps:{textContent:t._s(e.nome)}})])}))],2),a("v-divider"),a("v-tabs",{attrs:{color:Object.values(t.props)[t.currentTab].cor,centered:"","icons-and-text":"","fixed-tabs":""},model:{value:t.currentTab,callback:function(e){t.currentTab=e},expression:"currentTab"}},t._l(t.categoriasHabilidades,(function(e){return a("v-tab",{key:e.nome},[a("span",{domProps:{textContent:t._s(e.nome)}}),a("v-icon",{domProps:{textContent:t._s(e.icon)}})],1)})),1),a("v-tabs-items",{model:{value:t.currentTab,callback:function(e){t.currentTab=e},expression:"currentTab"}},t._l(t.categoriasHabilidades,(function(e,i){return a("v-tab-item",{key:i,staticClass:"pa-4"},t._l(e.habilidades,(function(e){return a("v-chip",{key:e.nome,staticClass:"ma-2",attrs:{"active-class":"primary--text","input-value":t.isSelected(e),filter:"",outlined:""},on:{click:function(a){t.isSelected(e)?t.removeHabilidade(e):t.addHabilidade(e)}}},[a("span",{domProps:{textContent:t._s(e.nome)}})])})),1)})),1)]],2)],1)],1)},A=[],T=a("2909"),E=a("ade3"),S=(a("d81d"),a("c740"),a("6062"),a("4de4"),a("a434"),a("b47e")),N=a("ed54"),M=a("2ef0"),D=function(t){Object(n["a"])(a,t);var e=Object(c["a"])(a);function a(){var t,i;return Object(r["a"])(this,a),i=e.apply(this,arguments),i.habilidadesModule=Object(d["e"])(S["b"],i.$store),i.authModule=Object(d["e"])(u["a"],i.$store),i.currentTab=0,i.isLoading=!1,i.failedToLoad=!1,i.props=(t={},Object(E["a"])(t,S["a"].GOOGLE,{cor:"blue",icon:"mdi-google"}),Object(E["a"])(t,S["a"].EDUCACAO,{cor:"green",icon:"mdi-school"}),Object(E["a"])(t,S["a"].COMUNICACAO,{cor:"orange",icon:"mdi-account-voice"}),Object(E["a"])(t,S["a"].ORGANIZACAO,{cor:"deep-orange",icon:"mdi-clipboard-check-outline"}),Object(E["a"])(t,S["a"].PROGRAMACAO,{cor:"deep-purple",icon:"mdi-desktop-tower-monitor"}),Object(E["a"])(t,S["a"].EDICAO_DE_VIDEO,{cor:"blue",icon:"mdi-video-outline"}),Object(E["a"])(t,S["a"].CRIACAO_CONTEUDO,{cor:"green",icon:"mdi-trello"}),t),i}return Object(o["a"])(a,[{key:"habilidadesUsuario",get:function(){var t=this.authModule.user;if(!t||!Object(N["c"])(t))return[];var e=[];return this.categoriasHabilidades.map((function(a){a.habilidades.map((function(a){var i=-1!==t.habilidades.findIndex((function(t){return t===a._id}));i&&e.push(a)}))})),e}},{key:"categoriasHabilidades",get:function(){var t=this,e=[],a=Object(T["a"])(new Set(this.habilidadesModule.asArray.map((function(t){return t.categoria}))));return a.map((function(a){var i=t.props[a],s=i.cor,r=i.icon,o=t.habilidadesModule.asArray.filter((function(t){return t.categoria===a}));e.push({cor:s,icon:r,nome:a,habilidades:o})})),e}},{key:"usuarioTutor",get:function(){return Object(N["a"])(this.authModule.user)}},{key:"addHabilidade",value:function(t){var e=Object(M["cloneDeep"])(this.usuarioTutor);e.habilidades.push(t._id),this.authModule.updateUser({id:this.usuarioTutor._id,user:e})}},{key:"removeHabilidade",value:function(t){if(0!==this.usuarioTutor.habilidades.length){var e=Object(M["cloneDeep"])(this.usuarioTutor),a=e.habilidades.indexOf(t._id);e.habilidades.splice(a,1),this.authModule.updateUser({id:this.usuarioTutor._id,user:e})}}},{key:"isSelected",value:function(t){return-1!==this.habilidadesUsuario.indexOf(t)}},{key:"getHabilidadesLength",value:function(){for(var t=0,e=0;e<7;e++)null!=this.categoriasHabilidades[e]&&(t+=this.categoriasHabilidades[e].habilidades.length);return t}},{key:"mounted",value:function(){var t=this;this.habilidadesModule.meta.allFetched||(this.isLoading=!0,this.habilidadesModule.fetchAll().catch((function(){t.failedToLoad=!0})).finally((function(){t.isLoading=!1})))}}]),a}(b["d"]);D=Object(l["a"])([Object(b["a"])({name:"TabSelecaoHabilidades"})],D);var P=D,w=P,$=Object(k["a"])(w,_,A,!1,null,null,null),I=$.exports,L=function(t){Object(n["a"])(a,t);var e=Object(c["a"])(a);function a(){var t;return Object(r["a"])(this,a),t=e.apply(this,arguments),t.authModule=Object(d["e"])(u["a"],t.$store),t.tab=0,t.isEditing=!1,t}return Object(o["a"])(a,[{key:"canEditUser",get:function(){return 2===Number(this.tab)}}]),a}(b["d"]);L=Object(l["a"])([Object(b["a"])({name:"PagePerfilUsuarioTutor",components:{TabDadosUsuarioTutor:y,TabSelecaoHabilidades:I}})],L);var R=L,H=R,B=(a("9d5a"),Object(k["a"])(H,i,s,!1,null,"7ca8f200",null));e["default"]=B.exports},9129:function(t,e,a){var i=a("23e7");i({target:"Number",stat:!0},{isNaN:function(t){return t!=t}})},"91c6":function(t,e,a){},"9d5a":function(t,e,a){"use strict";a("0599")},a6d8:function(t,e,a){"use strict";a("7906")},cd03:function(t,e,a){t.exports=a.p+"img/taylor.2dad0fe3.jpg"},cedd:function(t,e,a){},d6ee:function(t,e,a){"use strict";a("43df")},d71e:function(t,e,a){"use strict";var i=a("5530");a("ac1f"),a("1276"),a("a9e3"),a("9129"),a("99af");e["a"]=function(t,e){if(!t)return"Campo Obrigatório";var a={separator:"/",minYear:null,maxYear:null},s=Object(i["a"])(Object(i["a"])({},a),e),r=s.minYear,o=s.separator,n=s.maxYear,c=t.split(o),l=c[0],u=c[1],d=c[2];return r&&Number(d)<r?"Ano deve ser superior a ".concat(r):n&&Number(d)>n?"Ano deve ser inferior a ".concat(n):!Number.isNaN(Date.parse("".concat(u,"/").concat(l,"/").concat(d)))||"Data inválida"}},fd72:function(t,e,a){"use strict";a.r(e);var i,s,r,o,n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-row",{attrs:{"no-gutters":"",align:"center",justify:"center"}},[i("v-col",{attrs:{cols:"12",md:"10",lg:"8"}},[t.failedToLoadTutor?i("v-row",[i("v-col",{attrs:{cols:"12"}},[i("v-card-title",{staticClass:"display-2 grey--text mx-auto",staticStyle:{"max-width":"550px"}},[t._v(" Erro ao carregar tutor. ")])],1)],1):t.isCarregandoTutor?i("v-progress-linear",{staticClass:"mt-12",attrs:{color:"deep-purple accent-4",indeterminate:"",rounded:"",height:"6"}}):t.tutor?i("v-card",[i("v-row",{attrs:{"no-gutters":""}},[i("v-col",{attrs:{cols:"3"}},[i("div",{staticClass:"profileAndBackButton"},[i("v-btn",{staticClass:"backButton",attrs:{color:"primary",text:""},on:{click:function(e){return t.$router.push({path:"/home"})}}},[i("v-icon",[t._v("mdi-arrow-left")])],1),i("v-avatar",{staticClass:"mt-8 mx-auto",attrs:{size:"150px"}},[i("v-img",{attrs:{src:t.tutor.fotoPerfil,"lazy-src":a("cd03")}})],1)],1),i("v-card-text",{staticClass:"text-center h4 display-1",domProps:{textContent:t._s(t.tutor.nome)}}),i("v-divider"),i("v-card-text",{staticClass:"pb-0"},[i("span",{staticClass:"subtitle2 d-block"},[t._v("Curso")]),i("span",{staticClass:"h5",domProps:{textContent:t._s(t.tutor.cursoLicensiatura)}})]),i("v-card-text",[i("span",{staticClass:"subtitle2 d-block"},[t._v("Universidade")]),i("span",{staticClass:"h5",domProps:{textContent:t._s(t.tutor.universidade)}})]),t.authModule.user&&!t.authModule.user.isMonitor?i("v-card-actions"):t._e()],1),i("v-col",{staticStyle:{"border-left":"1px solid #e3e3e3","min-height":"300px"},attrs:{cols:"9"}},[[i("div",[i("ferramentas-tutor")],1),i("div",[i("disponibilidade-tutor")],1),i("div",{staticClass:"btn"},[i("v-btn",{staticClass:"ma-2 btnTextWhite",attrs:{color:"#106CE5"}},[t._v(" Solicitar tutoria ")])],1)]],2)],1)],1):t._e()],1),t.tutor?i("ModalAgendarTutoria",{attrs:{tutor:t.tutor},model:{value:t.showModalAgendarTutoria,callback:function(e){t.showModalAgendarTutoria=e},expression:"showModalAgendarTutoria"}}):t._e()],1)},c=[],l=a("d4ec"),u=a("bee2"),d=a("262e"),b=a("2caf"),v=(a("d3b7"),a("3ca3"),a("ddb0"),a("9ab4")),m=a("6fc5"),f=a("1b40"),p=a("ed54"),h=a("b47e"),g=a("cdd0"),C=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tools"},[a("div",{staticClass:"iconAndTitle"},[a("div",{staticClass:"icon"},[a("v-icon",[t._v(" mdi-tools")])],1),t._v(" Ferramentas ")]),a("v-chip-group",{attrs:{"active-class":"primary--text","show-arrows":""}},t._l(t.tags,(function(e){return a("v-chip",{key:e},[t._v(" "+t._s(e)+" ")])})),1)],1)},x=[],O=(i=Object(f["a"])({name:"FerramentasTutor"}),i(s=function(t){Object(d["a"])(a,t);var e=Object(b["a"])(a);function a(){return Object(l["a"])(this,a),e.apply(this,arguments)}return Object(u["a"])(a,[{key:"data",value:function(){return{tags:["Work","Home Improvement","Vacation","Food","Drawers","Shopping","Art","Tech","Creative Writing"]}}}]),a}(f["d"]))||s),U=O,F=(a("4723"),a("2877")),k=Object(F["a"])(U,C,x,!1,null,null,null),j=k.exports,y=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tools"},[a("div",{staticClass:"iconAndTitle"},[a("div",{staticClass:"icon"},[a("v-icon",[t._v(" mdi-clock")])],1),t._v(" Disponibilidade ")]),a("div",{staticClass:"datePicker"},[a("v-menu",{ref:"menu",attrs:{"close-on-content-click":!1,"return-value":t.date,transition:"scale-transition","offset-y":"","min-width":"auto"},on:{"update:returnValue":function(e){t.date=e},"update:return-value":function(e){t.date=e}},scopedSlots:t._u([{key:"activator",fn:function(e){var i=e.on,s=e.attrs;return[a("v-text-field",t._g(t._b({attrs:{label:"Selecione a data desejada:","prepend-icon":"mdi-calendar",readonly:"",outlined:""},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}},"v-text-field",s,!1),i))]}}])},[a("v-date-picker",{attrs:{"no-title":"",scrollable:""},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}},[a("v-spacer"),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(e){t.menu=!1}}},[t._v(" Cancelar ")]),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(e){return t.$refs.menu.save(t.date)}}},[t._v(" OK ")])],1)],1)],1),a("v-chip-group",{attrs:{"active-class":"primary--text","show-arrows":""}},t._l(t.tags,(function(e){return a("v-chip",{key:e},[t._v(" "+t._s(e)+" ")])})),1)],1)},_=[],A=(r=Object(f["a"])({name:"DisponibilidadeTutor",components:{}}),r(o=function(t){Object(d["a"])(a,t);var e=Object(b["a"])(a);function a(){return Object(l["a"])(this,a),e.apply(this,arguments)}return Object(u["a"])(a,[{key:"data",value:function(){return{tags:["10h00 às 11h00","11h00 às 12h00","12h00 às 13h00","13h00 às 14h00","14h00 às 15h00","15h00 às 16h00","1600 às 17h00","17h00 às 18h00"],date:new Date(Date.now()-6e4*(new Date).getTimezoneOffset()).toISOString().substr(0,10)}}}]),a}(f["d"]))||o),T=A,E=(a("0dce"),Object(F["a"])(T,y,_,!1,null,null,null)),S=E.exports,N=function(){return a.e("chunk-684068ec").then(a.bind(null,"3488"))},M=function(){return a.e("chunk-7dddb238").then(a.bind(null,"2601"))},D=function(t){Object(d["a"])(a,t);var e=Object(b["a"])(a);function a(){var t;return Object(l["a"])(this,a),t=e.apply(this,arguments),t.habilidadesModule=Object(m["e"])(h["b"],t.$store),t.tutorModule=Object(m["e"])(p["b"],t.$store),t.authModule=Object(m["e"])(g["a"],t.$store),t.isCarregandoTutor=!1,t.failedToLoadTutor=!1,t.showModalAgendarTutoria=!1,t.habilidadesChipColors=["red","green","purple","orange","indigo"],t}return Object(u["a"])(a,[{key:"tutor",get:function(){return this.tutorModule.byId[this.idTutorEmExibicao]}},{key:"idTutorEmExibicao",get:function(){return this.$route.params["id"]}},{key:"mounted",value:function(){var t=this;this.habilidadesModule.fetchAll({forceRefetch:!1});var e=Object(p["c"])(this.tutorModule.byId[this.idTutorEmExibicao]);e||(this.isCarregandoTutor=!0,this.tutorModule.getById(this.idTutorEmExibicao).then((function(){return t.isCarregandoTutor=!0})).catch((function(){return t.failedToLoadTutor=!0})).finally((function(){return t.isCarregandoTutor=!1})))}}]),a}(f["d"]);D=Object(v["a"])([Object(f["a"])({name:"PagePerfilTutor",components:{ModalAgendarTutoria:M,ListaExibicaoHorarios:N,FerramentasTutor:j,DisponibilidadeTutor:S}})],D);var P=D,w=P,$=(a("d6ee"),Object(F["a"])(w,n,c,!1,null,null,null));e["default"]=$.exports}}]);
//# sourceMappingURL=PagePerfilTutor.1fca7cc9.js.map