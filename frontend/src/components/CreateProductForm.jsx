import { useProductStore } from '../store/useProductStore.js';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Loader, PlusCircle, Upload } from 'lucide-react';
const categories = ["jeans", "t-shirts", "shoes", "glasses", "jackets", "suits", "bags"];
const CreateProductForm = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",

    })
    const {createProduct, loading} = useProductStore();

    const handleSubmit = async(e) => {
        e.preventDefault();
       await createProduct(newProduct);
       setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
       })
       
    }
    const handleImageChange=(e)=>{
        const file = e.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewProduct({...newProduct, image: reader.result})
            }
            reader.readAsDataURL(file);    //base64Url
        }
    }

    return (
        <motion.div className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <h2 className="text-2xl font-semibold mb-6 text-emerald-300">Create New Product</h2>

            <form  onSubmit={handleSubmit} className='space-y-3'>
                <div>
                    <label className='block text-sm font-medium text-gray-300'>Product Name</label>
                    <input type="text" id='name' value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className='mt-1 block w-full bg-gray-700 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none
            focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ' required />
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-300'> Description</label>
                    <textarea rows={3} type="text" id='description' value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        className='mt-1 block w-full bg-gray-700 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none
            focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ' required />
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-300'> Price</label>
                    <input type="Number" step='0.01' id='price' value={newProduct.number} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        className='mt-1 block  w-full bg-gray-700 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none
            focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ' required />
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-300'> Category</label>
                    <select type="text" id='category' value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        className='mt-1 block w-full bg-gray-700 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none
            focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ' required >
                        <option value="">Select Option</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                <div className='mt-1 flex items-center'>
                    <input type="file" id='image' onChange={handleImageChange} className='sr-only' accept='image/*' />
                    <label  htmlFor='image' className='cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md
                     shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500'  >
                        <Upload className='h-5 w-5 inline-block mr-2' />
                        Upload Image
                    </label>
                    {newProduct.image && <span className='ml-3 text-sm text-gray-400'>Image Uploaded</span>}
                </div>

                <button
					type='submit'
					className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
					shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 
					focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50'
					disabled={loading}
				>
					{loading ? (
						<>
							<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
							Loading...
						</>
					) : (
						<>
							<PlusCircle className='mr-2 h-5 w-5' />
							Create Product
						</>
					)}
				</button>
            </form>
        </motion.div>
    )
}

export default CreateProductForm
