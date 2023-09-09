import React, { useState } from 'react';
import { ProductTable } from './components/ProductTable';
import Swal from 'sweetalert2';

function App() {
  const [csvData, setCsvData] = useState('');
  const [products, setProducts] = useState([]);
  const [validated, setValidated] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const csvText = event.target.result;
        setCsvData(csvText);
        convertCsvToJson(csvText);
      };
      reader.readAsText(file);
    }
  };

  const convertCsvToJson = (csvText) => {
    if (csvText) {
      try {
        const cleanedCsvData = csvText.replace(/\r/g, '');
        const lines = cleanedCsvData.split('\n');
  
        if (lines.length < 2) {
          throw new Error('O CSV deve conter pelo menos duas linhas: cabeçalho e dados.');
        }
  
        const headers = lines[0].split(',');
  
        const jsonData = [];
  
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',');
          const entry = {};
  
          for (let j = 0; j < headers.length; j++) {
            const columnName = headers[j];
            if (columnName) {
              if (columnName === 'product_code') {
                entry[columnName] = parseInt(values[j], 10);
              } else if (columnName === 'new_price') {
                entry[columnName] = parseFloat(values[j].replace(',', '.'));
              } else {
                entry[columnName] = values[j];
              }
            }
          }
  
          jsonData.push(entry);
        }
  
        // Atualizar o estado com os dados convertidos
        setCsvData(jsonData);
        setProducts(jsonData.map(({ product_code, new_price }) => ({ code: product_code, new_price: new_price })));
  
      } catch (error) {
        console.error('Erro ao converter CSV para JSON:', error);
        // Trate o erro de acordo com suas necessidades, como exibindo uma mensagem de erro para o usuário.
      }
    }
  };  

  const validateProducts = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(csvData),
      redirect: 'follow'
    };

    try {
      const response = await fetch("http://localhost:8080/products/validate", requestOptions);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);

        let haveError = false;

        data.map(product => {
          if(product.message !== ''){
            haveError = true;
          }
        })

        setValidated(!haveError);
      } else {
        console.error("Erro ao validar produtos:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  }

  const updateProducts = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: JSON.stringify(csvData),
      redirect: 'follow'
    };

    try {
      const response = await fetch("http://localhost:8080/products/multiple-update", requestOptions);
      if (response.ok) {
        Swal.fire(
          'Sucesso!',
          'Produtos atualizados com sucesso!',
          'success'
        )
        
        window.location.reload(false);
      } else {
        console.error("Erro ao atualizar o preço dos produtos:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  }

  return (
    <>
      <div className='d-flex justify-content-center align-content-center'>
        <div className='row'>
          <div className='col-12'>
            <label className='form-label'>Selecione o arquivo .csv</label>
            <input className='form-control' type="file" accept=".csv" onChange={handleFileUpload} />
          </div>
          <div className='col-6'>
            <button className='btn btn-primary my-3' onClick={validateProducts}>Validar</button>
          </div>
          <div className='col-6 text-end'>
            <button className='btn btn-primary my-3' onClick={updateProducts} disabled={!validated}>Atualizar</button>
          </div>
        </div>
      </div>

      <ProductTable products={products} />
    </>
  );
}

export default App;