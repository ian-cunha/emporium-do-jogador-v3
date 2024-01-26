/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../config/Firebase"

export const Truques = () => {

  const colecao = 'magias';
  const documento = 'truques';

  const [ magia, setMagia ] = useState(null)

  const getDataBase = async () => {
    const docRef = doc(firestore, colecao, documento)
    const docSnap = await getDoc(docRef)

    const data = docSnap.data();
    if (!data) {
      setMagia(null)
      console.log(magia)
    } else {
      setMagia(data.magia);
      console.log(magia)
    }
  }

  useEffect(() => {
    getDataBase()
  }, [])

  if (!magia) {
    // You can render a placeholder if you like during the load, or just return null to render nothing.
    return null;
  }

  console.log(magia)

  return (
    <div>
      <h2>Truques</h2>
      <div>
        {magia.map(itemMagia => (
          <div key={itemMagia.name}>{itemMagia.display}</div>
        ))}
        {console.log}
      </div>
    </div>
  )
}