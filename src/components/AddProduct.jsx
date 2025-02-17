import React, { useState } from "react";
import { FaFileUpload } from "react-icons/fa";

const AddProduct = () => {
  const [image, setimage] = useState(false);
  const [productDetails, setproductDetails] = useState({
    name: "",
    image: "",
    category: "File-Folder",
    new_price: "",
    old_price: "",
    description: "",
  });
  const imageHandler = (e) => {
    setimage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setproductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

  const Add_Product = async () => {

    const data = new FormData();
    data.append("file", image);
    data.append("cloud_name", "dszlkamx3");
    data.append("api_key", "444193271934413");
    data.append("upload_preset", "gblmhyav");

    const cloudName = "dszlkamx3";

    await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => (productDetails.image = data.secure_url));

    console.log(productDetails);

    await fetch('https://silvanestbackend.vercel.app/addproduct' , {
      method: 'POST',
      headers: {
        Accept:'application/json' ,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productDetails)
    }).then((res) => res.json()).then((data) => {
      data.success?alert("Product Added") : alert("Failed");
    })
  };

  return (
    <div className="add-product flex flex-col gap-5 w-[70vh]">
      <div className="add-product-itemfield flex flex-col gap-2 ">
        <p>Product Name</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Enter Product Name..."
          className="outline-none border-none p-2 bg-zinc-100 w-full"
        />
      </div>

      <div className="addproduct-price flex justify-between gap-5">
        <div className="add-product-item-field flex flex-col gap-2 ">
          <p>Product Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Enter Product Price..."
            className="outline-none border-none p-2 bg-zinc-100"
          />
        </div>

        <div className="add-product-item-field flex flex-col gap-2 ">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Enter Product Price..."
            className="outline-none border-none p-2 bg-zinc-100"
          />
        </div>
      </div>

      <div className="add-product-item-field flex flex-col gap-2 ">
        <p>Product Description</p>
        <input
          value={productDetails.description}
          onChange={changeHandler}
          type="text"
          name="description"
          placeholder="Enter Description..."
          className="outline-none border-none p-2 bg-zinc-100"
        />
      </div>

      <div>
        <p>Product Availability</p>
        <input
          value={productDetails.available}
          onChange={changeHandler}
          type="text"
          name="available"
          placeholder=" InStock/OutofStock"
          className="outline-none border-none p-2 bg-zinc-100"
        />
      </div>

      <div className="addproduct-itemfield flex flex-col gap-2">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="addproduct-selector p-2 w-[20vh]"
        >
          <option
            className="border-none border-2px outline"
            value="File-Folder"
          >
            File-Folder
          </option>
          <option className="border-none border-2px outline" value="Wallet">
            Wallet
          </option>
          <option
            className="border-none border-2px outline"
            value="Mosquito-Net"
          >
            Mosquito-Net
          </option>
        </select>
      </div>

      <div className="addproduct-itemfield">
        <label htmlFor="file-input" className="flex items-center gap-5">
          <p>Upload Image</p>
          {image ? URL.createObjectURL(image) : <FaFileUpload size={18} />}
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>

      <button
        onClick={() => {
          Add_Product();
        }}
        className="Addproduct-button text-white bg-yellow-300 w-20 px-3 py-2 rounded-md"
      >
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
