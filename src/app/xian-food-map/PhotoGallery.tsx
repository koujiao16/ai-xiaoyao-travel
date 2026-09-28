'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import styles from './food-map.module.css';
export type FoodPhoto = {src:string;alt:string};
export default function PhotoGallery({photos}:{photos:FoodPhoto[]}) {
 const track=useRef<HTMLDivElement>(null);
 const [active,setActive]=useState(0);
 function go(index:number){
  const el=track.current;if(!el)return;
  el.scrollTo({left:el.clientWidth*index,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 }
 return <section className={styles.gallery} aria-label="Restaurant photos">
  <div ref={track} className={styles.photoTrack} onScroll={()=>{const el=track.current;if(el?.clientWidth)setActive(Math.round(el.scrollLeft/el.clientWidth));}}>
   {photos.map((photo,i)=><a className={styles.photoSlide} key={photo.src} href={photo.src} target="_blank" rel="noopener noreferrer" aria-label={`Open photo ${i+1} full size: ${photo.alt}`}><Image src={photo.src} alt={photo.alt} width={1080} height={1440} sizes="(max-width: 767px) 350px, 334px" className={styles.foodPhoto} /></a>)}
  </div>
  <div className={styles.photoControls}><button type="button" aria-label="Previous photo" disabled={active===0} onClick={()=>go(active-1)}>‹</button><span aria-live="polite">{active+1} / {photos.length}</span><button type="button" aria-label="Next photo" disabled={active===photos.length-1} onClick={()=>go(active+1)}>›</button></div>
 </section>;
}
