"use client";

import React, { useState, useEffect } from "react";

const StepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nomProduit: "",
    codeBarProduit: "",
    categorieProduit: "",
    descriptionProduit: "",
    quantite: "",
    seuilAlerte: "",
    prix: "",
    totalStock: "",
    taille: "",
    couleur: "",
    imageProduit: null,
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Calcul automatique du total du stock
  useEffect(() => {
    const quantite = parseFloat(formData.quantite) || 0;
    const prix = parseFloat(formData.prix) || 0;
    const total = quantite * prix;
    setFormData((prev) => ({ ...prev, totalStock: total.toFixed(2) }));
  }, [formData.quantite, formData.prix]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: any) => {
    setFormData({ ...formData, imageProduit: e.target.files[0] });
  };

  const isStepOneValid = formData.nomProduit && formData.codeBarProduit;
  const isStepTwoValid =
    formData.categorieProduit && formData.descriptionProduit;
  const isStepThreeValid =
    formData.quantite && formData.seuilAlerte && formData.prix;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <div className="text-center text-3xl font-bold mb-6">
          <h2>Enrégistrez vos nouveaux articles</h2>
        </div>
        <form className="space-y-8">
          {step === 1 && (
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-600">
                Étape 1: Informations de base
              </h3>
              <div className="mb-5">
                <label className="block mb-2 font-medium">Nom du produit</label>
                <input
                  type="text"
                  name="nomProduit"
                  value={formData.nomProduit}
                  onChange={handleChange}
                  className="block w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 font-medium">
                  Code bar du produit
                </label>
                <input
                  type="text"
                  name="codeBarProduit"
                  value={formData.codeBarProduit}
                  onChange={handleChange}
                  className="block w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <button
                type="button"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                onClick={nextStep}
                disabled={!isStepOneValid}
              >
                Suivant
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-600">
                Étape 2: Détails du produit
              </h3>
              <div className="mb-5">
                <label className="block mb-2 font-medium">
                  Catégorie du produit
                </label>
                <select
                  name="categorieProduit"
                  value={formData.categorieProduit}
                  onChange={handleChange}
                  className="block w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="">Choisir</option>
                  <option value="France">France</option>
                  <option value="Canada">Canada</option>
                  <option value="Germany">Germany</option>
                </select>
              </div>
              <div className="mb-5">
                <label className="block mb-2 font-medium">
                  Description du produit
                </label>
                <textarea
                  name="descriptionProduit"
                  value={formData.descriptionProduit}
                  onChange={handleChange}
                  className="block w-full p-3 border border-gray-300 rounded-lg"
                ></textarea>
              </div>
              <div className="mb-5">
                <label className="block mb-2 font-medium">
                  Taille du produit
                </label>
                <select
                  name="taille"
                  value={formData.taille}
                  onChange={handleChange}
                  className="block w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="">Choisir la taille</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </div>
              <div className="mb-5">
                <label className="block mb-2 font-medium">
                  Couleur du produit
                </label>
                <select
                  name="couleur"
                  value={formData.couleur}
                  onChange={handleChange}
                  className="block w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="">Choisir la couleur</option>
                  <option value="Noir">Noir</option>
                  <option value="Blanc">Blanc</option>
                  <option value="Rouge">Rouge</option>
                  <option value="Bleu">Bleu</option>
                  <option value="Vert">Vert</option>
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                  onClick={prevStep}
                >
                  Précédent
                </button>
                <button
                  type="button"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                  onClick={nextStep}
                  disabled={!isStepTwoValid}
                >
                  Suivant
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-600">
                Étape 3: Stock et prix
              </h3>
              <div className="mb-5">
                <label className="block mb-2 font-medium">
                  Quantité d'article
                </label>
                <input
                  type="number"
                  name="quantite"
                  value={formData.quantite}
                  onChange={handleChange}
                  className="block w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 font-medium">Seuil d'alerte</label>
                <input
                  type="number"
                  name="seuilAlerte"
                  value={formData.seuilAlerte}
                  onChange={handleChange}
                  className="block w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 font-medium">
                  Prix de l'article
                </label>
                <input
                  type="number"
                  name="prix"
                  value={formData.prix}
                  onChange={handleChange}
                  className="block w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 font-medium">Total du stock</label>
                <input
                  type="text"
                  name="totalStock"
                  value={formData.totalStock}
                  readOnly
                  className="block w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 font-medium">
                  Image du produit
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                  onClick={prevStep}
                >
                  Précédent
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                  disabled={!isStepThreeValid}
                >
                  Enrégistrer
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default StepForm;
