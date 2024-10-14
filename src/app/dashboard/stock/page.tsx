'use client';
import React, { useEffect, useState } from 'react';
import { BiSpreadsheet } from "react-icons/bi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { File, ListFilter, MoreHorizontal, PlusCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { LuSearch } from 'react-icons/lu';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/Firebase/firebase.config';

type Stock = {
  id: string; // Assurez-vous que chaque item récupéré ait un champ ID
  name: string;
  dateAdded: Date
  category: string;
  unitPrice: number;
  totalQuantity: number;
  totalPrice: number;
  options: {
    size: string;
    color: string;
    quantity: number;
    seuil: number;
    imageUrl: string;
  }[];
};

const Page = () => {
  const [date, setDate] = useState<Date>();
  const [categories, setCategories] = useState([]);
  const [categorieSelected, setCategorieSelected] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // État pour gérer l'input de recherche
  const [dataStock, setDataStock] = useState<Stock[]>([]);
  const [dataFliter, setDataFilter] = useState<Stock[]>([]);

  function afficherDateCreation(date_creation: { seconds: number; nanoseconds: number }): string {
    const date = new Date(date_creation.seconds * 1000); // Convertir les secondes en millisecondes
    return date.toLocaleString(); // Affiche la date et l'heure dans un format lisible
  }

  useEffect(() => {
    const getAllData = async () => {
      const categoriesCollection = collection(db, "categorie");  // Récupérer la collection 'categorie'
      const categoriesSnapshot = await getDocs(categoriesCollection);  // Récupérer tous les documents de la collection
      const categoriesList = categoriesSnapshot.docs.map((doc) => doc.data());  // Transformer les documents en données
      setCategories(categoriesList[0].Catégories);  // Mettre à jour l'état des catégories avec les données

      const stockCollection = collection(db, "stock");
      const stockSnapshot = await getDocs(stockCollection);
      const stocksList = stockSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id, // Associez l'ID du document ici
      })) as Stock[];
      setDataStock(stocksList);
      setDataFilter(stocksList); // Initialement, montrer tous les produits
    };

    getAllData();
  }, []);

  // Filtrage des produits en fonction de la catégorie et du terme de recherche
  useEffect(() => {
    const filteredData = dataStock.filter(stock => {
      const isCategoryMatch = categorieSelected ? stock.category.toLowerCase() === categorieSelected.toLowerCase() : true;
      const isSearchMatch = searchTerm ? stock.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
      return isCategoryMatch && isSearchMatch;
    });
    setDataFilter(filteredData);
  }, [categorieSelected, searchTerm, dataStock]);

  return (
    <div className="w-full">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 w-full">
        <Tabs defaultValue="all">
          <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader className="flex flex-row justify-between items-center">
                <div>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>
                    Manage your products and view their sales performance.
                  </CardDescription>
                </div>
                <div className="flex flex-col items-center gap-y-4">
                  <div className='flex justify-between gap-x-10'>
                    <div className="flex items-center bg-white px-4 rounded-md py-2 w-[250px] gap-x-4 shadow-xl border justify-end">
                      <input
                        type="text"
                        placeholder="Recherche"
                        value={searchTerm} // Lier l'input à l'état de recherche
                        onChange={(e) => setSearchTerm(e.target.value)} // Mettre à jour l'état à chaque changement
                        className="input w-[90%] h-7 rounded outline-none"
                      />
                      <LuSearch size={25} />
                    </div>
                    <div>
                      <button className='border px-3 py-2 rounded-md' onClick={()=> {setDataFilter(dataStock); setCategorieSelected('')}}>
                        <BiSpreadsheet size={35}/>
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-x-3">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[280px] justify-start text-left font-normal',
                            !date && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, 'PPP') : <span>cliquer sur une date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <Select name="categorieProduit" value={categorieSelected} onValueChange={(value) => setCategorieSelected(value)}>
                      <SelectTrigger className="flex-none  h-9 w-1/2 border border-gray-300">
                        <SelectValue placeholder="Categorie" />
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
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Image</span>
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Seuil d'alerte</TableHead>
                      <TableHead className="hidden md:table-cell">Prix</TableHead>
                      <TableHead className="hidden md:table-cell">Quantité totale</TableHead>
                      <TableHead className="hidden md:table-cell">Date d'ajout</TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dataFliter.length !== 0 && dataFliter.map((stoc, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="hidden sm:table-cell">
                          <img
                            alt="Product image"
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src={stoc.}
                            width="64"
                          />
                        </TableCell>
                        <TableCell className="font-medium">{stoc.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{stoc}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{stoc.totalPrice}</TableCell>
                        <TableCell className="hidden md:table-cell">{stoc.totalQuantity}</TableCell>
                        <TableCell className="hidden md:table-cell">{afficherDateCreation(stoc.)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Showing <strong>1-10</strong> of <strong>32</strong> products
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Page;