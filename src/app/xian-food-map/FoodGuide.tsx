'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { restaurants, navigationLinks } from './data';
import FoodMap from './FoodMap';
import PhotoGallery from './PhotoGallery';
import { locations } from './locations';
import styles from './food-map.module.css';
const filters = ['All', 'Halal', 'Snacks & Sweets', 'Full Meal'] as const;
type Filter = typeof filters[number];
export default function FoodGuide() {
 const [filter, setFilter] = useState<Filter>('All');
 const [selected, setSelected] = useState<number | null>(null);
 const closeButton = useRef<HTMLButtonElement>(null);
 const returnFocus = useRef<HTMLElement | null>(null);
 const visible = useMemo(() => restaurants.filter(r => filter === 'All' || filter === 'Halal' && r.halal !== 'Not Halal' || filter === 'Snacks & Sweets' && r.snack || filter === 'Full Meal' && r.meal), [filter]);
 const restaurant = visible.find(r => r.id === selected);
 function select(id: number) {
  returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  setSelected(id);
 }
 function close() { setSelected(null); returnFocus.current?.focus(); }
 useEffect(() => { if (selected !== null) closeButton.current?.focus({preventScroll:true}); }, [selected]);
 useEffect(() => {
  function escape(event: KeyboardEvent) { if (event.key === 'Escape') { setSelected(null); returnFocus.current?.focus(); } }
  document.addEventListener('keydown', escape);
  return () => document.removeEventListener('keydown', escape);
 }, []);
 return <div className={styles.guide}>
  <div className={styles.topbar}>
   <div className={styles.topline}><div className={styles.brand}><h1>Xi’an Food Map</h1><p>Eat Like a Local. Navigate Like a Local.</p></div>
    <div className={styles.filters} aria-label="Filter restaurants">{filters.map(f => <button key={f} aria-pressed={filter === f} onClick={() => {setFilter(f);setSelected(null);}}>{f}</button>)}</div>
    <span className={styles.count} role="status">{visible.length} places</span>
   </div>
   <nav className={styles.restaurantNames} aria-label="Choose a restaurant">{visible.map(r => <button key={r.id} aria-pressed={selected === r.id} onClick={() => select(r.id)}><span>{String(r.id).padStart(2,'0')}</span><span lang="zh-CN">{r.name}</span></button>)}</nav>
  </div>
  <div className={styles.mapStage}>
   <FoodMap visible={visible} selected={selected} onSelect={select}/>
   {restaurant && (() => { const r = restaurant; const links = navigationLinks(r); return <section className={styles.detailPanel} role="region" aria-labelledby="restaurant-title">
    <div className={styles.detailHeading}><span>RESTAURANT DETAILS</span><button ref={closeButton} onClick={close} aria-label="Close restaurant details">×</button></div>
    <article className={styles.card} id={`food-${r.id}`}>
     <div className={styles.cardTop}><span className={styles.number}>{String(r.id).padStart(2,'0')}</span><div><h2 id="restaurant-title" lang="zh-CN">{r.name}</h2><p className={styles.english}>{r.english}</p></div></div>
     <div className={styles.badges}><span className={r.halal === 'Not Halal' ? styles.notHalal : styles.halal}>{r.halal}</span>{r.tags.map(t => <span key={t}>{t}</span>)}</div>
     {r.photos?.length ? <PhotoGallery key={r.id} photos={r.photos} /> : null}
     <p className={styles.budget}>{r.budget}</p><p className={styles.dishes}><span>TRY</span>{r.dishes}</p><p className={styles.description}>{r.description}</p>
     <div className={styles.tip}><span>Xiaoyao Tip</span><p>{r.tip}</p></div>
     <p className={styles.address} lang="zh-CN">⌖ 西安市 · {r.address}</p>
     {locations[r.id].approximate && <p className={styles.locationWarning}>Map pin shows the address area only. The exact shop location is awaiting confirmation.</p>}
     <div className={styles.links}><a href={links.amap} target="_blank" rel="noopener noreferrer">Open in Amap ↗</a><a href={links.apple} target="_blank" rel="noopener noreferrer">Open in Apple Maps ↗</a></div>
    </article>
   </section>; })()}
  </div>
 </div>;
}
