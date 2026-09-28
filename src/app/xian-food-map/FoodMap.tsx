'use client';
import { useEffect, useRef, useState } from 'react';
import { restaurants, type Restaurant } from './data';
import { locations } from './locations';
import styles from './food-map.module.css';
type Position = {lng:number;lat:number};
type Marker = {setzIndex:(z:number)=>void;setContent:(content:HTMLElement)=>void;getPosition:()=>Position};
type MapInstance = {add:(marker:Marker)=>void;remove:(markers:Marker[])=>void;setFitView:(markers?:Marker[],immediately?:boolean,padding?:number[],maxZoom?:number)=>void;setZoomAndCenter:(zoom:number,position:Position,immediately?:boolean)=>void;destroy:()=>void;addControl:(control:object)=>void;zoomIn:()=>void;zoomOut:()=>void};
type AMapSDK = {Map:new(el:HTMLElement,options:object)=>MapInstance;Marker:new(options:object)=>Marker;Scale:new()=>object};
declare global {interface Window {AMap?:AMapSDK;_AMapSecurityConfig?:{securityJsCode:string}}}
let sdkPromise:Promise<AMapSDK>|undefined;
function loadMap(key:string) {
 if(window.AMap)return Promise.resolve(window.AMap);
 if(!sdkPromise) sdkPromise=new Promise<AMapSDK>((resolve,reject)=>{
  window._AMapSecurityConfig={securityJsCode:process.env.NEXT_PUBLIC_AMAP_SECURITY_CODE || ''};
  const script=document.createElement('script');
  script.src=`https://webapi.amap.com/maps?v=2.0&key=${encodeURIComponent(key)}&plugin=AMap.Scale`;
  const timer=setTimeout(()=>reject(new Error('Map timed out')),15000);
  script.onload=()=>{clearTimeout(timer);window.AMap?resolve(window.AMap):reject(new Error('Map unavailable'));};
  script.onerror=()=>{clearTimeout(timer);reject(new Error('Map unavailable'));};
  document.head.appendChild(script);
 }).catch(error=>{sdkPromise=undefined;throw error;});
 return sdkPromise;
}
function pin(r:Restaurant,selected:boolean,onSelect:(id:number)=>void){
 const el=document.createElement('button');el.type='button';el.className=`${styles.pin} ${selected?styles.selectedPin:''}`;
 el.textContent=String(r.id).padStart(2,'0')+(locations[r.id].approximate?'*':'');el.title=r.name;
 el.setAttribute('aria-label',`Show ${r.name}${locations[r.id].approximate?' (approximate area)':''}`);el.setAttribute('aria-pressed',String(selected));
 el.addEventListener('click',event=>{event.stopPropagation();onSelect(r.id);});return el;
}
export default function FoodMap({visible,selected,onSelect}:{visible:Restaurant[];selected:number|null;onSelect:(id:number)=>void}) {
 const host=useRef<HTMLDivElement>(null);const map=useRef<MapInstance|null>(null);const markers=useRef(new Map<number,Marker>());
 const select=useRef(onSelect);select.current=onSelect;
 const [state,setState]=useState<'loading'|'ready'|'unavailable'>('loading');
 useEffect(()=>{
  const key=process.env.NEXT_PUBLIC_AMAP_KEY;if(!key){setState('unavailable');return;}
  let cancelled=false;const markerStore=markers.current;
  loadMap(key).then(SDK=>{
   if(cancelled||!host.current)return;
   map.current=new SDK.Map(host.current,{zoom:13,center:[108.947,34.25],lang:'en',resizeEnable:true});
   map.current.addControl(new SDK.Scale());
   restaurants.forEach(r=>{
    markerStore.set(r.id,new SDK.Marker({position:locations[r.id].position,content:pin(r,false,id=>select.current(id)),anchor:'bottom-center'}));
   });
   setState('ready');
  }).catch(()=>{if(!cancelled)setState('unavailable');});
  return()=>{cancelled=true;map.current?.destroy();map.current=null;markerStore.clear();};
 },[]);
 useEffect(()=>{
  if(state!=='ready'||!map.current)return;
  map.current.remove([...markers.current.values()]);
  visible.forEach(r=>{const marker=markers.current.get(r.id);if(marker){marker.setzIndex(r.id===selected?200:100);marker.setContent(pin(r,r.id===selected,id=>select.current(id)));map.current?.add(marker);}});
  const current=selected===null?undefined:markers.current.get(selected);
  if(current){
   const mobile=window.innerWidth<768;
   const height=host.current?.clientHeight||600;
   map.current.setFitView([current],true,mobile?[25,Math.round(height*.62)+20,30,30]:[60,60,60,440],16);
  }else map.current.setFitView(undefined,true,[60,60,80,60]);
 },[visible,selected,state]);
 return <div className={styles.mapFrame}>
  <div ref={host} className={styles.mapCanvas} aria-label="Xi’an restaurant map" />
  {state!=='ready'&&<div className={styles.mapFallback}><span className={styles.mapSymbol} aria-hidden="true">⌖</span><h3>{state==='loading'?'Loading the map…':'Live map unavailable'}</h3><p>{state==='loading'?'Finding our food picks in Xi’an.':'Choose a restaurant above to view its details or open its location in Amap or Apple Maps.'}</p></div>}
  {state==='ready'&&<><div className={styles.mapControls}><button aria-label="Zoom in" onClick={()=>map.current?.zoomIn()}>+</button><button aria-label="Zoom out" onClick={()=>map.current?.zoomOut()}>−</button><button aria-label="Fit all visible restaurants" onClick={()=>map.current?.setFitView(undefined,true,[60,60,80,60])}>⌖</button></div>{visible.some(r=>locations[r.id].approximate)&&<p className={styles.mapNote}>* Address area only; exact shop location awaiting confirmation.</p>}</>}
 </div>;
}
