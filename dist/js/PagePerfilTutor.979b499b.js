(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["PagePerfilTutor"],{"0599":function(e,t,a){},"0dce":function(e,t,a){"use strict";a("cedd")},"1a74":function(e,t,a){"use strict";t["a"]=["UTFPR","UNIVASF","UNIRIO","UNIR","UNIPAMPA","UNILAB","UNILA","UNIFESSPA","UNIFESP","UNIFEI","UNIFAP","UNIFAL-MG","UnB","UFVJM","UFV","UFU","UFTM","UFT","UFSM","UFSJ","UFSCar","UFSC","UFSB","UFS","UFRRJ","UFRR","UFRPE","UFRN","UFRJ","UFRGS","UFRB","UFRA","UFR","UFPR","UFPI","UFPel","UFPE","UFPB","UFPA","UFOPA","UFOP","UFOB","UFNT","UFMT","UFMS","UFMG","UFMA","UFLA","UFJF","UFJ","UFGD","UFG","UFFS","UFF","UFES","UFERSA","UFDPar","UFCSPA","UFCG","UFCat","UFCA","UFC","UFBA","UFAPE","UFAM","UFAL","UFAC","UFABC","FURG"]},"43df":function(e,t,a){},4723:function(e,t,a){"use strict";a("91c6")},"48d2":function(e,t,a){},8767:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"tableContainer"},[a("v-tabs",{staticClass:"tabBar",model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[a("v-tab",[e._v("Meu Perfil")]),a("v-tab",[e._v("Habilidades")])],1),a("v-tabs-items",{model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[a("v-tab-item",[a("TabDadosUsuarioTutor",{attrs:{isEditing:e.isEditing}})],1),a("v-tab-item",[a("TabSelecaoHabilidades")],1)],1)],1)},o=[],r=a("d4ec"),s=a("bee2"),n=a("262e"),c=a("2caf"),l=(a("a9e3"),a("9ab4")),d=a("cdd0"),u=a("6fc5"),b=a("1b40"),v=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-form",{staticClass:"px-6 pb-6 pt-2",model:{value:e.canSubmit,callback:function(t){e.canSubmit=t},expression:"canSubmit"}},[a("v-row",[a("v-card-title",{staticClass:"pa-0 grey--text text--darken-1"},[e._v("Dados Pessoais")]),a("v-spacer"),a("v-btn",{attrs:{color:e.isEditing?"red":"grey","x-large":"",text:""},on:{click:function(t){e.isEditing=!e.isEditing}}},[a("span",{domProps:{textContent:e._s(e.isEditing?"Cancelar":"Editar")}}),a("v-icon",{staticClass:"ml-3",domProps:{textContent:e._s(e.isEditing?"mdi-pencil-off-outline":"mdi-pencil")}})],1)],1),a("v-row",[a("v-col",{attrs:{cols:"12",md:"3"}},[a("v-text-field",{attrs:{rules:e.rules.nome,disabled:!e.isEditing,label:"Nome Completo"},model:{value:e.user.nome,callback:function(t){e.$set(e.user,"nome",t)},expression:"user.nome"}})],1),a("v-col",{attrs:{cols:"12",md:"3"}},[a("v-text-field",{directives:[{name:"mask",rawName:"v-mask",value:"##/##/####",expression:"'##/##/####'"}],attrs:{rules:e.rules.dataNascimento,disabled:!e.isEditing,label:"Data de Nascimento","append-icon":"mdi-calendar"},model:{value:e.dataNascimentoNaoFormatada,callback:function(t){e.dataNascimentoNaoFormatada=t},expression:"dataNascimentoNaoFormatada"}})],1),a("v-col",{attrs:{cols:"12",md:"3"}},[a("v-select",{attrs:{rules:e.rules.genero,items:e.genero,disabled:!e.isEditing,label:"Gênero"},model:{value:e.user.genero,callback:function(t){e.$set(e.user,"genero",t)},expression:"user.genero"}})],1),a("v-col",{attrs:{cols:"12",md:"3"}},[a("v-text-field",{attrs:{label:"CPF",disabled:""},model:{value:e.user.cpf,callback:function(t){e.$set(e.user,"cpf",t)},expression:"user.cpf"}})],1)],1),a("v-row",[a("v-col",{attrs:{cols:"12",md:"3"}},[a("v-autocomplete",{attrs:{items:e.siglasUniversidades,rules:e.rules.campoObrigatorio,disabled:!e.isEditing,label:"Universidade"},model:{value:e.user.universidade,callback:function(t){e.$set(e.user,"universidade",t)},expression:"user.universidade"}})],1),a("v-col",{attrs:{cols:"12",md:"3"}},[a("v-text-field",{attrs:{rules:e.rules.semestreAtual,disabled:!e.isEditing,label:"Semestre Atual"},model:{value:e.user.semestreAtual,callback:function(t){e.$set(e.user,"semestreAtual",e._n(t))},expression:"user.semestreAtual"}})],1),a("v-col",{attrs:{cols:"12",md:"3"}},[a("v-text-field",{attrs:{disabled:!e.isEditing,label:"Nível Lecionamento"},model:{value:e.user.cursoLicensiatura,callback:function(t){e.$set(e.user,"cursoLicensiatura",t)},expression:"user.cursoLicensiatura"}})],1)],1),a("v-card-title",{staticClass:"px-0 pb-0 pt-2 grey--text text--darken-1"},[e._v("Dados de Usuário")]),a("v-row",[a("v-col",{attrs:{cols:"12",md:"3"}},[a("v-text-field",{attrs:{disabled:!e.isEditing,label:"E-mail"},model:{value:e.user.email,callback:function(t){e.$set(e.user,"email",t)},expression:"user.email"}})],1),a("v-col",{attrs:{cols:"12",md:"3"}},[a("v-text-field",{attrs:{disabled:!e.isEditing,label:"Celular"},model:{value:e.user.celular,callback:function(t){e.$set(e.user,"celular",t)},expression:"user.celular"}})],1)],1),a("v-card-actions",{staticClass:"pa-0"},[a("v-btn",{staticClass:"mr-4 white--text",attrs:{disabled:!e.isEditing,color:"red"},on:{click:function(t){e.dialogDesativacaoConta=!0}}},[a("span",[e._v("Desativar Conta")])]),a("v-btn",{staticClass:"white--text",attrs:{disabled:!e.isEditing,color:"primary"},on:{click:function(t){e.dialogAlterarSenha=!0}}},[a("span",[e._v("Alterar Senha")])]),a("v-spacer"),e.isEditing?a("v-btn",{attrs:{disabled:!e.canSubmit||e.isSavingUsuario,loading:e.isSavingUsuario,color:"success"},on:{click:e.updateUsuario}},[a("span",[e._v("Concluir Edição")])]):e._e()],1),a("DialogDesativacaoConta",{model:{value:e.dialogDesativacaoConta,callback:function(t){e.dialogDesativacaoConta=t},expression:"dialogDesativacaoConta"}}),a("DialogAlterarSenha",{on:{"update-modal-senha":function(t){e.dialogAlterarSenha=t}},model:{value:e.dialogAlterarSenha,callback:function(t){e.dialogAlterarSenha=t},expression:"dialogAlterarSenha"}})],1)},m=[],h=a("5530"),f=(a("d3b7"),a("3ca3"),a("ddb0"),a("ac1f"),a("00b4"),a("d71e")),p=a("1a74"),g=a("d257"),O=function(){return a.e("chunk-82269e38").then(a.bind(null,"3d2c"))},C=function(){return a.e("chunk-2d0d3bf9").then(a.bind(null,"5da5"))},x=function(e){Object(n["a"])(a,e);var t=Object(c["a"])(a);function a(){var e;return Object(r["a"])(this,a),e=t.apply(this,arguments),e.authModule=Object(u["e"])(d["a"],e.$store),e.canSubmit=!0,e.tab=0,e.siglasUniversidades=p["a"],e.userCopy=Object(h["a"])({},e.authModule.user),e.isSavingUsuario=!1,e.dialogAlterarSenha=!1,e.dialogDesativacaoConta=!1,e.dataNascimentoNaoFormatada=Object(g["d"])(e.user.dataNascimento),e.genero=[{text:"Masculino",value:"M"},{text:"Feminino",value:"F"}],e.rules={nome:[function(e){return!!e||"Nome é obrigatório"},function(e){return!!e&&e.length>=6||"Nome deve ter no minimo 6 caracteres"},function(e){return!!e&&e.length<=60||"Nome deve ter no máximo 60 caracteres"}],email:[function(e){return!!e||"E-mail é obrigatório"},function(e){return!!e&&/.+@.+/.test(e)||"E-mail inválido"}],dataNascimento:[function(e){return!!e||"Data de nascimento é obrigatório"},function(e){return e?Object(f["a"])(e)||"Data inválida":"Campo Obrigatório"}],genero:[function(e){return!!e||"Gênero é obrigatório"}],celular:[function(e){return!!e||"Celular é obrigatório"},function(e){return!!e&&e.length>=14||"Número inválido"}],semestreAtual:[function(e){return!!e&&e>=1&&e<=16||"Número inválido"}]},e}return Object(s["a"])(a,[{key:"onDataNascimentoChange",value:function(e){this.user.dataNascimento=10===(null===e||void 0===e?void 0:e.length)?Object(g["a"])(e):""}},{key:"canEditUser",get:function(){return this.tab>0}},{key:"user",get:function(){return this.isEditing?this.userCopy:this.authModule.user}},{key:"toggleEditMode",value:function(){this.userCopy=Object(h["a"])({},this.authModule.user),this.isEditing=!this.isEditing}},{key:"updateUsuario",value:function(){var e=this;this.isSavingUsuario=!0,this.authModule.updateUser({id:this.user._id,user:this.user}).then((function(){e.$emit("finished-editing"),e.$toasted.success("Dados atualizados",{theme:"toasted-primary",position:"top-left",duration:3e3})})).finally((function(){e.isSavingUsuario=!1,e.isEditing=!1}))}}]),a}(b["d"]);Object(l["a"])([Object(b["b"])({type:Boolean,required:!0})],x.prototype,"isEditing",void 0),Object(l["a"])([Object(b["e"])("dataNascimentoNaoFormatada")],x.prototype,"onDataNascimentoChange",null),x=Object(l["a"])([Object(b["a"])({name:"TabDadosUsuarioTutor",components:{DialogDesativacaoConta:O,DialogAlterarSenha:C}})],x);var y=x,U=y,k=(a("b9af"),a("2877")),j=Object(k["a"])(U,v,m,!1,null,"072f895e",null),F=j.exports,_=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-row",{attrs:{"no-gutters":"",align:"center"}},[a("v-col",{staticClass:"mx-auto",attrs:{cols:"12",md:"10",lg:"8"}},[a("v-card",{staticClass:"mb-2"},[a("v-card-title",{staticClass:"font-weight-bold pb-2 grey--text text--darken-2"},[a("v-icon",{attrs:{left:""}},[e._v("mdi-account-details")]),e._v(" Minhas Habilidades ")],1),a("v-divider",{staticClass:"my-2"}),a("div",{staticClass:"pa-4"},[a("span",{staticClass:"grey--text text--darken-1 subtitle-1"},[e._v(" Suas habilidades são utilizadas para que professores te encontrem com mais facilidade, selecione as que você mais possui afinidade ")])]),e.isLoading?[a("v-row",{staticClass:"text-center",attrs:{align:"center",justify:"center"}},[a("v-col",{staticClass:"my-8"},[a("v-progress-circular",{staticClass:"mr-2",attrs:{indeterminate:"",color:"grey"}})],1)],1)]:e.failedToLoad?[a("v-row",{staticClass:"text-center",attrs:{align:"center",justify:"center"}},[a("v-col",{staticClass:"my-8"},[a("v-card-title",{staticClass:"mx-auto"},[e._v("Erro ao carregar habilidades")])],1)],1)]:[a("v-chip-group",{staticClass:"px-4 mb-4",attrs:{column:"",multiple:""}},[a("div",{staticClass:"my-auto mr-6"},[a("span",{staticClass:"subtitle grey--text text--darken-2 mr-3"},[e._v("Habilidades Selecionadas:")]),a("span",{class:["subtitle","font-weight-bold"],domProps:{textContent:e._s(e.habilidadesUsuario.length)}}),a("span",[e._v(" de ")]),a("span",{staticClass:"subtitle font-weight-bold"},[e._v(e._s(e.getHabilidadesLength()))])]),e._l(e.habilidadesUsuario,(function(t){return a("v-chip",{key:t._id,attrs:{outlined:"",close:""},on:{"click:close":function(a){return e.removeHabilidade(t)}}},[a("span",{domProps:{textContent:e._s(t.nome)}})])}))],2),a("v-divider"),a("v-tabs",{attrs:{color:Object.values(e.props)[e.currentTab].cor,centered:"","icons-and-text":"","fixed-tabs":""},model:{value:e.currentTab,callback:function(t){e.currentTab=t},expression:"currentTab"}},e._l(e.categoriasHabilidades,(function(t){return a("v-tab",{key:t.nome},[a("span",{domProps:{textContent:e._s(t.nome)}}),a("v-icon",{domProps:{textContent:e._s(t.icon)}})],1)})),1),a("v-tabs-items",{model:{value:e.currentTab,callback:function(t){e.currentTab=t},expression:"currentTab"}},e._l(e.categoriasHabilidades,(function(t,i){return a("v-tab-item",{key:i,staticClass:"pa-4"},e._l(t.habilidades,(function(t){return a("v-chip",{key:t.nome,staticClass:"ma-2",attrs:{"active-class":"primary--text","input-value":e.isSelected(t),filter:"",outlined:""},on:{click:function(a){e.isSelected(t)?e.removeHabilidade(t):e.addHabilidade(t)}}},[a("span",{domProps:{textContent:e._s(t.nome)}})])})),1)})),1)]],2)],1)],1)},A=[],S=a("2909"),T=a("ade3"),E=(a("d81d"),a("c740"),a("6062"),a("4de4"),a("a434"),a("b47e")),M=a("ed54"),D=a("2ef0"),N=function(e){Object(n["a"])(a,e);var t=Object(c["a"])(a);function a(){var e,i;return Object(r["a"])(this,a),i=t.apply(this,arguments),i.habilidadesModule=Object(u["e"])(E["b"],i.$store),i.authModule=Object(u["e"])(d["a"],i.$store),i.currentTab=0,i.isLoading=!1,i.failedToLoad=!1,i.props=(e={},Object(T["a"])(e,E["a"].GOOGLE,{cor:"blue",icon:"mdi-google"}),Object(T["a"])(e,E["a"].EDUCACAO,{cor:"green",icon:"mdi-school"}),Object(T["a"])(e,E["a"].COMUNICACAO,{cor:"orange",icon:"mdi-account-voice"}),Object(T["a"])(e,E["a"].ORGANIZACAO,{cor:"deep-orange",icon:"mdi-clipboard-check-outline"}),Object(T["a"])(e,E["a"].PROGRAMACAO,{cor:"deep-purple",icon:"mdi-desktop-tower-monitor"}),Object(T["a"])(e,E["a"].EDICAO_DE_VIDEO,{cor:"blue",icon:"mdi-video-outline"}),Object(T["a"])(e,E["a"].CRIACAO_CONTEUDO,{cor:"green",icon:"mdi-trello"}),e),i}return Object(s["a"])(a,[{key:"habilidadesUsuario",get:function(){var e=this.authModule.user;if(!e||!Object(M["c"])(e))return[];var t=[];return this.categoriasHabilidades.map((function(a){a.habilidades.map((function(a){var i=-1!==e.habilidades.findIndex((function(e){return e===a._id}));i&&t.push(a)}))})),t}},{key:"categoriasHabilidades",get:function(){var e=this,t=[],a=Object(S["a"])(new Set(this.habilidadesModule.asArray.map((function(e){return e.categoria}))));return a.map((function(a){var i=e.props[a],o=i.cor,r=i.icon,s=e.habilidadesModule.asArray.filter((function(e){return e.categoria===a}));t.push({cor:o,icon:r,nome:a,habilidades:s})})),t}},{key:"usuarioTutor",get:function(){return Object(M["a"])(this.authModule.user)}},{key:"addHabilidade",value:function(e){var t=Object(D["cloneDeep"])(this.usuarioTutor);console.log("dadosUpdate",t),t.habilidades.push(e._id),this.authModule.updateUser({id:this.usuarioTutor._id,user:t})}},{key:"removeHabilidade",value:function(e){if(0!==this.usuarioTutor.habilidades.length){var t=Object(D["cloneDeep"])(this.usuarioTutor),a=t.habilidades.indexOf(e._id);t.habilidades.splice(a,1),this.authModule.updateUser({id:this.usuarioTutor._id,user:t})}}},{key:"isSelected",value:function(e){return-1!==this.habilidadesUsuario.indexOf(e)}},{key:"getHabilidadesLength",value:function(){for(var e=0,t=0;t<7;t++)null!=this.categoriasHabilidades[t]&&(e+=this.categoriasHabilidades[t].habilidades.length);return e}},{key:"mounted",value:function(){var e=this;this.habilidadesModule.meta.allFetched||(this.isLoading=!0,this.habilidadesModule.fetchAll().catch((function(){e.failedToLoad=!0})).finally((function(){e.isLoading=!1})))}}]),a}(b["d"]);N=Object(l["a"])([Object(b["a"])({name:"TabSelecaoHabilidades"})],N);var w=N,P=w,H=Object(k["a"])(P,_,A,!1,null,null,null),$=H.exports,I=function(e){Object(n["a"])(a,e);var t=Object(c["a"])(a);function a(){var e;return Object(r["a"])(this,a),e=t.apply(this,arguments),e.authModule=Object(u["e"])(d["a"],e.$store),e.tab=0,e.isEditing=!1,e}return Object(s["a"])(a,[{key:"canEditUser",get:function(){return 2===Number(this.tab)}}]),a}(b["d"]);I=Object(l["a"])([Object(b["a"])({name:"PagePerfilUsuarioTutor",components:{TabDadosUsuarioTutor:F,TabSelecaoHabilidades:$}})],I);var R=I,L=R,B=(a("9d5a"),Object(k["a"])(L,i,o,!1,null,"7ca8f200",null));t["default"]=B.exports},9129:function(e,t,a){var i=a("23e7");i({target:"Number",stat:!0},{isNaN:function(e){return e!=e}})},"91c6":function(e,t,a){},"9d5a":function(e,t,a){"use strict";a("0599")},b9af:function(e,t,a){"use strict";a("48d2")},cd03:function(e,t,a){e.exports=a.p+"img/taylor.2dad0fe3.jpg"},cedd:function(e,t,a){},d6ee:function(e,t,a){"use strict";a("43df")},d71e:function(e,t,a){"use strict";var i=a("5530");a("ac1f"),a("1276"),a("a9e3"),a("9129"),a("99af");t["a"]=function(e,t){if(!e)return"Campo Obrigatório";var a={separator:"/",minYear:null,maxYear:null},o=Object(i["a"])(Object(i["a"])({},a),t),r=o.minYear,s=o.separator,n=o.maxYear,c=e.split(s),l=c[0],d=c[1],u=c[2];return r&&Number(u)<r?"Ano deve ser superior a ".concat(r):n&&Number(u)>n?"Ano deve ser inferior a ".concat(n):!Number.isNaN(Date.parse("".concat(d,"/").concat(l,"/").concat(u)))||"Data inválida"}},fd72:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-row",{attrs:{"no-gutters":"",align:"center",justify:"center"}},[i("v-col",{attrs:{cols:"12",md:"10",lg:"8"}},[e.failedToLoadTutor?i("v-row",[i("v-col",{attrs:{cols:"12"}},[i("v-card-title",{staticClass:"display-2 grey--text mx-auto",staticStyle:{"max-width":"550px"}},[e._v(" Erro ao carregar tutor. ")])],1)],1):e.isCarregandoTutor?i("v-progress-linear",{staticClass:"mt-12",attrs:{color:"deep-purple accent-4",indeterminate:"",rounded:"",height:"6"}}):e.tutor?i("v-card",[i("v-row",{attrs:{"no-gutters":""}},[i("v-col",{attrs:{cols:"3"}},[i("div",{staticClass:"profileAndBackButton"},[i("v-btn",{staticClass:"backButton",attrs:{color:"primary",text:""},on:{click:function(t){return e.$router.push({path:"/home"})}}},[i("v-icon",[e._v("mdi-arrow-left")]),e._v("Voltar ")],1),i("v-avatar",{staticClass:"mt-8 mx-auto",attrs:{size:"150px"}},[i("v-img",{attrs:{src:e.tutor.fotoPerfil,"lazy-src":a("cd03")}})],1)],1),i("v-card-text",{staticClass:"text-center h4 display-1",domProps:{textContent:e._s(e.tutor.nome)}}),i("v-divider"),i("v-card-text",{staticClass:"pb-0"},[i("span",{staticClass:"subtitle2 d-block"},[e._v("Curso")]),i("span",{staticClass:"h5",domProps:{textContent:e._s(e.tutor.cursoLicensiatura)}})]),i("v-card-text",[i("span",{staticClass:"subtitle2 d-block"},[e._v("Universidade")]),i("span",{staticClass:"h5",domProps:{textContent:e._s(e.tutor.universidade)}})]),e.authModule.user&&!e.authModule.user.isMonitor?i("v-card-actions"):e._e()],1),i("v-col",{staticStyle:{"border-left":"1px solid #e3e3e3","min-height":"300px"},attrs:{cols:"9"}},[[i("div",[i("FerramentasTutor",{attrs:{habilidades:e.habilidadesTutorAtual,habilidadeEscolhida:e.habilidadeSelected},on:{"update-habilidades-selected":function(t){e.habilidadeSelected=t}}})],1),i("div",[i("DisponibilidadeTutor",{attrs:{tutorAtual:e.tutor,horaEscolhida:e.hourSelected,dataEscolhida:e.dateSelected},on:{"update-hora-selected":function(t){e.hourSelected=t},"update-date-selected":function(t){e.dateSelected=t}}})],1),i("div",[i("v-textarea",{staticClass:"ma-6",attrs:{rows:"1",counter:"500",placeholder:"Caso deseje enviar uma mensagem com o pedido digite aqui!"},model:{value:e.mensagemPedido,callback:function(t){e.mensagemPedido=t},expression:"mensagemPedido"}})],1),i("div",{staticClass:"btn"},[i("v-btn",{staticClass:"ma-2 btnTextWhite",attrs:{color:"#106CE5"},on:{click:function(t){e.imprime(),e.solicitarTutoria()}}},[e._v(" Solicitar tutoria ")])],1)]],2)],1)],1):e._e()],1),e.tutor?i("ModalAgendarTutoria",{attrs:{tutor:e.tutor},model:{value:e.showModalAgendarTutoria,callback:function(t){e.showModalAgendarTutoria=t},expression:"showModalAgendarTutoria"}}):e._e()],1)},o=[],r=a("1da1"),s=a("d4ec"),n=a("bee2"),c=a("262e"),l=a("2caf"),d=(a("96cf"),a("d3b7"),a("3ca3"),a("ddb0"),a("d81d"),a("9ab4")),u=a("6fc5"),b=a("1b40"),v=a("ed54"),m=a("b47e"),h=a("cdd0"),f=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"tools"},[a("div",{staticClass:"iconAndTitle"},[a("div",{staticClass:"icon"},[a("v-icon",[e._v(" mdi-tools")])],1),e._v(" Ferramentas ")]),e.habilidades.length>0?a("v-chip-group",{attrs:{"active-class":"primary--text","show-arrows":""}},e._l(e.habilidades,(function(t){return a("v-chip",{directives:[{name:"show",rawName:"v-show",value:!0,expression:"true"}],key:t,on:{click:function(a){return e.updateHabilidadeSelected(t)}}},[e._v(" "+e._s(t)+" ")])})),1):a("p",[e._v("Infelizmente esse tutor não informou suas habilidades")])],1)},p=[],g=function(e){Object(c["a"])(a,e);var t=Object(l["a"])(a);function a(){return Object(s["a"])(this,a),t.apply(this,arguments)}return Object(n["a"])(a,[{key:"updateHabilidadeSelected",value:function(e){this.$emit("update-habilidades-selected",e)}},{key:"data",value:function(){return{tags:["Work","Home Improvement","Vacation","Food","Drawers","Shopping","Art","Tech","Creative Writing"]}}}]),a}(b["d"]);Object(d["a"])([Object(b["b"])({required:!0})],g.prototype,"habilidades",void 0),Object(d["a"])([Object(b["b"])({required:!0})],g.prototype,"habilidadeEscolhida",void 0),g=Object(d["a"])([Object(b["a"])({name:"FerramentasTutor"})],g);var O=g,C=O,x=(a("4723"),a("2877")),y=Object(x["a"])(C,f,p,!1,null,null,null),U=y.exports,k=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"tools"},[a("div",{staticClass:"iconAndTitle"},[a("div",{staticClass:"icon"},[a("v-icon",[e._v(" mdi-clock")])],1),e._v(" Disponibilidade ")]),a("div",{staticClass:"datePicker"},[a("v-menu",{ref:"menu",attrs:{"close-on-content-click":!1,"return-value":e.date,transition:"scale-transition","offset-y":"","min-width":"auto"},on:{"update:returnValue":function(t){e.date=t},"update:return-value":function(t){e.date=t}},scopedSlots:e._u([{key:"activator",fn:function(t){var i=t.on,o=t.attrs;return[a("v-text-field",e._g(e._b({attrs:{label:"Selecione a data desejada:","prepend-icon":"mdi-calendar",readonly:""},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}},"v-text-field",o,!1),i))]}}]),model:{value:e.menu,callback:function(t){e.menu=t},expression:"menu"}},[a("v-date-picker",{attrs:{locale:"pt-BR","no-title":"",scrollable:""},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}},[a("v-spacer"),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(t){e.menu=!1}}},[e._v(" Cancelar ")]),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(t){e.$refs.menu.save(e.date),e.getWeekdayFromDate(e.date),e.updateDateSelected(e.date),e.menu=!1}}},[e._v(" OK ")])],1)],1)],1),this.horariosArr.length>0?a("v-chip-group",{attrs:{"center-active":"","show-arrows":"","active-class":"primary--text"}},e._l(this.horariosArr,(function(t){return a("v-chip",{key:t,on:{click:function(a){return e.updateHoraSelected(t)}}},[e._v(" "+e._s(t)+" ")])})),1):a("p",[e._v("Infelizmente o tutor não possui horários disponíveis nessa data, por favor, escolha outra data acima.")])],1)},j=[],F=(a("99af"),function(e){Object(c["a"])(a,e);var t=Object(l["a"])(a);function a(){var e;return Object(s["a"])(this,a),e=t.apply(this,arguments),e.horariosArr=[],e.menu=!1,e.date=new Date(Date.now()-6e4*(new Date).getTimezoneOffset()).toISOString().substr(0,10),e}return Object(n["a"])(a,[{key:"tutorHorariosByWeekday",value:function(e){if(this.tutorAtual&&this.tutorAtual.agenda&&e){if("sabado"===e||"domingo"==e)return;var t=this.tutorAtual.agenda[e].map((function(e){return"".concat(e.inicio," às ").concat(e.fim)}));this.horariosArr=t}}},{key:"data",value:function(){return{tags:["1100 às 1900","2100 às 2200","2200 às 2300","13h00 às 14h00"],date:new Date(Date.now()-6e4*(new Date).getTimezoneOffset()).toISOString().substr(0,10)}}},{key:"getWeekdayFromDate",value:function(e){var t="",a=new Date(e),i=a.getDay();0==i&&(t="segunda"),1==i&&(t="terca"),2==i&&(t="quarta"),3==i&&(t="quinta"),4==i&&(t="sexta"),5==i&&(t="sabado"),6==i&&(t="domingo"),this.tutorHorariosByWeekday(t)}},{key:"updateHoraSelected",value:function(e){this.$emit("update-hora-selected",e)}},{key:"updateDateSelected",value:function(e){console.log("data",e),this.date="2021-02-04",this.$emit("update-date-selected",e)}},{key:"mounted",value:function(){this.tutorHorariosByWeekday("quinta")}}]),a}(b["d"]));Object(d["a"])([Object(b["b"])({required:!0})],F.prototype,"tutorAtual",void 0),Object(d["a"])([Object(b["b"])({required:!0})],F.prototype,"horaEscolhida",void 0),Object(d["a"])([Object(b["b"])({required:!0})],F.prototype,"dataEscolhida",void 0),F=Object(d["a"])([Object(b["a"])({name:"DisponibilidadeTutor",components:{}})],F);var _=F,A=_,S=(a("0dce"),Object(x["a"])(A,k,j,!1,null,null,null)),T=S.exports,E=a("a3a5"),M=function(){return a.e("chunk-684068ec").then(a.bind(null,"3488"))},D=function(){return a.e("chunk-7dddb238").then(a.bind(null,"2601"))},N=function(e){Object(c["a"])(a,e);var t=Object(l["a"])(a);function a(){var e;return Object(s["a"])(this,a),e=t.apply(this,arguments),e.habilidadesModule=Object(u["e"])(m["b"],e.$store),e.tutorModule=Object(u["e"])(v["b"],e.$store),e.authModule=Object(u["e"])(h["a"],e.$store),e.tutoriaModule=Object(u["e"])(E["a"],e.$store),e.isCarregandoTutor=!1,e.failedToLoadTutor=!1,e.showModalAgendarTutoria=!1,e.habilidadesChipColors=["red","green","purple","orange","indigo"],e.habilidadesTutorAtual=[],e.habilidadeSelected="",e.hourSelected="",e.dateSelected="",e.mensagemPedido="",e}return Object(n["a"])(a,[{key:"tutor",get:function(){return this.tutorModule.byId[this.idTutorEmExibicao]}},{key:"idTutorEmExibicao",get:function(){return this.$route.params["id"]}},{key:"getHabilidades",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.tutorModule.habilidadesTutor(this.idTutorEmExibicao);case 2:t=e.sent,this.habilidadesTutorAtual=t.map((function(e){return e.nome}));case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"imprime",value:function(){console.log(this.habilidadeSelected),console.log(this.hourSelected),console.log(this.dateSelected)}},{key:"solicitarTutoria",value:function(){var e,t=this;this.authModule.user&&(this.tutor&&this.tutoriaModule.solicitarTutoria({tutorId:this.tutor._id,professorId:null===(e=this.authModule.user)||void 0===e?void 0:e._id,tutoringDate:this.dateSelected,tutoringHour:this.hourSelected,requestMessage:this.mensagemPedido,tutoringTopic:this.habilidadeSelected}).then((function(){t.$toasted.success("Solicitação registrada",{theme:"toasted-primary",position:"top-right",duration:5e3}),t.$emit("input",!1)})))}},{key:"mounted",value:function(){var e=this,t=Object(v["c"])(this.tutorModule.byId[this.idTutorEmExibicao]);if(t)return this.habilidadesModule.fetchAll({forceRefetch:!1}).then((function(){e.getHabilidades()})),void console.log("a",this.tutor);this.isCarregandoTutor=!0,this.tutorModule.getById(this.idTutorEmExibicao).then((function(){return e.isCarregandoTutor=!0})).catch((function(){return e.failedToLoadTutor=!0})).finally((function(){e.habilidadesModule.fetchAll({forceRefetch:!1}).then((function(){e.getHabilidades()})),console.log(e.tutor),e.isCarregandoTutor=!1}))}}]),a}(b["d"]);N=Object(d["a"])([Object(b["a"])({name:"PagePerfilTutor",components:{ModalAgendarTutoria:D,ListaExibicaoHorarios:M,FerramentasTutor:U,DisponibilidadeTutor:T}})],N);var w=N,P=w,H=(a("d6ee"),Object(x["a"])(P,i,o,!1,null,null,null));t["default"]=H.exports}}]);
//# sourceMappingURL=PagePerfilTutor.979b499b.js.map