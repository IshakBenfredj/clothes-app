import React, { useState, useEffect } from "react";

function App() {
  const [clothes, setClothes] = useState([]);
  const [newCloth, setNewCloth] = useState({ name: "", price: 0, image: "" });

  useEffect(() => {
    const storedClothes = JSON.parse(localStorage.getItem("clothes")) || [];
    setClothes(storedClothes);
  }, []);

  const addCloth = () => {
    const updatedClothes = [...clothes, newCloth];
    setClothes(updatedClothes);
    localStorage.setItem("clothes", JSON.stringify(updatedClothes));
    setNewCloth({ name: "", price: 0, image: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCloth({ ...newCloth, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewCloth({ ...newCloth, image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const deleteCloth = (index) => {
    const updatedClothes = clothes.filter((_, idx) => idx !== index);
    setClothes(updatedClothes);
    localStorage.setItem("clothes", JSON.stringify(updatedClothes));
  };

  return (
    <div className="container">
      <h1>Clothing Store Dashboard</h1>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Cloth Name"
          value={newCloth.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newCloth.price}
          onChange={handleInputChange}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button onClick={addCloth}>Add Cloth</button>
      </div>
      <ul className="cards">
        {clothes.map((cloth, index) => (
          <div key={index} className="card">
            <img src={cloth.image} alt={cloth.name} />
            <div className="info">
              <div>
                {cloth.name} - ${cloth.price}
              </div>
              <button className="del" onClick={() => deleteCloth(index)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
