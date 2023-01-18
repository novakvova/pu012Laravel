<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Psy\Util\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Product::factory()->count(20)->create();
//        for($i=0; $i<100; $i++) {
//            DB::table('products')->insert([
//                'name' => "Продукт Тест",
//                'detail' =>' Усе буде Україна'
//            ]);
//        }
    }
}
