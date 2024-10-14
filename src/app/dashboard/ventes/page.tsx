"use client"; // Indiquer que c'est un composant Client

import { db } from "@/Firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Produit } from "../stock/page";

const Ventes = () => {
  const [dataStock, setDataStock] = useState<Produit[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(""); // Termes de recherche
  const [selectedItems, setSelectedItems] = useState<
    { item: Produit; quantity: number }[]
  >([]); // Articles sélectionnés avec quantité

  // Filtrer les articles en fonction de la recherche
  const filteredItems = dataStock.filter((item) =>
    item.nomProduit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Gérer la sélection d'un article
  const handleSelectItem = (item: Produit, quantity: number) => {
    if (!selectedItems.some((selected) => selected.item.codeBarProduit === item.codeBarProduit)) {
      setSelectedItems([...selectedItems, { item, quantity }]);
    }
    setSearchTerm(""); // Réinitialiser la recherche
  };

  // Supprimer un article sélectionné
  const handleRemoveItem = (itemToRemove: Produit) => {
    setSelectedItems(selectedItems.filter(selected => selected.item.codeBarProduit !== itemToRemove.codeBarProduit));
  };

  // Vendre les articles sélectionnés (placeholder pour action)
  const handleSellItems = () => {
    if (selectedItems.length > 0) {
      alert(
        `Vente confirmée pour : ${selectedItems
          .map(
            (selected) =>
              `${selected.quantity} ${selected.item.nomProduit} (taille: ${selected.item.taille}, couleur: ${selected.item.couleur})`
          )
          .join(", ")}`
      );
      setSelectedItems([]); // Réinitialiser les articles après la vente
    } else {
      alert("Aucun article sélectionné à vendre.");
    }
  };

  useEffect(() => {
    const getAllData = async () => {
      const stock = collection(db, 'stock');
      const stockSnapshot = await getDocs(stock);
      const stocksList = stockSnapshot.docs.map((doc) => doc.data()) as Produit[];
      setDataStock(stocksList);
    };

    getAllData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full h-full">
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
          <ul className="bg-white border border-gray-300 rounded-lg max-h-72 overflow-y-auto">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <li key={item.codeBarProduit} className="p-4 border-b">
                  <div className="flex flex-col">
                    <span className="font-semibold">{item.nomProduit}</span>
                    <div className="mt-2">
                      <label className="mr-2">Quantité :</label>
                      <input
                        type="number"
                        min="1"
                        defaultValue="1"
                        className="border border-gray-300 rounded-lg p-2 w-16"
                      />
                    </div>

                    <button
                      onClick={() => {
                        const quantityInput = document.querySelector(
                          'input[type="number"]'
                        ) as HTMLInputElement;
                        const quantity = parseInt(quantityInput.value, 10);
                        handleSelectItem(item, quantity);
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
                  key={selected.item.codeBarProduit}
                  className="flex justify-between items-center p-3 bg-gray-100 border rounded-lg"
                >
                  {selected.quantity} {selected.item.nomProduit} (taille: {selected.item.taille}, couleur: {selected.item.couleur})
                  <button
                    onClick={() => handleRemoveItem(selected.item)}
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
