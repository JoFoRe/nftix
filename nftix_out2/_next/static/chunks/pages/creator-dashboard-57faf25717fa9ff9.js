(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[371],{19123:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/creator-dashboard",function(){return n(40722)}])},40722:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return v}});var s=n(34051),r=n.n(s),i=n(85893),a=n(60715),c=n(77294),d=n(35553),o=n(67294),l=n(9669),f=n.n(l),u=(n(42484),n(31838)),x=n(8693),h=n(81615);function p(e,t,n,s,r,i,a){try{var c=e[i](a),d=c.value}catch(o){return void n(o)}c.done?t(d):Promise.resolve(d).then(s,r)}function m(e){return function(){var t=this,n=arguments;return new Promise((function(s,r){var i=e.apply(t,n);function a(e){p(i,s,r,a,c,"next",e)}function c(e){p(i,s,r,a,c,"throw",e)}a(void 0)}))}}function v(){var e=(0,o.useState)([]),t=e[0],n=e[1],s=(0,o.useState)([]),l=s[0],p=s[1],v=(0,o.useState)("not-loaded"),g=v[0],w=v[1];function j(){return b.apply(this,arguments)}function b(){return(b=m(r().mark((function e(){var t,s,i,o,l,v,g;return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new a.Q(window.ethereum,"any"),e.next=3,t.send("eth_requestAccounts",[]);case 3:return s=t.getSigner(),e.t0=console,e.next=7,s.getAddress();case 7:return e.t1=e.sent,e.t0.log.call(e.t0,"Account:",e.t1),i=new c.CH(u.A,x.Mt,s),o=new c.CH(u.k,h.Mt,t),e.next=13,i.fetchItemsCreated();case 13:return l=e.sent,e.next=16,Promise.all(l.map(function(){var e=m(r().mark((function e(t){var n,s,i,a;return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.tokenURI(t.tokenId);case 2:return n=e.sent,e.next=5,f().get(n);case 5:return s=e.sent,i=d.bM(t.price.toString(),"ether"),a={price:i,tokenId:t.tokenId.toNumber(),seller:t.seller,owner:t.owner,sold:t.sold,image:s.data.image,video:s.data.video,name:s.data.name,description:s.data.description},e.abrupt("return",a);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 16:v=e.sent,g=v.filter((function(e){return e.sold})),p(g),n(v),w("loaded");case 21:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function y(e){return N.apply(this,arguments)}function N(){return(N=m(r().mark((function e(t){var n,s,i,o,l;return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new a.Q(window.ethereum,"any"),e.next=3,n.send("eth_requestAccounts",[]);case 3:return s=n.getSigner(),e.t0=console,e.next=7,s.getAddress();case 7:return e.t1=e.sent,e.t0.log.call(e.t0,"Account:",e.t1),i=new c.CH(u.A,x.Mt,s),o=d.vz(t.price.toString(),"ether"),e.next=13,i.createMarketSale(u.k,t.itemId,{value:o});case 13:return l=e.sent,e.next=16,l.wait();case 16:j();case 17:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return(0,o.useEffect)((function(){j()}),[]),"loaded"!==g||t.length?(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{className:"flex m-8 p-2 rounded-xl bg-[#d6c8a027]",children:(0,i.jsxs)("div",{className:"px-5",children:[(0,i.jsx)("h2",{className:"flex justify-start py-2 text-xl mb-4 font-bold text-[#ffffff]",children:"Items Created"}),(0,i.jsx)("div",{className:"flex justify-center",children:(0,i.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4",children:t.map((function(e,t){return(0,i.jsxs)("div",{className:"bg-[#3e3f41] rounded-xl shadow overflow-hidden",style:{maxWidth:"250px"},children:[(0,i.jsx)("div",{className:"flex justify-content p-4",style:{height:"250px",width:"250px"},children:(0,i.jsx)("video",{poster:e.image,src:e.video,className:"rounded bg-[#00000046]",width:"350",type:"video/*, audio/*",autoPlay:!0,readystate:"true",loop:!0,muted:!0,controlsList:"nodownload"})}),(0,i.jsxs)("div",{className:"p-4 bg-[#3e3f41]",children:[(0,i.jsx)("p",{style:{height:"40px"},className:"text-[#ffffff] text-xl font-semibold",children:e.name}),(0,i.jsx)("div",{style:{height:"80px",overflow:"hidden"},children:(0,i.jsx)("p",{className:"text-white ",children:e.description})})]}),(0,i.jsxs)("div",{className:"p-4 bg-[#3e3f41]",children:[(0,i.jsxs)("p",{className:"text-xl mb-4 font-bold text-[#ffffff]",children:[e.price," Matic"]}),(0,i.jsx)("button",{className:"w-full bg-[#2952e3] text-[#ffffff] font-bold py-2 px-12 rounded cursor-pointer hover:bg-[#2546bd]",onClick:function(){return y(e)},children:"Buy"})]})]},t)}))})})]})}),(0,i.jsx)("div",{children:(0,i.jsx)("div",{className:"flex m-8 p-2 rounded-xl bg-[#4a5c7562]",children:(0,i.jsx)("div",{className:"px-5",children:Boolean(l.length)&&(0,i.jsxs)("div",{className:" jusitfy-center",children:[(0,i.jsx)("h2",{className:"flex justify-start py-2 text-xl mb-4 font-bold text-[#ffffff]",children:"Items sold"}),(0,i.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4",children:l.map((function(e,t){return(0,i.jsxs)("div",{className:"bg-[#3e3f41] rounded-xl shadow overflow-hidden",style:{width:"250px"},children:[(0,i.jsx)("div",{className:"flex justify-content p-4",style:{height:"250px",width:"250px"},children:(0,i.jsx)("video",{poster:e.image,src:e.video,className:"rounded bg-[#00000046]",width:"350",type:"video/*, audio/*",autoPlay:!0,readystate:"true",loop:!0,muted:!0,controlsList:"nodownload"})}),(0,i.jsxs)("div",{className:"p-4 bg-[#3e3f41]",children:[(0,i.jsx)("p",{style:{height:"40px"},className:"text-[#ffffff] text-xl font-semibold",children:e.name}),(0,i.jsx)("div",{style:{height:"80px",overflow:"hidden"},children:(0,i.jsx)("p",{className:"text-white ",children:e.description})})]}),(0,i.jsxs)("div",{className:"p-4 bg-[#3e3f41]",children:[(0,i.jsxs)("p",{className:"text-xl mb-4 font-bold text-[#ffffff]",children:[e.price," Matic"]}),(0,i.jsx)("button",{className:"w-full bg-[#2952e3] text-[#ffffff] font-bold py-2 px-12 rounded cursor-pointer hover:bg-[#2546bd]",onClick:function(){return y(e)},children:"Buy"})]})]},t)}))})]})})})})]}):(0,i.jsx)("h1",{className:"py-10 px-20 text-3xl",children:"No assets created"})}}},function(e){e.O(0,[277,294,669,828,774,888,179],(function(){return t=19123,e(e.s=t);var t}));var t=e.O();_N_E=t}]);