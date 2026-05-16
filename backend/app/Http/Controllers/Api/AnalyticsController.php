<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends Controller
{
    public function index()
    {
        $salesData = [];

        for ($i = 1; $i <= 12; $i++) {

            $monthOrders = Order::query()

                ->withoutGlobalScopes()

                ->whereMonth('created_at', $i)

                ->whereYear('created_at', now()->year)

                ->get();

            $revenue = $monthOrders

                ->where('status', 'Delivered')

                ->sum('total');

            /*
            |--------------------------------------------------------------------------
            | ACTIVE ORDERS
            |--------------------------------------------------------------------------
            */

            $ordersCount = $monthOrders

                ->whereIn('status', [
                    'Pending',
                    'Confirmed',
                    'Delivered',
                ])

                ->count();

            $salesData[] = [

                'month' => Carbon::create()

                    ->month($i)

                    ->format('M'),

                'revenue' => (float) $revenue,

                'orders' => $ordersCount,
            ];
        }

        /*
        |--------------------------------------------------------------------------
        | SALES BY CATEGORY
        |--------------------------------------------------------------------------
        |
        | ONLY DELIVERED ORDERS
        |
        */

        $categorySales = OrderItem::query()

            ->join(
                'orders',
                'order_items.order_id',
                '=',
                'orders.id'
            )

            ->join(
                'products',
                'order_items.product_id',
                '=',
                'products.id'
            )

            ->join(
                'categories',
                'products.category_id',
                '=',
                'categories.id'
            )

            ->where('orders.status', 'Delivered')

            ->select(

                'categories.name_fr',

                DB::raw(
                    'SUM(order_items.quantity) as total_sales'
                )
            )

            ->groupBy('categories.name_fr')

            ->get();

        $totalSales = $categorySales->sum('total_sales');

        $categoryData = $categorySales->map(function ($item) use (
            $totalSales
        ) {

            return [

                'name' => $item->name,

                'value' => $totalSales > 0

                    ? round(
                        ($item->total_sales / $totalSales) * 100
                    )

                    : 0,
            ];
        });


        $topProducts = Product::query()

            ->with([
                'images',
                'category',
            ])

            ->withSum([
                'orderItems as delivered_quantity' => function ($query) {

                    $query->join(
                        'orders',
                        'orders.id',
                        '=',
                        'order_items.order_id'
                    )

                        ->where('orders.status', 'Delivered');
                }
            ], 'quantity')

            ->orderByDesc('delivered_quantity')

            ->take(5)

            ->get([
                'id',
                'category_id',
                'name_fr',
                'price',
                'stock_quantity',
            ]);


        $totalRevenue = Order::query()

            ->withoutGlobalScopes()

            ->where('status', 'Delivered')

            ->sum('total');

        $totalOrders = Order::query()

            ->whereIn('status', [
                'Pending',
                'Confirmed',
                'Delivered',
            ])

            ->count();

        $deliveredOrders = Order::withTrashed()

            ->where('status', 'Delivered')

            ->count();

        /*
        |--------------------------------------------------------------------------
        | PENDING ORDERS
        |--------------------------------------------------------------------------
        */

        $pendingOrders = Order::withTrashed()

            ->where('status', 'Pending')

            ->count();

        /*
        |--------------------------------------------------------------------------
        | CONFIRMED ORDERS
        |--------------------------------------------------------------------------
        */

        $confirmedOrders = Order::withTrashed()

            ->where('status', 'Confirmed')

            ->count();

        /*
        |--------------------------------------------------------------------------
        | RETURNED ORDERS
        |--------------------------------------------------------------------------
        */

        $returnedOrders = Order::withTrashed()

            ->where('status', 'Returned')

            ->count();

        /*
        |--------------------------------------------------------------------------
        | CANCELLED ORDERS
        |--------------------------------------------------------------------------
        */

        $cancelledOrders = Order::withTrashed()

            ->where('status', 'Cancelled')

            ->count();

        /*
        |--------------------------------------------------------------------------
        | PRODUCTS
        |--------------------------------------------------------------------------
        */

        $totalProducts = Product::count();

        $outOfStock = Product::where(
            'stock_quantity',
            '<=',
            0
        )->count();

        $lowStock = Product::whereBetween(
            'stock_quantity',
            [1, 5]
        )->count();

        /*
        |--------------------------------------------------------------------------
        | AVERAGE ORDER VALUE
        |--------------------------------------------------------------------------
        */

        $averageOrderValue = $deliveredOrders > 0

            ? round(
                $totalRevenue / $deliveredOrders,
                2
            )

            : 0;

        /*
        |--------------------------------------------------------------------------
        | RESPONSE
        |--------------------------------------------------------------------------
        */
        $totalUsers = User::count();

        return response()->json([

            'salesData' => $salesData,

            'categoryData' => $categoryData,

            'topProducts' => $topProducts,

            'stats' => [
                'totalRevenue' => $totalRevenue,

                'averageOrderValue' => $averageOrderValue,

                'totalOrders' => $totalOrders,

                'deliveredOrders' => $deliveredOrders,

                'pendingOrders' => $pendingOrders,

                'confirmedOrders' => $confirmedOrders,

                'returnedOrders' => $returnedOrders,

                'cancelledOrders' => $cancelledOrders,

                'totalProducts' => $totalProducts,

                'outOfStock' => $outOfStock,

                'lowStock' => $lowStock,

                'totalUsers' => $totalUsers,
            ],
        ]);
    }
}
