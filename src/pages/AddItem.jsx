import { useState } from "react";
import { Link } from "react-router-dom";
import { addItemAPI } from "../services/allAPI";

function AddItem() {
  const [item, setItem] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    location: "",
  });

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Handle text inputs
  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      setImage(selectedImage);
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check login
    const savedUser = localStorage.getItem("borrowlyUser");

    if (!savedUser) {
      alert("Please login first");
      return;
    }

   
    if (!image) {
      alert("Please select an image for the item.");
      return;
    }

    const user = JSON.parse(savedUser);

    try {
      setUploading(true);

      // CLOUDINARY IMAGE UPLOAD
    

      const formData = new FormData();

      formData.append("file", image);

      
      formData.append("upload_preset", "borrowly-upload");

      console.log(
        "Upload preset:",
        formData.get("upload_preset")
      );

      console.log(
        "Selected image:",
        formData.get("file")
      );

      const cloudinaryResponse = await fetch(
        "https://api.cloudinary.com/v1_1/aaxbet7c/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const cloudinaryData =
        await cloudinaryResponse.json();

      console.log(
        "Cloudinary response:",
        cloudinaryData
      );

      // Check Cloudinary response
      if (
        !cloudinaryResponse.ok ||
        !cloudinaryData.secure_url
      ) {
        console.log(
          "Cloudinary error:",
          cloudinaryData.error
        );

        alert(
          cloudinaryData.error?.message ||
            "Image upload failed."
        );

        setUploading(false);
        return;
      }

      // Cloudinary image URL
      const imageURL =
        cloudinaryData.secure_url;

      // CREATE ITEM
     

      const newItem = {
        ...item,
        ownerName: user.name,
        available: true,
        image: imageURL,
      };

      console.log(
        "New item:",
        newItem
      );

    
      // SAVE TO JSON SERVER
   

      const result =
        await addItemAPI(newItem);

      console.log(
        "Item saved:",
        result.data
      );

      alert(
        "Item added successfully!"
      );

      // Reset form
      setItem({
        name: "",
        category: "",
        description: "",
        price: "",
        location: "",
      });

      setImage(null);

      const fileInput =
        document.getElementById(
          "itemImage"
        );

      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      console.log(
        "Add item error:",
        error
      );

      alert(
        "Something went wrong while adding the item."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="add-item-page">

      <div className="container py-5">

        <div className="row justify-content-center">

          <div className="col-lg-7">

            {/* Back */}
            <Link
              to="/browse"
              className="text-dark text-decoration-none"
            >
              ← Back to Browse
            </Link>

            {/* Heading */}
            <div className="mt-4 mb-4">

              <h2 className="fw-bold">
                Add an Item
              </h2>

              <p className="text-muted">
                List something you are willing to lend.
              </p>

            </div>

            {/* Form Card */}
            <div className="add-item-card">

              <form onSubmit={handleSubmit}>

                {/* Item Name */}
                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    Item Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={item.name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Example: HP Laptop"
                    required
                  />

                </div>

                {/* Category */}
                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    Category
                  </label>

                  <select
                    name="category"
                    value={item.category}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >

                    <option value="">
                      Select a category
                    </option>

                    <option value="Electronics">
                      Electronics
                    </option>

                    <option value="Books">
                      Books
                    </option>

                    <option value="Tools">
                      Tools
                    </option>

                    <option value="Sports">
                      Sports
                    </option>

                    <option value="Outdoor">
                      Outdoor
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>

                {/* Description */}
                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={item.description}
                    onChange={handleChange}
                    className="form-control"
                    rows="4"
                    placeholder="Describe the item and its condition..."
                    required
                  ></textarea>

                </div>

                {/* Price + Location */}
                <div className="row">

                  {/* Price */}
                  <div className="col-md-6 mb-3">

                    <label className="form-label fw-semibold">
                      Price per Day
                    </label>

                    <div className="input-group">

                      <span className="input-group-text">
                        ₹
                      </span>

                      <input
                        type="number"
                        name="price"
                        value={item.price}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="500"
                        min="0"
                        required
                      />

                    </div>

                  </div>

                  {/* Location */}
                  <div className="col-md-6 mb-3">

                    <label className="form-label fw-semibold">
                      Location
                    </label>

                    <input
                      type="text"
                      name="location"
                      value={item.location}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Kakkanad"
                      required
                    />

                  </div>

                </div>

                {/* Image */}
                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Item Image{" "}
                    <span className="text-danger">
                      *
                    </span>
                  </label>

                  <input
                    id="itemImage"
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                  />

                  <small className="text-muted">
                    Upload a clear image of the item.
                  </small>

                  {/* Selected image name */}
                  {image && (
                    <div className="mt-2 small text-success">
                      Selected: {image.name}
                    </div>
                  )}

                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn btn-dark w-100"
                  disabled={uploading}
                >

                  {uploading
                    ? "Uploading..."
                    : "Add Item"}

                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AddItem;