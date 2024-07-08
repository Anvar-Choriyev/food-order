import { useRef, useState } from "react";
import Button from "../UI/Button";
import styles from "./OrderForm.module.css";

const isNotEmpty =(val)=> (val = val.trim() !== "");

const OrderForm = ({ onClose, onConfirm }) => {
  const nameRef = useRef();
  const addressRef = useRef();
  const phoneRef = useRef();

  const [inputsValidations, setInputsValidations] = useState({
    name: true,
    address: true,
    phone: true,
  });

  const submitHandler = e => {
    e.preventDefault();

    const name = nameRef.current.value;
    const address = addressRef.current.value;
    const phone = phoneRef.current.value;

    const nameIsValid = isNotEmpty(name)
    const addressIsValid = isNotEmpty(address)
    const phoneIsValid = isNotEmpty(phone)

    setInputsValidations({
      name: nameIsValid,
      address: addressIsValid,
      phone: phoneIsValid,
    });

    if (!nameIsValid || !addressIsValid || !phoneIsValid) 
      return

    onConfirm({
      name,
      address,
      phone
    })
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" ref={nameRef} />
        {!inputsValidations.name&&<p style={{color:"red"}}>Name is invalid</p>}
      </div>

      <div>
        <label htmlFor="address">Address</label>
        <input id="address" type="text" ref={addressRef} />
        {!inputsValidations.address&&<p style={{color:"red"}}>Address is invalid</p>}
      </div>

      <div>
        <label htmlFor="phone">Phone</label>
        <input id="phone" type="text" ref={phoneRef} />
        {!inputsValidations.phone&&<p style={{color:"red"}}>Phone is invalid</p>}
      </div>

      <div>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">Confirm</Button>
      </div>
    </form>
  );
};

export default OrderForm;
