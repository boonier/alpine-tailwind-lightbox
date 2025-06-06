var g=`<div
    class="fixed inset-0 bg-black/90 touch-pinch-zoom z-[9999]"
    style="display: none;"
    role="region"
    aria-modal="true"
    aria-roledescription="carousel"
    x-show="$store.lightbox.show[group]"
    x-transition.opacity.duration.300ms
    x-trap.noscroll="$store.lightbox.show[group]"
    :aria-hidden="!$store.lightbox.show[group]"
    @touchstart="$store.lightbox.onTouchStart($event)"
    @touchend="$store.lightbox.onTouchEnd($event, group)"
    @keydown.esc="$store.lightbox.show[group] = null"
    @keydown.left="$store.lightbox.prev(group)"
    @keydown.right="$store.lightbox.next(group)"
>
    <ul aria-live="polite" role="presentation" id="lightbox-list">
        <template x-for="(item, index) in $store.lightbox.items[group]" :key="item.id">
            <li
                class="absolute inset-0 flex justify-center items-center"
                role="group"
                aria-roledescription="slide"
                x-show="$store.lightbox.show[group]?.id === item.id"
                x-transition.opacity.duration.300ms
                :aria-label="\`\${index + 1} of \${$store.lightbox.items[group].length}\`"
                @click.self="$store.lightbox.show[group] = null"
            >
                <template x-if="item.type === 'image' && !item.loaded">
                    <div>
                        <svg aria-hidden="true" class="w-9 h-9 text-gray-600 animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                </template>
                <template x-if="item.type === 'image' && item.loaded">
                    <img class="w-auto h-auto max-h-screen max-w-screen" :src="item.url" :alt="item.alt || ''">
                </template>
                <template x-if="$store.lightbox.show[group]?.id === item.id && item.type === 'embed'">>
                    <div class="flex items-center w-full self-stretch max-w-[calc(80vh/0.5625)]">
                        <div class="relative w-full h-0 pb-[56.25%]">
                            <iframe
                                class="absolute top-0 left-0 w-full h-full"
                                allowfullscreen
                                :src="item.url"
                            ></iframe>
                        </div>
                    </div>
                </template>
                <template x-if="$store.lightbox.show[group]?.id === item.id && item.type === 'video'">>
                    <div class="flex items-center w-full self-stretch max-w-[calc(80vh/0.5625)]">
                        <div class="relative w-full h-0 pb-[56.25%]">
                            <video
                                class="absolute top-0 left-0 w-full h-full"
                                :src="item.url"
                                controls
                                playsinline
                                x-data="{
                                    setAttr(attr, val) {
                                        $el[attr] = val
                                    }
                                }"
                                x-init="
                                    setAttr('autoplay', item.autoplay)
                                    setAttr('muted', item.muted)
                                    $watch('item.autoplay', (val) => setAttr('autoplay', val))
                                    $watch('item.muted', (val) => setAttr('muted', val))
                                "
                            ></video>
                        </div>
                    </div>
                </template>
            </li>
        </template>
    </ul>
    <a
        href="#"
        class="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 p-3 md:p-4 rounded"
        role="button"
        aria-controls="lightbox-list"
        aria-label="Previous"
        x-show="$store.lightbox.items[group].length > 1"
        @click.prevent="$store.lightbox.prev(group)"
    >
        <svg
            class="w-4 h-4 md:w-5 md:h-5 fill-white"
            viewBox="0 0 382 382"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
        >
            <path d="M107.726985,190.9204 L286.938237,27.2629715 C293.19479,21.054178 293.19479,10.8653886 286.938237,4.65659512 C280.681683,-1.55219837 270.524734,-1.55219837 264.284101,4.65659512 L73.5467803,178.821213 C70.2195038,182.164409 68.7867053,186.622005 69.025505,190.9204 C68.7867053,195.377995 70.2195038,199.835591 73.5467803,203.178787 L264.284101,377.343405 C270.524734,383.552198 280.681683,383.552198 286.938237,377.343405 C293.19479,370.975412 293.19479,360.945822 286.938237,354.737029 L107.726985,190.9204"></path>
        </svg>
    </a>
    <a
        href="#"
        class="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 p-3 md:p-4 rounded"
        role="button"
        aria-controls="lightbox-list"
        aria-label="Next"
        x-show="$store.lightbox.items[group].length > 1"
        @click.prevent="$store.lightbox.next(group)"
    >
        <svg
            class="w-4 h-4 md:w-5 md:h-5 fill-white"
            viewBox="0 0 382 382"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
        >
            <path d="M129.096985,190.9204 L308.308237,27.2629715 C314.56479,21.054178 314.56479,10.8653886 308.308237,4.65659512 C302.051683,-1.55219837 291.894734,-1.55219837 285.654101,4.65659512 L94.9167803,178.821213 C91.5895038,182.164409 90.1567053,186.622005 90.395505,190.9204 C90.1567053,195.377995 91.5895038,199.835591 94.9167803,203.178787 L285.654101,377.343405 C291.894734,383.552198 302.051683,383.552198 308.308237,377.343405 C314.56479,370.975412 314.56479,360.945822 308.308237,354.737029 L129.096985,190.9204" transform="translate(201.685326, 191.000000) scale(-1, 1) translate(-201.685326, -191.000000)"></path>
        </svg>
    </a>
    <a
        href="#"
        class="absolute top-4 right-4 bg-black/40 p-3 md:p-4 rounded"
        role="button"
        aria-controls="lightbox-list"
        aria-label="Close"
        @click.prevent="$store.lightbox.show[group] = null"
    >
        <svg
            class="w-4 h-4 md:w-5 md:h-5 fill-white"
            viewBox="0 0 382 382"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
        >
            <path d="M376.667262,5.33273811 C383.023836,11.6893126 383.109736,21.9419848 376.924961,28.4038592 L376.667262,28.6672619 L214.335,191 L376.370193,353.035669 C382.813844,359.47932 382.813844,369.926542 376.370193,376.370193 C370.013618,382.726767 359.760946,382.812667 353.299072,376.627892 L353.035669,376.370193 L191,214.335 L28.964331,376.370193 C22.5206802,382.813844 12.073458,382.813844 5.62980723,376.370193 C-0.726767222,370.013618 -0.812666876,359.760946 5.37210827,353.299072 L5.62980723,353.035669 L167.665,191 L5.33273811,28.6672619 C-1.1109127,22.2236111 -1.1109127,11.7763889 5.33273811,5.33273811 C11.6893126,-1.02383634 21.9419848,-1.109736 28.4038592,5.07503915 L28.6672619,5.33273811 L191,167.665 L353.332738,5.33273811 C359.776389,-1.1109127 370.223611,-1.1109127 376.667262,5.33273811 Z"></path>
        </svg>
    </a>
</div>
`;var p=null,v=[];function f(s){s.store("lightbox",{show:{},items:{},touchStart:null,onTouchStart(e){if(!e.changedTouches){this.touchStart=null;return}this.touchStart=e.changedTouches[0]},onTouchEnd(e,t){if(!e.changedTouches||!this.touchStart)return;let{screenX:i,screenY:l}=this.touchStart,{screenX:r,screenY:n}=e.changedTouches[0];if(!i||!l||!r||!n)return;let a=i-r,o=l-n;Math.abs(a)<Math.abs(o)||(a>=100?this.next(t):a<=-100&&this.prev(t))},loadImage(e,t){let i=this.items[t].findIndex(({id:r})=>r===e.id);[e,this.nextItem(i,t),this.prevItem(i,t)].filter(Boolean).forEach(({id:r,url:n,loaded:a})=>{if(a)return;let o=new Image;o.onload=()=>{let h=this.items[t].findIndex(c=>c.id===r);this.items[t][h].loaded=!0,v.push(o)},o.src=n})},open(e,t){let i=t?this.items[e].find(l=>l[typeof t=="object"?"el":"url"]===t):this.items[e][0]||null;i&&(this.show[e]=i,this.loadImage(i,e))},prevItem(e,t){return e===0?this.items[t][this.items[t].length-1]:this.items[t][e-1]},nextItem(e,t){return e===this.items[t].length-1?this.items[t][0]:this.items[t][e+1]},navigate(e,t){let i=this.items[t].findIndex(r=>r.id===this.show[t].id),l=e==="prev"?this.prevItem(i,t):this.nextItem(i,t);this.show[t]=l,this.loadImage(l,t)},prev(e){this.navigate("prev",e)},next(e){this.navigate("next",e)}});function d(e,t,i=null,l=null,r=[]){if(Array.isArray(e)||(e=[e]),!document.querySelector(`#lightbox-${t}`)){let a=document.createElement("template");a.innerHTML=g;let o=a.content.children[0];o.id=`lightbox-${t}`,o.setAttribute("x-data",`{ group: '${t}' }`),document.body.appendChild(o),setTimeout(()=>{o.hasOwnProperty("_x_isShown")||s.initTree(o)},15)}s.store("lightbox").show[t]??=null,s.store("lightbox").items[t]??=[];let n=s.store("lightbox").items;e.forEach(a=>{let o=s.store("lightbox").items[t]?.findIndex(c=>c.id===i),h=y(a,t,i,l,r);o!==-1&&o!==void 0?n[t][o]={...n[t][o],...h}:(h.loaded=!h.lazy,n[t].push(h))})}s.magic("lightbox",()=>{function e(t,i=null){t=t.map(l=>(typeof l=="string"&&(l={url:l}),l.id=u(),l)),d(t,i||m())}return e.open=(t=null,i=null)=>{s.store("lightbox").open(i||m(),t)},e}),s.directive("lightbox",(e,{value:t,modifiers:i,expression:l},{effect:r,evaluateLater:n})=>{if(t==="group")return;if(!l){console.warn("Alpine warn: no url or config expression passed to x-lightbox",e);return}let a=n(l),o=u(),h=!1;r(()=>{a(c=>{s.nextTick(()=>{let x=C(e,c);d(c,x,o,e,i),h||(e.addEventListener("click",w=>{w.preventDefault(),s.store("lightbox").open(x,e)}),h=!0)})})})})}var u=()=>(Math.random()+1).toString(36).substring(2,15),C=(s,d)=>s.hasAttribute("x-lightbox:group")?s.getAttribute("x-lightbox:group"):d.group?String(d.group):m(),m=()=>(p??=u(),p),y=(s,d,e=null,t=null,i=[])=>(typeof s=="string"&&(s={url:s}),{type:"image",lazy:i.includes("lazy"),autoplay:!1,muted:!1,id:e,...s,el:t,group:d});var T=f;export{T as default};
