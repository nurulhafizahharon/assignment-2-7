import styles from "./Input.module.css";

function EditItem({ editItem, handlerUpdateProduct }) {
  return (
    <>
      <div className={styles.container}>
        <label>Product Name</label>
        <input
          className={styles.input}
          value={editItem.name}
          type="text"
          onChange={(e) => handlerUpdateProduct(e, "name")}
        />
      </div>
      <div className={styles.container}>
        <label>Qty</label>
        <input
          className={styles.input}
          value={editItem.quantity}
          type="number"
          min={1}
          onChange={(e) => handlerUpdateProduct(e, "quantity")}
        />
      </div>
      <div className={styles.container}>
        <label>Price $</label>
        <input
          className={styles.input}
          value={editItem.price}
          type="number"
          min={0}
          step={0.01}
          onChange={(e) => handlerUpdateProduct(e, "price")}
        />
      </div>
      <div className={styles.container}>
        <label>Discount %</label>
        <input
          className={styles.input}
          value={editItem.discount}
          type="number"
          min={0}
          onChange={(e) => handlerUpdateProduct(e, "discount")}
        />
      </div>
    </>
  );
}
export default EditItem;
