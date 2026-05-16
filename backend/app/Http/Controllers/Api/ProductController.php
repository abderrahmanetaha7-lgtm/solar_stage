<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;

class ProductController extends Controller 
{
    /* ================= GET ALL ================= */

    public function index()
    {
        return Product::with([
            'images',
            'category'
        ])->latest()->get();
    }

    /* ================= CREATE ================= */

    public function store(Request $request)
    {
        $validated = $request->validate([

            'name_ar' => 'required|string|max:255',
            'name_fr' => 'required|string|max:255',

            'description_ar' => 'required|string|min:20',
            'description_fr' => 'required|string|min:20',
 
            'price' => 'required|numeric|min:1',

            'stock_quantity' => 'required|integer|min:0',

            'category_id' => 'required|exists:categories,id', 
 
            'images' => 'required|array|min:3',

            'images.*' => 'image|mimes:jpg,jpeg,png,webp|max:2048',
        ]); 

        $product = Product::create([

            'name_ar' => $validated['name_ar'],
            'name_fr' => $validated['name_fr'],

            'description_ar' => $validated['description_ar'],
            'description_fr' => $validated['description_fr'],

            'price' => $validated['price'],

            'stock_quantity' => $validated['stock_quantity'],

            'category_id' => $validated['category_id'], 
        ]); 

        foreach ($request->file('images') as $image) {

            $path = $image->store('products', 'public');

            ProductImage::create([
                'product_id' => $product->id,
                'image' => $path,
            ]);
        }

        return response()->json([
            'message' =>__('messages.product_created'),
            'product' => $product->load([
                'images',
                'category'
            ])
        ], 201);
    }

    /* ================= SHOW ================= */

    public function show(Product $product)
    {
        return $product->load([
            'images',
            'category'
        ]);
    }

    /* ================= UPDATE ================= */

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([

            'name_ar' => 'required|string|max:255',
            'name_fr' => 'required|string|max:255',

            'description_ar' => 'required|string|min:20',
            'description_fr' => 'required|string|min:20',

            'price' => 'required|numeric|min:1',

            'stock_quantity' => 'required|integer|min:0',

            'category_id' => 'required|exists:categories,id', 

            'images' => 'nullable|array',

            'images.*' => 'image|mimes:jpg,jpeg,png,webp|max:2048',
        ]); 

        $product->update([

            'name_ar' => $validated['name_ar'],
            'name_fr' => $validated['name_fr'],

            'description_ar' => $validated['description_ar'],
            'description_fr' => $validated['description_fr'],

            'price' => $validated['price'],

            'stock_quantity' => $validated['stock_quantity'],

            'category_id' => $validated['category_id'],
 
        ]); 

        if ($request->hasFile('images')) {

            foreach ($request->file('images') as $image) {

                $path = $image->store('products', 'public');

                ProductImage::create([
                    'product_id' => $product->id,
                    'image' => $path,
                ]);
            }
        }

        return response()->json([
            'message' => __('messages.product_updated'),
            'product' => $product->load([
                'images',
                'category'
            ])
        ]);
    }

    /* ================= DELETE ================= */

    public function destroy(Product $product)
    {
        $product->images()->delete();

        $product->delete();

        return response()->json([
            'message' => __('messages.product_deleted')
        ]);
    }
} 
