(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["PageLogin"],{"0b4e":function(t,e,a){t.exports=a.p+"img/Aluno_VideoAula.ac0ca698.svg"},"3bf5":function(t,e,a){},b2c5:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"page-container"},[s("AppBarCadastro"),s("v-container",{attrs:{"fill-height":""}},[s("v-row",{attrs:{align:"center",justify:"end"}},[s("v-col",{attrs:{cols:"4"}},[s("v-img",{attrs:{contain:"",src:a("0b4e"),alt:"img"}})],1),s("v-col",{attrs:{cols:"4"}},[s("h1",{staticClass:"display-1 mb-2 font-weight-bold"},[t._v("Abra sua sala de aula para")]),s("h1",{staticClass:"display-3 font-weight-bold"},[s("span",{staticClass:"green--text"},[t._v("I")]),s("span",{staticClass:"blue--text"},[t._v("N")]),s("span",{staticClass:"orange--text"},[t._v("O")]),s("span",{staticClass:"red--text"},[t._v("V")]),s("span",{staticClass:"green--text"},[t._v("A")]),s("span",{staticClass:"blue--text"},[t._v("R")])]),s("span",{staticClass:"subtitle-1 grey--text text--darken-1"},[t._v(" Junte-se a nós e encontre ajuda para implementação de tecnologias digitais na sua prática pedagógica. ")])]),s("v-col",{attrs:{cols:"4"}},[s("v-card",{staticClass:"pa-6 elevation-6",attrs:{width:"400"},on:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.canSendLoginRequest&&t.sendLoginRequest()}}},[s("h3",{staticClass:"my-5 text-center"},[t._v("Realizar Login")]),s("v-divider",{staticClass:"my-5"}),s("v-form",{ref:"loginForm",model:{value:t.isFormValid,callback:function(e){t.isFormValid=e},expression:"isFormValid"}},[s("v-text-field",{attrs:{outlined:"","append-icon":"mdi-account",placeholder:"Email",rules:t.emailRules,"error-messages":t.emailErrorMessages},on:{input:function(e){t.emailErrorMessages=[]}},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),s("v-text-field",{attrs:{outlined:"","append-icon":t.showSenha?"mdi-eye":"mdi-eye-off",type:t.showSenha?"text":"password",placeholder:"Senha",rules:t.passwordRules,"error-messages":t.passwordErrorMessages},on:{input:function(e){t.passwordErrorMessages=[]},"click:append":function(e){t.showSenha=!t.showSenha}},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),s("v-card-actions",{staticClass:"pa-0 mx-0 mt-0 mb-3 justify-center"},[s("v-btn",{staticClass:"white--text px-4 elevation-2",attrs:{disabled:!t.canSendLoginRequest||t.isWaitingResponse,loading:t.isWaitingResponse,color:"blue lighten-1"},on:{click:t.sendLoginRequest}},[s("span",[t._v("Realizar Login")])])],1),s("div",{staticClass:"text-center mt-5",on:{click:function(e){return t.$router.push({path:"/recuperar-senha"})}}},[s("span",{staticClass:"link"},[t._v("Esqueceu sua senha?")])])],1)],1)],1)],1)],1)},r=[],n=a("d4ec"),i=a("bee2"),o=a("262e"),c=a("2caf"),l=(a("ac1f"),a("00b4"),a("d3b7"),a("9ab4")),u=a("c5e8"),p=a("1b40"),d=a("b528"),h=a("6fc5"),f=a("93bf"),g=a("cdd0"),m=function(t){Object(o["a"])(a,t);var e=Object(c["a"])(a);function a(){var t;return Object(n["a"])(this,a),t=e.apply(this,arguments),t.authModule=Object(h["e"])(g["a"],t.$store),t.email="",t.password="",t.showSenha=!1,t.isFormValid=!1,t.emailErrorMessages=[],t.passwordErrorMessages=[],t.loginAttempts=0,t.isWaitingResponse=!1,t.emailRules=[function(t){return!!t||"E-mail é obrigatório"},function(t){return/.+@.+/.test(t||"")||"E-mail inválido"}],t.passwordRules=[function(t){return!!t||"Senha é obrigatória"},function(t){return!!t&&t.length>=6||"Senha deve ter no mínimo 6 caracteres"}],t}return Object(i["a"])(a,[{key:"canSendLoginRequest",value:function(){return this.isFormValid||0===this.loginAttempts}},{key:"sendLoginRequest",value:function(){var t=this,e=f["a"].INVALID_PASSWORD,a=f["a"].EMAIL_NAO_ENCONTRADO;this._loginFormRef.validate(),this.isFormValid&&(this.loginAttempts++,this.isWaitingResponse=!0,this.emailErrorMessages=[],this.passwordErrorMessages=[],this.authModule.login({email:this.email,password:this.password}).then((function(){return t.$router.push(d["b"].HOME)})).catch((function(s){var r=-1!==t.passwordErrorMessages.indexOf(e),n=-1!==t.emailErrorMessages.indexOf(a);s!==e||r||t.passwordErrorMessages.push(e),s!==a||n||t.emailErrorMessages.push(a)})).finally((function(){t.isWaitingResponse=!1})))}}]),a}(p["d"]);Object(l["a"])([Object(p["c"])("loginForm")],m.prototype,"_loginFormRef",void 0),m=Object(l["a"])([Object(p["a"])({name:"PageLogin",components:{AppBarCadastro:u["a"]}})],m);var v=m,b=v,w=(a("fac6"),a("2877")),x=Object(w["a"])(b,s,r,!1,null,"af11d69a",null);e["default"]=x.exports},c5e8:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-app-bar",{attrs:{height:"50px",flat:"",color:"#f8f8f8"}},[s("a",{attrs:{href:"/login"}},[s("v-img",{attrs:{src:a("2528"),"max-height":"130","max-width":"130",contain:""}})],1),s("v-spacer"),["/cadastro/professor"!==t.$route.path?s("v-btn",{staticClass:"font-weight-bold",class:{"mr-4":"/cadastro/professor"===t.$route.path||"/login"===t.$route.path},attrs:{color:"#4285F4",text:""},on:{click:function(e){return t.$router.push({path:"/cadastro/professor"})}}},[s("span",[t._v("Preciso de Tutoria")])]):t._e(),"/cadastro/tutor"!==t.$route.path?s("v-btn",{staticClass:"font-weight-bold",attrs:{color:"#4285F4",text:""},on:{click:function(e){return t.$router.push({path:"/cadastro/tutor"})}}},[s("span",[t._v("Quero Ser Tutor")])]):t._e()]],2)},r=[],n=a("d4ec"),i=a("262e"),o=a("2caf"),c=a("9ab4"),l=a("1b40"),u=function(t){Object(i["a"])(a,t);var e=Object(o["a"])(a);function a(){return Object(n["a"])(this,a),e.apply(this,arguments)}return a}(l["d"]);u=Object(c["a"])([Object(l["a"])({name:"AppBarCadastro"})],u);var p=u,d=p,h=a("2877"),f=Object(h["a"])(d,s,r,!1,null,null,null);e["a"]=f.exports},fac6:function(t,e,a){"use strict";a("3bf5")}}]);
//# sourceMappingURL=PageLogin.9a23d185.js.map