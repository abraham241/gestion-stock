"use client"; // Indiquer que c'est un composant Client

import React, { useState } from "react";

const Ventes = () => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // Termes de recherche
  const [selectedItems, setSelectedItems] = useState<
    { item: string; quantity: number; size: string; color: string }[] // Inclure la couleur ici
  >([]); // Articles sélectionnés avec quantité, taille et couleur

  // Liste des articles de vêtements
  const items = [
    "T-shirt",
    "Pantalon",
    "Veste",
    "Robe",
    "Chemise",
    "Short",
    "Sweatshirt",
    "Jupe",
    "Blouson",
    "Manteau",
  ];

  // Tailles disponibles
  const sizes = ["S", "M", "L", "XL"];

  // Couleurs disponibles
  const colors = ["Rouge", "Bleu", "Vert", "Jaune", "Noir", "Blanc"]; // Nouvelle liste de couleurs

  // Filtrer les articles en fonction de la recherche
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Gérer la sélection d'un article
  const handleSelectItem = (
    item: string,
    quantity: number,
    size: string,
    color: string
  ) => {
    if (
      !selectedItems.some(
        (selected) =>
          selected.item === item &&
          selected.size === size &&
          selected.color === color
      )
    ) {
      setSelectedItems([...selectedItems, { item, quantity, size, color }]);
    }
    setSearchTerm(""); // Réinitialiser la recherche
  };

  // Supprimer un article sélectionné
  const handleRemoveItem = (
    itemToRemove: string,
    sizeToRemove: string,
    colorToRemove: string
  ) => {
    setSelectedItems(
      selectedItems.filter(
        (selected) =>
          selected.item !== itemToRemove ||
          selected.size !== sizeToRemove ||
          selected.color !== colorToRemove
      )
    );
  };

  // Vendre les articles sélectionnés (placeholder pour action)
  const handleSellItems = () => {
    if (selectedItems.length > 0) {
      alert(
        `Vente confirmée pour : ${selectedItems
          .map(
            (selected) =>
              `${selected.quantity} ${selected.item} (taille: ${selected.size}, couleur: ${selected.color})`
          )
          .join(", ")}`
      );
      setSelectedItems([]); // Réinitialiser les articles après la vente
    } else {
      alert("Aucun article sélectionné à vendre.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">
          Recherche et Sélection d'Articles
        </h2>

        {/* Barre de recherche */}
        <input
          type="text"
          placeholder="Rechercher un vêtement"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full p-3 border border-gray-300 rounded-lg mb-4"
        />

        {/* Liste des résultats filtrés */}
        {searchTerm && (
          <ul className="bg-white border border-gray-300 rounded-lg max-h-40 overflow-y-auto">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <li key={index} className="p-4 border-b">
                  {/* Sélection de la quantité, taille et couleur */}
                  <div className="flex flex-col">
                    <span className="font-semibold">{item}</span>
                    <div className="mt-2">
                      <label className="mr-2">Quantité :</label>
                      <input
                        type="number"
                        min="1"
                        defaultValue="1"
                        id={`quantity-${index}`}
                        className="border border-gray-300 rounded-lg p-2 w-16"
                      />
                    </div>
                    <div className="mt-2">
                      <span>Tailles disponibles :</span>
                      <div className="flex space-x-2 mt-2">
                        {sizes.map((size) => (
                          <label key={size} className="flex items-center">
                            <input
                              type="radio"
                              name={`size-${index}`}
                              value={size}
                              className="mr-1"
                              defaultChecked={size === "M"}
                            />
                            {size}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Sélection de la couleur */}
                    <div className="mt-2">
                      <span>Couleurs disponibles :</span>
                      <div className="flex space-x-2 mt-2">
                        {colors.map((color) => (
                          <label key={color} className="flex items-center">
                            <input
                              type="radio"
                              name={`color-${index}`}
                              value={color}
                              className="mr-1"
                              defaultChecked={color === "Rouge"} // Valeur par défaut
                            />
                            {color}
                          </label>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        const quantityInput = document.getElementById(
                          `quantity-${index}`
                        ) as HTMLInputElement;
                        const selectedSize = document.querySelector(
                          `input[name="size-${index}"]:checked`
                        ) as HTMLInputElement;
                        const selectedColor = document.querySelector(
                          `input[name="color-${index}"]:checked`
                        ) as HTMLInputElement;

                        const quantity = parseInt(quantityInput.value, 10);
                        const size = selectedSize?.value || "M";
                        const color = selectedColor?.value || "Rouge"; // Valeur par défaut

                        handleSelectItem(item, quantity, size, color);
                      }}
                      className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                    >
                      Ajouter
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">Aucun vêtement trouvé</li>
            )}
          </ul>
        )}

        {/* Articles sélectionnés */}
        {selectedItems.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">
              Articles Sélectionnés :
            </h3>
            <ul className="space-y-2">
              {selectedItems.map((selected, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-100 border rounded-lg"
                >
                  {selected.quantity} {selected.item} (taille: {selected.size},
                  couleur: {selected.color})
                  <button
                    onClick={() =>
                      handleRemoveItem(
                        selected.item,
                        selected.size,
                        selected.color
                      )
                    }
                    className="bg-red-500 text-white p-1 rounded-full text-sm hover:bg-red-600"
                  >
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
            {/* Bouton pour vendre les articles sélectionnés */}
            <button
              onClick={handleSellItems}
              className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            >
              Vendre les articles
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ventes;
