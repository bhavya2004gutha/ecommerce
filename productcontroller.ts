import { Request, Response } from "express";
import { IProduct } from "../models/product";
import { product } from "../models/product";
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, category, stock, images } = req.body;

    const newProduct: IProduct = new product({
      name,
      description,
      price,
      category,
      stock,
      images,
    });

    await newProduct.save(); 

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error creating product" });
  }
};


export const getproductById = async ( req: Request , res: Response): Promise<void> =>{
    try{
        const productId: string = req.params.id;
        const foundProduct: IProduct | null = await product.findById(productId);
        if (!foundProduct) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json(foundProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error fetching product" });
    }
}




// Get all products (public)
export const getProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const getproducts: IProduct[] = await product.find();
    res.json(getproducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching products' });
  }
};

// Get single product by ID (public)
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const getoneproduct = await product.findById(req.params.id);

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching product' });
  }
};

// Update product by ID (Admin)
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId: string = req.params.id;
    const updates: Partial<IProduct> = req.body;

    const updatedProduct = await product.findByIdAndUpdate(productId, updates, { new: true });

    if (!updatedProduct) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating product' });
  }
};

// Delete product by ID (Admin)
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId: string = req.params.id;

    const deleted = await product.findByIdAndDelete(productId);
    if (!deleted) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error deleting product' });
  }
};


