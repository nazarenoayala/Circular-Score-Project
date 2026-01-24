import React from 'react';
import { Card } from 'react-bootstrap';

const AllCompanies = () => {
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>EMPRESAS REGISTRADAS</Card.Title>
        </Card.Body>
      </Card>
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Value"
          className="flex-1 border rounded px-3 py-2"
        />

        <select className="border rounded px-3 py-2 w-48">
          <option>Categoría</option>
        </select>
      </div>
      <div className="bg-white border rounded mb-4">
        <div className="flex justify-between items-center p-4">
          <h3 className="font-semibold">Nombre de la empresa</h3>

          <div className="flex gap-2">
            <button className="bg-green-500 text-white px-3 py-1 rounded">
              Gestionar Empresa
            </button>
            <button className="border px-3 py-1 rounded">
              Ver información
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCompanies;
