import { useState, useContext } from "react";
import { v4 as uuid } from "uuid";
import styles from "./Product.module.css";
import Card from "./Card";
import ViewList from "./ViewList";
import Button from "./Button";
import ProductContext from "../context/ProductContext";
import ModeContext from "../context/ModeContext";
import Toggle from "./Toggle";
// import EditItem from "./EditItem";

function Product() {
  const ctx = useContext(ProductContext);
  const modeCtx = useContext(ModeContext);
  const [list, setList] = useState([]);
  const [sumTotal, setSumTotal] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [editForm, setEditForm] = useState({
    id: 0,
    name: "",
    quantity: 0,
    price: 0,
    discount: 0,
  });

  const handlerAddProduct = () => {
    const newItem = {
      id: uuid(),
      name: ctx.name,
      quantity: ctx.count,
      price: ctx.price,
      discount: ctx.discount,
      total: ctx.count * ctx.price * ((100 - ctx.discount) / 100),
    };
    const newList = [...list, newItem];
    setList(newList);
    const sum = sumTotal + newItem.total;
    setSumTotal(sum);
  };

  const handlerDeleteProduct = (id) => {
    if (!isEdit) {
      const deleteList = list.filter((item) => item.id === id);
      const newList = list.filter((item) => item.id !== id);
      setList(newList);
      const newSum = sumTotal - deleteList[0].total;
      setSumTotal(newSum);
    }
  };

  const handlerEditProduct = (id) => {
    const index = list.findIndex((item) => item.id === id);
    const edittedItems = {
      index: index,
      name: list[index].name,
      quantity: list[index].quantity,
      price: list[index].price,
      discount: list[index].discount,
    };
    setEditForm(edittedItems);
    setIsEdit(true);
  };

  const handlerUpdateProduct = (event, key) => {
    const value = event.target.value;
    const updatedProduct = { ...editForm, [key]: value };
    setEditForm(updatedProduct);
  };

  const handlerSubmitForm = (event) => {
    event.preventDefault();

    const newItem = { ...list[editForm.index] };
    newItem.name = editForm.name;
    newItem.quantity = editForm.quantity;
    newItem.price = editForm.price;
    newItem.discount = editForm.discount;
    newItem.total =
      editForm.quantity * editForm.price * ((100 - editForm.discount) / 100);

    const newList = [...list];
    newList[editForm.index] = newItem;
    setList(newList);

    const newSum = sumTotal - list[editForm.index].total + newItem.total;
    setSumTotal(newSum);

    setIsEdit(false);
  };

  return (
    <div className={`${styles.container} ${modeCtx.isDark && styles.dark}`}>
      <Toggle />
      <Card handlerAddProduct={handlerAddProduct} />
      <ViewList
        list={list}
        sum={sumTotal}
        handlerEditItem={handlerEditProduct}
        handlerDeleteItem={handlerDeleteProduct}
      />
      {isEdit && (
        <>
          <label>Product Name</label>
          <input
            className={styles.input}
            value={editForm.name}
            type="text"
            onChange={(e) => handlerUpdateProduct(e, "name")}
          />

          <label>Qty</label>
          <input
            className={styles.input}
            value={editForm.quantity}
            type="number"
            min={1}
            onChange={(e) => handlerUpdateProduct(e, "quantity")}
          />
          <label>Price $</label>
          <input
            className={styles.input}
            value={editForm.price}
            type="number"
            min={0}
            step={0.01}
            onChange={(e) => handlerUpdateProduct(e, "price")}
          />
          <label>Discount %</label>
          <input
            className={styles.input}
            value={editForm.discount}
            type="number"
            min={0}
            onChange={(e) => handlerUpdateProduct(e, "discount")}
          />
          <Button label="Submit" onClick={handlerSubmitForm} />
          <Button label="Cancel" onClick={() => setIsEdit(false)} />
        </>
      )}
    </div>
  );
}

export default Product;
