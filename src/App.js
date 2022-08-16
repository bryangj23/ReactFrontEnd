import "./App.css";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
function App() {
  const baseUrlApi = "http://localhost:5168/api/";
  const [products, setProducts] = useState([]);
  const [modalAddProduct, setModalAddProduct] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [productSelecionado, setProductSelecionado] = useState({
    id: 0,
    categoryId: 0,
    code: "",
    nameProd: "",
    priceSale: 0,
    stock: 0,
    description: "",
    status: true,
  });
  const abrirCerraModalInsert = () => {
    setModalAddProduct(!modalAddProduct);
  };
  const openModalEdit = () => {
    setIsModalEdit(!isModalEdit);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductSelecionado({
      ...productSelecionado,
      [name]: value,
    });
  };
  const getListProducts = async () => {
    await axios
      .get(baseUrlApi + "Products")
      .then((response) => {
        setProducts(response.data.response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const createProduct = async () => {
    delete productSelecionado.id;
    let productCreated = productSelecionado;
    productCreated.priceSale = parseFloat(productSelecionado.priceSale);
    productCreated.stock = parseInt(productSelecionado.stock);
    productCreated.categoryId = parseInt(productSelecionado.categoryId);
    console.log(JSON.stringify(productSelecionado));

    await axios
      .post(baseUrlApi + "Products", productCreated)
      .then((response) => {
        setProducts(products.concat(response.data.response));
        abrirCerraModalInsert();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getListProducts();
  }, []);

  return (
    <div className="App">
      <br />
      <button
        onClick={() => abrirCerraModalInsert()}
        className="btn btn-success"
      >
        Agregar nuevo Producto{" "}
      </button>
      <br />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Codigo</th>
            <th>Precio venta </th>
            <th>Cantidad</th>
            <th>Descripcion</th>
            <th>Estado</th>
            <th>Categoria</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {products.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.id}</td>
              <td>{prod.nameProd}</td>
              <td>{prod.code}</td>
              <td>{prod.priceSale}</td>
              <td>{prod.stock}</td>
              <td>{prod.description}</td>
              <td>{prod.status ? "Activo" : "Inactivo"}</td>
              <td>{prod.categoryId}</td>
              <td>
                <button className="btn btn-primary">Editar</button>
                {"  "}
                <button className="btn btn-danger">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalAddProduct}>
        <ModalHeader>Agregar Producto</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre:</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nameProd"
              onChange={handleChange}
            />
            <br />
            <label>Codigo:</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="code"
              onChange={handleChange}
            />
            <br />
            <label>Precio de venta:</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="priceSale"
              onChange={handleChange}
            />
            <br />
            <label>Stock:</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="stock"
              onChange={handleChange}
            />
            <br />
            <label>Descripcion:</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="description"
              onChange={handleChange}
            />
            <br />
            <label>Categoria:</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="categoryId"
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => createProduct()}>
            Agregar
          </button>
          <button
            className="btn btn-danger"
            onClick={() => abrirCerraModalInsert()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={isModalEdit}>
        <ModalHeader>Editar Producto</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Id:</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="Id"
              readOnly
              onChange={handleChange}
            />
            <br />
            <label>Nombre:</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nameProd"
              onChange={handleChange}
            />
            <br />
            <label>Codigo:</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="code"
              onChange={handleChange}
            />
            <br />
            <label>Precio de venta:</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="priceSale"
              onChange={handleChange}
            />
            <br />
            <label>Stock:</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="stock"
              onChange={handleChange}
            />
            <br />
            <label>Descripcion:</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="description"
              onChange={handleChange}
            />
            <br />
            <label>Categoria:</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="categoryId"
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary">Agregar</button>
          <button className="btn btn-danger" onClick={() => openModalEdit()}>
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
