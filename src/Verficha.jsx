import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import supabase from './supabaseClient';

function VerFicha() {
  const [searchParams] = useSearchParams();
  const [ficha, setFicha] = useState(null);  const [loading, setLoading] = useState(true);

  const id = searchParams.get('id');
  const slug = searchParams.get('slug')?.toLowerCase();

  useEffect(() => {
    const fetchFicha = async () => {
      let query = supabase
      .from('ficha_medica')
      .select('*', { head: false, count: 'exact' })
      if (id) {
        query = query.eq('id', id);
      } else if (slug) {
        query = query.eq('public_slug', slug);
      } else {
        setLoading(false);
        return;
      }
      console.log("ejecutando consulta con slug:", slug);
      const { data, error } = await query.maybeSingle();
      console.log("datos recibidos",data);
      console.log("Error recibido:", error);


      if (error) {
        console.error("Error al obtener ficha:", error);
        setFicha(null);
      } else {
        setFicha(data);
      }

      setLoading(false);
    };

    fetchFicha();
  }, [id, slug]); // Dependencias agregadas por buenas prácticas

  // Estado de carga
  if (loading) return <p>Cargando ficha...</p>;

  // Si no hay ficha, mostrar mensaje
  if (!ficha) return <p>Ficha no encontrada.</p>;

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '2rem' }}>
      <h2 style={{ textAlign: 'center' }}>
        Ficha Médica de {ficha.nombre_completo}
      </h2>
      <p><strong>RUT:</strong> {ficha.rut}</p>
      <p><strong>Domicilio:</strong> {ficha.Domicilio}</p>
      <p><strong>Género:</strong> {ficha.genero}</p>
  <p><strong>Fecha de nacimiento:</strong>{' '}
  {
     ficha.fecha_de_nacimiento && !isNaN(new Date(ficha.fecha_de_nacimiento))
      ? new Date(ficha.fecha_de_nacimiento).toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })
      : <span style={{ color: 'gray', fontStyle: 'italic' }}>No registrada</span>
  }
</p>
      <p><strong>Centro de atención preferente:</strong> {ficha.centro_de_atencion_preferente}</p>
      <p><strong>Previsión:</strong> {ficha.prevision}</p>
      <p><strong>Enfermedades crónicas:</strong> {ficha.enfermedades_cronicas}</p>
      <p><strong>Cirugías previas:</strong> {ficha.cirugias_previas}</p>
      <p><strong>Medicamentos de uso habitual:</strong> {ficha.medicamentos_de_uso_habitual}</p>
      <p><strong>Alergias:</strong> {ficha.alergias}</p>
      <p><strong>Grupo sanguíneo:</strong> {ficha.grupo_sanguineo}</p>
      <hr />
      <h3>Contacto de emergencia</h3>
      <p><strong>Familiar 1:</strong> {ficha.nombre_familiar_1} ({ficha.parentesco_1})</p>
      <p><strong>Teléfono:</strong> {ficha.numero_telefono_1}</p>
      {ficha.nombre_familiar_2 && <p><strong>Familiar 2:</strong> {ficha.nombre_familiar_2}</p>}
      {ficha.observaciones && <p><strong>Observaciones:</strong> {ficha.observaciones}</p>}
    </div>
  );
}

export default VerFicha;

