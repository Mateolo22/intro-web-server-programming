// index.js
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Datos simulados (podrían venir de una base de datos)
let tareas = [
  { id: 1, titulo: "Estudiar Node.js", completado: false },
  { id: 2, titulo: "Hacer ejercicio", completado: true }
];

// GET - Obtener todas las tareas
app.get('/tareas', (req, res) => {
  res.json(tareas);
});

// GET - Obtener una tarea por ID
app.get('/tareas/:id', (req, res) => {
  const tarea = tareas.find(t => t.id === parseInt(req.params.id));
  if (!tarea) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
  res.json(tarea);
});

// POST - Agregar una nueva tarea
app.post('/tareas', (req, res) => {
  const { titulo, completado } = req.body;
  const nuevaTarea = {
    id: tareas.length + 1,
    titulo,
    completado: completado || false
  };
  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
});

// PUT - Actualizar una tarea existente
app.put('/tareas/:id', (req, res) => {
  const tarea = tareas.find(t => t.id === parseInt(req.params.id));
  if (!tarea) return res.status(404).json({ mensaje: 'Tarea no encontrada' });

  const { titulo, completado } = req.body;
  if (titulo !== undefined) tarea.titulo = titulo;
  if (completado !== undefined) tarea.completado = completado;

  res.json(tarea);
});

// DELETE - Eliminar una tarea
app.delete('/tareas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tareas = tareas.filter(t => t.id !== id);
  res.json({ mensaje: 'Tarea eliminada correctamente' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor ejecutándose en http://localhost:${PORT}`);
});
