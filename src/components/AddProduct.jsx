import upload_area from "../assets/upload_area.svg"
import { MdAdd } from "react-icons/md";
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { baseUrl } from "../utils/api";


const AddProduct = () => {
const [image, setimage] = useState(false);
const  [productDetails, setproductDetails] = useState({
  name:"",
  image:"",
  category:"Women",
  new_price:"",
  old_price:""
})
const imageHandler = (e) => {
      setimage(e.target.files[0])
}

const changeHandler = (e) => {
  setproductDetails({...productDetails, [e.target.name]:e.target.value})
}

const Add_product = async () => {
  console.log(productDetails);
  let responseData;
  
  let product = productDetails;

  let formData = new FormData();
  formData.append('product', image);

  



  await fetch(`${baseUrl}/upload`, {
    method: 'POST',
    headers:{
      Accept: 'application/json',
    },
    body: formData,
  }).then((resp) => resp.json()).then((date) => {responseData = date})

  if(responseData.success){
    product.image = responseData.image_url;
    console.log(product);
    await fetch(`${baseUrl}/addproduct`, {
      method: 'POST' ,
      headers: {
        Accept: 'application/json',
        'content-Type': 'application/json'
      },
      body: JSON.stringify(product),
    }).then((resp) => resp.json()).then((data) => {
      data.success?alert("product Added"):alert("Upload Failed")
    })
    
  }
}

  return (
    <div className="p-8 box-border bg-white w-full rounded-sm mt-4 lg:m-7">
     
      <div className="mb-3">
        <h4 className="bold pb-2">Product title : </h4>
        <input
          type="text" value={productDetails.name} onChange={changeHandler}
          name="name"
          placeholder="Type here.."
          className="bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md"
        />
      </div>
      <div className="mb-3">
        <h4 className="bold pb-2">Price: </h4>
        <input
          type="text"  value={productDetails.old_price} onChange={changeHandler}
          name="old_price"
          placeholder="Type here.."
          className="bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md"
        />
      </div>
      <div className="mb-3">
        <h4 className="bold pb-2">Offer Price </h4>
        <input
          type="text" value={productDetails.new_price} onChange={changeHandler}
          name="new_price"
          placeholder="Type here.."
          className="bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md"
        />
      </div>
      <div className="mb-3 flex items-center gap-x-4">
        <h4 className="bold-18 pb-2">Product Category</h4>
        <select value={productDetails.category} onChange={changeHandler} name="category" id="" className="bg-primary ring-1 ring-slate-900/20 medium-16 rounded-sm outline-none">
          <option value={"Women"}>Women</option>
          <option value={"Men"}>Men</option>
          <option value={"Kid"}>Kid</option>
        </select>
      </div>
      <div>
        <label htmlFor="file-input">
          <img src={image?URL.createObjectURL(image):upload_area} alt="" className="w-20 rounded-sm inline-block" />
        </label>
        <input onChange={imageHandler} type="file" name="image" id="file-input" hidden className="bg-primary max-w-80 py-3 px-" />
      </div>
      <button onClick={() => Add_product()} className="btn_dark_rounded mt-4 flexCenter gap-x-1"><MdAdd /> Add Product</button>
    </div>
  );
};

export default AddProduct;
