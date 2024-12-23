import { useEffect, useState } from 'react';
import {client} from '../../../sanity/lib/client'; // Asegúrate de que la configuración del cliente esté correcta

export default function Slicer({ activeCategory, setActiveCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from Sanity
    const fetchCategories = async () => {
      const query = '*[_type == "category"]{ _id, title }';  // Ajusta según tu esquema
      try {
        const result = await client.fetch(query);

        // Agregar la categoría "All" con id 0
        const allCategory = { _id: '0', title: 'All' };
        setCategories([allCategory, ...result]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId === '0' ? '' : categoryId); // Si es "All", pasamos una categoría vacía
  };

  return (
    <div className="my-12">
      {/* Mobile view with select dropdown */}
      <div className="sm:hidden">
        <p className="my-5 line-clamp-3 text-sm leading-6 text-sf-lime">Categories</p>
        <select
          id="tabs"
          name="tabs"
          value={activeCategory || ''}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="block w-full rounded-md border-sf-cream border focus:border-sf-lime focus:ring-sf-lime p-2"
        >
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
      
      {/* Desktop view with buttons */}
      <div className="hidden sm:block">
        <div className="border-b border-sf-cream">
          <nav aria-label="Tabs" className="-mb-px flex">
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => handleCategoryChange(category._id)}
                className={`w-1/4 border-b-2 px-1 py-4 text-center text-sm font-medium ${
                  activeCategory === category._id
                    ? 'border-sf-lime text-sf-lime'
                    : 'border-transparent text-sf-cream hover:border-sf-white hover:text-sf-white'
                }`}
              >
                {category.title}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}