"use client";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db, storage } from "@/Firebase/firebase.config";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BeatLoader } from "react-spinners";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

type dataProduit = {
  nomProduit: string,
  codeBarProduit: string,
  categorieProduit: string,
  descriptionProduit: string,
  quantite: string,
  seuilAlerte: string,
  prix: string,
  totalStock: string,
  taille: string,
  couleur: string,
  imageProduit: string,
}

const page = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<dataProduit | any>({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Calcul automatique du total du stock
  useEffect(() => {
    const quantite = parseFloat(formData.quantite) || 0;
    const prix = parseFloat(formData.prix) || 0;
    const total = quantite * prix;
    setFormData((prev: dataProduit) => ({ ...prev, totalStock: total.toFixed(2) }));
  }, [formData.quantite, formData.prix]);

  useEffect(() => {
    const getCategories = async () => {
      const categoriesCollection = collection(db, "categorie");  // Récupérer la collection 'categorie'
      const categoriesSnapshot = await getDocs(categoriesCollection);  // Récupérer tous les documents de la collection
      const categoriesList = categoriesSnapshot.docs.map((doc) => doc.data());  // Transformer les documents en données
      setCategories(categoriesList[0].Catégories);  // Mettre à jour l'état des catégories avec les données
    };

    getCategories();
  }, [])


  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: any) => {
    setFormData({ ...formData, imageProduit: e.target.files[0]});
  };

  const isStepOneValid = formData.nomProduit && formData.codeBarProduit;
  const isStepTwoValid = formData.categorieProduit && formData.descriptionProduit;
  const isStepThreeValid = formData.quantite && formData.seuilAlerte && formData.prix;


  const handleImageUpload = async (file: File) => {
    const storageRef = ref(storage, `images/${file.name}`);

    try {
      // Upload de l'image dans Firebase Storage
      const snapshot = await uploadBytes(storageRef, file);

      // Récupération de l'URL de téléchargement après l'upload
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL; // Cette URL sera stockée dans Firestore
    } catch (error) {
      alert(`Error uploading image: ${error}`);
      throw error;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let imageUrl = "";
  
      if (formData.imageProduit) {
        imageUrl = await handleImageUpload(formData.imageProduit);
      }
  
      const newFormData = {
        ...formData,
        imageProduit: imageUrl
      };
  
      console.log("Submitting form data:", newFormData);  // Ajoutez une console log ici
      await addDoc(collection(db, "stock"), newFormData);
      console.log("Document successfully written!");
    } catch (error: any) {
      console.error("Error adding document: ", error);
      alert(`Error adding document: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <div className="text-center text-3xl font-bold mb-6">
          <h2>Enrégistrez vos nouveaux articles</h2>
        </div>
        <div className="space-y-8">
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
                <Select name="categorieProduit" value={formData.categorieProduit} onValueChange={(value) => setFormData({ ...formData, categorieProduit: value })}>
                  <SelectTrigger className="w-full h-10 border border-gray-300">
                    <SelectValue placeholder="Choisir" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.length !== 0 && categories.map((categorie) => (
                      <SelectItem key={categorie} value={categorie}>
                        {categorie}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>


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
                <Select name="taille" value={formData.taille} onValueChange={(value) => setFormData({ ...formData, taille: value })}>
                  <SelectTrigger className="w-full h-10 border border-gray-300">
                    <SelectValue placeholder="Choisir la taille" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="S">
                      S
                    </SelectItem>
                    <SelectItem value="L">
                      L
                    </SelectItem>
                    <SelectItem value="M">
                      M
                    </SelectItem>
                    <SelectItem value="XL">
                      XL
                    </SelectItem>
                    <SelectItem value="2XL">
                      2XL
                    </SelectItem>
                  </SelectContent>
                </Select>
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
                  onClick={handleSubmit}
                >
                  {loading ? (
                    <BeatLoader color="white" size={10} />
                  ) : (
                    <span>
                      Enrégistrer
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
export default page;