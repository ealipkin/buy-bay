(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-48179983"],{"0879":function(t,e,a){"use strict";var i=a("3ea7"),r=a.n(i);r.a},"0f34":function(t,e,a){},"0f7b":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("modal",{attrs:{name:"confirmation-modal",adaptive:!0,classes:"address-modal",width:"90%",minWidth:290,maxWidth:t.maxWidth,height:"auto",scrollable:!0},on:{closed:t.modalClose}},[a("article",{staticClass:"modal"},[a("h4",{staticClass:"modal__title"},[t._v(t._s(t.title))]),a("button",{staticClass:"modal__close close",attrs:{type:"button"},on:{click:t.handleCancel}}),a("div",{staticClass:"modal__content"},[a("div",{staticClass:"modal__text modal__text--warning",domProps:{innerHTML:t._s(t.text)}}),a("div",{staticClass:"modal__buttons"},[a("button",{staticClass:"button button--secondary",attrs:{type:"button"},on:{click:t.handleConfirm}},[t._v(t._s(t.confirmText))]),a("button",{staticClass:"button",attrs:{type:"button"},on:{click:t.handleCancel}},[t._v(t._s(t.cancelText))])])])])])},r=[],o=a("d4ec"),s=a("bee2"),n=a("262e"),c=a("2caf"),l=a("9ab4"),d=a("1b40"),u=function(t){Object(n["a"])(a,t);var e=Object(c["a"])(a);function a(){return Object(o["a"])(this,a),e.apply(this,arguments)}return Object(s["a"])(a,[{key:"showModal",value:function(t){this.$modal.show("confirmation-modal")}},{key:"modalClose",value:function(){this.$modal.hide("confirmation-modal"),document.body.classList.remove("_hidden")}},{key:"handleConfirm",value:function(){this.$emit("confirm"),this.modalClose()}},{key:"handleCancel",value:function(){this.$emit("cancel"),this.modalClose()}}]),a}(d["d"]);Object(l["a"])([Object(d["c"])({default:"Вы уверены?"})],u.prototype,"title",void 0),Object(l["a"])([Object(d["c"])({default:"Данное действие нельзя отменить"})],u.prototype,"text",void 0),Object(l["a"])([Object(d["c"])({default:"Подтвердить"})],u.prototype,"confirmText",void 0),Object(l["a"])([Object(d["c"])({default:"Отменить"})],u.prototype,"cancelText",void 0),Object(l["a"])([Object(d["c"])({default:390})],u.prototype,"maxWidth",void 0),u=Object(l["a"])([d["a"]],u);var p=u,f=p,_=(a("2874"),a("2877")),b=Object(_["a"])(f,i,r,!1,null,"1a41294c",null);e["a"]=b.exports},"13af":function(t,e,a){"use strict";var i=a("6601"),r=a.n(i);r.a},2874:function(t,e,a){"use strict";var i=a("9ea8"),r=a.n(i);r.a},"299a":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"delivery-info"},[a("div",{staticClass:"delivery-info__title content-title"},[t._v(t._s(t.deliveryItem.title))]),a("div",{staticClass:"delivery-info__content"},[a("div",{staticClass:"delivery-info__icon"},[a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 21 14"}},[a("path",{attrs:{d:"M20.372 7.324v-.01a.457.457 0 00-.46-.45h-.12l-1.865-3.605a.456.456 0 00-.409-.247l-3.183-.001.122-.963a1.328 1.328 0 00-.335-1.023c-.25-.274-.6-.425-.984-.425h-9.88a.488.488 0 00-.483.44l-.099.793h5.63c.365 0 .653.296.644.662a.684.684 0 01-.68.662H6.393l.001.002H.88a.484.484 0 00-.48.468.453.453 0 00.456.468h7.3a.688.688 0 01.582.7.733.733 0 01-.722.71H2.984a.487.487 0 00-.485.472.458.458 0 00.46.473h4.973a.686.686 0 01.593.701.732.732 0 01-.728.71H1.612a.488.488 0 00-.485.472.46.46 0 00.46.473h.415L1.84 10.5a1.32 1.32 0 00.335 1.023c.25.274.6.425.983.425h.357a2.063 2.063 0 002.041 1.708 2.2 2.2 0 002.13-1.707h4.454c.36 0 .7-.138.968-.364.245.235.569.364.923.364h.073a2.062 2.062 0 002.04 1.707 2.2 2.2 0 002.13-1.707h.295c.765 0 1.445-.623 1.514-1.388l.288-3.191v-.013l.002-.02v-.012zM5.581 12.71c-.652 0-1.168-.53-1.151-1.181a1.221 1.221 0 011.213-1.182c.651 0 1.167.53 1.15 1.182a1.22 1.22 0 01-1.212 1.181zm10.588 0c-.651 0-1.168-.53-1.15-1.181a1.22 1.22 0 011.212-1.182c.652 0 1.168.53 1.151 1.182a1.221 1.221 0 01-1.213 1.181zm2.972-2.21a.57.57 0 01-.548.503h-.318a2.06 2.06 0 00-2.02-1.601c-.99 0-1.844.682-2.102 1.601h-.098a.402.402 0 01-.302-.127.41.41 0 01-.1-.315l.597-6.604h1.369l-.217 2.404a1.32 1.32 0 00.335 1.023c.25.275.6.426.983.426h2.664l-.243 2.69z",fill:"#000","fill-rule":"nonzero",opacity:".9"}})])]),a("div",{staticClass:"delivery-info__info"},[a("div",{staticClass:"delivery-info__refund-title"},[a("span",[t._v(t._s(t._f("dateFormat")(new Date(t.deliveryItem.from),"DD MMMM YYYY")))]),a("span",[t._v(" — ")]),a("span",[t._v(t._s(t._f("dateFormat")(new Date(t.deliveryItem.to),"DD MMMM YYYY")))])]),a("div",{staticClass:"delivery-info__text"},[t._v("Вернем деньги в спортных случаях")])])])])},r=[],o=a("d4ec"),s=a("262e"),n=a("2caf"),c=a("9ab4"),l=a("1b40"),d=function(t){Object(s["a"])(a,t);var e=Object(n["a"])(a);function a(){return Object(o["a"])(this,a),e.apply(this,arguments)}return a}(l["d"]);Object(c["a"])([Object(l["c"])()],d.prototype,"deliveryItem",void 0),d=Object(c["a"])([Object(l["a"])({})],d);var u=d,p=u,f=(a("f0d5"),a("2877")),_=Object(f["a"])(p,i,r,!1,null,"1c0d6f10",null);e["a"]=_.exports},"3ea7":function(t,e,a){},"5dfa":function(t,e,a){},"5e96":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"group-detail profile-page"},[a("div",{staticClass:"container"},[a("div",{staticClass:"order-detail__breadcrumbs"},[a("Breadcrumbs",{attrs:{links:t.breadCrumbs}})],1),a("h1",{staticClass:"group-detail__title"},[t._v("Группа на покупку "),t.product?a("router-link",{staticClass:"group-detail__title-link",attrs:{to:"/product/"+t.product.id}},[t._v(t._s(t.product.title))]):t._e()],1),a("div",{staticClass:"group-detail__main"},[a("div",{staticClass:"group-detail__left-col"},[t.order?a("OrderInfo",{staticClass:"group-detail__product group-detail__item order-info--group",attrs:{item:t.order,"order-data":t.orderData,options:t.orderOptions,hideStatus:!0,hideTitle:!0}}):t._e(),t.orderData?a("GroupInfo",{staticClass:"group-detail__info group-detail__item",attrs:{orderData:t.orderData.orderInfo,group:t.orderData.group},on:{leave:t.handleLeaveGroup}}):t._e(),t.isMobile&&t.product?a("GroupAction",{staticClass:"group-detail__action group-detail__item",attrs:{product:t.product,group:t.orderData.group}}):t._e(),t.isMobile&&t.orderData?a("DeliveryInfo",{staticClass:"group-detail__delivery group-detail__item",attrs:{deliveryItem:t.orderData.delivery}}):t._e()],1),a("div",{staticClass:"group-detail__aside"},[!t.isMobile&&t.product?a("GroupAction",{staticClass:"group-detail__action group-detail__item",attrs:{selfPrice:t.product.selfPrice,product:t.product,group:t.orderData.group}}):t._e(),!t.isMobile&&t.orderData?a("DeliveryInfo",{staticClass:"group-detail__delivery group-detail__item",attrs:{deliveryItem:t.orderData.delivery}}):t._e()],1)]),t.similarItems&&t.similarItems.length?a("section",{staticClass:"group-detail__section"},[t._m(0),a("div",{staticClass:"container"},[a("SimilarSlider",{staticClass:"similar-slider--scroll",attrs:{items:t.similarItems}})],1)]):t._e(),t.seo?a("SeoBlock",{attrs:{block:t.seo}}):t._e()],1),a("ConfirmationModal",{ref:"confirmationModal",attrs:{maxWidth:500,cancelText:"Остаться",confirmText:"Выйти",text:t.confirmModalText},on:{confirm:t.leaveConfirm}})],1)},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"section-header section-header--offset-2"},[a("div",{staticClass:"section-title"},[t._v("Похожие товары")])])}],o=a("d4ec"),s=a("bee2"),n=a("262e"),c=a("2caf"),l=a("9ab4"),d=a("1b40"),u=a("299a"),p=a("9613"),f=a("5f3c"),_=a("b82e"),b=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"group-action"},[t.group.is_complete?[a("div",{staticClass:"group-action__ended"},[t._v("Время истекло")]),a("h2",{staticClass:"group-action__title"},[t._v("Купить вне группы")]),a("span",{staticClass:"group-action__price"},[t._v(t._s(t.divideNumberWithSpaces(t.product.selfPrice))+" ₽")]),a("router-link",{staticClass:"button button--big",attrs:{to:"/product/"+t.product.id}},[t._v("Купить одному")])]:a("Timer",{staticClass:"group-action__timer",attrs:{"left-time":t.shareTimer}})],2)},v=[],m=a("48b8"),h=a("84ac"),O=function(t){Object(n["a"])(a,t);var e=Object(c["a"])(a);function a(){var t;return Object(o["a"])(this,a),t=e.apply(this,arguments),t.divideNumberWithSpaces=function(t){return Object(m["c"])(t)},t}return Object(s["a"])(a,[{key:"shareTimer",get:function(){return this.group&&this.group.time}}]),a}(d["d"]);Object(l["a"])([Object(d["c"])()],O.prototype,"product",void 0),Object(l["a"])([Object(d["c"])()],O.prototype,"group",void 0),O=Object(l["a"])([Object(d["a"])({components:{Timer:h["a"]}})],O);var j=O,C=j,y=(a("d9f2"),a("2877")),g=Object(y["a"])(C,b,v,!1,null,"456a7782",null),k=g.exports,w=a("eb89"),x=a("1c71"),I=a("b6c6"),D=a("afbc"),M=a("36d3"),S=a("d70b"),T=a("0f7b"),$=function(t){Object(n["a"])(a,t);var e=Object(c["a"])(a);function a(){var t;return Object(o["a"])(this,a),t=e.apply(this,arguments),t.loaded=!1,t.orderId=null,t.orderData=null,t.seo=null,t.breadCrumbs=[{href:"/",label:"Главная"},{href:"/profile",label:"Мой профиль"},{href:"/profile/orders",label:"Мои заказы"}],t.window={width:0,height:0},t.groupId=null,t.similarItems=[],t}return Object(s["a"])(a,[{key:"handleResize",value:function(){this.window.width=window.innerWidth,this.window.height=window.innerHeight}},{key:"mounted",value:function(){var t=this;this.groupId=this.$route.params.id,this.isAuthorized&&this.groupId||D["a"].push({path:"/"}),window.addEventListener("resize",this.handleResize),this.handleResize(),this.getGroup().then((function(e){var a=e.data.data,i=a&&a.orderInfo,r=i&&i.orderItems[0].product;t.orderData=a,t.loaded=!0,t.breadCrumbs.push({href:"",label:r?"Группа на покупку ".concat(r.title):"",current:!0}),t.seo={meta_title:"Группа на покупку ".concat(r&&r.title||"")}})).catch((function(){D["a"].push({path:"/"})})),Object(M["a"])("get",S["d"].group.related(this.groupId)).then((function(e){t.similarItems=e.data.data}))}},{key:"getGroup",value:function(){return Object(M["a"])("GET",S["d"].group.get(this.groupId))}},{key:"destroyed",value:function(){window.removeEventListener("resize",this.handleResize)}},{key:"handleLeaveGroup",value:function(){this.openConfirmationModal()}},{key:"openConfirmationModal",value:function(){var t=this.$refs.confirmationModal;t.showModal()}},{key:"leaveConfirm",value:function(){return Object(M["a"])("GET",S["d"].group.leave(this.groupId)).then((function(){D["a"].push({path:"/"})}))}},{key:"isAuthorized",get:function(){return this.$auth.check()}},{key:"confirmModalText",get:function(){return this.product?"Не стоит упускать возможность сэкономить ".concat(this.product.selfPrice-this.product.groupPrice," ₽.<br>Если решите покинуть группу, мы вернём деньги в течение 14 дней."):""}},{key:"isMobile",get:function(){return this.window.width<p["d"].tablet}},{key:"isTablet",get:function(){return this.window.width>=p["d"].tablet&&this.window.width<p["d"].laptop}},{key:"product",get:function(){var t=this.orderData,e=t&&t.orderInfo;return e&&e.orderItems&&e.orderItems[0].product}},{key:"order",get:function(){var t=this.orderData,e=t&&t.orderInfo;return e&&e.orderItems&&e.orderItems[0].product}},{key:"orderOptions",get:function(){var t=this.orderData,e=t&&t.orderInfo;return e&&e.orderItems&&e.orderItems[0].orderProductOptions}}]),a}(d["d"]);$=Object(l["a"])([Object(d["a"])({components:{ConfirmationModal:T["a"],Breadcrumbs:I["a"],SeoBlock:x["a"],SimilarSlider:w["a"],DeliveryInfo:u["a"],OrderInfo:f["a"],GroupInfo:_["a"],GroupAction:k}})],$);var E=$,z=E,P=(a("e0d0"),Object(y["a"])(z,i,r,!1,null,"13d75442",null));e["default"]=P.exports},"5f3c":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.item?i("div",{staticClass:"order-info"},[i("router-link",{staticClass:"order-info__img",attrs:{to:"/product/"+t.item.id}},[i("img",{attrs:{src:t.item.images.preview}})]),i("div",{staticClass:"order-info__box"},[t.hideTitle?t._e():i("router-link",{staticClass:"order-info__title",attrs:{to:"/product/"+t.item.id}},[t._v(t._s(t.item.title))]),t.hideStatus?i("div",{staticClass:"order-info__date"},[t._v("Дата заказа: "+t._s(t._f("dateFormat")(t.item.orderDate||new Date(t.orderData.group.created_at),"DD.MM.YYYY")))]):t._e(),t.hideStatus?t._e():[i("span",{staticClass:"order-info__orders"},[i("img",{attrs:{src:a("2e0f")}}),i("span",[t._v("Заказов: "+t._s(t.divideNumberWithSpaces(this.item.orders)))])]),t.item.rate?i("Rate",{staticClass:"order-info__rate",attrs:{rate:t.item.rate}}):t._e()],t.type?t._e():[i("PickedOptionsBox",{staticClass:"order-info__picked-options",attrs:{options:t.options}}),i("span",{staticClass:"order-info__label"},[t._v("Групповая цена")]),i("span",{staticClass:"order-info__price"},[t._v(t._s(t.divideNumberWithSpaces(t.item.groupPrice))+" ₽")])]],2),"checkout"===t.type?[i("PickedOptionsBox",{staticClass:"order-info__picked-options",attrs:{options:t.options}}),i("span",{staticClass:"order-info__label"},[t._v("Итого к оплате")]),t.orderData&&t.orderData.order?i("span",{staticClass:"order-info__price"},[t._v(t._s(t.divideNumberWithSpaces(t.orderData.order.price))+" ₽")]):t._e()]:t._e(),i("PickedOptionsBox",{staticClass:"order-info__picked-options picked-options-box--group",attrs:{options:t.options}})],2):t._e()},r=[],o=a("d4ec"),s=a("262e"),n=a("2caf"),c=a("9ab4"),l=a("1b40"),d=a("48b8"),u=a("88d9"),p=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.options&&t.options.length?a("div",{staticClass:"picked-options-box"},t._l(t.options,(function(e){return a("p",{staticClass:"picked-options-box__item"},[a("span",{staticClass:"picked-options-box__title"},[t._v(t._s(e.property.title))]),a("span",{staticClass:"picked-options-box__label"},[t._v(t._s(e.propValue.title))])])})),0):t._e()},f=[],_=function(t){Object(s["a"])(a,t);var e=Object(n["a"])(a);function a(){return Object(o["a"])(this,a),e.apply(this,arguments)}return a}(l["d"]);Object(c["a"])([Object(l["c"])()],_.prototype,"options",void 0),_=Object(c["a"])([l["a"]],_);var b=_,v=b,m=(a("7818"),a("2877")),h=Object(m["a"])(v,p,f,!1,null,"85baaac2",null),O=h.exports,j=function(t){Object(s["a"])(a,t);var e=Object(n["a"])(a);function a(){var t;return Object(o["a"])(this,a),t=e.apply(this,arguments),t.divideNumberWithSpaces=function(t){return Object(d["c"])(t)},t}return a}(l["d"]);Object(c["a"])([Object(l["c"])()],j.prototype,"orderData",void 0),Object(c["a"])([Object(l["c"])()],j.prototype,"item",void 0),Object(c["a"])([Object(l["c"])()],j.prototype,"options",void 0),Object(c["a"])([Object(l["c"])()],j.prototype,"type",void 0),Object(c["a"])([Object(l["c"])()],j.prototype,"hideStatus",void 0),Object(c["a"])([Object(l["c"])()],j.prototype,"hideTitle",void 0),j=Object(c["a"])([Object(l["a"])({components:{Rate:u["a"],PickedOptionsBox:O}})],j);var C=j,y=C,g=(a("8770"),Object(m["a"])(y,i,r,!1,null,"f68f7248",null));e["a"]=g.exports},6601:function(t,e,a){},7818:function(t,e,a){"use strict";var i=a("aebf"),r=a.n(i);r.a},"840e":function(t,e,a){},"84ac":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"timer"},[a("span",{staticClass:"timer__text"},[t._v("Мы вернём деньги, если никто не присоединится к группе в течение 24 часов")]),a("vac",{staticClass:"timer__tick",attrs:{"end-time":t.time},scopedSlots:t._u([t.time?{key:"process",fn:function(e){var i=e.timeObj;return[a("span",[t._v(t._s(i.h+":"+i.m+":"+i.s))])]}}:null,{key:"finish",fn:function(){},proxy:!0}],null,!0)}),t.leftTime?a("vac",{staticClass:"timer__tick",attrs:{"left-time":t.leftTime},scopedSlots:t._u([{key:"process",fn:function(e){var i=e.timeObj;return[a("span",[t._v(t._s(i.h+":"+i.m+":"+i.s))])]}},{key:"finish",fn:function(){},proxy:!0}],null,!1,2756323523)}):t._e()],1)},r=[],o=a("d4ec"),s=a("262e"),n=a("2caf"),c=a("9ab4"),l=a("1b40"),d=function(t){Object(s["a"])(a,t);var e=Object(n["a"])(a);function a(){return Object(o["a"])(this,a),e.apply(this,arguments)}return a}(l["d"]);Object(c["a"])([Object(l["c"])()],d.prototype,"time",void 0),Object(c["a"])([Object(l["c"])()],d.prototype,"leftTime",void 0),d=Object(c["a"])([l["a"]],d);var u=d,p=u,f=(a("8b9a"),a("2877")),_=Object(f["a"])(p,i,r,!1,null,"1e13bb8d",null);e["a"]=_.exports},8770:function(t,e,a){"use strict";var i=a("5dfa"),r=a.n(i);r.a},"8b9a":function(t,e,a){"use strict";var i=a("0f34"),r=a.n(i);r.a},"9ea8":function(t,e,a){},aebf:function(t,e,a){},b6c6:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.links&&t.links.length?a("ul",{staticClass:"breadcrumbs"},t._l(t.links,(function(e){return a("li",{key:e.title,staticClass:"breadcrumbs__item"},[e.current?a("span",{staticClass:"breadcrumbs__link breadcrumbs__link--current"},[t._v(" "+t._s(e.title||e.label))]):a("router-link",{staticClass:"breadcrumbs__link",attrs:{to:e.link||e.href}},[t._v(" "+t._s(e.title||e.label))])],1)})),0):t._e()},r=[],o=a("d4ec"),s=a("262e"),n=a("2caf"),c=a("9ab4"),l=a("1b40"),d=function(t){Object(s["a"])(a,t);var e=Object(n["a"])(a);function a(){return Object(o["a"])(this,a),e.apply(this,arguments)}return a}(l["d"]);Object(c["a"])([Object(l["c"])()],d.prototype,"links",void 0),d=Object(c["a"])([Object(l["a"])({})],d);var u=d,p=u,f=(a("0879"),a("2877")),_=Object(f["a"])(p,i,r,!1,null,"ec762fe8",null);e["a"]=_.exports},b778:function(t,e,a){},bd73:function(t,e,a){},d9f2:function(t,e,a){"use strict";var i=a("b778"),r=a.n(i);r.a},e0d0:function(t,e,a){"use strict";var i=a("840e"),r=a.n(i);r.a},eb89:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Slick",{ref:"slick",staticClass:"similar-slider",attrs:{options:t.sliderSettings}},t._l(t.items,(function(t){return a("div",{key:t.id,staticClass:"similar-slider__wrapper"},[a("CatalogCardItem",{staticClass:"catalog-card--similar similar-slider__slide",attrs:{item:t}})],1)})),0)},r=[],o=a("d4ec"),s=a("262e"),n=a("2caf"),c=a("9ab4"),l=a("1b40"),d=a("7ecd"),u=a("5882"),p=function(t){Object(s["a"])(a,t);var e=Object(n["a"])(a);function a(){var t;return Object(o["a"])(this,a),t=e.apply(this,arguments),t.sliderSettings={mobileFirst:!0,arrows:!1,responsive:[{breakpoint:"300",settings:"unslick"},{breakpoint:"767",settings:{dots:!0,slidesToShow:5,slidesToScroll:5}},{breakpoint:"1296",settings:{arrows:!0,dots:!1,slidesToShow:5,slidesToScroll:5}}]},t}return a}(l["d"]);Object(c["a"])([Object(l["c"])()],p.prototype,"items",void 0),p=Object(c["a"])([Object(l["a"])({components:{CatalogCardItem:u["a"],Slick:d["a"]}})],p);var f=p,_=f,b=(a("13af"),a("2877")),v=Object(b["a"])(_,i,r,!1,null,"378329e0",null);e["a"]=v.exports},f0d5:function(t,e,a){"use strict";var i=a("bd73"),r=a.n(i);r.a}}]);
//# sourceMappingURL=chunk-48179983.4c5fc751.js.map