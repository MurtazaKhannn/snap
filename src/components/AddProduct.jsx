import React, { useState } from 'react'
import { FaFileUpload } from "react-icons/fa";

const AddProduct = () => {

  const [preview, setpreview] = useState("");
  const [image , setimage] = useState(false);
  const [productDetails , setproductDetails] = useState({
    name: "" ,
    image : "" ,
    category: "File-Folder" ,
    new_price: "" ,
    old_price: "" , 
    description: "" 
  });
  const imageHandler = (e) => {
    const file = e.target.files[0];

    var reader = new FileReader();
    reader.onload = function () {
      setpreview(reader.result);
    };
    reader.readAsDataURL(file);
    // setimage();
  }

  const changeHandler = (e) => {
    setproductDetails({
     ...productDetails,
      [e.target.name] : e.target.value
    })
  }

  const Add_Product = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append("product", image);

    await fetch('https://silvanestbackend.vercel.app/upload/images' , {
      method: 'POST' ,
      headers:{
        Accept:'application/json'
      } ,
      body:formData
    }).then((resp) => resp.json()).then((data) => {responseData=data});


      product.image = responseData.image_url;

      // product.image = "https://silvanestbackend.vercel.app/images/2RingConferenceFSA4.jpg"
      // console.log(product);

      await fetch('https://silvanestbackend.vercel.app/addproduct' , {
        method: 'POST',
        headers: {
          Accept:'application/json' ,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      }).then((res) => res.json()).then((data) => {
        data.success?alert("Product Added") : alert("Failed");
      })


  }


  return (

    <div className='add-product flex flex-col gap-5 w-[70vh]'> 
      <div className='add-product-itemfield flex flex-col gap-2 '>
        <p>Product Name</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Enter Product Name...' className='outline-none border-none p-2 bg-zinc-100 w-full' />
      </div>

      <div className="addproduct-price flex justify-between gap-5">
        <div className="add-product-item-field flex flex-col gap-2 ">
          <p>Product Price</p>
          <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Enter Product Price...' className='outline-none border-none p-2 bg-zinc-100' />
        </div>

        <div className="add-product-item-field flex flex-col gap-2 ">
          <p>Offer Price</p>
          <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Enter Product Price...' className='outline-none border-none p-2 bg-zinc-100' />
        </div>

      </div>

      <div className="add-product-item-field flex flex-col gap-2 ">
          <p>Product Description</p>
          <input value={productDetails.description} onChange={changeHandler} type="text" name='description' placeholder='Enter Description...' className='outline-none border-none p-2 bg-zinc-100' />
      </div>


      <div>
        <p>Product Availability</p>
        <input value={productDetails.available} onChange={changeHandler} type="text" name='available' placeholder=' InStock/OutofStock' className='outline-none border-none p-2 bg-zinc-100' />
      </div>

      



      <div className="addproduct-itemfield flex flex-col gap-2">
        <p>Product Category</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" className='addproduct-selector p-2 w-[20vh]'>
          <option className='border-none border-2px outline' value="File-Folder">File-Folder</option>
          <option className='border-none border-2px outline' value="Wallet">Wallet</option>
          <option className='border-none border-2px outline' value="Mosquito-Net">Mosquito-Net</option>
        </select>
      </div>

      <div className="addproduct-itemfield">
        <label htmlFor="file-input" className='flex items-center gap-5'>
          <p>Upload Image</p>
          { image ? URL.createObjectURL(image) : <FaFileUpload size={18} />}
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
        <div className='flex items-center gap-5'>
        <p className='font-bold'>IMAGE : </p>
        <img className='w-[20vh] mt-5' src={preview} alt="" />
        </div>
      </div>

      <button onClick={() => {Add_Product()}} className='Addproduct-button text-white bg-yellow-300 w-20 px-3 py-2 rounded-md'>ADD</button>
    </div>
  )
}

export default AddProduct
