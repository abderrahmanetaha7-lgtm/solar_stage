<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    // =========================================================================
    // GET ALL ORDERS
    // =========================================================================

    public function index()
    {
        return Order::with('items.product')
            ->whereNull('deleted_at')
            ->latest()
            ->get();
    }

    // =========================================================================
    // GET ARCHIVED ORDERS
    // =========================================================================

    public function archived()
    {
        return Order::onlyTrashed()->with('items.product')->latest()->get();
    }

    public function restore($id)
    {
        $order = Order::onlyTrashed()->findOrFail($id);

        $order->restore();

        return response()->json([
            'message' => __('messages.order_restored'),
            'order' => $order
        ]);
    }

    // =========================================================================
    // CALCULATE TOTAL
    // =========================================================================

    public function calculate(Request $request)
    {
        $request->validate([

            'items' => 'required|array|min:1',

            'items.*.id' => 'required|exists:products,id',

            'items.*.quantity' => 'required|integer|min:1',
        ]);

        $total = 0;

        foreach ($request->items as $item) {

            $product = Product::findOrFail($item['id']);

            if ($product->stock_quantity < $item['quantity']) {

                return response()->json([
                    'message' => __('messages.product_out_of_stock', [
                        'product' => $product->name_fr
                    ])
                ], 422);
            }

            $total += $product->price * $item['quantity'];
        }

        return response()->json([
            'total' => $total,
        ]);
    }

    // =========================================================================
    // CREATE ORDER
    // =========================================================================

    public function store(Request $request)
    {
        $validated = $request->validate([

            'first_name' => 'required|string|max:255',

            'last_name' => 'required|string|max:255',

            'email' => 'required|email',

            'phone' => 'required|string|max:255',

            'address' => 'required|string',

            'city' => 'required|string|max:255',

            'postal_code' => 'nullable|string|max:255',

            'country' => 'nullable|string|max:255',

            'items' => 'required|array|min:1',

            'items.*.id' => 'required|exists:products,id',

            'items.*.quantity' => 'required|integer|min:1',
        ]);

        return DB::transaction(function () use ($request) {

            $total = 0;

            // =============================================================
            // CHECK STOCK + CALCULATE TOTAL
            // =============================================================

            foreach ($request->items as $item) {

                $product = Product::findOrFail($item['id']);

                if ($product->stock_quantity < $item['quantity']) {

                    abort(
                        422,
                        __('messages.product_out_of_stock', [
                            'product' => $product->name_fr
                        ])
                    );
                }

                $total += $product->price * $item['quantity'];
            }

            // =============================================================
            // CREATE ORDER
            // =============================================================

            $order = Order::create([

                'user_id' => auth()->id(),

                'first_name' => $request->first_name,

                'last_name' => $request->last_name,

                'email' => $request->email,

                'phone' => $request->phone,

                'address' => $request->address,

                'city' => $request->city,

                'postal_code' => $request->postal_code,

                'country' => $request->country ?? 'Maroc',

                'total' => $total,

                'status' => 'Pending',
            ]);

            // =============================================================
            // CREATE ORDER ITEMS
            // =============================================================

            foreach ($request->items as $item) {

                $product = Product::lockForUpdate()
                    ->findOrFail($item['id']);

                OrderItem::create([

                    'order_id' => $order->id,

                    'product_id' => $product->id,

                    'product_name' => $product->name_fr,

                    'quantity' => $item['quantity'],

                    'price' => $product->price,

                    'total' => (
                        $product->price * $item['quantity']
                    ),
                ]);

                $product->decrement(
                    'stock_quantity',
                    $item['quantity']
                );
            }

            // CartItem::where('user_id', auth()->id())->delete();
            return response()->json([

                'message' => __('messages.order_created'),

                'order' => $order->load('items.product'),

            ], 201);
        });
    }

    // =========================================================================
    // SHOW ORDER
    // =========================================================================

    public function show(Order $order)
    {
        return $order->load('items.product');
    }

    // =========================================================================
    // UPDATE ORDER
    // =========================================================================

    public function update(Request $request, Order $order)
    {
        $order->update($request->only([

            'first_name',

            'last_name',

            'email',

            'phone',

            'address',

            'city',

            'postal_code',

            'country',
        ]));

        return response()->json([

            'message' => __('messages.order_updated'),

            'order' => $order,
        ]);
    }

    // =========================================================================
    // UPDATE STATUS
    // =========================================================================

    public function updateStatus(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:Pending,Confirmed,Delivered,Returned,Cancelled',
        ]);

        $newStatus = $request->status;
        $oldStatus = $order->status;

        /*
    |--------------------------------------------------------------------------
    | VALID TRANSITIONS
    |--------------------------------------------------------------------------
    */

        $allowedTransitions = [

            'Pending' => [
                'Confirmed',
                'Cancelled',
            ],

            'Confirmed' => [
                'Delivered',
                'Cancelled',
            ],

            'Delivered' => [
                'Returned',
            ],

            'Returned' => [],

            'Cancelled' => [],
        ];

        if (!in_array($newStatus, $allowedTransitions[$oldStatus])) {

            return response()->json([
                'message' => __('messages.invalid_status_transition', [
                    'old' => $oldStatus,
                    'new' => $newStatus,
                ])
            ], 422);
        }

        DB::transaction(function () use (
            $order,
            $oldStatus,
            $newStatus
        ) {

            /*
        |--------------------------------------------------------------------------
        | DELIVERED
        |--------------------------------------------------------------------------
        */

            if ($newStatus === 'Delivered') {

                foreach ($order->items as $item) {

                    $product = Product::find($item->product_id);

                    if ($product) {

                        $product->increment(
                            'sold_count',
                            $item->quantity
                        );
                    }
                }
            }

            /*
        |--------------------------------------------------------------------------
        | RETURNED
        |--------------------------------------------------------------------------
        */

            if ($newStatus === 'Returned') {

                foreach ($order->items as $item) {

                    $product = Product::find($item->product_id);

                    if ($product) {

                        /*
                    |--------------------------------------------------------------------------
                    | RETURN STOCK
                    |--------------------------------------------------------------------------
                    */

                        $product->increment(
                            'stock_quantity',
                            $item->quantity
                        );

                        /*
                    |--------------------------------------------------------------------------
                    | REMOVE SOLD COUNT
                    |--------------------------------------------------------------------------
                    */

                        $product->decrement(
                            'sold_count',
                            $item->quantity
                        );
                    }
                }
            }

            /*
        |--------------------------------------------------------------------------
        | CANCELLED
        |--------------------------------------------------------------------------
        */

            if ($newStatus === 'Cancelled') {

                foreach ($order->items as $item) {

                    $product = Product::find($item->product_id);

                    if ($product) {

                        /*
                    |--------------------------------------------------------------------------
                    | RESTORE STOCK
                    |--------------------------------------------------------------------------
                    */

                        $product->increment(
                            'stock_quantity',
                            $item->quantity
                        );
                    }
                }
            }

            /*
        |--------------------------------------------------------------------------
        | UPDATE STATUS
        |--------------------------------------------------------------------------
        */

            $order->update([
                'status' => $newStatus,
            ]);
        });

        return response()->json([

            'message' => __('messages.order_status_updated'),

            'order' => $order->fresh(),
        ]);
    }
    // =========================================================================
    // USER CANCEL ORDER
    // =========================================================================

    public function cancel(Order $order)
    {
        /*
        |--------------------------------------------------------------------------
        | USER CAN CANCEL ANY STATUS
        |--------------------------------------------------------------------------
        |
        | Pending
        | Confirmed
        | Delivered
        |
        */

        if (
            in_array($order->status, [
                'Cancelled',
                'Returned',
            ])
        ) {
            return response()->json([
                'message' => __('messages.order_cannot_cancel'),
            ], 422);
        }

        DB::transaction(function () use ($order) {

            foreach ($order->items as $item) {

                $product = Product::find($item->product_id);

                if ($product) {

                    // =====================================================
                    // RETURN STOCK
                    // =====================================================

                    $product->increment(
                        'stock_quantity',
                        $item->quantity
                    );

                    // =====================================================
                    // REMOVE SOLD COUNT IF DELIVERED
                    // =====================================================

                    if ($order->status === 'Delivered') {

                        $product->decrement(
                            'sold_count',
                            $item->quantity
                        );
                    }
                }
            }

            $order->update([
                'status' => 'Cancelled',
            ]);
        });

        return response()->json([
            'message' => __('messages.order_cancelled'),
            'order' => $order->fresh(),
        ]);
    }

    // =========================================================================
    // ARCHIVE ORDER
    // =========================================================================

    public function destroy($id)
    {
        $order = Order::findOrFail($id);

        $order->delete();

        return response()->json([
            'message' => __('messages.order_archived'),
        ]);
    }
}
