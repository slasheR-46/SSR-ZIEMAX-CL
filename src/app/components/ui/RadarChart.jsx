'use client';
import { motion } from 'framer-motion';
import { useMemo, useState, useEffect } from 'react';

/**
 * RadarChart simple (gráfico radar / spider) sin librerías externas.
 * Props:
 *  - data: { label: string; values: number[] }[]  (varias series)
 *  - categories: string[] nombres de ejes (si no se proveen se deducen)
 *  - max: número máximo esperado (si no se calcula del dataset)
 *  - size: diámetro total del svg
 *  - levels: número de anillos concéntricos
 *  - allowRandom: botón para regenerar datos demo si no se pasa data
 */
export default function RadarChart({
  data = [],
  categories,
  max,
  size = 320,
  levels = 5,
  allowRandom = true,
  className = '',
  showLegend = true,
}) {
  const defaultCategories = ['UX','Performance','Seguridad','Escalabilidad','Mantenibilidad','Integración'];

  // Generador de datos aleatorios SOLO para usar luego del montaje (cliente)
  const generateRandom = (nCats = defaultCategories.length, nSeries = 2) => {
    return Array.from({ length: nSeries }).map((_, si) => ({
      label: si === 0 ? 'Actual' : 'Objetivo',
      values: Array.from({ length: nCats }).map(() => Math.floor(Math.random() * 60) + 40),
    }));
  };

  // Para evitar mismatch SSR: inicializamos con datos deterministas (sin Math.random)
  const baseCats = categories?.length ? categories : defaultCategories;
  const placeholder = useMemo(
    () => [
      { label: 'Actual', values: baseCats.map(() => 50) },
      { label: 'Objetivo', values: baseCats.map(() => 60) },
    ],
    [baseCats]
  );

  const [internal, setInternal] = useState(() => (data.length ? data : placeholder));
  const cats = categories?.length
    ? categories
    : baseCats.slice(0, internal[0]?.values.length || baseCats.length);
  const series = data.length ? data : internal;
  const derivedMax = max || Math.max(...series.flatMap((s) => s.values), 100);

  // Post-mount randomize (solo en cliente) manteniendo shape
  useEffect(() => {
    if (!data.length) setInternal(generateRandom(cats.length, placeholder.length));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const radius = size/2;
  const angleStep = (Math.PI * 2) / cats.length;

  const levelPolygons = useMemo(()=>{
    return Array.from({length: levels}).map((_,li)=>{
      const r = radius * ((li+1)/levels);
      const points = cats.map((_,ci)=>{
        const angle = angleStep * ci - Math.PI/2;
        const x = radius + Math.cos(angle)*r;
        const y = radius + Math.sin(angle)*r;
        return `${x},${y}`;
      }).join(' ');
      return { r, points };
    });
  },[levels, cats.length, radius, angleStep]);

  const buildSeriesPath = (values)=>{
    return values.map((val,ci)=>{
      const ratio = Math.min(val/derivedMax,1);
      const r = radius * ratio;
      const angle = angleStep * ci - Math.PI/2;
      const x = radius + Math.cos(angle)*r;
      const y = radius + Math.sin(angle)*r;
      return `${x},${y}`;
    }).join(' ');
  };

  const colors = ['#6366f1','#ec4899','#10b981','#f59e0b'];

  return (
    <div className={`bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 ${className}`}>
      <div className='flex items-start gap-4 mb-4'>
        <h2 className='font-semibold'>Radar de Métricas</h2>
        {allowRandom && !data.length && (
          <button onClick={()=> setInternal(generateRandom(cats.length,2))} className='ml-auto text-xs px-2 py-1 rounded-md bg-neutral-900 text-neutral-100 dark:bg-neutral-700 hover:bg-neutral-800 active:scale-95 transition'>Regenerar</button>
        )}
      </div>
      <div className='flex flex-col lg:flex-row gap-6'>
        <div className='relative' style={{width:size, height:size}}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role='img' aria-label='Radar chart'>
            <g className='levels'>
              {levelPolygons.map((lvl,i)=>(
                <polygon key={i} points={lvl.points} fill='none' stroke='currentColor' strokeOpacity={0.12} strokeWidth={0.6} />
              ))}
            </g>
            {/* radial lines */}
            <g className='radials'>
              {cats.map((_,ci)=>{
                const angle = angleStep * ci - Math.PI/2;
                const x = radius + Math.cos(angle)*radius;
                const y = radius + Math.sin(angle)*radius;
                return <line key={ci} x1={radius} y1={radius} x2={x} y2={y} stroke='currentColor' strokeOpacity={0.15} strokeWidth={0.5} />
              })}
            </g>
            {/* labels */}
            <g className='labels font-[10px] fill-neutral-600 dark:fill-neutral-300'>
              {cats.map((c,ci)=>{
                const angle = angleStep * ci - Math.PI/2;
                const x = radius + Math.cos(angle)*(radius+14);
                const y = radius + Math.sin(angle)*(radius+14);
                return <text key={c} x={x} y={y} textAnchor='middle' dominantBaseline='middle'>{c}</text>;
              })}
            </g>
            {/* series */}
            <g className='series'>
              {series.map((s,si)=>{
                const pathPoints = buildSeriesPath(s.values);
                return (
                  <motion.polygon
                    key={s.label}
                    points={pathPoints}
                    fill={colors[si % colors.length]}
                    fillOpacity={0.15}
                    stroke={colors[si % colors.length]}
                    strokeWidth={1}
                    initial={{opacity:0, scale:0.9}}
                    animate={{opacity:1, scale:1}}
                    transition={{delay: si*0.15, type:'spring', stiffness:140, damping:18}}
                    whileHover={{fillOpacity:0.28}}
                  />
                );
              })}
            </g>
          </svg>
        </div>
        {showLegend && (
          <div className='flex flex-col gap-2 text-sm min-w-[180px]'>
            {series.map((s,si)=>{
              return (
                <motion.div key={s.label} initial={{opacity:0,y:4}} animate={{opacity:1,y:0}} transition={{delay:0.3+si*0.1}} className='flex items-center gap-2'>
                  <span className='h-3 w-3 rounded-sm' style={{background:colors[si % colors.length], boxShadow:'0 0 0 3px rgba(99,102,241,0.15)'}} />
                  <span className='font-medium'>{s.label}</span>
                </motion.div>
              );
            })}
            <p className='mt-2 text-[11px] text-neutral-500 dark:text-neutral-400'>Máx referencia: {Math.round(derivedMax)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
